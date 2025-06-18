
-- Add sizes column to products table
ALTER TABLE public.products ADD COLUMN sizes TEXT[] DEFAULT '{}';

-- Update existing products with some default sizes based on category
UPDATE public.products 
SET sizes = CASE 
  WHEN category IN ('Long-Sleeved Shirts', 'Short-Sleeved Shirts', 'Collar T-Shirts', 'Round Neck T-Shirts', 'Long-Sleeved T-Shirts') 
  THEN ARRAY['S', 'M', 'L', 'XL']
  WHEN category IN ('Denim Trousers', 'Pants & Trousers') 
  THEN ARRAY['28', '30', '32', '34', '36', '38']
  ELSE ARRAY['One Size']
END;
