
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import OrdersHeader from './OrdersManager/OrdersHeader';
import OrdersList from './OrdersManager/OrdersList';
import OrderForm from './OrderForm';
import { useOrders, Order, OrderFormData } from '@/hooks/useOrders';
import { useToast } from '@/hooks/use-toast';

const OrdersManager = () => {
  const { orders, loading, addOrder, updateOrderStatus, deleteOrder } = useOrders();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

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

  const handleDeleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const success = await deleteOrder(orderId);
      if (success) {
        toast({
          title: "Success",
          description: "Order deleted successfully"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete order",
          variant: "destructive"
        });
      }
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
                         order.order_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Convert orders to the format expected by OrdersList
  const formattedOrders = filteredOrders.map(order => ({
    id: order.id,
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    customerAddress: order.customer_address,
    products: order.items.map(item => `${item.productName} (${item.size})`).join(', '),
    totalAmount: order.total_amount,
    status: order.status,
    orderDate: order.created_at.split('T')[0],
    notes: order.notes
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      </div>
    );
  }

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
        orders={formattedOrders}
        onStatusUpdate={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
      />

      <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
        <DialogContent className="w-[95vw] max-w-4xl h-[90vh] bg-brand-gray border-brand-gold/20 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-playfair">Create New Order</DialogTitle>
          </DialogHeader>
          <OrderForm onSubmit={handleAddOrder} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersManager;
