
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Ruler } from 'lucide-react';
import { useState } from 'react';
import SizeGuide from './SizeGuide';

interface Product {
  id: string;
  name: string;
  image: string;
  price?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  products: Product[];
}

const ProductModal = ({ isOpen, onClose, category, products }: ProductModalProps) => {
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const handleProductSelect = (product: Product) => {
    const message = `Hello! I'm interested in this ${category} item:

Product: ${product.name}
${product.price ? `Price Range: ${product.price}` : ''}

Could you please provide more details about availability, sizes, colors, and pricing?`;
    
    window.open(`https://wa.me/94778117375?text=${encodeURIComponent(message)}`, '_blank');
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
            <DialogTitle className="text-2xl font-playfair font-bold text-white flex items-center justify-between">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {products.map((product) => (
              <Card key={product.id} className="bg-brand-dark border-brand-gold/20 overflow-hidden group cursor-pointer hover:border-brand-gold/40 transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="text-white font-medium mb-2">{product.name}</h4>
                  {product.price && (
                    <p className="text-brand-gold text-sm mb-3">{product.price}</p>
                  )}
                  <Button 
                    onClick={() => handleProductSelect(product)}
                    className="w-full bg-brand-gold text-brand-dark hover:bg-brand-gold/90 transition-colors text-sm"
                  >
                    Inquire via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 text-center border-t border-brand-gold/20 pt-6">
            <Button 
              onClick={handleCategoryInquiry}
              className="btn-gold px-8 py-3"
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
