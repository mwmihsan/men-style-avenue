
import { Button } from '@/components/ui/button';

interface ProductModalFooterProps {
  category: string;
  onCategoryInquiry: () => void;
}

const ProductModalFooter = ({ category, onCategoryInquiry }: ProductModalFooterProps) => {
  return (
    <div className="mt-6 text-center border-t border-brand-gold/20 pt-6">
      <Button 
        onClick={onCategoryInquiry}
        className="btn-gold px-6 md:px-8 py-2 md:py-3"
      >
        Ask About Entire {category} Collection
      </Button>
    </div>
  );
};

export default ProductModalFooter;
