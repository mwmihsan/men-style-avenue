
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Eye, Trash2 } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

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

interface OrdersListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
}

const OrdersList = ({ orders, onStatusUpdate, onDeleteOrder }: OrdersListProps) => {
  if (orders.length === 0) {
    return (
      <Card className="bg-brand-gray border-brand-gold/20">
        <CardContent className="p-8 text-center">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-400">No orders found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {orders.map((order) => (
        <Card key={order.id} className="bg-brand-gray border-brand-gold/20">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-semibold">{order.id}</h3>
                  <OrderStatusBadge status={order.status} />
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
                    onValueChange={(value) => onStatusUpdate(order.id, value as Order['status'])}
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
                      onClick={() => onDeleteOrder(order.id)}
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
      ))}
    </div>
  );
};

export default OrdersList;
