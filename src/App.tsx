import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingWAButton';
import Home from './pages/Home';
import BrandStory from './pages/BrandStory';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ShippingInfoPage from './pages/ShippingInfoPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './pages/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

          {/* Customer Routes */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/brandstory" element={<BrandStory />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/reset" element={<ForgetPasswordPage />} />
                  <Route path="/refundpolicy" element={<RefundPolicyPage />} />
                  <Route path="/shippinginfo" element={<ShippingInfoPage />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;