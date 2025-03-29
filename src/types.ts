import { ReactNode } from 'react';

export type UserRole = 'reader' | 'author' | 'admin' | 'superadmin';

export interface TrendingContent {
  id: number;
  title: string;
  author: string;
  type: 'poem' | 'audio';
  reads?: string;
  plays?: string;
  preview?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  username?: string;
  role?: UserRole;
}

export interface User {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  stats: {
    published: number;
    followers: string;
    revenue: string;
  };
}

export interface Content {
  id: string;
  title: string;
  type: 'poem' | 'audio' | 'novel';
  author: User;
  collaborators: User[];
  createdAt: Date;
  tags: string[];
  monetized: boolean;
  price?: number;
  preview?: string;
  content?: string;
  readingProgress?: number;
  lastRead?: string;
  isFree?: boolean;
  coverImage?: string;
}

export interface ReadingProgress {
  contentId: string;
  progress: number;
  lastRead: string;
  currentChapter?: number;
  totalChapters?: number;
  bookmarks?: number[];
  notes?: Array<{
    page: number;
    text: string;
    createdAt: string;
  }>;
}

export interface MarketItem {
  id: string;
  title: string;
  creator: string;
  price: string;
  preview?: string;
  rating: string;
}

export interface LiveSession {
  title: string;
  participants: number;
  decisions: Array<{
    plotPoint: string;
    votes: {
      yes: number;
      no: number;
    };
  }>;
}

export interface AdminStats {
  totalUsers: number;
  totalContent: number;
  totalRevenue: number;
  activeUsers: number;
  newSignups: number[];
  contentCreated: number[];
  revenueHistory: number[];
}