'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import ScoreRing from '@/components/ui/ScoreRing';
import FloatingBubble from '@/components/ui/FloatingBubble';
import { Sparkles, MessageSquare, Award, ClipboardList, Zap, ArrowRight, CheckCircle2, Play } from 'lucide-react';

interface MockupTab {
  id: string;
  label: string;
  icon: any;
  title: string;
  description: string;
  renderScreen: () => React.ReactNode;
}

export function ProductMockups() {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs: MockupTab[] = [
    {
      id: 'quiz',
      label: 'Quiz & Scoring',
      icon: <ClipboardList size={16} />,
      title: 'The 2-Minute Diagnostic Quiz',
      description: 'Get your baseline First Impression Index score. Our custom-weighted algorithm rates your profile warmth, bio personality, and reply confidence.',
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left">
          {/* Progress Header */}
          <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold tracking-widest">
            <span>QUESTION 5 OF 7</span>
            <span>71% COMPLETE</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full w-[71%]" />
          </div>
          
          {/* Question Card */}
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col space-y-4 mt-2">
            <h4 className="text-white text-sm font-bold font-heading leading-snug">
              What does your chat inbox usually look like?
            </h4>
            <div className="flex flex-col space-y-2">
              {[
                'Matches don\'t reply to my first message',
                'Conversations dry up after 3-4 messages',
                'We talk for weeks but never actually meet',
                'I get stuck answering generic interview questions',
              ].map((opt, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                    idx === 1
                      ? 'border-purple/50 bg-purple-500/10 text-white'
                      : 'border-white/5 bg-white/[0.02] text-muted-foreground'
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'chat',
      label: 'Smooth AI Chat',
      icon: <MessageSquare size={16} />,
      title: 'Conversational Rescue in Real-Time',
      description: 'Stuck on how to reply? Upload screenshots or paste text. Smooth AI maps out context-specific, high-converting replies that keep the vibe authentic.',
      renderScreen: () => (
        <div className="w-full h-full flex flex-col justify-between p-5 relative overflow-hidden select-none">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Smooth AI Assistant</span>
            </div>
            <span className="text-[9px] font-bold text-purple bg-purple-500/10 px-2 py-0.5 rounded-md">
              Chat Helper
            </span>
          </div>

          {/* Quick-Tags */}
          <div className="flex gap-2.5 py-2.5 overflow-x-auto scrollbar-none text-[9px] font-bold text-muted-foreground uppercase">
            <span className="bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap text-purple-300">Rescue Chat</span>
            <span className="bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap">Rewrite Bio</span>
            <span className="bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap">Date Prep</span>
          </div>

          {/* Messages */}
          <div className="flex flex-col space-y-3 flex-grow py-3 justify-end text-left">
            <div className="max-w-[85%] self-start p-3 bg-white/5 rounded-2xl rounded-tl-none border border-white/5">
              <p className="text-[11px] text-white/95 leading-relaxed">
                She said: "I'm not usually on this app much." How do I reply without sounding desperate?
              </p>
            </div>
            <div className="max-w-[85%] self-end p-3 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 rounded-2xl rounded-tr-none text-white font-medium shadow-md">
              <p className="text-[11px] leading-relaxed">
                "Then let's get off it. Filter coffee or craft beer this weekend?"
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'audits',
      label: 'Women\'s Audits',
      icon: <Award size={16} />,
      title: 'Private perspective audits',
      description: 'Verified women in your age range review your screenshots, photos, and messages privately. You get clear voice note feedback and 3 exact fixes.',
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-purple font-extrabold uppercase tracking-widest">Verified Reviewer</span>
              <span className="text-xs font-bold text-white">Female, 24 • Age-matched</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-[8px] font-bold uppercase border border-emerald-500/20">
              Approved
            </span>
          </div>

          {/* Voice note play */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center space-x-3">
            <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <Play size={10} fill="currentColor" className="ml-0.5" />
            </div>
            <div className="flex-grow flex flex-col space-y-0.5">
              <div className="h-1 bg-white/10 rounded-full relative">
                <div className="h-full bg-purple-500 rounded-full w-[35%]" />
              </div>
              <div className="flex justify-between text-[8px] text-muted-foreground font-bold">
                <span>0:14</span>
                <span>0:47</span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="space-y-1">
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Audit Fix</span>
            <p className="text-[11px] text-white/95 italic font-medium leading-relaxed">
              "Your third photo should be first. You look more natural and warm there. Your bio is not bad, but it gives me no reason to reply."
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      label: 'Profile & Bio Fix',
      icon: <Zap size={16} />,
      title: 'Actionable Bio Diagnostics',
      description: 'Replace boring, generic items like "I love travel, coffee, and reading" with specific personal details that act as natural hooks.',
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left">
          {/* Header */}
          <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">
            Audit Comparison
          </span>

          {/* Before */}
          <div className="p-3 bg-rose-500/5 border border-rose-500/15 rounded-xl flex flex-col space-y-1">
            <span className="text-[8px] text-rose-400 font-bold uppercase tracking-wider">Before (Generic)</span>
            <p className="text-[11px] text-rose-200/90 italic">"Gym. Travel. Music. Coffee."</p>
          </div>

          {/* Arrow */}
          <div className="flex justify-center text-muted-foreground">
            <ArrowRight size={14} className="rotate-90 md:rotate-0" />
          </div>

          {/* After */}
          <div className="p-3 bg-teal-500/5 border border-teal-500/15 rounded-xl flex flex-col space-y-1">
            <span className="text-[8px] text-teal-400 font-bold uppercase tracking-wider">After (Specific Hook)</span>
            <p className="text-[11px] text-teal-200/90 font-medium">
              "Gym regular, biryani loyalist, and emotionally available on alternate weekends."
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <ClipboardList size={16} />,
      title: 'Your Private Vibe Hub',
      description: 'Track your diagnostic score improvements, manage pending audits, schedule live coaching prep, and chat with Smooth AI.',
      renderScreen: () => (
        <div className="w-full flex flex-col space-y-4 p-5 text-left">
          {/* Header info */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Welcome Back</span>
              <span className="text-xs font-bold text-white">Rahul Sharma</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[8px] font-bold uppercase border border-purple-500/20">
              Active Plan
            </span>
          </div>

          {/* Overview grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col space-y-1">
              <span className="text-[8px] text-muted-foreground font-bold uppercase">Smooth Score</span>
              <span className="text-lg font-black text-purple">61%</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col space-y-1">
              <span className="text-[8px] text-muted-foreground font-bold uppercase">Available Credits</span>
              <span className="text-lg font-black text-teal">2 Audits</span>
            </div>
          </div>

          {/* Tasks pending */}
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between text-[10px]">
            <span className="text-white/80 font-bold flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-teal-400" />
              <span>Bio Audit Completed</span>
            </span>
            <span className="text-purple-300 font-bold">View Report →</span>
          </div>
        </div>
      ),
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="relative py-16 bg-[#0A0A0B] border-t border-white/5 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 w-80 h-80 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col space-y-3">
          <span className="text-xs text-purple font-bold tracking-widest uppercase">
            ⚡ Inside the App
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Inside Smooth Operator
          </h2>
          <p className="text-muted-foreground text-sm">
            Take a look at the exact interface you'll use to audit your presentation, rewrite bios, verify vibes, and improve replies.
          </p>
        </div>

        {/* Tab-driven visual layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Column: Tab Selector & Explanatory copy */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
            <div className="flex flex-col space-y-2">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all border text-left cursor-pointer focus:outline-none ${
                      isActive
                        ? 'bg-purple-500/10 border-purple/35 text-white shadow-lg shadow-purple/5'
                        : 'bg-transparent border-transparent text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={isActive ? 'text-purple' : 'text-inherit'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <hr className="border-white/5" />

            <div className="flex flex-col space-y-2.5">
              <h3 className="font-heading text-xl font-bold text-white">
                {currentTab.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {currentTab.description}
              </p>
            </div>
          </div>

          {/* Right Column: Immersive 3D Screen Preview Container */}
          <div className="lg:col-span-7 flex justify-center items-center select-none">
            <div className="w-full max-w-[460px] aspect-[9/10] relative flex items-center justify-center">
              {/* Card container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' as const }}
                  className="w-full h-full"
                >
                  <GlassCard
                    tilt={true}
                    hover={true}
                    className="w-full h-full flex flex-col justify-center items-center border-white/10 shadow-2xl bg-white/[0.03] rounded-3xl"
                  >
                    {/* Simulated phone frame boundary */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-white/10 rounded-full pointer-events-none" />
                    
                    {currentTab.renderScreen()}
                  </GlassCard>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductMockups;
