import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import { useLibraryStore } from '../store/useLibraryStore';

interface ReadingProgressBarProps {
  contentId: string;
  progress: number;
  lastRead?: Date;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  contentId,
  progress,
  lastRead,
}) => {
  const updateProgress = useLibraryStore((state) => state.updateProgress);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-sm text-[rgb(var(--color-text))]/70">
        <div className="flex items-center gap-2">
          <BookOpen size={16} />
          <span>{Math.round(progress)}% Complete</span>
        </div>
        {lastRead && (
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Last read: {new Date(lastRead).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      <div className="h-2 bg-[rgb(var(--color-background))] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-[rgb(var(--color-secondary))]"
        />
      </div>
    </div>
  );
};