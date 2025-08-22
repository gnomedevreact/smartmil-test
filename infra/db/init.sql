CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.products (
  id SERIAL PRIMARY KEY,
  article VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT CHK_price_positive CHECK (price > 0),
  CONSTRAINT CHK_quantity_nonnegative CHECK (quantity >= 0)
);

INSERT INTO public.products (article, name, price, quantity) VALUES
  ('SKU-001', 'Green Tea 100g', 4, 20),
  ('SKU-002', 'Black Coffee 250g', 7, 15),
  ('SKU-003', 'Dark Chocolate 80%', 2, 50),
  ('SKU-004', 'Protein Bar Vanilla', 1, 100)
ON CONFLICT (article) DO NOTHING;
