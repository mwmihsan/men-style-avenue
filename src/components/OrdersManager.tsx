
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Search, Eye, Edit, Trash2 } from 'lucide-react';

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

const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-playfair font-bold text-white">Order Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-brand-dark border-brand-gold/20 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-brand-dark border-brand-gold/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.length === 0 ? (
          <Card className="bg-brand-gray border-brand-gold/20">
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="bg-brand-gray border-brand-gold/20">
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-gray-300 space-y-1">
                      <p><strong>Customer:</strong> {order.customerName}</p>
                      <p><strong>Phone:</strong> {order.customerPhone}</p>
                      <p><strong>Address:</strong> {order.customerAddress}</p>
                      <p><strong>Products:</strong> {order.products}</p>
                      <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                      {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
                    </div>
                  </div>
                  
                  <div className="lg:w-64 space-y-3">
                    <div className="text-right">
                      <p className="text-brand-gold font-bold text-lg">
                        Rs. {order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="bg-brand-dark border-brand-gold/20 text-white">
                          <SelectValue />
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
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-brand-gold/20 text-white hover:bg-brand-gold/10"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteOrder(order.id)}
                          className="px-3"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
