import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Editor } from '../components/Editor';
import { SpokenWordEditor } from '../components/SpokenWordEditor';
import { Book, Mic, FileText, Image as ImageIcon, Upload } from 'lucide-react';
import { dummyContent } from '../data/dummyContent';

type ContentType = 'novel' | 'poem' | 'spoken-word' | 'short-story';

interface ContentMetadata {
  title: string;
  description: string;
  coverImage: string | null;
  tags: string[];
  type: ContentType;
}

export const ContentCreation: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ContentType>('novel');
  const [metadata, setMetadata] = useState<ContentMetadata>({
    title: '',
    description: '',
    coverImage: null,
    tags: [],
    type: 'novel'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contentTypes = [
    { id: 'novel', label: 'Novel', icon: Book },
    { id: 'poem', label: 'Poem', icon: FileText },
    { id: 'spoken-word', label: 'Spoken Word', icon: Mic },
    { id: 'short-story', label: 'Short Story', icon: FileText }
  ] as const;

  const handleCoverImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In production, you would upload to a server and get a URL
      const url = URL.createObjectURL(file);
      setMetadata(prev => ({ ...prev, coverImage: url }));
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      const newTag = e.currentTarget.value.trim();
      if (newTag && !metadata.tags.includes(newTag)) {
        setMetadata(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const removeTag = (tagToRemove: string) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <PageTransition>
      <div className="min-h-screen p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-serif mb-4">Create</h1>
            <p className="text-[rgb(var(--color-text))]/70 mb-6">
              Share your stories with the world
            </p>

            {/* Content Type Selection */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
              {contentTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setSelectedType(id);
                    setMetadata(prev => ({ ...prev, type: id }));
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    selectedType === id
                      ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                      : 'bg-[rgb(var(--color-card))] hover:bg-[rgb(var(--color-card))]/80'
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </button>
              ))}
            </div>
          </header>

          {/* Metadata Section */}
          <div className="bg-[rgb(var(--color-card))] rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Text Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={metadata.title}
                    onChange={(e) => setMetadata(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                    placeholder="Enter title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={metadata.description}
                    onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                    rows={4}
                    placeholder="Enter description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <input
                    type="text"
                    onKeyDown={handleTagInput}
                    className="w-full px-4 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                    placeholder="Enter tags and press Enter..."
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {metadata.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[rgb(var(--color-background))] rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Cover Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <div
                  className={`aspect-[3/4] rounded-lg overflow-hidden relative ${
                    metadata.coverImage ? 'bg-[rgb(var(--color-background))]' : 'border-2 border-dashed border-[rgb(var(--color-border))]'
                  }`}
                >
                  {metadata.coverImage ? (
                    <>
                      <img
                        src={metadata.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setMetadata(prev => ({ ...prev, coverImage: null }))}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[rgb(var(--color-text))]/70 hover:text-[rgb(var(--color-text))]"
                    >
                      <Upload size={40} />
                      <span>Upload Cover Image</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          {selectedType === 'spoken-word' ? (
            <SpokenWordEditor documentId="spoken-word-1" />
          ) : (
            <Editor documentId="text-content-1" />
          )}
        </div>
      </div>
    </PageTransition>
  );
};