'use client';

import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import { Sparkles, Calendar, MessageSquare, Video, ShieldCheck } from 'lucide-react';

export default function EliteOnboardingPage() {
  const steps = [
    {
      id: 1,
      icon: <Calendar size={20} className="text-purple-300" />,
      title: 'Schedule Your video call',
      desc: 'Book your first 1-on-1 private video diagnostic session (30 minutes) with your assigned senior dating coach.',
      cta: 'Schedule coaching call',
    },
    {
      id: 2,
      icon: <MessageSquare size={20} className="text-blue-300" />,
      title: 'Join VIP WhatsApp Support',
      desc: 'Connect with our support team on a dedicated WhatsApp line for priority questions, text opening help, and rapid reviews.',
      cta: 'Connect on WhatsApp',
    },
    {
      id: 3,
      icon: <Video size={20} className="text-teal-300" />,
      title: 'Submit your profile screens',
      desc: 'Request a complete profile overhaul. Our copywriter will write custom bios, choose and order your photos, and set up your opener strategy.',
      cta: 'Submit for Overhaul',
      href: '/dashboard/review-request',
    },
  ];

  return (
    <div className="flex flex-col space-y-8 max-w-3xl mx-auto text-left">
      
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-purple">
          <Sparkles size={14} className="animate-spin-slow" />
          <span>Smooth Operator Elite</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
          Welcome to the Elite Circle
        </h1>
        <p className="text-muted-foreground text-sm max-w-md">
          Your complete dating glow-up has officially started. Let's get your workspace fully integrated.
        </p>
      </div>

      {/* Intro Welcome Card */}
      <GlassCard className="p-8 rounded-3xl border-white/5 bg-gradient-to-r from-purple/10 to-blue/10 flex flex-col space-y-4">
        <h2 className="font-heading text-xl font-bold text-white flex items-center space-x-2">
          <span>Your Transformation Roadmap</span>
        </h2>
        <p className="text-white/80 text-sm sm:text-base leading-relaxed">
          Elite membership gives you direct video calls, professional copywriters, and WhatsApp texting assistance. We don't teach pickup lines — we restructure your entire presentation so you stand out with genuine confidence.
        </p>
      </GlassCard>

      {/* Onboarding steps list */}
      <div className="flex flex-col space-y-6">
        {steps.map((step) => (
          <GlassCard
            key={step.id}
            className="p-6 rounded-2xl border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div className="flex flex-col space-y-1 max-w-md">
                <span className="text-xs font-bold text-purple-300">Step {step.id}</span>
                <h3 className="font-heading text-base font-bold text-white leading-tight">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 self-start md:self-center">
              <GradientButton
                href={step.href || '#'}
                variant={step.id === 1 ? 'primary' : 'secondary'}
                size="sm"
                className="whitespace-nowrap min-w-[150px]"
              >
                {step.cta}
              </GradientButton>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Safety and privacy disclaimer */}
      <div className="flex items-center justify-center space-x-2 text-center text-xs text-muted-foreground py-4 border-t border-white/5 mt-6">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>Elite coaching sessions are confidential. Recordings are only shared with you.</span>
      </div>

    </div>
  );
}
