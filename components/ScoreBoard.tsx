
import React from 'react';
import { GameStats } from '../types';

interface ScoreBoardProps {
  stats: GameStats;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ stats }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <div className="bg-white rounded-2xl shadow-md px-6 py-3 border-b-4 border-emerald-200">
        <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Moves</p>
        <p className="text-2xl font-bold text-emerald-600">{stats.moves}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md px-6 py-3 border-b-4 border-emerald-200">
        <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Time</p>
        <p className="text-2xl font-bold text-emerald-600">{formatTime(stats.timer)}</p>
      </div>
      <div className="bg-white rounded-2xl shadow-md px-6 py-3 border-b-4 border-emerald-200">
        <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">Matches</p>
        <p className="text-2xl font-bold text-emerald-600">{stats.matches}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
