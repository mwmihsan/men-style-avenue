
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Package, Phone, Mail, MapPin, CreditCard, Clock, CheckCircle, Truck, AlertCircle, User } from 'lucide-react';

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
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="space-y-6 p-1">
        {/* Order Header */}
        <Card className="bg-brand-dark border-brand-gold/20">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{order.id}</h3>
                <p className="text-gray-300 text-sm">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Badge className={`${getStatusColor(order.status)} text-white self-start`}>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize font-medium">{order.status}</span>
                  </div>
                </Badge>
                <Select 
                  value={order.status} 
                  onValueChange={(value) => onStatusUpdate(order.id, value as Order['status'])}
                >
                  <SelectTrigger className="w-full sm:w-40 bg-brand-gray border-brand-gold/20 text-white h-10">
                    <SelectValue />
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
            </div>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="bg-brand-dark border-brand-gold/20">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-brand-gold" />
              Customer Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <span className="font-medium text-white">{order.customerName}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
                <span className="break-all">{order.customerEmail}</span>
              </div>
              <div className="flex items-start text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0 mt-1" />
                <span>{order.deliveryAddress}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CreditCard className="w-4 h-4 mr-3 text-brand-gold flex-shrink-0" />
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="bg-brand-dark border-brand-gold/20">
          <CardContent className="p-4">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-brand-gold" />
              Order Items
            </h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <Card key={index} className="bg-brand-gray/50 border-brand-gold/10">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="text-white font-medium mb-1">{item.productName}</h5>
                        <p className="text-gray-300 text-sm">Size: {item.size} • Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right ml-3">
                        <p className="text-brand-gold font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">Rs. {item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Total */}
        <Card className="bg-brand-dark border-brand-gold/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-lg">Total Amount:</span>
              <span className="text-brand-gold font-bold text-2xl">Rs. {order.totalAmount.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {order.notes && (
          <Card className="bg-brand-dark border-brand-gold/20">
            <CardContent className="p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Additional Notes</h4>
              <p className="text-gray-300 bg-brand-gray/50 p-3 rounded-lg leading-relaxed">{order.notes}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
