
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import OrderCard from '@/components/OrderCard';
import EmptyOrdersState from '@/components/EmptyOrdersState';
import { useOrders } from '@/hooks/useOrders';

const Orders = () => {
  const { orders, loading } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.order_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Convert orders to the format expected by OrderCard
  const formattedOrders = filteredOrders.map(order => ({
    id: order.id,
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    customerEmail: order.customer_email,
    items: order.items,
    totalAmount: order.total_amount,
    status: order.status,
    orderDate: order.created_at.split('T')[0],
    deliveryAddress: order.customer_address,
    paymentMethod: order.payment_method || '',
    notes: order.notes
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-gold"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header />
      
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">
            Track Your Orders
          </h1>
          <p className="text-gray-400 text-sm">
            View and track all your orders in one place
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="bg-brand-gray border-brand-gold/20 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by order number or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-brand-dark border-brand-gold/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-4 h-4" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-brand-dark border-brand-gold/20 text-white">
                    <SelectValue />
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {formattedOrders.length === 0 ? (
          <EmptyOrdersState onClearFilters={handleClearFilters} />
        ) : (
          <div className="grid gap-6">
            {formattedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onStatusUpdate={() => {}} // Customer view - no status update
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
