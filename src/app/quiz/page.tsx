'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { quizQuestions } from '@/constants/quiz-questions';
import { calculateSmoothScore } from '@/lib/quiz-scoring';
import { saveQuizAnswers, saveSmoothScore } from '@/lib/firestore';
import { useAuth } from '@/hooks/useAuth';
import GlassCard from '@/components/ui/GlassCard';
import GlowOrb from '@/components/ui/GlowOrb';
import Navbar from '@/components/layout/Navbar';

export default function QuizPage() {
  const { user, isDemo } = useAuth();
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const currentQuestion = quizQuestions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / quizQuestions.length) * 100);

  const handleOptionSelect = async (optionIndex: number) => {
    // Store answer as the option index string, which the scoring algorithm expects
    const newAnswers = {
      ...answers,
      [currentQuestion!.id]: optionIndex.toString(),
    };
    setAnswers(newAnswers);

    if (currentIdx < quizQuestions.length - 1) {
      setDirection('forward');
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Calculate score on the final question
      const scoreResult = calculateSmoothScore(newAnswers);

      if (user && !isDemo) {
        // Authenticated: Save answers & score to Firestore
        try {
          await saveQuizAnswers(user.uid, newAnswers);
          await saveSmoothScore(user.uid, scoreResult);
        } catch (err) {
          console.error('Failed to save quiz results in DB:', err);
        }
      } else {
        // Guest or Demo: Save to sessionStorage to retrieve on the results page
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('guest_answers', JSON.stringify(newAnswers));
          sessionStorage.setItem('guest_score', JSON.stringify(scoreResult));
        }
      }

      router.push('/quiz/result');
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setDirection('backward');
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // Framer motion variants for slide transitions
  const slideVariants = {
    enter: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' as const },
    },
    exit: (dir: 'forward' | 'backward') => ({
      x: dir === 'forward' ? '-100%' : '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' as const },
    }),
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative px-6 flex items-center justify-center">
        {/* Glow Decorators */}
        <GlowOrb color="purple" size={400} className="top-10 left-10 opacity-20" />
        <GlowOrb color="blue" size={350} className="bottom-10 right-10 opacity-20" />

        <div className="w-full max-w-[650px] relative z-10 flex flex-col space-y-6">
          
          {/* Progress Header */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
              <button
                onClick={handleBack}
                disabled={currentIdx === 0}
                className="flex items-center space-x-1 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-muted-foreground"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <span>
                Question {currentIdx + 1} of {quizQuestions.length}
              </span>
            </div>

            {/* Progress bar container */}
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full gradient-bg rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Animate Card Transitions */}
          <div className="relative min-h-[380px] w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {currentQuestion && (
                <motion.div
                  key={currentQuestion.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  <GlassCard className="p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col space-y-6">
                    {/* Question category header */}
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-purple-300">
                      <HelpCircle size={14} />
                      <span>{currentQuestion.category.replace('_', ' ')}</span>
                    </div>

                    {/* Question text */}
                    <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white leading-snug">
                      {currentQuestion.question}
                    </h2>

                    {/* Options list */}
                    <div className="flex flex-col space-y-3 pt-2">
                      {currentQuestion.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(idx)}
                          className="w-full text-left p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-purple/30 text-white text-sm sm:text-base font-medium transition-all flex items-center justify-between group focus:outline-none"
                        >
                          <span className="pr-4">{option}</span>
                          <ChevronRight
                            size={16}
                            className="text-muted-foreground group-hover:text-purple group-hover:translate-x-1 transition-all"
                          />
                        </button>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground">
            🔒 Private & Confidential. Your answers will not be shared.
          </p>

        </div>
      </main>
    </div>
  );
}
