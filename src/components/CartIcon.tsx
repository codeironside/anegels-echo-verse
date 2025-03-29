import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

export const CartIcon: React.FC = () => {
  const { items, total } = useCartStore();
  const [showPreview, setShowPreview] = React.useState(false);
  const navigate = useNavigate();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full right-0 mb-4 w-80 bg-[rgb(var(--color-card))] rounded-lg shadow-lg p-4"
          >
            <h3 className="font-serif mb-4">Cart ({itemCount} items)</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-[rgb(var(--color-text))]/70">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="ml-4">${((item.price || 0) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[rgb(var(--color-border))] pt-3 mb-4">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/cart')}
              className="w-full bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] py-2 rounded-lg font-medium"
            >
              View Cart & Checkout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] p-3 rounded-full shadow-lg"
        onClick={() => setShowPreview(!showPreview)}
      >
        <ShoppingCart size={24} />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
          {itemCount}
        </span>
      </motion.button>
    </div>
  );
};