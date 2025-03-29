import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingScreen } from './components/LoadingScreen';
import { Toast } from './components/Toast';
import { CartIcon } from './components/CartIcon';
import { LandingPage } from './pages/LandingPage';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContentCreation } from './pages/ContentCreation';
import { Marketplace } from './pages/Marketplace';
import { Library } from './pages/Library';
import { Settings } from './pages/Settings';
import { CollaborationHub } from './pages/CollaborationHub';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { PaymentFailed } from './pages/PaymentFailed';
import { NotFound } from './pages/NotFound';
import { useThemeStore } from './store/useThemeStore';

function App() {
  const theme = useThemeStore((state) => state.theme);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme}`}>
        <Navigation />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/create" element={<ContentCreation />} />
              <Route path="/library" element={<Library />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/collaborate" element={<CollaborationHub />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/failed" element={<PaymentFailed />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ThemeToggle />
        <CartIcon />
        <Toast />
      </div>
    </Router>
  );
}

export default App;