
import React from 'react';
import { CardState } from '../types';

interface CardProps {
  card: CardState;
  onClick: (id: string) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div 
      className="relative w-full aspect-square perspective-1000 cursor-pointer group"
      onClick={handleClick}
    >
      <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
        {/* Front (Hidden state) */}
        <div className="absolute inset-0 bg-emerald-500 rounded-xl border-4 border-white shadow-lg flex items-center justify-center backface-hidden z-10 group-hover:bg-emerald-400 transition-colors">
          <span className="text-4xl text-white opacity-50 font-bold">?</span>
        </div>

        {/* Back (Revealed state) */}
        <div className="absolute inset-0 bg-white rounded-xl border-4 border-emerald-500 shadow-lg flex flex-col items-center justify-center backface-hidden rotate-y-180 p-2">
          <div className="text-5xl mb-2">{card.emoji}</div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{card.name}</span>
          {card.isMatched && (
             <div className="absolute top-1 right-1">
                <div className="bg-yellow-400 text-white rounded-full p-1 shadow-sm">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                   </svg>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
