-- Remove direct table-level SELECT from public products.
-- Re-grant only the columns needed by the public catalog.
-- Keep cost_price private.

REVOKE SELECT
ON TABLE public.products
FROM anon, authenticated;

GRANT SELECT (
  id,
  game_id,
  name,
  slug,
  category,
  provider,
  provider_product_code,
  selling_price,
  promo_price,
  description,
  status,
  sort_order,
  created_at,
  updated_at,
  category_id
)
ON TABLE public.products
TO anon, authenticated;

-- Prevent direct access to private product cost records.
REVOKE ALL PRIVILEGES
ON TABLE public.product_costs
FROM anon, authenticated;
