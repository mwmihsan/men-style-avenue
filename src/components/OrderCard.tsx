
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Package, Phone, MapPin, Calendar, CreditCard, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleViewOrder = () => {
    navigate(`/order/${order.id}`);
  };

  return (
    <Card className="bg-brand-gray border-brand-gold/20 overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-brand-gold" />
              <h3 className="font-semibold text-white">Order #{order.id.slice(-8)}</h3>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-white w-fit`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>{order.customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="bg-brand-dark rounded-lg p-3">
            <h4 className="text-white font-medium mb-2">Items ({order.items.length})</h4>
            <div className="space-y-1">
              {order.items.slice(0, 2).map((item, index) => (
                <div key={index} className="flex justify-between text-sm text-gray-300">
                  <span>{item.productName} ({item.size}) x{item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              {order.items.length > 2 && (
                <p className="text-xs text-gray-400">+{order.items.length - 2} more items</p>
              )}
            </div>
          </div>

          {/* Total and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-brand-gold font-bold text-lg">
              Total: Rs. {order.totalAmount.toLocaleString()}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleViewOrder}
                className="border-brand-gold/20 text-white hover:bg-brand-gold/10"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Order
              </Button>
              
              <Select 
                value={order.status} 
                onValueChange={(value) => onStatusUpdate(order.id, value as Order['status'])}
              >
                <SelectTrigger className="w-32 bg-brand-dark border-brand-gold/20 text-white text-xs">
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
            </div>
          </div>

          {/* Additional Info */}
          {(order.deliveryAddress || order.paymentMethod || order.notes) && (
            <div className="pt-3 border-t border-gray-600 space-y-2 text-sm">
              {order.deliveryAddress && (
                <div className="flex items-start gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-brand-gold mt-0.5" />
                  <span className="flex-1">{order.deliveryAddress}</span>
                </div>
              )}
              {order.paymentMethod && (
                <div className="flex items-center gap-2 text-gray-300">
                  <CreditCard className="w-4 h-4 text-brand-gold" />
                  <span>{order.paymentMethod}</span>
                </div>
              )}
              {order.notes && (
                <div className="flex items-start gap-2 text-gray-300">
                  <FileText className="w-4 h-4 text-brand-gold mt-0.5" />
                  <span className="flex-1">{order.notes}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
