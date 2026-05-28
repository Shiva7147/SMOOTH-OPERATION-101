'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import GlowOrb from '@/components/ui/GlowOrb';
import GradientButton from '@/components/ui/GradientButton';

export function FinalCTA() {
  const router = useRouter();
  const { enterDemoMode } = useAuth();

  const handleDemoClick = () => {
    enterDemoMode();
    router.push('/dashboard');
  };

  return (
    <section className="relative py-20 px-6 bg-[#0A0A0B] overflow-hidden text-center">
      {/* Background glowing decorator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <GlowOrb color="purple" size={450} className="opacity-25" />
        <GlowOrb color="blue" size={300} className="opacity-15 translate-x-20" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center space-y-8">
        
        {/* Subtitle badge */}
        <span className="text-xs text-purple font-bold tracking-widest uppercase">
          🚀 Stop second-guessing
        </span>

        {/* Headline */}
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white leading-tight max-w-2xl">
          Your First Impression is Already Speaking.
          <br />
          <span className="gradient-text font-black">Make Sure It Says the Right Thing.</span>
        </h2>

        {/* Subtext */}
        <p className="text-muted-foreground text-base max-w-lg leading-relaxed">
          Fix the vibe of your photos, bios, and openers in under two minutes. Take the Smooth Score assessment now.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto pt-4">
          <GradientButton href="/quiz" variant="primary" size="lg" className="px-10 shadow-lg shadow-purple-500/20">
            Get My Smooth Score
          </GradientButton>
          <button
            onClick={handleDemoClick}
            className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all text-center cursor-pointer focus:outline-none"
          >
            Try Demo Without Login
          </button>
        </div>

      </div>
    </section>
  );
}

export default FinalCTA;
