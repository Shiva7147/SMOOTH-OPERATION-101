'use client';

import { motion } from 'framer-motion';
import { Check, Star, Lock, Play, ShieldAlert, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';

export function WomensPerspective() {
  const features = [
    { text: 'Age-matched perspective', desc: 'Feedback from women in your target age range.' },
    { text: 'Private, confidential audit', desc: 'No one sees your uploads or results except the reviewer.' },
    { text: 'No direct reviewer contact', desc: 'Strict firewall: they review materials, but cannot text you.' },
    { text: 'No public exposure', desc: 'Absolutely no public roasting or sharing screenshots.' },
    { text: 'Voice note + written feedback', desc: 'Hear her actual tone and see detailed recommendations.' },
    { text: 'Exact fixes, not vague advice', desc: 'Specific tweaks you can apply in under 5 minutes.' },
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

  const itemVariants = {
    hidden: { opacity: 1, x: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section className="relative py-16 bg-[#0A0A0B] overflow-hidden">
      {/* Background glow decorator */}
      <div className="absolute left-10 top-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ─── Left Column: Product Module Detail ────────────────────────── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
            <span className="text-xs text-purple font-bold tracking-widest uppercase">
              👩‍🦰 The Perspective Check
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              AI Can Guess.
              <br />
              <span className="gradient-text font-black">Real Perspective Hits Different.</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
              Smooth AI is excellent for identifying typos, basic formatting issues, and rating photo sharpness. But human attraction is nuanced. 
              <br /><br />
              Get private, constructive feedback from verified women in your age range to learn how you actually come across.
            </p>

            {/* Checklist */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
              {features.map((feat, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple flex-shrink-0 mt-0.5">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-white">{feat.text}</span>
                    <span className="text-[10px] text-muted-foreground">{feat.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="pt-6 w-full sm:w-auto">
              <GradientButton href="/pricing" variant="primary" size="lg" className="shadow-lg shadow-purple-500/20">
                Get Women's Perspective Review
              </GradientButton>
            </div>
          </div>

          {/* ─── Right Column: Interactive Review Preview Card ────────────── */}
          <div className="lg:col-span-6 flex flex-col space-y-6">
            <div>
              <GlassCard
                hover={true}
                className="p-6 md:p-8 rounded-3xl border-white/10 bg-white/[0.04] shadow-2xl relative flex flex-col space-y-4 max-w-[500px] mx-auto"
              >
                {/* Header info */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-purple-300 font-extrabold uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={10} />
                      <span>Verified Perspective Review</span>
                    </span>
                    <span className="text-sm font-bold text-white">Female, 24 • Age-matched</span>
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    <Lock size={12} className="text-emerald-400" />
                    <span>Private Audit</span>
                  </div>
                </div>

                {/* Voice Note Player Widget Mockup */}
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-4">
                  <button className="w-9 h-9 rounded-full bg-purple text-white flex items-center justify-center hover:scale-105 transition-all shadow-md shadow-purple-500/30 cursor-pointer focus:outline-none">
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                  </button>
                  <div className="flex-grow flex flex-col space-y-1 text-left">
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden relative">
                      <div className="h-full bg-purple-500 rounded-full w-[40%]" />
                    </div>
                    <div className="flex justify-between text-[9px] text-muted-foreground font-semibold">
                      <span>0:18</span>
                      <span>0:47</span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <div className="text-left space-y-1">
                  <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">
                    Reviewer Feedback
                  </span>
                  <p className="text-white/95 text-xs sm:text-sm italic font-medium leading-relaxed">
                    "Your third photo should be first. You look more natural there. Your bio is not bad, but it gives me no reason to reply."
                  </p>
                </div>

                {/* Specific Action items */}
                <div className="text-left space-y-2.5 pt-2 border-t border-white/5">
                  <span className="text-[9px] text-teal-300 uppercase font-black tracking-widest flex items-center gap-1">
                    <span>Action Items Checklist</span>
                  </span>
                  <ol className="space-y-1.5 text-xs text-white/90 font-medium">
                    <li className="flex items-start space-x-2">
                      <span className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Move photo 3 first (smiling, blue shirt)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Remove gym mirror selfie entirely</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Add one specific bio hook (e.g. favorite roadtrip opinion)</span>
                    </li>
                  </ol>
                </div>
              </GlassCard>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default WomensPerspective;
