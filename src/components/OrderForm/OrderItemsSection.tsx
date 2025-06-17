
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderItemsSectionProps {
  items: OrderItem[];
  onItemsUpdate: (items: OrderItem[]) => void;
}

const OrderItemsSection = ({ items, onItemsUpdate }: OrderItemsSectionProps) => {
  const { products, loading } = useProducts();

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42'];

  const addItem = () => {
    onItemsUpdate([...items, { productName: '', size: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      onItemsUpdate(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onItemsUpdate(updatedItems);
  };

  const handleProductChange = (index: number, productName: string) => {
    const selectedProduct = products.find(p => p.name === productName);
    const updatedItems = items.map((item, i) => 
      i === index ? { 
        ...item, 
        productName,
        // Extract minimum price from the price range for default value
        price: selectedProduct ? getMinPrice(selectedProduct.price) : 0
      } : item
    );
    onItemsUpdate(updatedItems);
  };

  const getMinPrice = (priceRange: string): number => {
    // Extract numbers from price range like "Rs. 2,500 - 4,500"
    const numbers = priceRange.match(/\d{1,3}(?:,\d{3})*/g);
    if (numbers && numbers.length > 0) {
      return parseInt(numbers[0].replace(/,/g, ''));
    }
    return 0;
  };

  if (loading) {
    return (
      <Card className="bg-brand-dark border-brand-gold/20">
        <CardContent className="p-6 text-center">
          <p className="text-gray-300">Loading products...</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
                    onValueChange={(value) => handleProductChange(index, value)}
                  >
                    <SelectTrigger className="bg-brand-gray border-brand-gold/20 text-white h-10 mt-1">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-gray border-brand-gold/20">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.name} className="text-white">
                          <div className="flex flex-col">
                            <span>{product.name}</span>
                            <span className="text-xs text-brand-gold">{product.price}</span>
                          </div>
                        </SelectItem>
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
  );
};

export default OrderItemsSection;
