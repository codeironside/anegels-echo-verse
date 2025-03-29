import React from 'react';
import { motion } from 'framer-motion';
import { Book, Mic, FileText } from 'lucide-react';

interface ContentTypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export const ContentTypeFilter: React.FC<ContentTypeFilterProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const types = [
    { id: 'all', label: 'All', icon: FileText },
    { id: 'novel', label: 'Novels', icon: Book },
    { id: 'poem', label: 'Poems', icon: FileText },
    { id: 'audio', label: 'Spoken Word', icon: Mic },
  ];

  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
      {types.map(({ id, label, icon: Icon }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTypeChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors ${
            selectedType === id
              ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] border-[rgb(var(--color-secondary))]'
              : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-secondary))]'
          }`}
        >
          <Icon size={16} />
          {label}
        </motion.button>
      ))}
    </div>
  );
};