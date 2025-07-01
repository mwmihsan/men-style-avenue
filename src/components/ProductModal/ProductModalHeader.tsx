
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Ruler } from 'lucide-react';

interface ProductModalHeaderProps {
  category: string;
  showSizeGuide: boolean;
  onSizeGuideOpen: () => void;
  onClose: () => void;
}

const ProductModalHeader = ({
  category,
  showSizeGuide,
  onSizeGuideOpen,
  onClose
}: ProductModalHeaderProps) => {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl md:text-2xl font-playfair font-bold text-white flex items-center justify-between">
        {category}
        <div className="flex items-center gap-2">
          {showSizeGuide && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSizeGuideOpen}
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
  );
};

export default ProductModalHeader;
