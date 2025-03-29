import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Feather, Menu, X, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/create', label: 'Create' },
    { path: '/marketplace', label: 'Marketplace' },
    { path: '/library', label: 'Library' },
    { path: '/collaborate', label: 'Collaborate' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--color-background))] bg-opacity-95 backdrop-blur-sm border-b border-[rgb(var(--color-border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Feather className="text-[rgb(var(--color-secondary))]" size={24} />
            <span className="text-xl font-serif">EchoVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-[rgb(var(--color-secondary))] ${
                  location.pathname === item.path ? 'text-[rgb(var(--color-secondary))]' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/settings"
              className={`transition-colors hover:text-[rgb(var(--color-secondary))] ${
                location.pathname === '/settings' ? 'text-[rgb(var(--color-secondary))]' : ''
              }`}
            >
              <Settings size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[rgb(var(--color-secondary))]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[rgb(var(--color-background))] bg-opacity-95 backdrop-blur-sm"
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md transition-colors hover:text-[rgb(var(--color-secondary))] ${
                location.pathname === item.path ? 'text-[rgb(var(--color-secondary))]' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/settings"
            className={`block px-3 py-2 rounded-md transition-colors hover:text-[rgb(var(--color-secondary))] ${
              location.pathname === '/settings' ? 'text-[rgb(var(--color-secondary))]' : ''
            }`}
            onClick={() => setIsOpen(false)}
          >
            Settings
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};