import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useThemeStore, ThemeName } from '../store/useThemeStore';

const themes: { name: ThemeName; label: string }[] = [
  { name: 'dark-academia', label: 'Dark Academia' },
  { name: 'light', label: 'Light' },
  { name: 'cozy-cafe', label: 'Cozy Café' },
  { name: 'mystery-noir', label: 'Mystery Noir' },
  { name: 'solarized-tech', label: 'Solarized Tech' },
  { name: 'vintage-sepia', label: 'Vintage Sepia' },
  { name: 'futuristic-neon', label: 'Futuristic Neon' },
  { name: 'nature-grove', label: 'Nature Grove' },
];

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={false}
        animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
        className="absolute bottom-full right-0 mb-4 bg-white/10 backdrop-blur-lg rounded-lg p-2 w-48"
      >
        {themes.map(({ name, label }) => (
          <button
            key={name}
            onClick={() => {
              setTheme(name);
              setIsOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded transition-colors ${
              theme === name ? 'text-antique-gold' : 'hover:text-antique-gold'
            }`}
          >
            {label}
          </button>
        ))}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-antique-gold text-midnight p-3 rounded-full shadow-lg"
      >
        <Palette size={24} />
      </motion.button>
    </div>
  );
};