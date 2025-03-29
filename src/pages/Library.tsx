import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, BookOpen, Clock, Star, X } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { ChapterReader } from '../components/ChapterReader';
import { dummyContent } from '../data/dummyContent';
import { useLibraryStore } from '../store/useLibraryStore';
import { Content } from '../types';
import Fuse from 'fuse.js';

export const Library: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'progress'>('recent');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const readingProgress = useLibraryStore((state) => state.readingProgress);
  const updateProgress = useLibraryStore((state) => state.updateProgress);

  const genres = ['All', 'Fantasy', 'Sci-Fi', 'Horror', 'Romance', 'Poetry'];

  const fuse = new Fuse(dummyContent, {
    keys: ['title', 'author.username', 'tags'],
    threshold: 0.4,
  });

  const filteredAndSortedContent = useMemo(() => {
    let results = searchQuery 
      ? fuse.search(searchQuery).map(result => result.item)
      : dummyContent;

    if (selectedGenre !== 'all') {
      results = results.filter(content =>
        content.tags.some(tag => tag.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    return results.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'recent':
          // Parse ISO date strings to timestamps for comparison
          const dateA = readingProgress[a.id]?.lastRead ? new Date(readingProgress[a.id].lastRead).getTime() : 0;
          const dateB = readingProgress[b.id]?.lastRead ? new Date(readingProgress[b.id].lastRead).getTime() : 0;
          return dateB - dateA;
        case 'progress':
          return (readingProgress[b.id]?.progress || 0) - 
                 (readingProgress[a.id]?.progress || 0);
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedGenre, sortBy, readingProgress]);

  if (selectedContent) {
    return (
      <div className="relative">
        <button
          onClick={() => setSelectedContent(null)}
          className="fixed top-4 right-4 z-50 p-2 bg-[rgb(var(--color-card))] rounded-full shadow-lg"
        >
          <X size={24} />
        </button>
        <ChapterReader
          content={selectedContent}
          onProgressUpdate={(progress) => {
            updateProgress(selectedContent.id, progress);
          }}
        />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-serif mb-4">Your Library</h1>
            <p className="text-[rgb(var(--color-text))]/70 mb-6">
              Track your reading progress and manage your collection
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text))]/50" size={20} />
                <input
                  type="text"
                  placeholder="Search your library..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
                />
              </div>

              <div className="flex gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
                >
                  <option value="recent">Recently Read</option>
                  <option value="title">Title</option>
                  <option value="progress">Reading Progress</option>
                </select>

                <button
                  onClick={() => setSelectedGenre(selectedGenre === 'all' ? 'fantasy' : 'all')}
                  className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg hover:border-[rgb(var(--color-secondary))] transition-colors"
                >
                  <Filter size={20} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Genre Filter */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre.toLowerCase())}
                  className={`px-4 py-2 rounded-full border transition-colors ${
                    selectedGenre === genre.toLowerCase()
                      ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] border-[rgb(var(--color-secondary))]'
                      : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-secondary))]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </header>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedContent.map((content) => (
              <motion.div
                key={content.id}
                whileHover={{ scale: 1.02 }}
                className="bg-[rgb(var(--color-card))] rounded-lg overflow-hidden border border-[rgb(var(--color-border))] cursor-pointer"
                onClick={() => setSelectedContent(content)}
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-[rgb(var(--color-background))]" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{content.title}</h3>
                  <p className="text-[rgb(var(--color-text))]/70 text-sm mb-4">
                    by {content.author.username}
                  </p>
                  
                  {/* Reading Progress */}
                  <div className="mb-4">
                    <ReadingProgressBar
                      contentId={content.id}
                      progress={readingProgress[content.id]?.progress || 0}
                      lastRead={readingProgress[content.id]?.lastRead ? new Date(readingProgress[content.id].lastRead) : undefined}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-[rgb(var(--color-secondary))]" />
                      <span>{content.author.stats.followers}</span>
                    </div>
                    {content.monetized ? (
                      <span className="px-2 py-1 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-full text-xs">
                        ${content.price}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-[rgb(var(--color-background))] text-[rgb(var(--color-text))] rounded-full text-xs">
                        Free
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[rgb(var(--color-background))] rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};