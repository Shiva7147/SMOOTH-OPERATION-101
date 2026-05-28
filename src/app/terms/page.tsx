import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import GlowOrb from '@/components/ui/GlowOrb';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Service Description',
      content:
        'Smooth Operator provides confidence, communication, and self-presentation feedback for dating and matrimony profiles. We utilize artificial intelligence (Gemini API) and crowdsourced reviewer assessments (human perspective reviews) to deliver profile diagnostics. We are not a matchmaking service, broker, or dating portal.',
    },
    {
      title: '2. Eligibility & Account Rules',
      content:
        'You must be at least 18 years of age to register or use our tools. You agree to provide accurate registration details, keep your password secure, and not allow third parties to use your credentials. One user account is permitted per person. Automated bot queries or data scraping is strictly prohibited.',
    },
    {
      title: '3. Prohibited Content & Behavior',
      content:
        'You agree not to upload any materials that: contain nudity, pornography, explicit sexual requests, or obscene imagery; encourage stalking, tracking, or bypassing locks on personal boundaries; or harass or defame any individual. Violators face immediate account suspension and forfeiture of credits.',
    },
    {
      title: '4. Payments, Subscriptions & Credits',
      content:
        'Subscription plans (Smooth Start, First Impression Review, Smooth Operator Elite) are billed monthly in advance via Razorpay or equivalent gateway. Credits allocated per plan must be used within the active billing cycle and do not roll over. Subscriptions renew automatically until canceled by the user in settings.',
    },
    {
      title: '5. Disclaimer of Outcomes',
      content:
        'Smooth Operator provides analysis, advice, and tips based on statistical patterns and subjective reviewer viewpoints. We make no guarantees, warranties, or assertions regarding the number of matches, dates, relationships, marriages, or social engagements you will secure as a result of using our tools. Your interactions are entirely your own responsibility.',
    },
    {
      title: '6. Content Ownership',
      content:
        'You retain all intellectual property rights to the profile screenshots and photos you upload. Smooth Operator retains full ownership of the calculated score algorithms, diagnostic reports, generated reply text, and design system feedback documents we provide.',
    },
    {
      title: '7. Support & contact',
      content:
        'If you have questions about these Terms, billing issues, or need helper documentation, please email us directly at smoothoperation.info@gmail.com.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative px-6">
        {/* Glow Decorators */}
        <GlowOrb color="purple" size={400} className="top-10 left-10 opacity-20" />
        <GlowOrb color="blue" size={350} className="bottom-10 right-10 opacity-20" />

        <div className="max-w-3xl mx-auto relative z-10 flex flex-col space-y-10">
          
          {/* Header */}
          <div className="text-center flex flex-col space-y-2">
            <span className="text-xs text-purple font-bold tracking-widest uppercase">
              📄 Terms of Service
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Please review the terms of usage and billing boundaries for using Smooth Operator.
            </p>
          </div>

          {/* Terms content card */}
          <GlassCard className="p-8 rounded-3xl border-white/5 flex flex-col space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="flex flex-col space-y-2">
                <h2 className="font-heading text-lg font-bold text-white">
                  {section.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </GlassCard>

        </div>
      </main>

      <Footer />
    </div>
  );
}
