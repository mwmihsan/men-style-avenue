
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';

interface CustomerData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  paymentMethod: string;
}

interface CustomerInfoSectionProps {
  formData: CustomerData;
  onUpdate: (data: Partial<CustomerData>) => void;
}

const CustomerInfoSection = ({ formData, onUpdate }: CustomerInfoSectionProps) => {
  return (
    <Card className="bg-brand-dark border-brand-gold/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center">
          <User className="w-5 h-5 mr-2 text-brand-gold" />
          Customer Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customerName" className="text-white text-sm">Customer Name *</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => onUpdate({ customerName: e.target.value })}
            className="bg-brand-gray border-brand-gold/20 text-white h-12"
            placeholder="Enter customer name"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customerPhone" className="text-white text-sm flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              Phone Number *
            </Label>
            <Input
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => onUpdate({ customerPhone: e.target.value })}
              className="bg-brand-gray border-brand-gold/20 text-white h-12"
              placeholder="+94 77 123 4567"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail" className="text-white text-sm flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Label>
            <Input
              id="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={(e) => onUpdate({ customerEmail: e.target.value })}
              className="bg-brand-gray border-brand-gold/20 text-white h-12"
              placeholder="customer@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryAddress" className="text-white text-sm flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Delivery Address
          </Label>
          <Textarea
            id="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={(e) => onUpdate({ deliveryAddress: e.target.value })}
            className="bg-brand-gray border-brand-gold/20 text-white min-h-[60px]"
            placeholder="Enter full delivery address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentMethod" className="text-white text-sm flex items-center">
            <CreditCard className="w-4 h-4 mr-1" />
            Payment Method
          </Label>
          <Select value={formData.paymentMethod} onValueChange={(value) => onUpdate({ paymentMethod: value })}>
            <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white h-12">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent className="bg-brand-gray border-brand-gold/20">
              <SelectItem value="cash" className="text-white">Cash on Delivery</SelectItem>
              <SelectItem value="bank" className="text-white">Bank Transfer</SelectItem>
              <SelectItem value="card" className="text-white">Credit/Debit Card</SelectItem>
              <SelectItem value="mobile" className="text-white">Mobile Payment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoSection;
