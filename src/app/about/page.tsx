import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import GlowOrb from '@/components/ui/GlowOrb';
import { ABOUT } from '@/constants/copy';
import { Check, ShieldAlert, Sparkles, Compass } from 'lucide-react';

export default function AboutPage() {
  const categories = [
    {
      title: 'What We Help With',
      icon: <Sparkles className="text-purple-300" size={18} />,
      items: [
        'Profile optimization (photos, structure, prompts)',
        'Dating & matrimony bio rewrites',
        'Chat feedback & reply assistance',
        'First impression index audits',
        'Dating confidence & communication drills',
        'Matrimony call preparation coaching',
      ],
    },
    {
      title: 'What We Are NOT',
      icon: <ShieldAlert className="text-rose-300" size={18} />,
      items: [
        'We are NOT a dating app or matchmaker.',
        'We do NOT sell copy-paste pickup lines.',
        'We do NOT teach manipulation tricks or pick-up-artist games.',
        'We are NOT a creepy "get any girl" app.',
        'We never share your photos or reviews publicly.',
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative px-6">
        {/* Glow orbs */}
        <GlowOrb color="purple" size={400} className="top-10 left-10 opacity-20" />
        <GlowOrb color="blue" size={300} className="bottom-10 right-10 opacity-20" />

        <div className="max-w-4xl mx-auto flex flex-col space-y-16 relative z-10">
          
          {/* Hero Section */}
          <div className="text-center flex flex-col space-y-4">
            <span className="text-xs text-purple font-bold tracking-widest uppercase">
              ✨ Our Philosophy
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              We are not here to make you fake.
              <br />
              <span className="gradient-text">We are here to help you show up better.</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed pt-2">
              {ABOUT.mission}
            </p>
          </div>

          {/* About Narrative */}
          <GlassCard className="p-8 rounded-3xl border-white/5 space-y-6">
            <h2 className="font-heading text-2xl font-bold text-white flex items-center space-x-2">
              <Compass size={22} className="text-purple-300" />
              <span>{ABOUT.story.title}</span>
            </h2>
            {ABOUT.story.paragraphs.map((para, idx) => (
              <p key={idx} className="text-white/80 text-sm sm:text-base leading-relaxed">
                {para}
              </p>
            ))}
          </GlassCard>

          {/* Grid: What We Do vs What We Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <GlassCard
                key={category.title}
                className="p-6 rounded-2xl border-white/5 flex flex-col space-y-4"
              >
                <div className="flex items-center space-x-2 pb-2 border-b border-white/5">
                  {category.icon}
                  <h3 className="font-heading text-lg font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-sm text-white/90">
                      <div className="mt-0.5 flex-shrink-0 text-purple-300">
                        <Check size={14} className="stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>

          {/* Our Core Approach */}
          <GlassCard className="p-6 md:p-8 rounded-3xl border-white/5 bg-gradient-to-r from-purple/5 to-blue/5 border border-purple/10 flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-purple">
              Our Hybrid Engine
            </span>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
              AI gives speed. Real perspective gives reality. Coaching gives transformation.
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              We leverage large language models to provide instant copy corrections and data checks, while connecting you with verified age-matched reviewers and expert coaches for true, deep feedback.
            </p>
          </GlassCard>

          {/* CTA Box */}
          <div className="flex flex-col items-center justify-center space-y-4 pt-6">
            <h3 className="font-heading text-lg font-bold text-white text-center">
              Ready to understand what she actually sees?
            </h3>
            <GradientButton href="/quiz" variant="primary" size="lg" className="px-10">
              Get My Smooth Score
            </GradientButton>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
