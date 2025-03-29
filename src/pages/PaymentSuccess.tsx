import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="mx-auto mb-6 text-green-500" size={64} />
            <h1 className="text-3xl font-serif mb-4">Payment Successful!</h1>
            <p className="text-[rgb(var(--color-text))]/70 mb-8">
              Thank you for your purchase. Your content is now available in your library.
            </p>
            <div className="flex flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/library')}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg"
              >
                Go to Library
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/marketplace')}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[rgb(var(--color-card))] rounded-lg"
              >
                Continue Shopping
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};