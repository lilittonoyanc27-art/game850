import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import { 
  PREPOSITION_QUESTIONS, 
  GENDER_EXCEPTIONS, 
  ADJECTIVE_PLURAL_QUESTIONS 
} from './constants';

type GameMode = 'prepositions' | 'exceptions' | 'plurals';

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [currentMode, setCurrentMode] = useState<GameMode>('prepositions');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedExceptions, setSelectedExceptions] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Game 1 Questions (Prepositions)
  const prepositionQuestions = useMemo(() => [...PREPOSITION_QUESTIONS].sort(() => Math.random() - 0.5), []);
  
  // Game 3 Questions (Plurals)
  const pluralsQuestions = useMemo(() => [...ADJECTIVE_PLURAL_QUESTIONS].sort(() => Math.random() - 0.5), []);

  const handlePrepositionChoice = (choice: string) => {
    if (feedback) return;
    const current = prepositionQuestions[currentIndex];
    if (choice === current.target) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < prepositionQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        // Move to Game 2
        setCurrentMode('exceptions');
        setCurrentIndex(0);
      }
    }, 1200);
  };

  const handleExceptionToggle = (id: string) => {
    setSelectedExceptions(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const submitExceptions = () => {
    let bonus = 0;
    GENDER_EXCEPTIONS.forEach(item => {
      const isSelected = selectedExceptions.includes(item.id);
      if (isSelected === item.isException) {
        bonus += 0.5; // Half point for each correct boolean check
      }
    });
    setScore(s => s + Math.floor(bonus));
    setShowResults(true);
    setTimeout(() => {
      setShowResults(false);
      setCurrentMode('plurals');
      setCurrentIndex(0);
    }, 2500);
  };

  const handlePluralChoice = (choice: string) => {
    if (feedback) return;
    const current = pluralsQuestions[currentIndex];
    if (choice === current.pluralTarget) {
      setFeedback('correct');
      setScore(s => s + 1);
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < pluralsQuestions.length - 1) {
        setCurrentIndex(i => i + 1);
      } else {
        setGameState('end');
      }
    }, 1200);
  };

  const restart = () => {
    setGameState('start');
    setCurrentMode('prepositions');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedExceptions([]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans overflow-x-hidden p-4 flex flex-col items-center justify-center">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#0f172a_100%)]" />
      <div className="fixed inset-0 pointer-events-none -z-10 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/5 shadow-2xl text-center"
          >
            <div className="mb-10 flex justify-center gap-4">
              <div className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center shadow-lg rotate-[-10deg]">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <div className="w-20 h-20 bg-red-500 rounded-3xl flex items-center justify-center shadow-lg rotate-[5deg] z-10">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center shadow-lg rotate-[15deg]">
                <Info className="w-10 h-10 text-white" />
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-red-500 to-yellow-500 leading-none">
              SPANISH PRO
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] mb-12 text-xs">Prepositions & Grammar Challenge</p>

            <button 
              onClick={() => setGameState('playing')}
              className="w-full py-8 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-[2.5rem] font-black text-3xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-4 border-b-8 border-red-800"
            >
              <Play className="w-10 h-10 fill-white" />
              START GAME
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl flex flex-col items-center"
          >
            {/* HUD */}
            <div className="w-full flex justify-between items-center mb-8 px-4">
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest ${
                  currentMode === 'prepositions' ? 'bg-orange-600' : 
                  currentMode === 'exceptions' ? 'bg-red-600' : 'bg-yellow-600'
                }`}>
                  {currentMode}
                </div>
              </div>
              <div className="bg-slate-900/80 px-6 py-2 rounded-full border border-white/10">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mr-2">Score</span>
                <span className="font-black text-xl">{score}</span>
              </div>
            </div>

            {/* Game Containers */}
            <AnimatePresence mode="wait">
              {currentMode === 'prepositions' && (
                <motion.div
                  key="prepositions"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="w-full bg-slate-900/80 backdrop-blur-2xl p-8 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl relative"
                >
                  <div className="mb-4 text-center">
                    <span className="text-orange-500 font-black text-xs uppercase tracking-widest leading-none">Prepositions (En, De, A)</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black mb-4 italic text-center text-orange-400">"{prepositionQuestions[currentIndex].prompt}"</h2>
                  <p className="text-slate-500 font-bold mb-12 text-center italic">({prepositionQuestions[currentIndex].translation})</p>

                  <div className="grid grid-cols-3 gap-4">
                    {prepositionQuestions[currentIndex].choices.map(choice => (
                      <button
                        key={choice}
                        onClick={() => handlePrepositionChoice(choice)}
                        className={`py-8 rounded-3xl font-black text-3xl transition-all border-b-8 ${
                          feedback === 'correct' && choice === prepositionQuestions[currentIndex].target
                            ? 'bg-emerald-500 border-emerald-700 text-white'
                            : feedback === 'incorrect' && choice === prepositionQuestions[currentIndex].target
                            ? 'bg-rose-500 border-rose-700 text-white'
                            : 'bg-slate-800 border-slate-950 text-slate-100 hover:bg-slate-700'
                        }`}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentMode === 'exceptions' && (
                <motion.div
                  key="exceptions"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  className="w-full bg-slate-900/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl"
                >
                  <div className="mb-6 text-center">
                    <span className="text-red-500 font-black text-xs uppercase tracking-widest">Exceptions Challenge</span>
                    <h2 className="text-2xl md:text-4xl font-black mt-2 text-white italic">SELECT THE GENDER EXCEPTIONS</h2>
                    <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-tight">Pick the words that don't follow the O=el / A=la rule</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
                    {GENDER_EXCEPTIONS.map(item => (
                      <button
                        key={item.id}
                        disabled={showResults}
                        onClick={() => handleExceptionToggle(item.id)}
                        className={`relative group p-4 rounded-2xl border-2 transition-all aspect-square flex flex-col items-center justify-center ${
                          selectedExceptions.includes(item.id)
                            ? 'bg-red-600 border-red-400 scale-105 shadow-xl'
                            : 'bg-slate-800 border-slate-700 hover:border-slate-500'
                        }`}
                      >
                        <span className="text-[10px] font-black text-white/40 mb-1">{item.gender}</span>
                        <span className="text-lg font-black uppercase tracking-tighter">{item.word}</span>
                        <div className="absolute inset-x-0 bottom-1 text-[8px] font-bold text-center opacity-0 group-hover:opacity-40">{item.translation}</div>
                        {showResults && (
                          <div className="absolute top-1 right-1">
                            {item.isException ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-slate-400/30" />}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={submitExceptions}
                    className="w-full py-6 bg-red-600 hover:bg-red-500 text-white rounded-[2rem] font-black text-xl shadow-xl transition-all border-b-4 border-red-800"
                  >
                    SUBMIT EXCEPTIONS
                  </button>
                </motion.div>
              )}

              {currentMode === 'plurals' && (
                <motion.div
                  key="plurals"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="w-full bg-slate-900/80 backdrop-blur-2xl p-8 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl"
                >
                  <div className="mb-4 text-center">
                    <span className="text-yellow-500 font-black text-xs uppercase tracking-widest leading-none">Singular to Plural</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-2 italic text-center text-yellow-400">{pluralsQuestions[currentIndex].singular}</h2>
                  <p className="text-slate-500 font-bold mb-10 text-center italic">({pluralsQuestions[currentIndex].translation})</p>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      pluralsQuestions[currentIndex].pluralTarget,
                      // Generate a fake wrong choice by changing the adjective or article
                      pluralsQuestions[currentIndex].pluralTarget.replace(/s\.|s /g, ' '),
                      pluralsQuestions[currentIndex].pluralTarget.replace('son', 'es')
                    ].sort().map((choice, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePluralChoice(choice)}
                        className={`py-6 px-4 rounded-[2rem] font-black text-xl md:text-2xl transition-all border-b-6 text-left flex items-center justify-between ${
                          feedback === 'correct' && choice === pluralsQuestions[currentIndex].pluralTarget
                            ? 'bg-emerald-500 border-emerald-700 text-white'
                            : feedback === 'incorrect' && choice === pluralsQuestions[currentIndex].pluralTarget
                            ? 'bg-rose-500 border-rose-700 text-white'
                            : 'bg-slate-800 border-slate-950 text-slate-100 hover:bg-slate-700'
                        }`}
                      >
                        <span>{choice}</span>
                        {feedback && choice === pluralsQuestions[currentIndex].pluralTarget && <CheckCircle2 className="w-8 h-8" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* In-Game Feedback Overlay */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                >
                  {feedback === 'correct' ? (
                    <div className="bg-emerald-500 text-white p-10 rounded-full shadow-[0_0_80px_rgba(16,185,129,0.4)]">
                      <CheckCircle2 className="w-20 h-20" />
                    </div>
                  ) : (
                    <div className="bg-rose-500 text-white p-10 rounded-full shadow-[0_0_80px_rgba(244,63,94,0.4)]">
                      <XCircle className="w-20 h-20" />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'end' && (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-slate-900/80 backdrop-blur-3xl p-16 rounded-[5rem] border border-white/10 shadow-2xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500" />
            <Trophy className="w-32 h-32 text-yellow-400 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
            
            <h1 className="text-6xl font-black mb-4 italic tracking-tighter uppercase">VICTORY!</h1>
            <p className="text-slate-500 font-bold mb-12 uppercase tracking-widest text-xs">Total Score</p>
            
            <div className="text-8xl font-black mb-12 text-white italic drop-shadow-xl">{score}</div>

            <button 
              onClick={restart}
              className="w-full py-6 bg-white text-slate-900 rounded-[2.5rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4 border-b-6 border-slate-300"
            >
              <RotateCcw className="w-8 h-8" />
              PLAY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
