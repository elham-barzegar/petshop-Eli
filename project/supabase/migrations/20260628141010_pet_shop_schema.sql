/*
# Pet Shop Eli Database Schema

1. New Tables
- `categories` - Product categories (Dogs, Cats, and subcategories)
- `products` - All products for sale with pricing, images, and inventory
- `reviews` - Customer reviews for products
- `cart_items` - Shopping cart items (session-based, no auth required)
- `orders` - Customer orders with shipping and payment details
- `order_items` - Individual items within orders

2. Security
- RLS enabled on all tables
- All tables allow anon + authenticated access (single-tenant, no auth required)
- Products and categories are readable by all
- Cart items, orders, and order items are publicly writable for checkout flow

3. Notes
- Session-based cart: uses session_id (generated client-side) to identify cart
- Pet types: 'dog', 'cat', or 'both' for products applicable to multiple pets
- Featured and best_seller flags for homepage display
*/

-- Categories for organizing products
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  pet_type text NOT NULL CHECK (pet_type IN ('dog', 'cat', 'both')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Products with full e-commerce details
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  price decimal(10,2) NOT NULL,
  compare_at_price decimal(10,2),
  image_url text NOT NULL,
  images text[] DEFAULT '{}',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  pet_type text NOT NULL CHECK (pet_type IN ('dog', 'cat', 'both')),
  stock integer DEFAULT 0,
  sku text,
  featured boolean DEFAULT false,
  best_seller boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Customer reviews
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text,
  verified_purchase boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Session-based shopping cart
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(session_id, product_id)
);

-- Customer orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  session_id text NOT NULL,
  email text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  address text NOT NULL,
  apartment text,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  phone text,
  subtotal decimal(10,2) NOT NULL,
  shipping decimal(10,2) NOT NULL DEFAULT 0,
  total decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Order line items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  product_image text,
  price decimal(10,2) NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Categories policies (read-only for all)
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

-- Products policies (read-only for all)
DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Reviews policies (read for all, insert for all)
DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Cart items policies (session-based access)
DROP POLICY IF EXISTS "anon_select_cart" ON cart_items;
CREATE POLICY "anon_select_cart" ON cart_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_cart" ON cart_items;
CREATE POLICY "anon_insert_cart" ON cart_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_cart" ON cart_items;
CREATE POLICY "anon_update_cart" ON cart_items FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_cart" ON cart_items;
CREATE POLICY "anon_delete_cart" ON cart_items FOR DELETE
  TO anon, authenticated USING (true);

-- Orders policies
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Order items policies
DROP POLICY IF EXISTS "anon_select_order_items" ON order_items;
CREATE POLICY "anon_select_order_items" ON order_items FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_order_items" ON order_items;
CREATE POLICY "anon_insert_order_items" ON order_items FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_pet_type ON products(pet_type);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(best_seller) WHERE best_seller = true;
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(session_id);