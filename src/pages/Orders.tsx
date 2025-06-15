
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Edit, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import OrderDetails from '@/components/OrderDetails';
import OrderForm from '@/components/OrderForm';

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
      customerPhone: '+92 300 1234567',
      customerEmail: 'ahmed@email.com',
      items: [
        { productName: 'Classic White Dress Shirt', size: 'L', quantity: 2, price: 3500 },
        { productName: 'Navy Polo Shirt', size: 'M', quantity: 1, price: 2200 }
      ],
      totalAmount: 9200,
      status: 'confirmed',
      orderDate: '2024-06-14',
      deliveryAddress: 'Main Market, Lahore',
      paymentMethod: 'Cash on Delivery'
    },
    {
      id: 'ORD-002',
      customerName: 'Ali Khan',
      customerPhone: '+92 301 9876543',
      customerEmail: 'ali@email.com',
      items: [
        { productName: 'Denim Trousers', size: '32', quantity: 1, price: 4500 }
      ],
      totalAmount: 4500,
      status: 'processing',
      orderDate: '2024-06-13',
      deliveryAddress: 'Model Town, Karachi',
      paymentMethod: 'Bank Transfer'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-orange-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
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
    <div className="min-h-screen bg-brand-dark p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-white">Order Management</h1>
          <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gold">
                <Package className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-brand-gray border-brand-gold/20">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Order</DialogTitle>
              </DialogHeader>
              <OrderForm onSubmit={addOrder} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by customer name, order ID, or phone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-brand-gray border-brand-gold/20 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-brand-gray border-brand-gold/20 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="bg-brand-gray border-brand-gold/20">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-lg">{order.id}</CardTitle>
                    <p className="text-gray-300 text-sm">{order.customerName}</p>
                    <p className="text-gray-400 text-xs">{order.customerPhone}</p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-300 text-sm">
                    <span className="font-medium">Items:</span> {order.items.length}
                  </p>
                  <p className="text-brand-gold font-semibold">
                    Total: Rs. {order.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-xs">
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-brand-gray border-brand-gold/20">
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
                    <SelectTrigger className="w-24 h-8 text-xs">
                      <Edit className="w-3 h-3" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg mb-2">No orders found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
