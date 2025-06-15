
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderSummarySectionProps {
  items: OrderItem[];
  notes: string;
  onNotesUpdate: (notes: string) => void;
  onSubmit: () => void;
}

const OrderSummarySection = ({ items, notes, onNotesUpdate, onSubmit }: OrderSummarySectionProps) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <Card className="bg-brand-dark border-brand-gold/20">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-lg">Order Summary</CardTitle>
          <div className="text-xl font-bold text-brand-gold">
            Rs. {calculateTotal().toLocaleString()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-white text-sm">Additional Notes</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => onNotesUpdate(e.target.value)}
            className="bg-brand-gray border-brand-gold/20 text-white min-h-[60px]"
            placeholder="Special instructions or notes..."
          />
        </div>

        <Button type="submit" onClick={onSubmit} className="btn-gold w-full h-12 text-lg font-semibold">
          Create Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderSummarySection;
