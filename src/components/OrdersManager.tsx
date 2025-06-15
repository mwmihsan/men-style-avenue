import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OrdersHeader from './OrdersManager/OrdersHeader';
import OrdersList from './OrdersManager/OrdersList';
import OrderForm from './OrderForm';

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  products: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  notes?: string;
}

interface OrderFormData {
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

const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('4men_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Sample data for demonstration
      const sampleOrders: Order[] = [
        {
          id: 'ORD-001',
          customerName: 'Ahmed Hassan',
          customerPhone: '+94 77 123 4567',
          customerAddress: 'No. 123, Main Street, Colombo 07',
          products: 'Classic White Dress Shirt (L), Navy Polo Shirt (M)',
          totalAmount: 9200,
          status: 'confirmed',
          orderDate: '2024-06-14',
          notes: 'Customer requested express delivery'
        },
        {
          id: 'ORD-002',
          customerName: 'Kamal Silva',
          customerPhone: '+94 71 987 6543',
          customerAddress: 'No. 456, Lake Road, Kandy',
          products: 'Denim Jeans (32), Cotton T-Shirt (L)',
          totalAmount: 4500,
          status: 'processing',
          orderDate: '2024-06-13'
        },
        {
          id: 'ORD-003',
          customerName: 'Nimal Perera',
          customerPhone: '+94 76 555 1234',
          customerAddress: 'No. 789, Beach Road, Galle',
          products: 'Formal Shirt (M), Dress Pants (30)',
          totalAmount: 5400,
          status: 'shipped',
          orderDate: '2024-06-12'
        }
      ];
      setOrders(sampleOrders);
      localStorage.setItem('4men_orders', JSON.stringify(sampleOrders));
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('4men_orders', JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteOrder = (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const addOrder = (orderData: OrderFormData) => {
    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.deliveryAddress,
      products: orderData.items.map(item => `${item.productName} (${item.size})`).join(', '),
      totalAmount: orderData.totalAmount,
      status: orderData.status,
      orderDate: new Date().toISOString().split('T')[0],
      notes: orderData.notes
    };
    setOrders([newOrder, ...orders]);
    setIsOrderFormOpen(false);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <OrdersHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onNewOrder={() => setIsOrderFormOpen(true)}
      />
      
      <OrdersList
        orders={filteredOrders}
        onStatusUpdate={updateOrderStatus}
        onDeleteOrder={deleteOrder}
      />

      <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
        <DialogContent className="w-[95vw] max-w-4xl h-[90vh] bg-brand-gray border-brand-gold/20 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-playfair">Create New Order</DialogTitle>
          </DialogHeader>
          <OrderForm onSubmit={addOrder} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManager;
