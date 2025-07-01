
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  category: string;
  selectedSize?: string;
  onSizeSelect: (size: string) => void;
  onAddToCart: () => void;
  onViewDetails: () => void;
  formatPrice: (price?: string) => string;
}

const ProductCard = ({
  product,
  category,
  selectedSize,
  onSizeSelect,
  onAddToCart,
  onViewDetails,
  formatPrice
}: ProductCardProps) => {
  return (
    <Card className="bg-brand-dark border-brand-gold/20 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-t-lg"
        />
      </div>
      <CardContent className="p-2 md:p-4">
        <h4 className="text-white font-medium mb-2 text-xs md:text-sm line-clamp-2">{product.name}</h4>
        <p className="text-brand-gold text-xs md:text-sm mb-2 font-semibold">{formatPrice(product.price)}</p>
        
        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <p className="text-gray-400 text-xs mb-1">Select size:</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <Badge 
                  key={size} 
                  variant="outline" 
                  className={`text-xs cursor-pointer transition-colors ${
                    selectedSize === size
                      ? 'bg-brand-gold text-brand-dark border-brand-gold'
                      : 'border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10'
                  }`}
                  onClick={() => onSizeSelect(size)}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-1.5 md:space-y-2">
          <Button 
            onClick={onAddToCart}
            className="w-full bg-brand-gold text-brand-dark hover:bg-brand-gold/90 transition-colors text-xs md:text-sm py-1.5 md:py-2"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            {product.price ? 'Add to Cart' : 'Inquire'}
          </Button>
          <Button 
            onClick={onViewDetails}
            variant="outline"
            className="w-full border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 text-xs md:text-sm py-1.5 md:py-2"
          >
            <Eye className="w-3 h-3 mr-1" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
