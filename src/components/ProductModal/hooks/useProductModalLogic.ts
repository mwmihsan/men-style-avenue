
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  sizes?: string[];
}

export const useProductModalLogic = (category: string) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price?: string) => {
    return price || 'Contact for Price';
  };

  const handleProductView = (product: Product, onClose: () => void) => {
    addToRecentlyViewed({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: category
    });

    navigate(`/product/${product.id}`);
    onClose();
  };

  const handleAddToCart = (product: Product) => {
    if (!product.price) {
      const message = `Hello! I'm interested in this ${category} item: ${product.name}. Could you please provide pricing information?`;
      window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }

    addToRecentlyViewed({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: category
    });

    const selectedSize = selectedSizes[product.id];
    
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: category,
      selectedSize: selectedSize
    });
  };

  const handleSizeSelect = (productId: string, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: prev[productId] === size ? '' : size
    }));
  };

  const handleCategoryInquiry = () => {
    const message = `Hello! I'm interested in your ${category} collection. Could you please share more details about available items, sizes, colors, and pricing?`;
    window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
  };

  return {
    selectedSizes,
    formatPrice,
    handleProductView,
    handleAddToCart,
    handleSizeSelect,
    handleCategoryInquiry
  };
};
