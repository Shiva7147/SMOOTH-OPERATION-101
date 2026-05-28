'use client';

import { BarChart3, MessageSquare, Sparkles, Grid, Award, ClipboardList, Play, Lock, ShieldCheck, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ScoreRing from '@/components/ui/ScoreRing';

export function ProductMockups() {
  const mockups = [
    {
      id: 'score-result',
      tag: '01. Diagnostic Assessment',
      title: 'Smooth Score Result',
      icon: <BarChart3 size={16} className="text-purple-300" />,
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">Diagnostics</span>
              <span className="text-xs font-bold text-white">First Impression Index</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[8px] font-bold uppercase border border-amber-500/20">
              Needs Serious Fix
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <ScoreRing score={61} size={80} strokeWidth={6} animated={true} showLabel={false} />
            <div className="flex-grow flex flex-col space-y-1.5 text-left">
              <div>
                <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest block">Biggest Holdback</span>
                <span className="text-[11px] text-white/90 font-medium">Generic bio and unapproachable photo order</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-t border-white/5 pt-3">
            {[
              { label: 'Profile Warmth', val: 35, color: 'from-rose-500 to-rose-400' },
              { label: 'Bio Personality', val: 42, color: 'from-amber-500 to-amber-400' },
              { label: 'Reply Confidence', val: 55, color: 'from-blue-500 to-blue-400' },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                  <span>{metric.label}</span>
                  <span className="font-bold text-white/80">{metric.val} / 100</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${metric.color} rounded-full`} style={{ width: `${metric.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'ai-chat',
      tag: '02. Conversational Helper',
      title: 'Smooth AI Chat',
      icon: <MessageSquare size={16} className="text-blue-300" />,
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-bold text-white">Smooth AI Assistant</span>
            </div>
            <span className="text-[8px] font-bold text-blue bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
              Vibe Rescue
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-[10px] text-white/90">
              <span className="text-[8px] text-purple-300 font-bold uppercase block mb-0.5">She said:</span>
              "I'm not usually on this app much."
            </div>
            <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl text-[10px] space-y-1.5">
              <span className="text-[8px] text-teal-300 font-bold uppercase block">Suggested Options:</span>
              <p className="text-white/90 leading-tight">
                <span className="font-bold text-teal-400">Option 1 (Calm):</span> "Fair enough. Then I’ll make this worth the rare login."
              </p>
              <p className="text-white/90 leading-tight">
                <span className="font-bold text-blue-400">Option 2 (Playful):</span> "So basically I caught you during your annual app visit?"
              </p>
              <p className="text-white/90 leading-tight">
                <span className="font-bold text-purple-400">Option 3 (Direct):</span> "Then let’s not waste the app. Coffee this weekend?"
              </p>
            </div>
          </div>
          
          <span className="text-[9px] text-muted-foreground text-center italic">
            Generates natural, context-aware replies.
          </span>
        </div>
      )
    },
    {
      id: 'bio-rewrite',
      tag: '03. Profile Optimization',
      title: 'Bio Rewrite',
      icon: <Sparkles size={16} className="text-teal-300" />,
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-3.5 p-5 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Bio Diagnostics</span>
            <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 text-[8px] font-bold uppercase border border-teal-500/20">
              Optimized
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 bg-rose-500/5 border border-rose-500/15 rounded-xl flex flex-col space-y-1">
              <span className="text-[8px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <XCircle size={10} />
                <span>Before (Generic Checklist)</span>
              </span>
              <p className="text-[10px] text-rose-200/90 italic">"Gym. Travel. Music. Coffee."</p>
            </div>

            <div className="p-2.5 bg-teal-500/5 border border-teal-500/15 rounded-xl flex flex-col space-y-1">
              <span className="text-[8px] text-teal-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={10} />
                <span>After (Conversation Hook)</span>
              </span>
              <p className="text-[10px] text-teal-200/90 font-medium leading-relaxed">
                "Gym regular, biryani loyalist, and emotionally available on alternate weekends."
              </p>
            </div>
          </div>

          <div className="p-2 bg-white/5 rounded-xl text-[9px] text-muted-foreground border border-white/5">
            <span className="font-bold text-white block">Why it works:</span>
            Replaces generic checklists with a fun personal contrast, giving her an easy hook to start a conversation.
          </div>
        </div>
      )
    },
    {
      id: 'photo-fix',
      tag: '04. Visual Layout Audit',
      title: 'Photo Order Fix',
      icon: <Grid size={16} className="text-amber-300" />,
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Photo Critique</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 text-[8px] font-bold uppercase border border-amber-500/20">
              Vibe Analysis
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 py-1">
            {[
              { slot: '1st Photo', label: 'Approach Smile', status: '✅ Lead Photo', desc: 'Approachable', border: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300' },
              { slot: '2nd Photo', label: 'Gym Selfie', status: '⚠️ Move to 4th', desc: 'Too intense', border: 'border-amber-500/30 bg-amber-500/5 text-amber-300' },
              { slot: '3rd Photo', label: 'Car Selfie', status: '❌ Replace', desc: 'No eye contact', border: 'border-rose-500/30 bg-rose-500/5 text-rose-300' },
            ].map((pic, idx) => (
              <div key={idx} className={`p-2 rounded-xl border flex flex-col justify-between text-center min-h-[90px] ${pic.border}`}>
                <span className="text-[8px] opacity-70 uppercase font-black">{pic.slot}</span>
                <span className="text-[10px] font-bold truncate block my-1">{pic.label}</span>
                <span className="text-[8px] font-extrabold uppercase bg-white/5 py-0.5 rounded block">{pic.status}</span>
              </div>
            ))}
          </div>

          <div className="p-2 bg-white/5 rounded-xl text-[9px] text-muted-foreground border border-white/5">
            <span className="font-bold text-white block">Audit Insight:</span>
            Optimizing your lead visual photo hierarchy increases direct match swiping by over 60%.
          </div>
        </div>
      )
    },
    {
      id: 'womens-audit',
      tag: '05. Private Human Feedback',
      title: "Women's Perspective Review",
      icon: <Award size={16} className="text-rose-300" />,
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex flex-col">
              <span className="text-[8px] text-rose-300 font-extrabold uppercase tracking-widest block">Audit Reviewer</span>
              <span className="text-xs font-bold text-white">Female, 25 • Age-matched</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[8px] font-bold uppercase border border-emerald-500/20">
              Verified
            </span>
          </div>

          <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex items-center space-x-3">
            <button className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center hover:scale-105 transition-all shadow-md shadow-purple-500/30 cursor-pointer focus:outline-none flex-shrink-0">
              <Play size={10} fill="currentColor" className="ml-0.5" />
            </button>
            <div className="flex-grow flex flex-col space-y-0.5">
              <div className="h-1 bg-white/10 rounded-full relative">
                <div className="h-full bg-purple-500 rounded-full w-[35%]" />
              </div>
              <div className="flex justify-between text-[7px] text-muted-foreground font-bold">
                <span>0:14</span>
                <span>0:47</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
            <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest block mb-0.5">Feedback Extract</span>
            <p className="text-[10px] text-white/95 leading-relaxed italic">
              "Your third photo is your best asset because you're laughing naturally. Use it as your primary photo instead of the gym shot."
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'matrimony-prep',
      tag: '06. Value Alignment',
      title: 'Matrimony Call Prep',
      icon: <ClipboardList size={16} className="text-emerald-300" />,
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left h-full justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">Alignment Audit</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[8px] font-bold uppercase border border-emerald-500/20">
              Prep Active
            </span>
          </div>

          <div className="space-y-2">
            {[
              { text: 'First Call Icebreakers', desc: 'Break initial awkwardness without standard interview questions' },
              { text: 'Lifestyle & Career Alignment', desc: 'Tactful ways to understand future expectations' },
              { text: 'Red Flag Checklist', desc: 'Screen compatibility early and protect your energy' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start space-x-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
                  <CheckCircle2 size={10} className="stroke-[3]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white">{item.text}</span>
                  <span className="text-[8px] text-muted-foreground leading-tight">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-1.5 text-[9px] text-muted-foreground pt-1">
            <Lock size={10} className="text-muted-foreground" />
            <span>Confidential Matrimony Prep Guide</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative py-20 bg-[#0A0A0B] border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs text-purple font-bold tracking-widest uppercase">
            ⚡ Inside the App
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Inside Smooth Operator
          </h2>
          <p className="text-muted-foreground text-sm">
            Take a look at the exact interface and diagnostic widgets you'll use to audit your presentation, rewrite bios, verify vibes, and improve replies.
          </p>
        </div>

        {/* 6-Card Mockup Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockups.map((mockup) => (
            <div key={mockup.id} className="flex flex-col h-full">
              <GlassCard
                tilt={true}
                hover={true}
                className="w-full aspect-[9/10] relative overflow-hidden flex flex-col border border-white/10 shadow-2xl backdrop-blur-2xl bg-white/[0.02] rounded-3xl p-1"
              >
                {/* Visual Title / Description Tag inside card */}
                <div className="p-3 bg-white/[0.01] border-b border-white/5 flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    {mockup.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] text-purple-300 font-bold uppercase tracking-wider">{mockup.tag}</span>
                    <span className="text-xs font-bold text-white">{mockup.title}</span>
                  </div>
                </div>

                {/* Main Screen Content */}
                <div className="flex-grow flex items-center justify-center relative">
                  {/* Simulated phone notch/boundary inside card */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-white/5 rounded-full pointer-events-none" />
                  
                  {mockup.renderScreen()}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProductMockups;
