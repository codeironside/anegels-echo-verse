import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ChapterTitleInputProps {
  initialTitle: string;
  onSave: (title: string) => void;
  onCancel: () => void;
}

export const ChapterTitleInput: React.FC<ChapterTitleInputProps> = ({
  initialTitle,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [isEditing, setIsEditing] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Place cursor at the end of the text
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      setTitle(initialTitle);
      onCancel();
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onSave(title);
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => !isSaving && handleSave()}
        className="bg-[rgb(var(--color-background))] px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-secondary))]"
        placeholder="Enter chapter title..."
        disabled={isSaving}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-2"
      >
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="p-2 text-green-500 hover:bg-green-500/10 rounded-full"
        >
          <Check size={18} />
        </button>
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"
        >
          <X size={18} />
        </button>
      </motion.div>
    </div>
  );
};