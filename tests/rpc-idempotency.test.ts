
import postgres from "postgres";
import { assert, assertEquals } from "jsr:@std/assert";

const databaseUrl = Deno.env.get("TEST_DATABASE_URL");

Deno.test({
  name: "RPC: concurrent duplicate page is persisted exactly once",
  ignore: !databaseUrl,
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    if (!databaseUrl) throw new Error("TEST_DATABASE_URL is required");

    const dbA = postgres(databaseUrl, { max: 1 });
    const dbB = postgres(databaseUrl, { max: 1 });
    const jobId = crypto.randomUUID();
    const leaseToken = crypto.randomUUID();
    const pageKey = `rpc-idempotency-test-${crypto.randomUUID()}`;

    try {
      const installed = await dbA`
        SELECT
          to_regclass('public.melostore_sync_jobs') IS NOT NULL AS has_jobs,
          to_regclass('public.melostore_sync_pages') IS NOT NULL AS has_pages,
          to_regprocedure(
            'public.melostore_apply_sync_page(uuid,uuid,text,jsonb,text,boolean,integer,integer,integer)'
          ) IS NOT NULL AS has_rpc
      `;

      assertEquals(installed[0].has_jobs, true, "Missing jobs table");
      assertEquals(installed[0].has_pages, true, "Missing pages table");
      assertEquals(installed[0].has_rpc, true, "Missing 9-argument RPC");

      await dbA`
        INSERT INTO public.melostore_sync_jobs
          (id, status, lease_token, lease_until)
        VALUES (
          ${jobId}::uuid,
          'running',
          ${leaseToken}::uuid,
          clock_timestamp() + interval '5 minutes'
        )
      `;

      const applyPage = async (db: typeof dbA) => {
        const rows = await db`
          SELECT public.melostore_apply_sync_page(
            ${jobId}::uuid,
            ${leaseToken}::uuid,
            ${pageKey},
            '[]'::jsonb,
            NULL::text,
            true,
            0,
            0,
            0
          ) AS result
        `;
        return rows[0].result as {
          ok: boolean;
          duplicate_page?: boolean;
        };
      };

      const [resultA, resultB] = await Promise.all([
        applyPage(dbA),
        applyPage(dbB),
      ]);

      assert(resultA?.ok === true, "First RPC call failed");
      assert(resultB?.ok === true, "Second RPC call failed");

      const duplicateSignals = [resultA, resultB].filter(
        (result) => result.duplicate_page === true,
      ).length;

      assertEquals(duplicateSignals, 1, "Expected exactly one duplicate signal");

      const pageRows = await dbA`
        SELECT count(*)::int AS count
        FROM public.melostore_sync_pages
        WHERE job_id = ${jobId}::uuid AND page_key = ${pageKey}
      `;
      assertEquals(pageRows[0].count, 1, "Expected exactly one saved page");

      const jobRows = await dbA`
        SELECT pages_fetched, processed_products
        FROM public.melostore_sync_jobs
        WHERE id = ${jobId}::uuid
      `;
      assertEquals(jobRows.length, 1);
      assertEquals(jobRows[0].pages_fetched, 1);
      assertEquals(jobRows[0].processed_products, 0);
    } finally {
      await dbA`
        DELETE FROM public.melostore_sync_pages
        WHERE job_id = ${jobId}::uuid
      `.catch(() => []);

      await dbA`
        DELETE FROM public.melostore_sync_jobs
        WHERE id = ${jobId}::uuid
      `.catch(() => []);

      await dbA.end();
      await dbB.end();
    }
  },
});
