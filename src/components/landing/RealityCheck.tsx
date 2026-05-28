'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';

export function RealityCheck() {
  const cards = [
    {
      id: 1,
      emoji: '💬',
      text: "You got the match. Then sent 'hey' and watched it die.",
      bg: 'from-rose-500/10 via-rose-500/5 to-transparent border-rose-500/20 hover:border-rose-500/35',
      emojiBg: 'bg-rose-500/20 text-rose-300',
    },
    {
      id: 2,
      emoji: '📸',
      text: "Your bio says 'fun guy.' Your photos say 'Aadhaar card reshoot.'",
      bg: 'from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/20 hover:border-purple-500/35',
      emojiBg: 'bg-purple-500/20 text-purple-300',
    },
    {
      id: 3,
      emoji: '🌵',
      text: "Your opener was so dry, even the conversation needed water.",
      bg: 'from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/20 hover:border-amber-500/35',
      emojiBg: 'bg-amber-500/20 text-amber-300',
    },
    {
      id: 4,
      emoji: '🏋️',
      text: 'Your gym mirror photo is not a personality.',
      bg: 'from-blue-500/10 via-blue-500/5 to-transparent border-blue-500/20 hover:border-blue-500/35',
      emojiBg: 'bg-blue-500/20 text-blue-300',
    },
    {
      id: 5,
      emoji: '🏦',
      text: "Your profile says 'date me.' Your pictures say 'bank KYC pending.'",
      bg: 'from-orange-500/10 via-orange-500/5 to-transparent border-orange-500/20 hover:border-orange-500/35',
      emojiBg: 'bg-orange-500/20 text-orange-300',
    },
    {
      id: 6,
      emoji: '📝',
      text: 'Your bio has the personality of a terms and conditions page.',
      bg: 'from-pink-500/10 via-pink-500/5 to-transparent border-pink-500/20 hover:border-pink-500/35',
      emojiBg: 'bg-pink-500/20 text-pink-300',
    },
    {
      id: 7,
      emoji: '👻',
      text: 'She did not ghost you. Your opener ghosted itself.',
      bg: 'from-teal-500/10 via-teal-500/5 to-transparent border-teal-500/20 hover:border-teal-500/35',
      emojiBg: 'bg-teal-500/20 text-teal-300',
    },
    {
      id: 8,
      emoji: '🤡',
      text: "You said 'I am different from other boys.' That is exactly what other boys say.",
      bg: 'from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-500/20 hover:border-cyan-500/35',
      emojiBg: 'bg-cyan-500/20 text-cyan-300',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 1, scale: 1, y: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative py-16 bg-[#0A0A0B] border-t border-b border-white/5 overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col space-y-4">
          <span className="text-xs text-orange font-bold tracking-widest uppercase">
            🚨 Vibe Check
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Reality Check: She Did Not Ghost You.
            <br />
            <span className="gradient-text-warm">Your Opener Ghosted Itself.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Before you blame the algorithms or your luck, let's look at the facts. If your profile falls into any of these common traps, you're playing on hard mode.
          </p>
        </div>

        {/* Horizontal scroll on mobile / Grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-none md:scrollbar-thin scroll-pl-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[280px] md:w-auto snap-start h-full"
            >
              <GlassCard
                hover={true}
                className={`p-6 h-full flex flex-col items-start space-y-4 rounded-3xl border bg-gradient-to-b ${card.bg} transition-all duration-300 min-h-[160px]`}
              >
                {/* Emoji bubble */}
                <div className={`w-10 h-10 rounded-xl ${card.emojiBg} flex items-center justify-center text-xl shadow-inner border border-white/5`}>
                  {card.emoji}
                </div>

                {/* Funny text description */}
                <p className="text-white/90 text-sm font-semibold leading-relaxed text-left">
                  "{card.text}"
                </p>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* CTA section below cards */}
        <div className="flex justify-center pt-12">
          <GradientButton href="/quiz" variant="primary" size="lg" className="px-10 shadow-lg shadow-purple-500/20">
            Okay, roast mine
          </GradientButton>
        </div>

      </div>
    </section>
  );
}

export default RealityCheck;
