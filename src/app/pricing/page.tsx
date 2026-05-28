'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/landing/PricingSection';
import GlassCard from '@/components/ui/GlassCard';
import GlowOrb from '@/components/ui/GlowOrb';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export default function PricingPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, absolutely. You can cancel your subscription with a single click from your dashboard settings. You will retain access to your plan benefits until the end of your billing cycle.',
    },
    {
      id: 2,
      question: 'Who actually reviews my profile?',
      answer: 'We connect you with verified, age-matched Indian women (ages 21-35) from major metropolitan areas. They are vetted by our admin team for quality, depth, and constructive feedback. Your profile details are shown anonymously.',
    },
    {
      id: 3,
      question: 'Is my uploaded data private?',
      answer: 'Yes, 100%. We take privacy seriously. Your uploaded screenshots, photos, and context are stored in secure Firebase buckets and are only accessible by your assigned reviewer. They are never published anywhere, indexable, or searchable by other users.',
    },
    {
      id: 4,
      question: 'Do you guarantee dating or matrimony matches?',
      answer: 'No, we do not guarantee specific outcomes. Relationship success depends on compatibility, conversation, and real-world vibes. However, we guarantee that fixing your profile and opener habits will drastically improve the volume and quality of matches you receive.',
    },
    {
      id: 5,
      question: 'How long does a human perspective review take?',
      answer: 'Standard reviews are processed and approved by admins within 48 to 72 hours. Once a reviewer completes your audit, it will appear directly in your dashboard with action items and a optional voice note.',
    },
  ];

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Render primary pricing plans */}
        <PricingSection />

        {/* ─── FAQ Section ────────────────────────────────────────────────── */}
        <section className="py-16 pb-28 relative px-6 border-t border-white/5">
          <GlowOrb color="purple" size={300} className="bottom-10 left-10 opacity-10" />

          <div className="max-w-3xl mx-auto relative z-10 flex flex-col space-y-10">
            
            {/* Header */}
            <div className="text-center flex flex-col space-y-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm">
                Everything you need to know about plans, reviewers, and privacy.
              </p>
            </div>

            {/* Accordion List */}
            <div className="flex flex-col space-y-4">
              {faqs.map((faq) => {
                const isExpanded = expandedId === faq.id;

                return (
                  <GlassCard
                    key={faq.id}
                    onClick={() => handleToggle(faq.id)}
                    className="p-5 rounded-2xl border-white/5 hover:border-white/10 transition-all cursor-pointer select-none text-left"
                    as="button"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-3 pr-4">
                        <HelpCircle size={18} className="text-purple-300 flex-shrink-0" />
                        <span className="font-heading text-sm sm:text-base font-bold text-white leading-tight">
                          {faq.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-muted-foreground"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden border-t border-white/5 pt-3"
                        >
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlassCard>
                );
              })}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
