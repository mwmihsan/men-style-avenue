
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Package, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import OrderDetails from '@/components/OrderDetails';

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

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: Order['status']) => void;
}

const OrderCard = ({ order, onStatusUpdate }: OrderCardProps) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  return (
    <Card className="bg-brand-gray border-brand-gold/20 shadow-lg">
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
                  onStatusUpdate={onStatusUpdate}
                />
              )}
            </DialogContent>
          </Dialog>
          
          <Select 
            value={order.status} 
            onValueChange={(value) => onStatusUpdate(order.id, value as Order['status'])}
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
  );
};

export default OrderCard;
