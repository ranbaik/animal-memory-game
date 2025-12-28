
import { GameDifficulty, Animal } from './types';

export const ANIMALS: Animal[] = [
  { id: 'lion', name: 'Lion', emoji: '🦁', imageUrl: 'https://picsum.photos/seed/lion/300/300' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', imageUrl: 'https://picsum.photos/seed/elephant/300/300' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧', imageUrl: 'https://picsum.photos/seed/penguin/300/300' },
  { id: 'giraffe', name: 'Giraffe', emoji: '🦒', imageUrl: 'https://picsum.photos/seed/giraffe/300/300' },
  { id: 'fox', name: 'Fox', emoji: '🦊', imageUrl: 'https://picsum.photos/seed/fox/300/300' },
  { id: 'koala', name: 'Koala', emoji: '🐨', imageUrl: 'https://picsum.photos/seed/koala/300/300' },
  { id: 'panda', name: 'Panda', emoji: '🐼', imageUrl: 'https://picsum.photos/seed/panda/300/300' },
  { id: 'tiger', name: 'Tiger', emoji: '🐯', imageUrl: 'https://picsum.photos/seed/tiger/300/300' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐰', imageUrl: 'https://picsum.photos/seed/rabbit/300/300' },
  { id: 'bee', name: 'Bee', emoji: '🐝', imageUrl: 'https://picsum.photos/seed/bee/300/300' },
  { id: 'dolphin', name: 'Dolphin', emoji: '🐬', imageUrl: 'https://picsum.photos/seed/dolphin/300/300' },
  { id: 'owl', name: 'Owl', emoji: '🦉', imageUrl: 'https://picsum.photos/seed/owl/300/300' },
];

export const DIFFICULTY_SETTINGS = {
  [GameDifficulty.EASY]: { pairs: 4, cols: 'grid-cols-2 md:grid-cols-4' },
  [GameDifficulty.MEDIUM]: { pairs: 8, cols: 'grid-cols-4 md:grid-cols-4' },
  [GameDifficulty.HARD]: { pairs: 12, cols: 'grid-cols-4 md:grid-cols-6' },
};
