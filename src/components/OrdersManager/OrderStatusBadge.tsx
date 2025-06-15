
import { Badge } from '@/components/ui/badge';

interface OrderStatusBadgeProps {
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const getStatusColor = (status: OrderStatusBadgeProps['status']) => {
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
    <Badge className={getStatusColor(status)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default OrderStatusBadge;
