import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Github, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[rgb(var(--color-card))] border-t border-[rgb(var(--color-border))]">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Feather className="text-antique-gold" size={24} />
              <span className="text-xl font-serif">EchoVerse</span>
            </div>
            <p className="text-sm text-[rgb(var(--color-text))]/70">
              Where words come alive and stories find their voice.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/create" className="hover:text-antique-gold transition-colors">Create</Link></li>
              <li><Link to="/marketplace" className="hover:text-antique-gold transition-colors">Marketplace</Link></li>
              <li><Link to="/library" className="hover:text-antique-gold transition-colors">Library</Link></li>
              <li><Link to="/collaborate" className="hover:text-antique-gold transition-colors">Collaborate</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-serif mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-antique-gold transition-colors">Writing Tips</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Guidelines</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-antique-gold transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-serif mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-antique-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-antique-gold transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-antique-gold transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[rgb(var(--color-border))] text-center text-sm text-[rgb(var(--color-text))]/70">
          <p>&copy; {new Date().getFullYear()} EchoVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};