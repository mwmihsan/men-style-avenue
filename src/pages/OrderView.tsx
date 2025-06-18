
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle, Truck, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useOrders, Order } from '@/hooks/useOrders';

const OrderView = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { orders, loading } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orders.length > 0 && orderId) {
      const foundOrder = orders.find(o => o.id === orderId);
      setOrder(foundOrder || null);
    }
  }, [orders, orderId]);

  const statusStages = [
    { key: 'pending', label: 'Order Placed', icon: Package, color: 'text-yellow-500' },
    { key: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'text-blue-500' },
    { key: 'processing', label: 'Processing', icon: Package, color: 'text-orange-500' },
    { key: 'shipped', label: 'Shipped', icon: Truck, color: 'text-purple-500' },
    { key: 'delivered', label: 'Delivered', icon: Home, color: 'text-green-500' }
  ];

  const getCurrentStageIndex = (status: string) => {
    return statusStages.findIndex(stage => stage.key === status);
  };

  const getProgressPercentage = (status: string) => {
    const currentIndex = getCurrentStageIndex(status);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / statusStages.length) * 100;
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

  if (!order) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <div className="px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
            <p className="text-gray-400 mb-6">The order you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/')} className="btn-gold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentStageIndex = getCurrentStageIndex(order.status);

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-white hover:text-brand-gold mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Order #{order.order_number}
              </h1>
              <p className="text-gray-400">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            
            <Badge className={`${getStatusColor(order.status)} text-white px-4 py-2`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>

        {/* Order Status Progress */}
        <Card className="bg-brand-gray border-brand-gold/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Progress Bar */}
            <div className="mb-6">
              <Progress 
                value={getProgressPercentage(order.status)} 
                className="h-2 bg-gray-600"
              />
            </div>
            
            {/* Status Steps */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {statusStages.map((stage, index) => {
                const isActive = index <= currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const IconComponent = stage.icon;
                
                return (
                  <div key={stage.key} className="text-center">
                    <div className={`
                      w-12 h-12 rounded-full border-2 mx-auto mb-2 flex items-center justify-center
                      ${isActive ? 'border-brand-gold bg-brand-gold/20' : 'border-gray-500'}
                      ${isCurrent ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-dark' : ''}
                    `}>
                      <IconComponent 
                        className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-gray-500'}`} 
                      />
                    </div>
                    <p className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <Card className="bg-brand-gray border-brand-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-brand-dark rounded-lg">
                    <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.productName}</h3>
                      <p className="text-sm text-gray-400">Size: {item.size}</p>
                      <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-brand-gold">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">
                        Rs. {item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-brand-gray border-brand-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>Rs. {order.total_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="border-gray-600" />
                <div className="flex justify-between text-xl font-bold text-brand-gold">
                  <span>Total</span>
                  <span>Rs. {order.total_amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="bg-brand-gray border-brand-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Customer</p>
                  <p className="text-white">{order.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{order.customer_phone}</p>
                </div>
                {order.customer_email && (
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">{order.customer_email}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-white">{order.customer_address}</p>
                </div>
                {order.payment_method && (
                  <div>
                    <p className="text-sm text-gray-400">Payment Method</p>
                    <p className="text-white">{order.payment_method}</p>
                  </div>
                )}
                {order.notes && (
                  <div>
                    <p className="text-sm text-gray-400">Notes</p>
                    <p className="text-white">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
