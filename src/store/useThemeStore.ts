import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeName = 'dark-academia' | 'light' | 'cozy-cafe' | 'mystery-noir' | 'solarized-tech' | 'vintage-sepia' | 'futuristic-neon' | 'nature-grove';

interface ThemeState {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark-academia',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);