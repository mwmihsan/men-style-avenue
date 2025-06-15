
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  category: string;
}

interface RecentlyViewedProps {
  onProductSelect?: (product: Product) => void;
}

const RecentlyViewed = ({ onProductSelect }: RecentlyViewedProps) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load recently viewed products from localStorage
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentProducts(JSON.parse(stored));
    }
  }, []);

  const handleProductClick = (product: Product) => {
    const message = `Hello! I'm interested in this ${product.category} item:

Product: ${product.name}
${product.price ? `Price Range: ${product.price}` : ''}

Could you please provide more details about availability, sizes, colors, and pricing?`;
    
    window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
    
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  const clearRecentlyViewed = () => {
    localStorage.removeItem('recentlyViewed');
    setRecentProducts([]);
  };

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-brand-gold" />
            <h2 className="text-2xl font-montserrat font-bold text-white">
              Recently Viewed
            </h2>
          </div>
          <Button 
            onClick={clearRecentlyViewed}
            variant="ghost"
            className="text-gray-400 hover:text-white text-sm font-poppins"
          >
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentProducts.slice(0, 6).map((product) => (
            <Card 
              key={`recent-${product.id}`}
              className="bg-brand-dark border-brand-gold/20 overflow-hidden group cursor-pointer hover:border-brand-gold/40 transition-all"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-3">
                <h4 className="text-white text-sm font-medium mb-1 line-clamp-2 font-poppins">
                  {product.name}
                </h4>
                {product.price && (
                  <p className="text-brand-gold text-xs font-poppins">{product.price}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
