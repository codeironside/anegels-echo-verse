import React from 'react';
import { PageTransition } from '../components/PageTransition';

export const CollaborationHub: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-serif mb-4">Collaboration Hub</h1>
            <p className="text-parchment/70">Create together, inspire each other</p>
          </header>

          {/* Content placeholder */}
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-serif mb-6">Active Sessions</h2>
            <p className="text-parchment/70">The collaboration space is being prepared...</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};