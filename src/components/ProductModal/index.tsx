
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Ruler } from 'lucide-react';
import { useState } from 'react';
import SizeGuide from '../SizeGuide';
import ProductModalHeader from './ProductModalHeader';
import ProductModalFooter from './ProductModalFooter';
import ProductCard from './ProductCard';
import { useProductModalLogic } from './hooks/useProductModalLogic';

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
  const {
    selectedSizes,
    formatPrice,
    handleProductView,
    handleAddToCart,
    handleSizeSelect,
    handleCategoryInquiry
  } = useProductModalLogic(category);

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
          <ProductModalHeader
            category={category}
            showSizeGuide={showSizeGuide}
            onSizeGuideOpen={() => setIsSizeGuideOpen(true)}
            onClose={onClose}
          />
          
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
              <ProductCard
                key={product.id}
                product={product}
                category={category}
                selectedSize={selectedSizes[product.id]}
                onSizeSelect={(size) => handleSizeSelect(product.id, size)}
                onAddToCart={() => handleAddToCart(product)}
                onViewDetails={() => handleProductView(product, onClose)}
                formatPrice={formatPrice}
              />
            ))}
          </div>
          
          <ProductModalFooter
            category={category}
            onCategoryInquiry={handleCategoryInquiry}
          />
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
