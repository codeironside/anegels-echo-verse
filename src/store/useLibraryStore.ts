import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Content, ReadingProgress } from '../types';

interface LibraryState {
  readingProgress: Record<string, ReadingProgress>;
  updateProgress: (contentId: string, progress: number) => void;
  addBookmark: (contentId: string, page: number) => void;
  removeBookmark: (contentId: string, page: number) => void;
  addNote: (contentId: string, page: number, text: string) => void;
  removeNote: (contentId: string, page: number) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      readingProgress: {},
      updateProgress: (contentId, progress) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [contentId]: {
              ...state.readingProgress[contentId],
              progress,
              lastRead: new Date().toISOString(), // Store as ISO string
            },
          },
        })),
      addBookmark: (contentId, page) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [contentId]: {
              ...state.readingProgress[contentId],
              bookmarks: [
                ...(state.readingProgress[contentId]?.bookmarks || []),
                page,
              ],
            },
          },
        })),
      removeBookmark: (contentId, page) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [contentId]: {
              ...state.readingProgress[contentId],
              bookmarks: state.readingProgress[contentId]?.bookmarks?.filter(
                (p) => p !== page
              ),
            },
          },
        })),
      addNote: (contentId, page, text) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [contentId]: {
              ...state.readingProgress[contentId],
              notes: [
                ...(state.readingProgress[contentId]?.notes || []),
                { page, text, createdAt: new Date().toISOString() }, // Store as ISO string
              ],
            },
          },
        })),
      removeNote: (contentId, page) =>
        set((state) => ({
          readingProgress: {
            ...state.readingProgress,
            [contentId]: {
              ...state.readingProgress[contentId],
              notes: state.readingProgress[contentId]?.notes?.filter(
                (note) => note.page !== page
              ),
            },
          },
        })),
    }),
    {
      name: 'library-storage',
    }
  )
);