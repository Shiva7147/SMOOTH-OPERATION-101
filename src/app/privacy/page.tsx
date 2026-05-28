import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import GlowOrb from '@/components/ui/GlowOrb';
import { ShieldCheck, EyeOff, Ban, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
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
              🔒 Privacy Policy
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Private by Default. No Public Roasting.
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Your dating and matrimony data is confidential. Here is how we protect your profile and photos.
            </p>
          </div>

          {/* Privacy Cards */}
          <div className="flex flex-col space-y-6">
            
            {/* Core Promise */}
            <GlassCard className="p-6 rounded-2xl border-white/5 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple flex-shrink-0 mt-0.5">
                <ShieldCheck size={20} />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-heading text-lg font-bold text-white">
                  Our Confidentiality Agreement
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Unlike public forums or social media pages, Smooth Operator is a private audit chamber. We never share your uploaded profiles, photos, text answers, or reviewer voice notes. Everything remains encrypted inside your private account.
                </p>
              </div>
            </GlassCard>

            {/* Restricted Content */}
            <GlassCard className="p-6 rounded-2xl border-white/5 border-rose-500/10 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5">
                <Ban size={20} />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-heading text-lg font-bold text-white text-rose-300">
                  Strict Content Restrictions (18+)
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Smooth Operator is restricted to users aged 18 and older. We have a zero-tolerance policy for explicit, pornographic, or sexually suggestive uploads. Uploading obscene content will result in an immediate account ban and forfeit of subscription credits without a refund.
                </p>
              </div>
            </GlassCard>

            {/* Anti-Harassment Policy */}
            <GlassCard className="p-6 rounded-2xl border-white/5 border-amber-500/10 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
                <AlertCircle size={20} />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-heading text-lg font-bold text-white text-amber-300">
                  Anti-Harassment & Stalking Ban
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We refuse to assist with stalker inquiries, tracking messages, non-consensual information gathering, or text drafts intended to bypass blocked communication or harass anyone. If our AI or review editors detect request text targeting these activities, the request will be rejected.
                </p>
              </div>
            </GlassCard>

            {/* Data Access & Deletion */}
            <GlassCard className="p-6 rounded-2xl border-white/5 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300 flex-shrink-0 mt-0.5">
                <EyeOff size={20} />
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-heading text-lg font-bold text-white">
                  Data Handling & Account Deletion
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Photos are uploaded via Google Cloud Storage. Your profile database is stored in Cloud Firestore. Only you and your assigned vetted reviewer can access these materials. If you want to delete your account or wipe all data, you can request full deletion via the settings page or by emailing{' '}
                  <a
                    href="mailto:smoothoperation.info@gmail.com"
                    className="text-purple hover:underline"
                  >
                    smoothoperation.info@gmail.com
                  </a>
                  . We wipe all related assets within 48 hours.
                </p>
              </div>
            </GlassCard>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
