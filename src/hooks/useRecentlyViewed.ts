import { useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  category: string;
}

export const useRecentlyViewed = () => {
  const addToRecentlyViewed = (product: Product) => {
    const stored = localStorage.getItem('recentlyViewed');
    let recentProducts: Product[] = stored ? JSON.parse(stored) : [];

    // Remove if already exists
    recentProducts = recentProducts.filter(p => p.id !== product.id);

    // Add to beginning
    recentProducts.unshift(product);

    // Keep only last 12 items
    recentProducts = recentProducts.slice(0, 12);

    localStorage.setItem('recentlyViewed', JSON.stringify(recentProducts));
  };

  const getRecentlyViewed = (): Product[] => {
    const stored = localStorage.getItem('recentlyViewed');
    return stored ? JSON.parse(stored) : [];
  };

  const clearRecentlyViewed = () => {
    localStorage.removeItem('recentlyViewed');
  };

  return {
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed
  };
};
