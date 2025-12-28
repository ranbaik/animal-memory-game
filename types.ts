
export enum GameDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface Animal {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
}

export interface CardState {
  id: string;
  animalId: string;
  name: string;
  emoji: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameStats {
  moves: number;
  matches: number;
  timer: number;
  difficulty: GameDifficulty;
}
