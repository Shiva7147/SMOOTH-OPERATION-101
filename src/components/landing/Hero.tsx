'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import FloatingBubble from '@/components/ui/FloatingBubble';
import GlowOrb from '@/components/ui/GlowOrb';
import ScoreRing from '@/components/ui/ScoreRing';
import { Sparkles, ArrowRight, ShieldCheck, Lock, Play } from 'lucide-react';

export function Hero() {
  const router = useRouter();
  const { enterDemoMode } = useAuth();

  const handleDemoClick = () => {
    enterDemoMode();
    router.push('/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B] pt-32 pb-16 px-6">
      {/* ─── Premium Ambient Background Spotlights ────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <GlowOrb color="purple" size={600} className="top-[-10%] left-[-10%] opacity-20" />
        <GlowOrb color="blue" size={500} className="bottom-[-10%] right-[-10%] opacity-20" />
        <GlowOrb color="teal" size={400} className="top-1/3 right-1/4 opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* ─── Left Column: Core Value Proposition ─────────────────────────── */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
          {/* Seductive Badge */}
          <div className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-300 tracking-wide backdrop-blur-md">
            <Sparkles size={12} className="animate-pulse" />
            <span>AI + Human Feedback Platform</span>
          </div>

          {/* Seductive Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-2xl">
            You are not <span className="underline decoration-purple/40">boring</span>.
            <br />
            Your profile just makes
            <br />
            you look <span className="gradient-text font-black">boring</span>.
          </h1>

          {/* Polished Subheadline */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-normal">
            Take the Smooth Score quiz, fix your profile, upgrade your replies, and get private feedback from verified women in your age range.
          </p>

          {/* Microcopy of trust */}
          <p className="text-[10px] sm:text-xs text-white/50 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>No fake personality. No creepy pickup lines. Just better first impressions.</span>
          </p>

          {/* Upgraded CTA Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <GradientButton href="/quiz" variant="primary" size="lg" className="shadow-lg shadow-purple-500/20">
              <span className="flex items-center gap-1.5">
                <span>Take the Smooth Score Quiz</span>
                <ArrowRight size={16} />
              </span>
            </GradientButton>

            <button
              onClick={handleDemoClick}
              className="px-6 py-4 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all text-center cursor-pointer focus:outline-none"
            >
              Try Demo Without Login
            </button>

            <Link
              href="/signup"
              className="px-6 py-4 rounded-xl border border-purple-500/20 bg-purple-500/5 text-sm font-semibold text-purple-300 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all text-center focus:outline-none"
            >
              Roast My Profile
            </Link>
          </div>

          {/* See how it works link */}
          <div className="pt-1 select-none">
            <Link
              href="#how-it-works"
              className="text-xs sm:text-sm font-semibold text-purple hover:text-purple/80 hover:underline transition-all flex items-center"
            >
              See how it works <span className="ml-1 animate-bounce-horizontal">→</span>
            </Link>
          </div>
        </div>

        {/* ─── Right Column: 3D App Diagnostic Scene ─────────────────────── */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center py-12 lg:py-0 select-none">
          <div className="relative w-full max-w-[420px] aspect-[9/10] flex items-center justify-center">
            {/* Ambient background glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl pointer-events-none animate-pulse-glow" />

            {/* Premium 3D GlassCard */}
            <GlassCard
              tilt={true}
              hover={true}
              className="w-full p-6 relative overflow-hidden flex flex-col space-y-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl bg-white/[0.03]"
            >
              {/* Animated vertical scan line */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-40 animate-scan pointer-events-none z-20" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 z-10">
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    Diagnostic Report
                  </span>
                  <span className="text-sm font-bold text-white">
                    First Impression Index
                  </span>
                </div>
                <span className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300">
                  Needs Better Hooks
                </span>
              </div>

              {/* Main Diagnostic Data */}
              <div className="grid grid-cols-12 gap-4 items-center z-10">
                {/* Score Widget */}
                <div className="col-span-5 flex justify-center">
                  <ScoreRing score={64} size={110} strokeWidth={8} animated={true} />
                </div>

                {/* Initial Audit Text */}
                <div className="col-span-7 flex flex-col space-y-2 text-left">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                      Operator Insight
                    </span>
                    <p className="text-white/90 text-xs font-semibold leading-relaxed">
                      "Your profile feels safe, but forgettable."
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-purple-300 uppercase font-bold tracking-widest">
                      Actionable Fix
                    </span>
                    <p className="text-purple-200/90 text-[11px] leading-relaxed">
                      Move your warmest photo first. Add one bio line that gives her something to reply to.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sub-metrics Progress Bars */}
              <div className="space-y-2.5 pt-2 border-t border-white/5 z-10">
                {[
                  { label: 'Profile Warmth', val: 35 },
                  { label: 'Bio Personality', val: 42 },
                  { label: 'Reply Confidence', val: 55 },
                  { label: 'Conversation Hooks', val: 48 },
                  { label: 'Vibe Clarity', val: 62 },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-[11px] text-muted-foreground mb-0.5 text-left">
                      <span className="font-medium">{metric.label}</span>
                      <span className="font-bold text-white/90">{metric.val} / 100</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        style={{ width: `${metric.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Privacy indicators */}
              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-muted-foreground pt-1 z-10">
                <Lock size={10} className="text-muted-foreground" />
                <span>100% Secure & Private Assessment</span>
              </div>
            </GlassCard>

            {/* Absolute Floating Comparison Bubbles */}
            <FloatingBubble
              text="hey, how are you? 😊"
              delay={0}
              position={{ top: '-15px', left: '-55px' }}
              variant="incoming"
            />
            <FloatingBubble
              text="Try: 'Okay serious question — is your dog always judging people or just me?'"
              delay={2.5}
              position={{ bottom: '-15px', right: '-45px' }}
              variant="outgoing"
              className="scale-95 shadow-2xl border border-white/10"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
