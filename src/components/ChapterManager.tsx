import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Plus, Grip, Edit2, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Chapter {
  id: string;
  number: number;
  title: string;
  content: string;
}

interface ChapterManagerProps {
  chapters: Chapter[];
  currentChapter: number;
  onChapterSelect: (index: number) => void;
  onChapterUpdate: (chapters: Chapter[]) => void;
}

export const ChapterManager: React.FC<ChapterManagerProps> = ({
  chapters,
  currentChapter,
  onChapterSelect,
  onChapterUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [titleDebounce, setTitleDebounce] = useState<NodeJS.Timeout>();

  const handleTitleChange = (id: string, newTitle: string) => {
    setEditTitle(newTitle);
    
    // Clear existing timeout
    if (titleDebounce) clearTimeout(titleDebounce);
    
    // Set new timeout
    const timeout = setTimeout(() => {
      const updatedChapters = chapters.map(chapter => {
        if (chapter.id === id) {
          return { ...chapter, title: newTitle };
        }
        return chapter;
      });
      onChapterUpdate(updatedChapters);
    }, 500);
    
    setTitleDebounce(timeout);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update chapter numbers
    const updatedChapters = items.map((chapter, index) => ({
      ...chapter,
      number: index + 1
    }));

    onChapterUpdate(updatedChapters);
  };

  const addNewChapter = () => {
    const newChapter: Chapter = {
      id: Date.now().toString(),
      number: chapters.length + 1,
      title: 'New Chapter',
      content: ''
    };
    onChapterUpdate([...chapters, newChapter]);
  };

  const deleteChapter = (id: string) => {
    if (chapters.length <= 1) return;
    const updatedChapters = chapters
      .filter(chapter => chapter.id !== id)
      .map((chapter, index) => ({
        ...chapter,
        number: index + 1
      }));
    onChapterUpdate(updatedChapters);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-10 top-4 p-2 bg-[rgb(var(--color-card))] rounded-full shadow-lg"
      >
        {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Chapter List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-[rgb(var(--color-card))] border-r border-[rgb(var(--color-border))] h-[calc(100vh-6rem)] overflow-hidden"
          >
            <div className="p-4 border-b border-[rgb(var(--color-border))]">
              <h2 className="text-xl font-serif">Chapters</h2>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="chapters">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-2"
                  >
                    {chapters.map((chapter, index) => (
                      <Draggable
                        key={chapter.id}
                        draggableId={chapter.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group rounded-lg border transition-colors ${
                              currentChapter === index
                                ? 'bg-[rgb(var(--color-secondary))] border-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                                : 'border-[rgb(var(--color-border))] hover:border-[rgb(var(--color-secondary))]'
                            }`}
                          >
                            <div className="p-3 flex items-center gap-2">
                              <div {...provided.dragHandleProps}>
                                <Grip size={16} className="opacity-50" />
                              </div>
                              
                              {editingChapter === chapter.id ? (
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => handleTitleChange(chapter.id, e.target.value)}
                                  onBlur={() => setEditingChapter(null)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') setEditingChapter(null);
                                    if (e.key === 'Escape') {
                                      setEditTitle(chapter.title);
                                      setEditingChapter(null);
                                    }
                                  }}
                                  className="flex-1 bg-transparent border-none focus:outline-none"
                                  autoFocus
                                />
                              ) : (
                                <button
                                  onClick={() => onChapterSelect(index)}
                                  className="flex-1 text-left"
                                >
                                  <div className="text-sm opacity-60">
                                    Chapter {chapter.number}
                                  </div>
                                  <div className="font-medium truncate">
                                    {chapter.title}
                                  </div>
                                </button>
                              )}

                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditingChapter(chapter.id);
                                    setEditTitle(chapter.title);
                                  }}
                                  className="p-1 hover:bg-[rgb(var(--color-background))] rounded"
                                >
                                  <Edit2 size={14} />
                                </button>
                                {chapters.length > 1 && (
                                  <button
                                    onClick={() => deleteChapter(chapter.id)}
                                    className="p-1 hover:bg-[rgb(var(--color-background))] rounded text-red-500"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Add Chapter Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgb(var(--color-border))]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addNewChapter}
                className="w-full py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Add Chapter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};