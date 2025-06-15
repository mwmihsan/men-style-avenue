
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className="bg-brand-dark border-brand-gold/20">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-4">Customer Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customerName" className="text-white">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="bg-brand-gray border-brand-gold/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerPhone" className="text-white">Phone Number *</Label>
              <Input
                id="customerPhone"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                className="bg-brand-gray border-brand-gold/20 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail" className="text-white">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="bg-brand-gray border-brand-gold/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="paymentMethod" className="text-white">Payment Method</Label>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="deliveryAddress" className="text-white">Delivery Address</Label>
            <Textarea
              id="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
              className="bg-brand-gray border-brand-gold/20 text-white"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="bg-brand-dark border-brand-gold/20">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Order Items</h3>
            <Button type="button" onClick={addItem} size="sm" className="btn-gold">
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </Button>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-3 p-3 bg-brand-gray/50 rounded-lg">
              <div className="col-span-4">
                <Label className="text-white text-xs">Product</Label>
                <Select 
                  value={item.productName} 
                  onValueChange={(value) => updateItem(index, 'productName', value)}
                >
                  <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white h-8">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product} value={product}>{product}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-white text-xs">Size</Label>
                <Select 
                  value={item.size} 
                  onValueChange={(value) => updateItem(index, 'size', value)}
                >
                  <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white h-8">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-white text-xs">Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                  className="bg-brand-gray border-brand-gold/20 text-white h-8"
                />
              </div>
              <div className="col-span-3">
                <Label className="text-white text-xs">Price (Rs.)</Label>
                <Input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                  className="bg-brand-gray border-brand-gold/20 text-white h-8"
                />
              </div>
              <div className="col-span-1 flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card className="bg-brand-dark border-brand-gold/20">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">Order Summary</h3>
            <div className="text-xl font-bold text-brand-gold">
              Total: Rs. {calculateTotal().toLocaleString()}
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes" className="text-white">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="bg-brand-gray border-brand-gold/20 text-white"
              rows={2}
              placeholder="Additional notes or special instructions..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="btn-gold">
          Create Order
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
