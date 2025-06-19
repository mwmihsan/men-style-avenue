
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleSendWhatsApp = () => {
    if (items.length === 0) {
      return;
    }

    const itemsList = items.map(item => 
      `• ${item.name}${item.selectedSize ? ` (Size: ${item.selectedSize})` : ''} - Qty: ${item.quantity} - ${item.price} each`
    ).join('\n');

    const totalAmount = getTotalPrice();
    
    const message = `🛒 New Order Request

${customerName ? `Customer: ${customerName}\n` : ''}${customerPhone ? `Phone: ${customerPhone}\n` : ''}
📦 Items:
${itemsList}

💰 Total Amount: Rs. ${totalAmount.toLocaleString()}

${notes ? `📝 Notes: ${notes}\n` : ''}
Please confirm availability and provide delivery details.`;

    const whatsappUrl = `https://wa.me/94778117375?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-dark">
        <Header />
        <div className="px-4 py-6 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Card className="bg-brand-gray border-brand-gold/20 p-8 mx-auto max-w-md">
              <CardContent className="p-0">
                <ShoppingCart className="w-16 h-16 text-brand-gold mx-auto mb-4" />
                <h3 className="text-xl font-playfair font-bold text-white mb-4">
                  Your Cart is Empty
                </h3>
                <p className="text-gray-300 mb-6">
                  Browse our products and add items to your cart.
                </p>
                <Button 
                  onClick={() => navigate('/#products')}
                  className="btn-gold"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Header />
      
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-400 text-sm">
            Review your items and complete your order
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.selectedSize || 'no-size'}`} className="bg-brand-gray border-brand-gold/20">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1 truncate">{item.name}</h3>
                      <p className="text-brand-gold text-sm mb-1">{item.category}</p>
                      {item.selectedSize && (
                        <p className="text-gray-400 text-sm mb-2">Size: {item.selectedSize}</p>
                      )}
                      <p className="text-brand-gold font-semibold">{item.price}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(`${item.id}-${item.selectedSize || 'no-size'}`)}
                        className="text-red-400 hover:bg-red-400/20 h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(`${item.id}-${item.selectedSize || 'no-size'}`, item.quantity - 1)}
                          className="h-8 w-8 border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="text-white font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(`${item.id}-${item.selectedSize || 'no-size'}`, item.quantity + 1)}
                          className="h-8 w-8 border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-red-400/40 text-red-400 hover:bg-red-400/10"
              >
                Clear Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/#products')}
                className="border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
              >
                Continue Shopping
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-brand-gray border-brand-gold/20 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Customer Name (Optional)</label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name"
                    className="bg-brand-dark border-brand-gold/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Phone Number (Optional)</label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Your phone number"
                    className="bg-brand-dark border-brand-gold/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300 text-sm">Notes (Optional)</label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special requests, delivery instructions, etc."
                    className="bg-brand-dark border-brand-gold/20 text-white resize-none"
                    rows={3}
                  />
                </div>

                <div className="border-t border-brand-gold/20 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Items ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span className="text-white">Rs. {getTotalPrice().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-brand-gold">Rs. {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSendWhatsApp}
                  className="w-full btn-gold"
                  disabled={items.length === 0}
                >
                  Send Order via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
