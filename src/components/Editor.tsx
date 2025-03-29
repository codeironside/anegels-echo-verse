import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { motion } from 'framer-motion';
import { 
  Save, 
  Undo, 
  Redo, 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon,
  Indent,
  Outdent,
  Mic,
  Upload,
  Play,
  Square,
  Trash,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Table as TableIcon,
  CheckSquare,
  Eye,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  BookOpen,
  Edit,
  X
} from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface EditorProps {
  documentId: string;
  initialContent?: string;
  onSave?: (content: string) => void;
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  preview: string;
}

const ToolbarButton: React.FC<{
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  tooltip?: string;
}> = ({ onClick, isActive, disabled, icon, tooltip }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={tooltip}
    className={`p-2 rounded transition-colors ${
      isActive
        ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
        : 'hover:bg-[rgb(var(--color-background))]'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {icon}
  </button>
);

export const Editor: React.FC<EditorProps> = ({ documentId, initialContent, onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([{ 
    id: '1',
    title: 'Chapter 1', 
    content: '',
    preview: ''
  }]);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [showChapterList, setShowChapterList] = useState(true);
  const [editingChapterTitle, setEditingChapterTitle] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const waveformRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Strike,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'Start writing your masterpiece...',
      }),
    ],
    content: chapters[currentChapter].content,
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      // Generate preview by removing HTML tags and limiting length
      const preview = content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .slice(0, 200) // Limit to 200 characters
        .trim() + (content.length > 200 ? '...' : '');
      
      const updatedChapters = [...chapters];
      updatedChapters[currentChapter] = {
        ...updatedChapters[currentChapter],
        content,
        preview
      };
      setChapters(updatedChapters);
    },
  });

  useEffect(() => {
    if (editor) {
      // Clear editor content when switching chapters
      editor.commands.setContent('');
      
      // If the chapter has content, set it
      if (chapters[currentChapter].content) {
        editor.commands.setContent(chapters[currentChapter].content);
      }
    }
  }, [currentChapter]);

  const handleSave = () => {
    if (editor && onSave) {
      onSave(editor.getHTML());
    }
  };

  const insertTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const addChapter = () => {
    const chapterNumber = chapters.length + 1;
    const newChapter: Chapter = {
      id: String(chapterNumber),
      title: `Chapter ${chapterNumber}`, // Keep the default title format
      content: '',
      preview: ''
    };
    setChapters([...chapters, newChapter]);
  };

  const updateChapterTitle = (chapterId: string, newTitle: string) => {
    setChapters(chapters.map(chapter => {
      if (chapter.id === chapterId) {
        // Preserve the "Chapter X" prefix
        const chapterNumber = chapter.title.match(/Chapter \d+/)?.[0] || '';
        return { 
          ...chapter, 
          title: `${chapterNumber} - ${newTitle}`
        };
      }
      return chapter;
    }));
    setEditingChapterTitle(null);
  };

  const deleteChapter = (chapterId: string) => {
    if (chapters.length > 1) {
      const newChapters = chapters.filter(chapter => chapter.id !== chapterId);
      setChapters(newChapters);
      if (currentChapter >= newChapters.length) {
        setCurrentChapter(newChapters.length - 1);
      }
    }
  };

  const ChapterList: React.FC = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-64 bg-[rgb(var(--color-card))] border-r border-[rgb(var(--color-border))] p-4 overflow-y-auto"
    >
      <h3 className="text-lg font-serif mb-4">Chapters</h3>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={`p-4 rounded-lg transition-colors ${
              currentChapter === index
                ? 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
                : 'hover:bg-[rgb(var(--color-background))]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              {editingChapterTitle === chapter.id ? (
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                  onBlur={() => setEditingChapterTitle(null)}
                  onKeyPress={(e) => e.key === 'Enter' && setEditingChapterTitle(null)}
                  className="bg-[rgb(var(--color-background))] px-2 py-1 rounded w-full"
                  autoFocus
                />
              ) : (
                <h4 className="font-medium flex-1 cursor-pointer" onClick={() => setCurrentChapter(index)}>
                  {chapter.title}
                </h4>
              )}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingChapterTitle(chapter.id)}
                  className="p-1 hover:text-[rgb(var(--color-secondary))]"
                >
                  <Edit size={14} />
                </button>
                {chapters.length > 1 && (
                  <button
                    onClick={() => deleteChapter(chapter.id)}
                    className="p-1 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm opacity-80 line-clamp-3 cursor-pointer" onClick={() => setCurrentChapter(index)}>
              {chapter.preview || 'No content yet...'}
            </p>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={addChapter}
        className="w-full mt-4 px-4 py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg font-medium"
      >
        Add Chapter
      </motion.button>
    </motion.div>
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="flex bg-[rgb(var(--color-card))] rounded-lg shadow-lg">
      {/* Chapter List Sidebar */}
      {showChapterList && <ChapterList />}

      {/* Main Editor Area */}
      <div className="flex-1">
        {/* Main Toolbar */}
        <div className="flex flex-wrap items-center gap-2 p-4 border-b border-[rgb(var(--color-border))]">
          <button
            onClick={() => setShowChapterList(!showChapterList)}
            className="p-2 hover:bg-[rgb(var(--color-background))] rounded transition-colors"
          >
            {showChapterList ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>

          <div className="flex items-center gap-2">
            <select
              value={currentChapter}
              onChange={(e) => setCurrentChapter(parseInt(e.target.value))}
              className="bg-[rgb(var(--color-background))] px-3 py-2 rounded-lg"
            >
              {chapters.map((chapter, index) => (
                <option key={chapter.id} value={index}>
                  {chapter.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              icon={<Bold size={20} />}
              tooltip="Bold"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              icon={<Italic size={20} />}
              tooltip="Italic"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              icon={<UnderlineIcon size={20} />}
              tooltip="Underline"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              icon={<Strikethrough size={20} />}
              tooltip="Strikethrough"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive('highlight')}
              icon={<Highlighter size={20} />}
              tooltip="Highlight"
            />

            <div className="w-px h-6 bg-[rgb(var(--color-border))]" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive('heading', { level: 1 })}
              icon={<Heading1 size={20} />}
              tooltip="Heading 1"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive('heading', { level: 2 })}
              icon={<Heading2 size={20} />}
              tooltip="Heading 2"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive('heading', { level: 3 })}
              icon={<Heading3 size={20} />}
              tooltip="Heading 3"
            />

            <div className="w-px h-6 bg-[rgb(var(--color-border))]" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              icon={<List size={20} />}
              tooltip="Bullet List"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              icon={<ListOrdered size={20} />}
              tooltip="Numbered List"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleTaskList().run()}
              isActive={editor.isActive('taskList')}
              icon={<CheckSquare size={20} />}
              tooltip="Task List"
            />

            <div className="w-px h-6 bg-[rgb(var(--color-border))]" />

            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              isActive={editor.isActive({ textAlign: 'left' })}
              icon={<AlignLeft size={20} />}
              tooltip="Align Left"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              isActive={editor.isActive({ textAlign: 'center' })}
              icon={<AlignCenter size={20} />}
              tooltip="Align Center"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              isActive={editor.isActive({ textAlign: 'right' })}
              icon={<AlignRight size={20} />}
              tooltip="Align Right"
            />

            <div className="w-px h-6 bg-[rgb(var(--color-border))]" />

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive('blockquote')}
              icon={<Quote size={20} />}
              tooltip="Quote"
            />
            <ToolbarButton
              onClick={insertTable}
              isActive={editor.isActive('table')}
              icon={<TableIcon size={20} />}
              tooltip="Insert Table"
            />

            <div className="w-px h-6 bg-[rgb(var(--color-border))]" />

            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    editor.chain().focus().setImage({ src: url }).run();
                  }
                }}
              />
              <div className="p-2 hover:bg-[rgb(var(--color-background))] rounded transition-colors">
                <ImageIcon size={20} />
              </div>
            </label>

            <ToolbarButton
              onClick={() => {
                const url = window.prompt('Enter URL:');
                if (url) {
                  editor.chain().focus().setLink({ href: url }).run();
                }
              }}
              isActive={editor.isActive('link')}
              icon={<LinkIcon size={20} />}
              tooltip="Insert Link"
            />

            <div className="flex-1" />

            <ToolbarButton
              onClick={() => setShowPreview(!showPreview)}
              icon={<Eye size={20} />}
              tooltip="Toggle Preview"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              icon={<Undo size={20} />}
              tooltip="Undo"
            />
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              icon={<Redo size={20} />}
              tooltip="Redo"
            />
            <ToolbarButton
              onClick={handleSave}
              icon={<Save size={20} />}
              tooltip="Save"
            />
          </div>
        </div>

        {/* Editor/Preview Content */}
        <div className="relative">
          <div className={`transition-opacity duration-200 ${showPreview ? 'opacity-0' : 'opacity-100'}`}>
            <EditorContent editor={editor} />
          </div>
          {showPreview && (
            <div className="absolute inset-0 bg-[rgb(var(--color-background))] p-4 prose prose-lg max-w-none overflow-auto">
              <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
            </div>
          )}
        </div>

        {/* Publishing Options */}
        <div className="border-t border-[rgb(var(--color-border))] p-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                className="rounded border-[rgb(var(--color-border))]"
              />
              <span>Paid Content</span>
            </label>
            {isPaid && (
              <div className="flex items-center gap-2">
                <DollarSign size={20} className="text-[rgb(var(--color-secondary))]" />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                  min="0.99"
                  step="0.01"
                  placeholder="Price"
                  className="px-3 py-2 bg-[rgb(var(--color-background))] border border-[rgb(var(--color-border))] rounded-lg"
                />
              </div>
            )}
            <div className="flex-1" />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="px-4 py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg font-medium flex items-center gap-2"
            >
              <Save size={20} />
              Save & Publish
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};