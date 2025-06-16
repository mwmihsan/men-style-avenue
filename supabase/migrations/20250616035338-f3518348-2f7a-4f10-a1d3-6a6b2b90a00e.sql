
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  description TEXT,
  is_out_of_stock BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  has_offer BOOLEAN DEFAULT FALSE,
  offer_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert sample products
INSERT INTO public.products (name, category, image, price_min, price_max, description, is_new_arrival, has_offer, offer_text) VALUES
('Classic White Dress Shirt', 'Long-Sleeved Shirts', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', 2500, 4500, 'Premium cotton dress shirt perfect for formal occasions', true, false, null),
('Navy Polo Shirt', 'Collar T-Shirts', 'https://images.unsplash.com/photo-1583743814966-8936f37f6c8c?auto=format&fit=crop&w=600&q=80', 1500, 2800, 'Comfortable polo shirt for casual wear', false, true, '20% OFF'),
('Denim Jeans', 'Denim Trousers', 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80', 3000, 5500, 'Classic denim jeans with modern fit', false, false, null),
('Cotton T-Shirt', 'Round Neck T-Shirts', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80', 800, 1800, 'Soft cotton t-shirt for everyday comfort', false, false, null);

-- Insert sample orders
INSERT INTO public.orders (order_number, customer_name, customer_phone, customer_email, customer_address, total_amount, status, payment_method, notes) VALUES
('ORD-001', 'Ahmed Hassan', '+94 77 123 4567', 'ahmed@email.com', 'No. 123, Main Street, Colombo 07', 9200, 'confirmed', 'Cash on Delivery', 'Customer requested express delivery'),
('ORD-002', 'Kamal Silva', '+94 71 987 6543', 'kamal@email.com', 'No. 456, Lake Road, Kandy', 4500, 'processing', 'Bank Transfer', null),
('ORD-003', 'Nimal Perera', '+94 76 555 1234', 'nimal@email.com', 'No. 789, Beach Road, Galle', 5400, 'shipped', 'Mobile Payment', null);

-- Insert sample order items
INSERT INTO public.order_items (order_id, product_name, size, quantity, price) VALUES
((SELECT id FROM public.orders WHERE order_number = 'ORD-001'), 'Classic White Dress Shirt', 'L', 2, 3500),
((SELECT id FROM public.orders WHERE order_number = 'ORD-001'), 'Navy Polo Shirt', 'M', 1, 2200),
((SELECT id FROM public.orders WHERE order_number = 'ORD-002'), 'Denim Jeans', '32', 1, 4500),
((SELECT id FROM public.orders WHERE order_number = 'ORD-003'), 'Cotton T-Shirt', 'L', 3, 1800);

-- Enable Row Level Security (RLS) - but allow all operations for now since this is admin-only
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations (since this is admin-only)
CREATE POLICY "Allow all operations on products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on order_items" ON public.order_items FOR ALL USING (true) WITH CHECK (true);
