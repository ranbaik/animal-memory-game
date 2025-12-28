
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameDifficulty, CardState, GameStats, Animal } from './types';
import { ANIMALS, DIFFICULTY_SETTINGS } from './constants';
import { getAnimalFact } from './services/geminiService';
import Card from './components/Card';
import ScoreBoard from './components/ScoreBoard';
import FactModal from './components/FactModal';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<GameDifficulty>(GameDifficulty.EASY);
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [stats, setStats] = useState<GameStats>({ moves: 0, matches: 0, timer: 0, difficulty: GameDifficulty.EASY });
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showFactModal, setShowFactModal] = useState(false);
  const [currentAnimalFact, setCurrentAnimalFact] = useState<string>('');
  const [matchedAnimal, setMatchedAnimal] = useState<Animal | null>(null);
  const [isFactLoading, setIsFactLoading] = useState(false);
  const [pendingGameOver, setPendingGameOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const timerRef = useRef<number | null>(null);

  const initGame = useCallback((level: GameDifficulty) => {
    const config = DIFFICULTY_SETTINGS[level];
    const selectedAnimals = [...ANIMALS]
      .sort(() => 0.5 - Math.random())
      .slice(0, config.pairs);

    const gameCards: CardState[] = [];
    selectedAnimals.forEach((animal) => {
      for (let i = 0; i < 2; i++) {
        gameCards.push({
          id: `${animal.id}-${i}`,
          animalId: animal.id,
          name: animal.name,
          emoji: animal.emoji,
          imageUrl: animal.imageUrl,
          isFlipped: false,
          isMatched: false,
        });
      }
    });

    const shuffledCards = gameCards.sort(() => 0.5 - Math.random());
    setCards(shuffledCards);
    setFlippedCards([]);
    setStats({ moves: 0, matches: 0, timer: 0, difficulty: level });
    setIsGameActive(true);
    setIsGameOver(false);
    setPendingGameOver(false);
    setShowFactModal(false);
    setIsProcessing(false);
    setMatchedAnimal(null);

    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setStats((prev) => ({ ...prev, timer: prev.timer + 1 }));
    }, 1000);
  }, []);

  useEffect(() => {
    initGame(GameDifficulty.EASY);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [initGame]);

  const handleCardClick = (id: string) => {
    if (flippedCards.length >= 2 || isProcessing || !isGameActive) return;

    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    );
    setFlippedCards((prev) => [...prev, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true); // 입력 잠금 시작

      const [id1, id2] = flippedCards;
      const card1 = cards.find((c) => c.id === id1);
      const card2 = cards.find((c) => c.id === id2);

      if (!card1 || !card2) {
        setFlippedCards([]);
        setIsProcessing(false);
        return;
      }

      setStats((prev) => ({ ...prev, moves: prev.moves + 1 }));

      if (card1.animalId === card2.animalId) {
        // 매칭 성공
        setCards((prev) =>
          prev.map((card) =>
            card.animalId === card1.animalId ? { ...card, isMatched: true } : card
          )
        );
        
        const newMatchCount = stats.matches + 1;
        setStats((prev) => ({ ...prev, matches: newMatchCount }));
        
        const animal = ANIMALS.find((a) => a.id === card1.animalId) || null;
        setMatchedAnimal(animal);
        
        const config = DIFFICULTY_SETTINGS[difficulty];
        if (newMatchCount === config.pairs) {
          setPendingGameOver(true);
          if (timerRef.current) window.clearInterval(timerRef.current);
        }

        if (animal) {
          setIsFactLoading(true);
          setShowFactModal(true); // 모달 표시
          getAnimalFact(animal.name).then((fact) => {
            setCurrentAnimalFact(fact);
            setIsFactLoading(false);
          }).catch(() => {
            setCurrentAnimalFact("Animals are full of surprises!");
            setIsFactLoading(false);
          });
        }
        
        // 매칭 성공 시에도 flippedCards는 즉시 비워줌
        setFlippedCards([]);
        // 주의: isProcessing은 handleCloseFactModal에서 false로 설정하여 모달이 닫힐 때까지 잠금을 유지함
      } else {
        // 매칭 실패: 1초 후 원상복구
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === id1 || card.id === id2 ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
          setIsProcessing(false); // 잠금 해제
        }, 1000);
      }
    }
  }, [flippedCards.length]);

  const handleCloseFactModal = () => {
    setShowFactModal(false);
    setMatchedAnimal(null);
    setCurrentAnimalFact('');
    
    if (pendingGameOver) {
      setIsGameOver(true);
      setIsGameActive(false);
      setIsProcessing(false);
    } else {
      setIsProcessing(false); // 다음 턴을 위해 잠금 해제
    }
  };

  const handleDifficultyChange = (level: GameDifficulty) => {
    if (isProcessing) return;
    setDifficulty(level);
    initGame(level);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center select-none overflow-x-hidden">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl text-emerald-600 mb-2 drop-shadow-sm">Animal Memory</h1>
        <p className="text-gray-500 font-medium italic">Discover secrets of the animal kingdom!</p>
      </header>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {(Object.values(GameDifficulty) as GameDifficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`px-6 py-2 rounded-full font-bold transition-all transform active:scale-95 ${
              difficulty === level
                ? 'bg-emerald-500 text-white shadow-lg scale-105'
                : 'bg-white text-emerald-600 hover:bg-emerald-50 shadow-sm border border-emerald-100'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      <ScoreBoard stats={stats} />

      <div className={`grid gap-4 w-full max-w-4xl px-2 mb-12 ${DIFFICULTY_SETTINGS[difficulty].cols}`}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={handleCardClick}
            disabled={isProcessing || !isGameActive}
          />
        ))}
      </div>

      {/* 게임 종료 모달 */}
      {isGameOver && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-900/60 backdrop-blur-md">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-emerald-500 text-center max-w-md animate-in zoom-in duration-300">
            <div className="text-7xl mb-4">🏆</div>
            <h2 className="text-5xl font-bold text-emerald-600 mb-4">Fantastic!</h2>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              Difficulty: {difficulty}<br/>
              Moves: {stats.moves}<br/>
              Time: {stats.timer}s
            </p>
            <button
              onClick={() => initGame(difficulty)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-5 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl text-xl"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* 동물 상식 모달 - showFactModal 상태에 따라 렌더링 */}
      {showFactModal && (
        <FactModal
          animal={matchedAnimal}
          fact={currentAnimalFact}
          onClose={handleCloseFactModal}
          isLoading={isFactLoading}
        />
      )}

      <footer className="mt-auto pt-12 pb-4 text-gray-400 text-sm font-medium">
        Powered by Gemini AI • Learn as you play!
      </footer>
    </div>
  );
};

export default App;
