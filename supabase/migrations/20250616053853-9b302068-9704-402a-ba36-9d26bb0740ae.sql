
-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- Create RLS policies for the storage bucket to allow public access
CREATE POLICY "Allow public uploads to product-images bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Allow public access to product-images bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow public updates to product-images bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images');

CREATE POLICY "Allow public deletes from product-images bucket" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images');
