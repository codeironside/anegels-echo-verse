import { Content } from '../types';

// Helper function to generate chapter content
const generateChapterContent = (chapterNum: number, theme: string) => {
  const paragraphs = [
    `The ${theme} stretched endlessly before them, a canvas of possibilities waiting to be explored. Each step forward brought new revelations, unexpected turns in a journey that had only just begun.`,
    
    `The air was thick with anticipation, carrying whispers of ancient secrets and untold stories. Time seemed to move differently here, flowing like water through cupped hands—present yet impossible to grasp fully.`,
    
    `In the distance, shadows danced and shifted, playing tricks on weary eyes. But those who knew where to look could see the truth hidden beneath the surface, waiting to be discovered by those brave enough to seek it.`,
    
    `There were moments when everything seemed to align perfectly, when the chaos of existence settled into a pattern so clear it took their breath away. This was one of those moments.`,
    
    `The world around them pulsed with energy, alive with the kind of magic that exists in the spaces between heartbeats. Every sound, every movement, every breath felt significant, as if the universe itself was paying attention.`
  ];

  return paragraphs.join('\n\n');
};

// Helper function to generate spoken word content
const generateSpokenWordContent = (theme: string) => {
  return `Listen to the rhythm of ${theme},
Breaking through the silence of ordinary days,
Each word a heartbeat, each pause a breath,
Creating patterns in the air that speak of truth.

We are the storytellers, the dream-weavers,
Crafting reality from syllables and sound,
Building bridges between hearts and minds,
With nothing but the power of our voice.

Remember when we first learned to speak?
When words were magic and everything was possible?
That's the power we're channeling now,
Raw and real and ready to change the world.

So let your voice rise like morning sun,
Let your truth shine like stars at midnight,
Because every story matters,
Every voice deserves to be heard.

And in this moment, in this space,
We're creating something beautiful together,
A tapestry of sound and meaning,
That will echo long after the last word fades.`;
};

