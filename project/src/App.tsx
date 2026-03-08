import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';

// Lazy load pages to reduce bundle size
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Policies = lazy(() => import('./pages/Policies'));
const Payment = lazy(() => import('./pages/Payment'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'));

const LoadingFallback = () => (
  <div className="h-1 bg-orange-500 animate-pulse w-full fixed top-0 z-[60]" />
);

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-[#FADCE6]">
              <Toaster position="top-right" />
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/*" element={<MainLayout />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute adminOnly>
                        <AdminPanel />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

const MainLayout = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment/:orderId" element={<Payment />} />
      <Route path="/about" element={<About />} />
      <Route path="/policies" element={<Policies />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Footer />
  </>
);

export default App;