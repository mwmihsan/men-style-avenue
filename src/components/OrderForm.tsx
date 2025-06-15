
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, User, Phone, Mail, MapPin, CreditCard, Package } from 'lucide-react';

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: string;
  notes?: string;
}

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    paymentMethod: '',
    notes: '',
    status: 'pending' as Order['status']
  });

  const [items, setItems] = useState<OrderItem[]>([
    { productName: '', size: '', quantity: 1, price: 0 }
  ]);

  const products = [
    'Classic White Dress Shirt',
    'Navy Polo Shirt',
    'Denim Trousers',
    'Cotton T-Shirt',
    'Formal Blazer',
    'Casual Pants',
    'Leather Belt',
    'Sports Shoes'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42'];

  const addItem = () => {
    setItems([...items, { productName: '', size: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerPhone || items.some(item => !item.productName)) {
      alert('Please fill in all required fields');
      return;
    }

    const orderData: Order = {
      ...formData,
      items: items.filter(item => item.productName),
      totalAmount: calculateTotal()
    };

    onSubmit(orderData);
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-6 p-1">
        {/* Customer Information */}
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
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="bg-brand-gray border-brand-gold/20 text-white min-h-[60px]"
                placeholder="Enter full delivery address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod" className="text-white text-sm flex items-center">
                <CreditCard className="w-4 h-4 mr-1" />
                Payment Method
              </Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
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

        {/* Order Items */}
        <Card className="bg-brand-dark border-brand-gold/20">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white text-lg flex items-center">
                <Package className="w-5 h-5 mr-2 text-brand-gold" />
                Order Items
              </CardTitle>
              <Button type="button" onClick={addItem} size="sm" className="btn-gold h-8">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <Card key={index} className="bg-brand-gray/50 border-brand-gold/10">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">Item {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-white text-sm">Product</Label>
                      <Select 
                        value={item.productName} 
                        onValueChange={(value) => updateItem(index, 'productName', value)}
                      >
                        <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white h-10 mt-1">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent className="bg-brand-gray border-brand-gold/20">
                          {products.map((product) => (
                            <SelectItem key={product} value={product} className="text-white">{product}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="text-white text-sm">Size</Label>
                        <Select 
                          value={item.size} 
                          onValueChange={(value) => updateItem(index, 'size', value)}
                        >
                          <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white h-10 mt-1">
                            <SelectValue placeholder="Size" />
                          </SelectTrigger>
                          <SelectContent className="bg-brand-gray border-brand-gold/20">
                            {sizes.map((size) => (
                              <SelectItem key={size} value={size} className="text-white">{size}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-white text-sm">Qty</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                          className="bg-brand-gray border-brand-gold/20 text-white h-10 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-white text-sm">Price (Rs.)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                          className="bg-brand-gray border-brand-gold/20 text-white h-10 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Order Summary & Notes */}
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
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-brand-gray border-brand-gold/20 text-white min-h-[60px]"
                placeholder="Special instructions or notes..."
              />
            </div>

            <Button type="submit" className="btn-gold w-full h-12 text-lg font-semibold">
              Create Order
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default OrderForm;
