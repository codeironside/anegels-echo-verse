import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Feature } from '../types';

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const Icon = Icons[feature.icon as keyof typeof Icons];

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        skew: -2
      }}
      className="bg-white/5 backdrop-blur-lg rounded-lg p-6 border border-white/10"
    >
      <div className="text-antique-gold mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-serif mb-2 text-parchment">{feature.title}</h3>
      <p className="text-parchment/70">{feature.description}</p>
    </motion.div>
  );
};