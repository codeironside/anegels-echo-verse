import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { AuthFormData } from '../types';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: AuthFormData) => void;
  onToggle: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit, onToggle }) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    ...(type === 'signup' ? { username: '' } : {}),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {type === 'signup' && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-parchment/80 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-antique-gold" size={18} />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-parchment placeholder-parchment/50 focus:outline-none focus:ring-2 focus:ring-antique-gold/50"
                placeholder="WordWeaver"
                required
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-parchment/80 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-antique-gold" size={18} />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-parchment placeholder-parchment/50 focus:outline-none focus:ring-2 focus:ring-antique-gold/50"
              placeholder="bard@echoverse.com"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-parchment/80 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-antique-gold" size={18} />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-parchment placeholder-parchment/50 focus:outline-none focus:ring-2 focus:ring-antique-gold/50"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-antique-gold text-midnight py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-antique-gold/90 transition-colors"
        >
          {type === 'login' ? 'Sign In' : 'Create Account'}
          <ArrowRight size={18} />
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-parchment/60">
          {type === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={onToggle}
            className="ml-2 text-antique-gold hover:text-antique-gold/80 transition-colors"
          >
            {type === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};