
import { useState } from 'react';
import CustomerInfoSection from './OrderForm/CustomerInfoSection';
import OrderItemsSection from './OrderForm/OrderItemsSection';
import OrderSummarySection from './OrderForm/OrderSummarySection';

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

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
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
        <CustomerInfoSection 
          formData={formData} 
          onUpdate={updateFormData} 
        />
        
        <OrderItemsSection 
          items={items} 
          onItemsUpdate={setItems} 
        />
        
        <OrderSummarySection 
          items={items}
          notes={formData.notes}
          onNotesUpdate={(notes) => updateFormData({ notes })}
          onSubmit={handleSubmit}
        />
      </form>
    </div>
  );
};

export default OrderForm;
