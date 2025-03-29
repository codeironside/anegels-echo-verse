import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Editor } from './Editor';
import { AudioFeatures } from './AudioFeatures';
import { Save } from 'lucide-react';

interface SpokenWordEditorProps {
  documentId: string;
  onSave?: (content: { text: string; audio: Blob | null }) => void;
}

export const SpokenWordEditor: React.FC<SpokenWordEditorProps> = ({ documentId, onSave }) => {
  const [textContent, setTextContent] = useState('');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleSave = () => {
    if (onSave) {
      onSave({ text: textContent, audio: audioBlob });
    }
  };

  return (
    <div className="space-y-8">
      {/* Text Editor */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif mb-4">Written Content</h2>
        <Editor
          documentId={documentId}
          onSave={(content) => setTextContent(content)}
        />
      </div>

      {/* Audio Section */}
      <AudioFeatures onAudioSave={(blob) => setAudioBlob(blob)} />

      {/* Save Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full py-3 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg font-medium flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save Spoken Word Piece
      </motion.button>
    </div>
  );
};