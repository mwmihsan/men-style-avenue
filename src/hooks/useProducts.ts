
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  description?: string;
  isOutOfStock: boolean;
  isNewArrival: boolean;
  hasOffer: boolean;
  offerText?: string;
}

export interface ProductFormData {
  name: string;
  category: string;
  image: string;
  price: string;
  description?: string;
  isOutOfStock: boolean;
  isNewArrival: boolean;
  hasOffer: boolean;
  offerText?: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedProducts = data.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image || 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
        price: `Rs. ${Math.round((product.price_min + product.price_max) / 2).toLocaleString()}`,
        description: product.description,
        isOutOfStock: product.is_out_of_stock,
        isNewArrival: product.is_new_arrival,
        hasOffer: product.has_offer,
        offerText: product.offer_text
      }));

      setProducts(formattedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData: ProductFormData) => {
    try {
      // Parse single price to create range (±20% for flexibility)
      const priceMatch = productData.price.match(/Rs\.\s*(\d{1,3}(?:,\d{3})*)/);
      const basePrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
      const priceMin = Math.round(basePrice * 0.8); // 20% below
      const priceMax = Math.round(basePrice * 1.2); // 20% above

      const { error } = await supabase
        .from('products')
        .insert({
          name: productData.name,
          category: productData.category,
          image: productData.image,
          price_min: priceMin,
          price_max: priceMax,
          description: productData.description,
          is_out_of_stock: productData.isOutOfStock,
          is_new_arrival: productData.isNewArrival,
          has_offer: productData.hasOffer,
          offer_text: productData.offerText
        });

      if (error) throw error;

      await fetchProducts();
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const updateProduct = async (productId: string, productData: ProductFormData) => {
    try {
      // Parse single price to create range (±20% for flexibility)
      const priceMatch = productData.price.match(/Rs\.\s*(\d{1,3}(?:,\d{3})*)/);
      const basePrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
      const priceMin = Math.round(basePrice * 0.8); // 20% below
      const priceMax = Math.round(basePrice * 1.2); // 20% above

      const { error } = await supabase
        .from('products')
        .update({
          name: productData.name,
          category: productData.category,
          image: productData.image,
          price_min: priceMin,
          price_max: priceMax,
          description: productData.description,
          is_out_of_stock: productData.isOutOfStock,
          is_new_arrival: productData.isNewArrival,
          has_offer: productData.hasOffer,
          offer_text: productData.offerText
        })
        .eq('id', productId);

      if (error) throw error;

      await fetchProducts();
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      setProducts(products.filter(product => product.id !== productId));
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
};
