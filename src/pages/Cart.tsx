import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { PageTransition } from '../components/PageTransition';

export const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // Implement Stripe checkout
      navigate('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="min-h-screen p-8 pt-24">
          <div className="max-w-4xl mx-auto text-center">
            <ShoppingCart size={64} className="mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/marketplace')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg"
            >
              Continue Shopping
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-serif mb-8">Shopping Cart</h1>

          <div className="bg-[rgb(var(--color-card))] rounded-lg p-6 mb-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 border-b border-[rgb(var(--color-border))] last:border-0"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-serif mb-1">{item.title}</h3>
                  <p className="text-[rgb(var(--color-text))]/70">
                    by {item.author.username}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="bg-[rgb(var(--color-background))] rounded px-2 py-1"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>

                  <div className="w-24 text-right">
                    ${((item.price || 0) * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6 pt-6 border-t border-[rgb(var(--color-border))]">
              <div className="text-xl">Total: ${total.toFixed(2)}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                className="px-6 py-3 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};