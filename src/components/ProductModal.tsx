
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Ruler, ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SizeGuide from './SizeGuide';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
  sizes?: string[];
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  products: Product[];
}

const ProductModal = ({ isOpen, onClose, category, products }: ProductModalProps) => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const { addToRecentlyViewed } = useRecentlyViewed();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Simplified price formatting function - price is already formatted from the hook
  const formatPrice = (price?: string) => {
    return price || 'Contact for Price';
  };

  const handleProductView = (product: Product) => {
    // Add to recently viewed
    addToRecentlyViewed({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: category
    });

    // Navigate to product view page
    navigate(`/product/${product.id}`);
    onClose();
  };

  const handleAddToCart = (product: Product) => {
    if (!product.price) {
      // If no price, show inquiry message or redirect to contact
      const message = `Hello! I'm interested in this ${category} item: ${product.name}. Could you please provide pricing information?`;
      window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
      return;
    }

    // Add to recently viewed
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

  // Show size guide for clothing items
  const showSizeGuide = [
    'Long-Sleeved Shirts',
    'Short-Sleeved Shirts', 
    'Collar T-Shirts',
    'Round Neck T-Shirts',
    'Long-Sleeved T-Shirts'
  ].includes(category);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-gray border-brand-gold/20">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-playfair font-bold text-white flex items-center justify-between">
              {category}
              <div className="flex items-center gap-2">
                {showSizeGuide && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-brand-gold hover:bg-brand-gold/20"
                    title="Size Guide"
                  >
                    <Ruler className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-brand-gold/20">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {showSizeGuide && (
            <div className="mb-4">
              <Button 
                onClick={() => setIsSizeGuideOpen(true)}
                variant="outline"
                className="border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
              >
                <Ruler className="h-4 w-4 mr-2" />
                View Size Guide
              </Button>
            </div>
          )}
          
          {/* Updated grid: 2 columns on mobile, 3 on larger screens with improved image display */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-4">
            {products.map((product) => (
              <Card key={product.id} className="bg-brand-dark border-brand-gold/20 overflow-hidden group">
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
                              selectedSizes[product.id] === size
                                ? 'bg-brand-gold text-brand-dark border-brand-gold'
                                : 'border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10'
                            }`}
                            onClick={() => handleSizeSelect(product.id, size)}
                          >
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-1.5 md:space-y-2">
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-brand-gold text-brand-dark hover:bg-brand-gold/90 transition-colors text-xs md:text-sm py-1.5 md:py-2"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {product.price ? 'Add to Cart' : 'Inquire'}
                    </Button>
                    <Button 
                      onClick={() => handleProductView(product)}
                      variant="outline"
                      className="w-full border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10 text-xs md:text-sm py-1.5 md:py-2"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 text-center border-t border-brand-gold/20 pt-6">
            <Button 
              onClick={handleCategoryInquiry}
              className="btn-gold px-6 md:px-8 py-2 md:py-3"
            >
              Ask About Entire {category} Collection
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SizeGuide 
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  );
};

export default ProductModal;
