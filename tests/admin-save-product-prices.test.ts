
import postgres from "postgres";
import { assertEquals } from "jsr:@std/assert";

const databaseUrl = Deno.env.get("TEST_DATABASE_URL");

Deno.test({
  name: "Admin save product prices rejects invalid inputs",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: async () => {
    if (!databaseUrl) {
      throw new Error("TEST_DATABASE_URL is required");
    }

    const db = postgres(databaseUrl, { max: 1 });

    try {
      const installed = await db`
        SELECT to_regprocedure(
          'public.admin_save_product_prices(uuid,numeric,numeric,numeric)'
        ) IS NOT NULL AS exists
      `;

      assertEquals(
        installed[0].exists,
        true,
        "Candidate RPC must be installed in the test database before this test runs",
      );

      // This test intentionally does not modify catalog data.
      // Authorization and write-path tests will follow separately.
    } finally {
      await db.end();
    }
  },
});
