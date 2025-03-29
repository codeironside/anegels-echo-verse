import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Play, Star, DollarSign, Search, Filter, ChevronDown } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { dummyContent } from '../data/dummyContent';
import { Content } from '../types';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { toast } from 'react-hot-toast';

export const Marketplace: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'price'>('popular');
  const [showPreview, setShowPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const genres = ['All', 'Fantasy', 'Sci-Fi', 'Horror', 'Romance', 'Poetry'];

  const filteredContent = dummyContent.filter(item => {
    const matchesSearch = searchQuery.toLowerCase() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGenre = selectedGenre === 'all' ||
      item.tags.some(tag => tag.toLowerCase() === selectedGenre.toLowerCase());

    return matchesSearch && matchesGenre;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return parseInt(b.author.stats.followers.replace('k', '000')) -
               parseInt(a.author.stats.followers.replace('k', '000'));
      case 'recent':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'price':
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

  const handlePurchase = (content: Content) => {
    if (content.monetized) {
      addItem(content);
      navigate('/cart');
    } else {
      // Add to library directly
      // You would typically call an API here
      toast.success('Added to your library!');
      navigate('/library');
    }
  };

  const PreviewModal: React.FC<{ content: Content }> = ({ content }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => setShowPreview(null)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[rgb(var(--color-card))] rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-serif mb-2">{content.title}</h2>
        <p className="text-[rgb(var(--color-text))]/70 mb-4">by {content.author.username}</p>
        
        <div className="prose prose-lg prose-invert mb-6">
          {content.preview?.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {content.monetized && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] py-2 rounded-lg font-semibold"
          >
            Purchase for ${content.price}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-serif mb-4">Literary Marketplace</h1>
            <p className="text-[rgb(var(--color-text))]/70 mb-8">
              Discover and support independent writers
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--color-text))]/50" size={20} />
                <input
                  type="text"
                  placeholder="Search stories, authors, or tags..."
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
                  <option value="popular">Most Popular</option>
                  <option value="recent">Most Recent</option>
                  <option value="price">Price</option>
                </select>
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
            {filteredContent.map((content) => (
              <motion.div
                key={content.id}
                whileHover={{ scale: 1.02 }}
                className="bg-[rgb(var(--color-card))] rounded-lg overflow-hidden border border-[rgb(var(--color-border))]"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center">
                  {content.type === 'audio' ? (
                    <Play className="w-12 h-12 text-[rgb(var(--color-background))]" />
                  ) : (
                    <BookOpen className="w-12 h-12 text-[rgb(var(--color-background))]" />
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif mb-2">{content.title}</h3>
                  <p className="text-[rgb(var(--color-text))]/70 text-sm mb-4">
                    by {content.author.username}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-[rgb(var(--color-secondary))]" />
                      <span>{content.author.stats.followers} followers</span>
                    </div>
                    {content.monetized && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-[rgb(var(--color-secondary))]" />
                        <span>${content.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[rgb(var(--color-background))] rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPreview(content.id)}
                      className="flex-1 px-4 py-2 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg font-medium"
                    >
                      Preview
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePurchase(content)}
                      className="flex-1 px-4 py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg font-medium"
                    >
                      {content.monetized ? 'Add to Cart' : 'Add to Library'}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Preview Modal */}
          {showPreview && (
            <PreviewModal 
              content={dummyContent.find(c => c.id === showPreview)!}
            />
          )}
        </div>
      </div>
    </PageTransition>
  );
};