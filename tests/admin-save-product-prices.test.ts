import { assert, assertStringIncludes } from "jsr:@std/assert";

const sqlUrl = new URL(
  "../supabase/functions/melostore-sync-pricelist-candidate/PATCH_ADMIN_SAVE_PRODUCT_PRICES.sql",
  import.meta.url,
);

Deno.test("Admin save product prices SQL has required safeguards", async () => {
  const sql = await Deno.readTextFile(sqlUrl);

  assertStringIncludes(sql, "CREATE OR REPLACE FUNCTION public.admin_save_product_prices");
  assertStringIncludes(sql, "SECURITY DEFINER");
  assertStringIncludes(sql, "SET search_path TO ''");
  assertStringIncludes(sql, "public.is_admin()");
  assertStringIncludes(sql, "'aal2'");
  assertStringIncludes(sql, "public.product_costs");
  assertStringIncludes(sql, "public.products");
  assertStringIncludes(sql, "REVOKE ALL ON FUNCTION");
  assertStringIncludes(sql, "TO authenticated");

  assert(
    sql.includes("'NaN'") &&
      sql.includes("'Infinity'") &&
      sql.includes("'-Infinity'"),
    "SQL must reject non-finite prices",
  );
});

