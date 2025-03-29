import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-serif mb-4">404</h1>
          <p className="text-2xl mb-8">Page Not Found</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg"
          >
            <Home size={20} />
            Return Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};