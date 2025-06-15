
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Filter } from 'lucide-react';
import OrderCard from '@/components/OrderCard';
import OrderFilters from '@/components/OrderFilters';
import EmptyOrdersState from '@/components/EmptyOrdersState';
import OrderForm from '@/components/OrderForm';
import Header from '@/components/Header';

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
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryAddress: string;
  paymentMethod: string;
  notes?: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'Ahmed Hassan',
      customerPhone: '+94 77 123 4567',
      customerEmail: 'ahmed@email.com',
      items: [
        { productName: 'Classic White Dress Shirt', size: 'L', quantity: 2, price: 3500 },
        { productName: 'Navy Polo Shirt', size: 'M', quantity: 1, price: 2200 }
      ],
      totalAmount: 9200,
      status: 'confirmed',
      orderDate: '2024-06-14',
      deliveryAddress: 'No. 123, Main Street, Akurana',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-002',
      customerName: 'Kamal Silva',
      customerPhone: '+94 77 987 6543',
      customerEmail: 'kamal@email.com',
      items: [
        { productName: 'Denim Trousers', size: '32', quantity: 1, price: 4500 }
      ],
      totalAmount: 4500,
      status: 'processing',
      orderDate: '2024-06-13',
      deliveryAddress: 'No. 456, Temple Road, Kandy',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'ORD-003',
      customerName: 'Nimal Perera',
      customerPhone: '+94 77 555 1234',
      customerEmail: 'nimal@email.com',
      items: [
        { productName: 'Cotton T-Shirt', size: 'L', quantity: 3, price: 1800 }
      ],
      totalAmount: 5400,
      status: 'shipped',
      orderDate: '2024-06-12',
      deliveryAddress: 'No. 789, Lake View Road, Matale',
      paymentMethod: 'Mobile Payment'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      orderDate: new Date().toISOString().split('T')[0]
    };
    setOrders([newOrder, ...orders]);
    setIsOrderFormOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header />
      
      <div className="px-4 py-6">
        {/* Mobile Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-montserrat font-bold text-white mb-2">Orders</h1>
          <p className="text-gray-400 text-sm">Manage your customer orders</p>
        </div>

        {/* Mobile Action Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gold w-full sm:w-auto order-2 sm:order-1">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-4xl h-[90vh] bg-brand-gray border-brand-gold/20 overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white font-montserrat">Create New Order</DialogTitle>
              </DialogHeader>
              <OrderForm onSubmit={addOrder} />
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto border-brand-gold/20 text-white hover:bg-brand-gold/10 order-1 sm:order-2"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <OrderFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        {/* Mobile Order Cards */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={updateOrderStatus}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <EmptyOrdersState onClearFilters={clearFilters} />
        )}
      </div>
    </div>
  );
};

export default Orders;
