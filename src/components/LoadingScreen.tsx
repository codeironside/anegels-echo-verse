import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

interface LoadingScreenProps {
  progress?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress = 0 }) => {
  return (
    <div className="fixed inset-0 bg-midnight flex items-center justify-center z-50">
      <div className="relative w-64 text-center">
        {/* Quill Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Feather className="mx-auto text-antique-gold" size={48} />
        </motion.div>

        {/* Text Animation */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-serif text-parchment mb-6"
        >
          EchoVerse
        </motion.h1>

        {/* Inkwell Progress */}
        <div className="relative h-24 w-24 mx-auto mb-4">
          <div className="absolute inset-0 bg-white/5 rounded-full" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-blood-crimson rounded-full"
            initial={{ height: "0%" }}
            animate={{ height: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Progress Text */}
        <p className="text-parchment/70 font-mono text-sm">
          Loading... {Math.round(progress)}%
        </p>

        {/* Floating Particles */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-antique-gold/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}