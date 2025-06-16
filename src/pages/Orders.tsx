
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Filter, Loader2 } from 'lucide-react';
import OrderCard from '@/components/OrderCard';
import OrderFilters from '@/components/OrderFilters';
import EmptyOrdersState from '@/components/EmptyOrdersState';
import OrderForm from '@/components/OrderForm';
import Header from '@/components/Header';
import { useOrders, Order, OrderFormData } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';

const Orders = () => {
  const { orders, loading, addOrder, updateOrderStatus } = useOrders();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      toast({
        title: "Success",
        description: "Order status updated successfully"
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const handleAddOrder = async (orderData: OrderFormData) => {
    const success = await addOrder(orderData);
    if (success) {
      toast({
        title: "Success",
        description: "Order created successfully"
      });
      setIsOrderFormOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive"
      });
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer_phone.includes(searchTerm);
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
    paymentMethod: order.payment_method,
    notes: order.notes
  }));

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
        </div>
      </div>
    );
  }

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
              <OrderForm onSubmit={handleAddOrder} />
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
          {formattedOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleUpdateOrderStatus}
            />
          ))}
        </div>

        {/* Empty State */}
        {formattedOrders.length === 0 && (
          <EmptyOrdersState onClearFilters={clearFilters} />
        )}
      </div>
    </div>
  );
};

export default Orders;
