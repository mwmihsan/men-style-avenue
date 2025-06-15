
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

interface EmptyOrdersStateProps {
  onClearFilters: () => void;
}

const EmptyOrdersState = ({ onClearFilters }: EmptyOrdersStateProps) => {
  return (
    <div className="text-center py-12">
      <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-white text-lg mb-2">No orders found</h3>
      <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
      <Button 
        onClick={onClearFilters}
        variant="outline"
        className="border-brand-gold/20 text-white hover:bg-brand-gold/10"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default EmptyOrdersState;
