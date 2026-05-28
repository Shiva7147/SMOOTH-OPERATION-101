'use client';

import { motion } from 'framer-motion';
import { UploadCloud, BarChart3, Wrench, Users } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <UploadCloud size={24} className="text-purple-300" />,
      title: 'Upload Profile',
      description: 'Upload screenshots of your dating profile, bio, or chats privately.',
    },
    {
      id: 2,
      icon: <BarChart3 size={24} className="text-blue-300" />,
      title: 'Get Scored',
      description: 'Take the 2-minute quiz to generate your baseline Smooth Score.',
    },
    {
      id: 3,
      icon: <Wrench size={24} className="text-teal-300" />,
      title: 'Fix The Vibe',
      description: 'Get AI rewrite suggestions for openers, bios, and photo strategy.',
    },
    {
      id: 4,
      icon: <Users size={24} className="text-amber-300" />,
      title: 'Get Reviewed',
      description: "Upgrade for real women's perspectives and 1-on-1 elite coaching.",
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

  const cardVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="how-it-works" className="relative py-16 bg-[#0A0A0B] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col space-y-3">
          <span className="text-xs text-purple font-bold tracking-widest uppercase">
            Step-by-Step Vibe Check
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            How Smooth Operator Works
          </h2>
          <p className="text-muted-foreground text-sm">
            Stop second-guessing what she thinks. Our hybrid AI + human review process is built in four simple, private steps.
          </p>
        </div>

        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.id} className="h-full">
              <GlassCard
                hover={true}
                className="p-6 h-full flex flex-col items-start space-y-4 relative group"
              >
                {/* Step Number Badge */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-tr from-purple to-indigo-500 flex items-center justify-center text-white text-xs font-bold font-heading shadow-md shadow-purple/10">
                  {step.id}
                </div>

                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-purple/30 group-hover:bg-purple/5 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex flex-col space-y-2 pt-2">
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

export default HowItWorks;
