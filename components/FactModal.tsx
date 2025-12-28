
import React from 'react';
import { Animal } from '../types';

interface FactModalProps {
  animal: Animal | null;
  fact: string;
  onClose: () => void;
  isLoading: boolean;
}

const FactModal: React.FC<FactModalProps> = ({ animal, fact, onClose, isLoading }) => {
  if (!animal && !isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        // 배경 클릭 시 닫히지 않도록 하여 명시적인 버튼 클릭 유도 (원할 경우 onClose() 호출 가능)
      }}
    >
      <div 
        className="bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden transform animate-in zoom-in duration-300 border-4 border-emerald-400"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-emerald-500 p-6 flex flex-col items-center text-white relative">
          <div className="text-7xl mb-4 animate-bounce drop-shadow-md">
            {isLoading ? '✨' : animal?.emoji}
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            {isLoading ? 'Searching...' : animal?.name}
          </h2>
        </div>
        
        <div className="p-8 text-center bg-white">
          {isLoading ? (
            <div className="space-y-4 py-6">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
              <p className="text-emerald-600 font-bold italic animate-pulse text-lg">
                Asking Gemini for a fun fact...
              </p>
            </div>
          ) : (
            <>
              <div className="min-h-[100px] flex items-center justify-center mb-8">
                <p className="text-xl text-gray-700 leading-relaxed font-semibold italic">
                  "{fact}"
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className="w-full bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-black py-5 rounded-2xl transition-all transform active:scale-95 shadow-[0_4px_0_rgb(5,150,105)] hover:shadow-none hover:translate-y-1 text-2xl"
              >
                Got it!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactModal;
