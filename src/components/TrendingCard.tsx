import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play } from 'lucide-react';
import { TrendingContent } from '../types';

interface TrendingCardProps {
  content: TrendingContent;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ content }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10"
    >
      <h3 className="text-xl font-serif mb-2 text-parchment">{content.title}</h3>
      <p className="text-parchment/70 mb-4">by {content.author}</p>
      <div className="flex items-center text-antique-gold">
        {content.type === 'poem' ? (
          <BookOpen size={16} className="mr-2" />
        ) : (
          <Play size={16} className="mr-2" />
        )}
        <span className="text-sm">
          {content.reads || content.plays}
        </span>
      </div>
    </motion.div>
  );
};