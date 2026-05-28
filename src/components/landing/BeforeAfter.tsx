'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export function BeforeAfter() {
  const pairs = [
    {
      id: 1,
      title: 'The Opener Fix',
      before: 'hey',
      after: 'Okay, serious question — is your dog always judging people or just me?',
      note: 'Adds personality, curiosity, and a natural conversation hook.',
    },
    {
      id: 2,
      title: 'The Bio Fix',
      before: 'Gym. Food. Travel.',
      after: 'Gym regular, biryani loyalist, and emotionally available on alternate weekends.',
      note: 'Specific beats generic. This sounds more human and interactive.',
    },
    {
      id: 3,
      title: 'The Matrimony Starter Fix',
      before: 'Tell me about yourself.',
      after: "I'd like to understand what kind of lifestyle you imagine after marriage — career, family, space, and daily routine. What matters most to you?",
      note: 'Mature, respectful, and encourages a meaningful response.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const pairVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative py-16 bg-[#0A0A0B] overflow-hidden">
      {/* Background glow decorators */}
      <div className="absolute left-0 bottom-1/4 w-80 h-80 rounded-full bg-teal/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs text-teal font-bold tracking-widest uppercase">
            ⚡ Case Studies
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            See What Smooth Operator Actually Fixes
          </h2>
          <p className="text-muted-foreground text-sm">
            Tiny tweaks make massive impacts on how you show up. Here is a look at how we transform generic profile lines and boring openers into engaging text.
          </p>
        </div>

        {/* Before / After Rows */}
        <div className="flex flex-col space-y-8">
          {pairs.map((pair) => (
            <div key={pair.id}>
              <GlassCard className="p-6 md:p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col space-y-6">
                
                {/* Header Title */}
                <h3 className="font-heading text-lg font-bold text-white flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span>{pair.title}</span>
                </h3>

                {/* Compare Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
                  
                  {/* Before card */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex flex-col space-y-2 min-h-[100px] justify-center relative overflow-hidden">
                    <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest text-rose-400">
                      Before
                    </span>
                    <p className="text-rose-200/90 text-sm font-medium italic">
                      "{pair.before}"
                    </p>
                  </div>

                  {/* Desktop Arrow Indicator */}
                  <div className="lg:col-span-1 flex justify-center text-muted-foreground">
                    <ArrowRight size={24} className="rotate-90 lg:rotate-0 text-white/30" />
                  </div>

                  {/* After card */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex flex-col space-y-2 min-h-[100px] justify-center relative overflow-hidden">
                    <span className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest text-teal-400">
                      After
                    </span>
                    <p className="text-teal-200/90 text-sm font-semibold">
                      "{pair.after}"
                    </p>
                  </div>
                  
                </div>

                {/* AI Design Feedback note */}
                <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/5 text-xs md:text-sm">
                  <div className="w-6 h-6 rounded-lg bg-teal/10 flex items-center justify-center text-teal flex-shrink-0 mt-0.5">
                    <Sparkles size={14} />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="font-bold text-white/90">Operator Insight</span>
                    <p className="text-muted-foreground">{pair.note}</p>
                  </div>
                </div>

              </GlassCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BeforeAfter;
