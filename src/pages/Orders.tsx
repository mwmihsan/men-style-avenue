
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Plus, Package, Truck, CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import OrderDetails from '@/components/OrderDetails';
import OrderForm from '@/components/OrderForm';
import Header from '@/components/Header';

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

interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'confirmed': return <CheckCircle className="w-3 h-3" />;
      case 'processing': return <Package className="w-3 h-3" />;
      case 'shipped': return <Truck className="w-3 h-3" />;
      case 'delivered': return <CheckCircle className="w-3 h-3" />;
      case 'cancelled': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'confirmed': return 'bg-blue-500 hover:bg-blue-600';
      case 'processing': return 'bg-orange-500 hover:bg-orange-600';
      case 'shipped': return 'bg-purple-500 hover:bg-purple-600';
      case 'delivered': return 'bg-green-500 hover:bg-green-600';
      case 'cancelled': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

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

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header />
      
      <div className="px-4 py-6">
        {/* Mobile Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">Orders</h1>
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
                <DialogTitle className="text-white">Create New Order</DialogTitle>
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
          <Card className="bg-brand-gray border-brand-gold/20 mb-6">
            <CardContent className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-brand-dark border-brand-gold/20 text-white placeholder:text-gray-500 h-12"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-brand-dark border-brand-gold/20 text-white h-12">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-brand-gray border-brand-gold/20">
                  <SelectItem value="all" className="text-white">All Orders</SelectItem>
                  <SelectItem value="pending" className="text-white">Pending</SelectItem>
                  <SelectItem value="confirmed" className="text-white">Confirmed</SelectItem>
                  <SelectItem value="processing" className="text-white">Processing</SelectItem>
                  <SelectItem value="shipped" className="text-white">Shipped</SelectItem>
                  <SelectItem value="delivered" className="text-white">Delivered</SelectItem>
                  <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Mobile Order Cards */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-brand-gray border-brand-gold/20 shadow-lg">
              <CardContent className="p-4">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{order.id}</h3>
                    <p className="text-gray-300 font-medium">{order.customerName}</p>
                    <p className="text-gray-400 text-sm">{order.customerPhone}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white text-xs px-2 py-1`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </Badge>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-gray-400">Items</p>
                    <p className="text-white font-medium">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total</p>
                    <p className="text-brand-gold font-bold">Rs. {order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Date</p>
                    <p className="text-white">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Payment</p>
                    <p className="text-white text-xs">{order.paymentMethod}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1 h-10 border-brand-gold/20 text-white hover:bg-brand-gold/10"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-2xl h-[90vh] bg-brand-gray border-brand-gold/20 overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-white">Order Details - {order.id}</DialogTitle>
                      </DialogHeader>
                      {selectedOrder && (
                        <OrderDetails 
                          order={selectedOrder} 
                          onStatusUpdate={updateOrderStatus}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Select 
                    value={order.status} 
                    onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                  >
                    <SelectTrigger className="w-20 h-10 text-xs border-brand-gold/20 bg-brand-dark text-white">
                      <span className="sr-only">Change status</span>
                      <Package className="w-4 h-4" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-gray border-brand-gold/20">
                      <SelectItem value="pending" className="text-white">Pending</SelectItem>
                      <SelectItem value="confirmed" className="text-white">Confirmed</SelectItem>
                      <SelectItem value="processing" className="text-white">Processing</SelectItem>
                      <SelectItem value="shipped" className="text-white">Shipped</SelectItem>
                      <SelectItem value="delivered" className="text-white">Delivered</SelectItem>
                      <SelectItem value="cancelled" className="text-white">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg mb-2">No orders found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => setShowFilters(false)}
              variant="outline"
              className="border-brand-gold/20 text-white hover:bg-brand-gold/10"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
