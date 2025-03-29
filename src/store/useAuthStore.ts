import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // TODO: Implement actual authentication
    const mockUser: User = {
      id: 'U-2024',
      username: 'InkAlchemist',
      avatar: 'ink-drop.svg',
      bio: 'Turning emotions into stanzas since 2020.',
      stats: {
        published: 27,
        followers: '3.4k',
        revenue: '$2,150'
      }
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  signup: async (email: string, password: string, username: string) => {
    // TODO: Implement actual signup
    const mockUser: User = {
      id: 'U-2024',
      username,
      stats: {
        published: 0,
        followers: '0',
        revenue: '$0'
      }
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));