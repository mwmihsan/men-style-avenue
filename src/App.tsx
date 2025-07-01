
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Orders = lazy(() => import("./pages/Orders"));
const OrderView = lazy(() => import("./pages/OrderView"));
const Cart = lazy(() => import("./pages/Cart"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/orders" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Orders />
                </Suspense>
              } />
              <Route path="/order/:id" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <OrderView />
                </Suspense>
              } />
              <Route path="/cart" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              } />
              <Route path="/admin-login" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdminLogin />
                </Suspense>
              } />
              <Route path="/admin-access-4men" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Admin />
                </Suspense>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
