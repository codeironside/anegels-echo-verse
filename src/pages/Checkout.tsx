import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'react-hot-toast';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly succeed or fail for demo purposes
      if (Math.random() > 0.5) {
        clearCart();
        navigate('/payment/success');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      navigate('/payment/failed');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
              <h2 className="text-2xl font-serif mb-6">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text))]/50" size={20} />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Name on Card</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isProcessing}
                  className="w-full bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Lock size={20} />
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-[rgb(var(--color-card))] rounded-lg p-6">
                <h2 className="text-2xl font-serif mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-[rgb(var(--color-text))]/70">
                          by {item.author.username}
                        </p>
                      </div>
                      <p>${((item.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t border-[rgb(var(--color-border))] pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <p>Total</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-[rgb(var(--color-card))] rounded-lg p-6">
                <div className="flex items-center gap-2 text-sm text-[rgb(var(--color-text))]/70">
                  <Lock size={16} />
                  <p>Your payment information is secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};