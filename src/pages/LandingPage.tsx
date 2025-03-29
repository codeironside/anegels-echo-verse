import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Feather, BookOpen, Users, Sparkles, ArrowRight } from 'lucide-react';
import { BookshelfScene } from '../components/BookshelfScene';
import { TrendingCard } from '../components/TrendingCard';
import { FeatureCard } from '../components/FeatureCard';
import { trendingContent, features } from '../data/trending';
import { PageTransition } from '../components/PageTransition';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="relative min-h-screen flex items-center justify-center">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--color-background),0.9)] via-[rgba(var(--color-background),0.7)] to-[rgba(var(--color-background),1)] z-20" />
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"
            />
            
            {/* Floating Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[rgb(var(--color-secondary))]"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0.2
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-30">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <Feather className="mx-auto mb-6 text-[rgb(var(--color-secondary))]" size={48} />
                <h1 className="text-6xl md:text-7xl font-serif mb-6 bg-gradient-to-r from-[rgb(var(--color-text))] to-[rgb(var(--color-secondary))] bg-clip-text text-transparent">
                  EchoVerse
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-[rgb(var(--color-text))/80]">
                  Where Words Come Alive
                </p>
              </motion.div>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                <div className="flex items-center space-x-2 bg-[rgb(var(--color-card))] px-4 py-2 rounded-full">
                  <BookOpen size={16} className="text-[rgb(var(--color-secondary))]" />
                  <span>10k+ Stories</span>
                </div>
                <div className="flex items-center space-x-2 bg-[rgb(var(--color-card))] px-4 py-2 rounded-full">
                  <Users size={16} className="text-[rgb(var(--color-secondary))]" />
                  <span>5k+ Writers</span>
                </div>
                <div className="flex items-center space-x-2 bg-[rgb(var(--color-card))] px-4 py-2 rounded-full">
                  <Sparkles size={16} className="text-[rgb(var(--color-secondary))]" />
                  <span>AI-Powered</span>
                </div>
              </motion.div>

              {/* 3D Scene */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mb-12"
              >
                <BookshelfScene />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/auth')}
                  className="group bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2"
                >
                  Start Writing
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/marketplace')}
                  className="group bg-[rgb(var(--color-card))] text-[rgb(var(--color-text))] px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2"
                >
                  Explore Stories
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-[rgb(var(--color-text))/30 rounded-full p-1"
            >
              <div className="w-1 h-2 bg-[rgb(var(--color-text))/30 rounded-full" />
            </motion.div>
          </motion.div>
        </header>

        {/* Trending Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif mb-12 text-center">Trending Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingContent.map((content) => (
                <TrendingCard key={content.id} content={content} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-serif mb-12 text-center">Why EchoVerse?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif mb-6">Stay Inspired</h2>
            <p className="text-xl mb-8 text-[rgb(var(--color-text))]/80 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly writing prompts and literary insights.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] rounded-lg px-4 py-2 text-[rgb(var(--color-text))] placeholder-[rgb(var(--color-text))]/50 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] px-6 py-2 rounded-lg font-semibold"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};