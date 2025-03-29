import { TrendingContent, Feature } from '../types';

export const trendingContent: TrendingContent[] = [
  { id: 1, title: "Whispers of Midnight", author: "Luna Grey", type: "poem", reads: "2.3k" },
  { id: 2, title: "Echoes in the Attic", author: "Orion Black", type: "audio", plays: "1.1k" },
  { id: 3, title: "The Raven's Quill", author: "Edgar Blackwood", type: "poem", reads: "1.8k" },
  { id: 4, title: "Midnight Sonnets", author: "Victoria Storm", type: "audio", plays: "950" }
];

export const features: Feature[] = [
  {
    title: "Real-time Collaboration",
    description: "Write and edit together in perfect harmony",
    icon: "Users"
  },
  {
    title: "Audio Integration",
    description: "Bring your words to life with voice recordings",
    icon: "Mic"
  },
  {
    title: "Monetization",
    description: "Turn your passion into profit",
    icon: "Coins"
  },
  {
    title: "AI-Powered Tools",
    description: "Enhanced creativity with smart suggestions",
    icon: "Sparkles"
  }
];