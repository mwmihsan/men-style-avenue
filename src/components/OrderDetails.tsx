
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Package, Phone, Mail, MapPin, CreditCard, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

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

interface OrderDetailsProps {
  order: Order;
  onStatusUpdate: (orderId: string, newStatus: Order['status']) => void;
}

const OrderDetails = ({ order, onStatusUpdate }: OrderDetailsProps) => {
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

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{order.id}</h3>
          <p className="text-gray-300">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
        </div>
        <div className="text-right">
          <Badge className={`${getStatusColor(order.status)} text-white mb-2`}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {order.status.toUpperCase()}
            </div>
          </Badge>
          <div>
            <Select 
              value={order.status} 
              onValueChange={(value) => onStatusUpdate(order.id, value as Order['status'])}
            >
              <SelectTrigger className="w-40 bg-brand-dark border-brand-gold/20 text-white">
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
      </div>

      <Separator className="bg-brand-gold/20" />

      {/* Customer Information */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Package className="w-5 h-5 mr-2 text-brand-gold" />
          Customer Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-gray-300">
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-2 text-brand-gold" />
              {order.customerPhone}
            </div>
            <div className="flex items-center text-gray-300">
              <Mail className="w-4 h-4 mr-2 text-brand-gold" />
              {order.customerEmail}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-brand-gold mt-1" />
              <span>{order.deliveryAddress}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <CreditCard className="w-4 h-4 mr-2 text-brand-gold" />
              {order.paymentMethod}
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-brand-gold/20" />

      {/* Order Items */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-3">Order Items</h4>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-brand-dark/50 rounded-lg">
              <div>
                <h5 className="text-white font-medium">{item.productName}</h5>
                <p className="text-gray-300 text-sm">Size: {item.size} | Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-brand-gold font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Rs. {item.price.toLocaleString()} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-brand-gold/20" />

      {/* Order Total */}
      <div className="flex justify-between items-center text-xl">
        <span className="text-white font-semibold">Total Amount:</span>
        <span className="text-brand-gold font-bold">Rs. {order.totalAmount.toLocaleString()}</span>
      </div>

      {order.notes && (
        <>
          <Separator className="bg-brand-gold/20" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Notes</h4>
            <p className="text-gray-300 bg-brand-dark/50 p-3 rounded-lg">{order.notes}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
