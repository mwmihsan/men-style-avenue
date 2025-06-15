
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Package, TrendingUp, DollarSign, Eye, Settings, BarChart3, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AdminPanel from '@/components/AdminPanel';
import OrdersManager from '@/components/OrdersManager';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAdminAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated) {
      navigate('/');
    }
  }, [isAdminAuthenticated, navigate]);

  if (!isAdminAuthenticated) {
    return null;
  }

  const stats = [
    { title: 'Total Orders', value: '247', change: '+12%', icon: Package, color: 'text-blue-400' },
    { title: 'Revenue', value: 'Rs. 1,24,500', change: '+8%', icon: DollarSign, color: 'text-green-400' },
    { title: 'Customers', value: '89', change: '+15%', icon: Users, color: 'text-purple-400' },
    { title: 'Growth', value: '+23%', change: '+5%', icon: TrendingUp, color: 'text-orange-400' }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'Ahmed Hassan', amount: 9200, status: 'confirmed', date: '2024-06-14' },
    { id: 'ORD-002', customer: 'Kamal Silva', amount: 4500, status: 'processing', date: '2024-06-13' },
    { id: 'ORD-003', customer: 'Nimal Perera', amount: 5400, status: 'shipped', date: '2024-06-12' }
  ];

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header />
      
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Mobile Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your business overview</p>
        </div>

        {/* Mobile Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('overview')}
            className={`min-w-fit px-4 py-2 text-sm ${
              activeTab === 'overview' 
                ? 'btn-gold' 
                : 'border-brand-gold/20 text-white hover:bg-brand-gold/10'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('orders')}
            className={`min-w-fit px-4 py-2 text-sm ${
              activeTab === 'orders' 
                ? 'btn-gold' 
                : 'border-brand-gold/20 text-white hover:bg-brand-gold/10'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Orders
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            onClick={() => setActiveTab('products')}
            className={`min-w-fit px-4 py-2 text-sm ${
              activeTab === 'products' 
                ? 'btn-gold' 
                : 'border-brand-gold/20 text-white hover:bg-brand-gold/10'
            }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Products
          </Button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="bg-brand-gray border-brand-gold/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <Badge variant="outline" className="text-xs border-green-500 text-green-400">
                        {stat.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                      <p className="text-gray-400 text-xs">{stat.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card className="bg-brand-gray border-brand-gold/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Package className="w-5 h-5 mr-2 text-brand-gold" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <Card key={order.id} className="bg-brand-dark border-brand-gold/10">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">{order.id}</h4>
                            <p className="text-gray-300 text-xs">{order.customer}</p>
                            <p className="text-gray-400 text-xs">{new Date(order.date).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-brand-gold font-bold text-sm">Rs. {order.amount.toLocaleString()}</p>
                            <Badge 
                              className={`text-xs mt-1 ${
                                order.status === 'confirmed' ? 'bg-blue-500' :
                                order.status === 'processing' ? 'bg-orange-500' :
                                'bg-purple-500'
                              }`}
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-brand-gold/20 text-white hover:bg-brand-gold/10"
                  onClick={() => setActiveTab('orders')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <OrdersManager />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            <AdminPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
