import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';
import { AuthForm } from '../components/AuthForm';
import { AuthFormData } from '../types';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', data);
    // TODO: Implement actual authentication
  };

  return (
    <div className="min-h-screen bg-midnight flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Feather className="mx-auto mb-6 text-antique-gold" size={40} />
            <h1 className="text-4xl font-serif text-parchment mb-2">
              {isLogin ? 'Welcome Back' : 'Join EchoVerse'}
            </h1>
            <p className="text-parchment/60">
              {isLogin
                ? 'Continue your literary journey'
                : 'Begin your creative adventure'}
            </p>
          </motion.div>

          <AuthForm
            type={isLogin ? 'login' : 'signup'}
            onSubmit={handleSubmit}
            onToggle={() => setIsLogin(!isLogin)}
          />
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight to-transparent" />
        <div className="absolute bottom-0 left-0 p-12 text-parchment max-w-lg">
          <blockquote className="text-2xl font-serif italic mb-4">
            "In the realm of words, every voice finds its echo."
          </blockquote>
          <p className="text-parchment/60">— The EchoVerse Manifesto</p>
        </div>
      </div>
    </div>
  );
};