import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Content } from '../types';

interface ChapterReaderProps {
  content: Content;
  onProgressUpdate?: (progress: number) => void;
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({ content, onProgressUpdate }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const chapters = content.content?.split('Chapter').filter(Boolean).map((chapter, index) => ({
    number: index + 1,
    title: chapter.split('\n')[0].trim(),
    content: chapter.split('\n').slice(1).join('\n').trim()
  })) || [];

  const handleChapterChange = (index: number) => {
    setCurrentChapter(index);
    const progress = ((index + 1) / chapters.length) * 100;
    onProgressUpdate?.(progress);
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--color-background))] relative">
      {/* Chapter Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed top-0 left-0 h-full w-72 bg-[rgb(var(--color-card))] border-r border-[rgb(var(--color-border))] z-50 overflow-y-auto"
          >
            <div className="p-6">
              <h2 className="text-xl font-serif mb-4">Chapters</h2>
              <div className="space-y-2">
                {chapters.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleChapterChange(index);
                      setShowSidebar(false);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentChapter === index
                        ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                        : 'hover:bg-[rgb(var(--color-background))]'
                    }`}
                  >
                    <span className="text-sm opacity-60">Chapter {chapter.number}</span>
                    <p className="font-medium">{chapter.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Area */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 hover:bg-[rgb(var(--color-card))] rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-serif">{content.title}</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Chapter Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-xl font-serif mb-6">
            Chapter {chapters[currentChapter]?.number}: {chapters[currentChapter]?.title}
          </h2>
          {chapters[currentChapter]?.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => currentChapter > 0 && handleChapterChange(currentChapter - 1)}
            disabled={currentChapter === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--color-card))] disabled:opacity-50"
          >
            <ChevronLeft size={20} />
            Previous Chapter
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => 
              currentChapter < chapters.length - 1 && handleChapterChange(currentChapter + 1)
            }
            disabled={currentChapter === chapters.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--color-card))] disabled:opacity-50"
          >
            Next Chapter
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Reading Progress Overlay */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[rgb(var(--color-background))]">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${((currentChapter + 1) / chapters.length) * 100}%` }}
          className="h-full bg-[rgb(var(--color-secondary))]"
        />
      </div>
    </div>
  );
};