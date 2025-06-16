
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  productName: string;
  size: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_method: string;
  notes?: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  paymentMethod: string;
  notes?: string;
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Fetch orders with their items
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const { data: itemsData, error: itemsError } = await supabase
        .from('order_items')
        .select('*');

      if (itemsError) throw itemsError;

      // Combine orders with their items
      const ordersWithItems = ordersData.map(order => ({
        id: order.id,
        order_number: order.order_number,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_email: order.customer_email || '',
        customer_address: order.customer_address,
        total_amount: order.total_amount,
        status: order.status as Order['status'],
        payment_method: order.payment_method || '',
        notes: order.notes,
        created_at: order.created_at,
        items: itemsData
          .filter(item => item.order_id === order.id)
          .map(item => ({
            productName: item.product_name,
            size: item.size,
            quantity: item.quantity,
            price: item.price
          }))
      }));

      setOrders(ordersWithItems);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (orderData: OrderFormData) => {
    try {
      // Generate order number
      const orderCount = orders.length + 1;
      const orderNumber = `ORD-${String(orderCount).padStart(3, '0')}`;

      // Insert order
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: orderData.customerName,
          customer_phone: orderData.customerPhone,
          customer_email: orderData.customerEmail,
          customer_address: orderData.deliveryAddress,
          total_amount: orderData.totalAmount,
          status: orderData.status,
          payment_method: orderData.paymentMethod,
          notes: orderData.notes
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: orderResult.id,
        product_name: item.productName,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Refresh orders
      await fetchOrders();
      return true;
    } catch (error) {
      console.error('Error adding order:', error);
      return false;
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;

      // Update local state
      setOrders(orders.filter(order => order.id !== orderId));
      return true;
    } catch (error) {
      console.error('Error deleting order:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    refetch: fetchOrders
  };
};