// Generate the actual content array
export const dummyContent: Content[] = [
  // Keep existing content
  {
    id: "F001",
    title: "The Crystal Scepter",
    type: "novel",
    author: {
      id: "U001",
      username: "MysticScribe",
      stats: { published: 12, followers: "2.3k", revenue: "$1,200" }
    },
    collaborators: [],
    createdAt: new Date("2024-03-01"),
    tags: ["fantasy", "magic", "adventure"],
    monetized: true,
    price: 4.99,
    preview: `In the heart of the Crystalline Empire, where light danced through prismatic towers and magic hummed in the very air, young Aria discovered a forgotten scepter. Its surface rippled like liquid starlight, holding secrets of an ancient power that once kept the realms in balance.

"The crystal speaks," her grandmother had always said, "but only to those who know how to listen."

Now, as shadows crept across the empire and whispers of dark magic echoed through the crystalline corridors, Aria realized her grandmother's words held more truth than she'd ever imagined. The scepter in her hands pulsed with an inner light, responding to a threat only it could sense.

Chapter 1: The Awakening

The morning sun fractured through the crystal spires of the Imperial Academy, casting rainbow patterns across Aria's workbench. Her fingers traced the intricate patterns of a particularly complex enchantment when the first tremor shook the tower...`,
    content: Array.from({ length: 10 }, (_, i) => 
      `Chapter ${i + 1}: ${['The Awakening', 'Echoes of Power', 'Crystal Songs', 'Shadow\'s Touch', 'Ancient Whispers', 'The First Trial', 'Broken Reflections', 'Hidden Truths', 'The Final Resonance', 'Dawn\'s Promise'][i]}\n\n${generateChapterContent(i + 1, 'crystal-laden world')}`
    ).join('\n\n')
  },
  // Add more fantasy novels
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `FN${String(i + 1).padStart(3, '0')}`,
    title: [
      "Whispers of the Wind", "Dragon's Heart", "The Last Spellweaver",
      "Crown of Stars", "The Forgotten Gate", "Shadows of Destiny",
      "The Enchanter's Path", "Realm of Dreams", "The Midnight Crown",
      "Storm's Legacy", "The Ancient Prophecy", "Guardian's Call",
      "The Magic Seeker", "Echoes of Time", "The Lost Kingdom",
      "Sword of Light", "The Hidden City", "Mystic's Journey",
      "The Eternal Flame", "Destiny's Choice"
    ][i],
    type: "novel",
    author: {
      id: `U${String(i + 100).padStart(3, '0')}`,
      username: `Fantasy_Writer_${i + 1}`,
      stats: {
        published: Math.floor(Math.random() * 20) + 1,
        followers: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)}k`,
        revenue: `$${Math.floor(Math.random() * 3000) + 500}`
      }
    },
    collaborators: [],
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    tags: ["fantasy", ["epic", "magic", "adventure", "dragons", "mythology"][Math.floor(Math.random() * 5)]],
    monetized: Math.random() > 0.3,
    price: Math.random() > 0.3 ? Number((Math.random() * 5 + 2.99).toFixed(2)) : undefined,
    preview: `Chapter 1: The Beginning\n\n${generateChapterContent(1, 'magical realm')}`,
    content: Array.from({ length: 12 }, (_, chapterNum) => 
      `Chapter ${chapterNum + 1}: ${['The Beginning', 'Dark Omens', 'First Trial', 'Hidden Powers', 'The Journey', 'Ancient Secrets', 'Betrayal', 'The Storm', 'Lost Hope', 'Rising Power', 'Final Battle', 'New Dawn'][chapterNum]}\n\n${generateChapterContent(chapterNum + 1, 'fantasy world')}`
    ).join('\n\n')
  })),
  // Add spoken word pieces
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `SW${String(i + 1).padStart(3, '0')}`,
    title: [
      "Urban Rhythms", "Heart's Echo", "Street Symphony",
      "Voice of Change", "Modern Mantras", "City Beats",
      "Soul Speak", "Truth Teller", "Midnight Verses",
      "Power Words", "Breaking Silence", "Freedom Songs",
      "Revolution Rhymes", "Love's Language", "Spirit Voice",
      "Memory's Echo", "Future's Call", "Past's Promise",
      "Present Tense", "Time's Truth", "Hope's Harmony",
      "Dream Speaker", "Reality Check", "Life Lines",
      "Word Warriors", "Voice Notes", "Sound Stories",
      "Beat Poetry", "Rhythm Roads", "Verse Victory"
    ][i],
    type: "audio",
    author: {
      id: `U${String(i + 200).padStart(3, '0')}`,
      username: `Spoken_Word_Artist_${i + 1}`,
      stats: {
        published: Math.floor(Math.random() * 15) + 1,
        followers: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 9)}k`,
        revenue: `$${Math.floor(Math.random() * 2000) + 300}`
      }
    },
    collaborators: [],
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    tags: ["spoken-word", ["urban", "social", "love", "identity", "nature"][Math.floor(Math.random() * 5)]],
    monetized: Math.random() > 0.5,
    price: Math.random() > 0.5 ? Number((Math.random() * 3 + 1.99).toFixed(2)) : undefined,
    preview: generateSpokenWordContent('the city'),
    content: generateSpokenWordContent('life')
  })),
  // Add poetry collections
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `P${String(i + 1).padStart(3, '0')}`,
    title: [
      "Moonlit Verses", "Ocean's Heart", "City Dreams",
      "Nature's Voice", "Love's Echo", "Time's Shadow",
      "Soul Songs", "Star Poems", "Earth Whispers",
      "Heart's Journey", "Mind's Eye", "Spirit Dance",
      "Dawn Chorus", "Night Tales", "Wind Songs",
      "Fire Dreams", "Water Ways", "Light Verses",
      "Dark Beauty", "Life Lines"
    ][i % 20],
    type: "poem",
    author: {
      id: `U${String(i + 300).padStart(3, '0')}`,
      username: `Poet_${i + 1}`,
      stats: {
        published: Math.floor(Math.random() * 30) + 1,
        followers: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 9)}k`,
        revenue: `$${Math.floor(Math.random() * 1000) + 100}`
      }
    },
    collaborators: [],
    createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    tags: ["poetry", ["nature", "love", "urban", "spiritual", "experimental"][Math.floor(Math.random() * 5)]],
    monetized: Math.random() > 0.7,
    price: Math.random() > 0.7 ? Number((Math.random() * 2 + 0.99).toFixed(2)) : undefined,
    preview: `In the spaces between heartbeats,
Where silence grows like wildflowers,
We find the truth of who we are,
Written in stardust and shadow.

Time flows like river water,
Carrying memories like fallen leaves,
Each moment a poem waiting to be read,
Each breath a story waiting to be told.`,
    content: Array.from({ length: 10 }, () => 
      `${generateSpokenWordContent(["nature", "love", "time", "space", "dreams"][Math.floor(Math.random() * 5)])}\n\n`
    ).join('\n')
  }))
];