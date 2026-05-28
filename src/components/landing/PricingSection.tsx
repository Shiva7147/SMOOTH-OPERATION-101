'use client';

import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS, CURRENCY_SYMBOL } from '@/constants/pricing';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';

export function PricingSection() {
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
    <section id="pricing" className="relative py-16 bg-[#0A0A0B] overflow-hidden scroll-mt-20">
      {/* Glow decorators */}
      <div className="absolute right-10 bottom-10 w-[350px] h-[350px] rounded-full bg-purple/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute left-10 top-10 w-[300px] h-[300px] rounded-full bg-blue/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col space-y-4">
          <span className="text-xs text-purple font-bold tracking-widest uppercase">
            💎 Pricing
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Invest in How You Show Up
          </h2>
          <p className="text-muted-foreground text-sm">
            No manipulation, no gimmicks. Just honest feedback, expert coaching, and AI-guided strategy to optimize your dating and matrimony success.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {PRICING_PLANS.map((plan) => {
            const isHighlighted = plan.id === 'first-impression-review';

            return (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                className={`flex flex-col h-full ${
                  isHighlighted ? 'lg:-translate-y-4 z-10' : 'z-0'
                }`}
              >
                <GlassCard
                  hover={true}
                  className={`p-8 rounded-3xl h-full flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${
                    isHighlighted
                      ? 'border-purple/40 bg-white/[0.06] shadow-2xl shadow-purple/10'
                      : 'border-white/5 bg-white/[0.03]'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isHighlighted
                          ? 'bg-purple text-white shadow-lg'
                          : 'bg-white/10 text-white/80'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}

                  {/* Plan Content */}
                  <div>
                    {/* Header */}
                    <div className="flex flex-col space-y-2 mb-6">
                      <h3 className="font-heading text-xl font-bold text-white">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline space-x-1">
                        <span className="text-4xl sm:text-5xl font-black font-heading text-white">
                          {CURRENCY_SYMBOL}
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground text-sm">/month</span>
                      </div>
                      <p className="text-xs text-purple-300 font-semibold italic">
                        {plan.valueLine}
                      </p>
                    </div>

                    {/* Divider */}
                    <hr className="border-white/5 mb-6" />

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-white/90">
                          <Check
                            size={16}
                            className={`flex-shrink-0 mt-0.5 ${
                              isHighlighted ? 'text-purple' : 'text-muted-foreground'
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Action */}
                  <div className="flex flex-col space-y-4 pt-6 border-t border-white/5 mt-auto">
                    <GradientButton
                      href={`/signup?plan=${plan.id}`}
                      variant={isHighlighted ? 'primary' : 'secondary'}
                      fullWidth
                    >
                      {plan.cta}
                    </GradientButton>

                    <div className="flex items-center justify-center space-x-2 text-center text-[10px] text-muted-foreground">
                      <ShieldCheck size={12} className="text-emerald-400" />
                      <span>{plan.trustLine}</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground max-w-lg mx-auto mt-16 leading-relaxed">
          * Feedback is 100% private. We never post your photos, chats, or feedback publicly. Reviewers are age-matched and vetted. We do not guarantee matching results, but we guarantee you will show up with 10x more confidence and clarity.
        </p>

      </div>
    </section>
  );
}

export default PricingSection;
