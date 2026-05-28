'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getLatestSmoothScore } from '@/lib/firestore';
import ScoreRing from '@/components/ui/ScoreRing';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import GlowOrb from '@/components/ui/GlowOrb';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Navbar from '@/components/layout/Navbar';
import type { SmoothScoreResult } from '@/types';
import { Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function QuizResultPage() {
  const { user, isDemo, enterDemoMode, loading: authLoading } = useAuth();
  const router = useRouter();
  const [result, setResult] = useState<SmoothScoreResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      // 1. If authenticated and not demo, try fetching from Firestore
      if (user && !isDemo) {
        try {
          const scoreDoc = await getLatestSmoothScore(user.uid);
          if (scoreDoc) {
            setResult(scoreDoc);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error('Error fetching Firestore quiz result:', err);
        }
      }

      // 2. Fallback: try reading guest score from sessionStorage
      if (typeof window !== 'undefined') {
        const stored = sessionStorage.getItem('guest_score');
        if (stored) {
          try {
            setResult(JSON.parse(stored) as SmoothScoreResult);
          } catch (e) {
            console.error('Error parsing guest score:', e);
          }
        }
      }
      setLoading(false);
    };

    if (!authLoading) {
      fetchResult();
    }
  }, [user, isDemo, authLoading]);

  // Sub-metric level helper
  const getMetricBadge = (score: number) => {
    if (score <= 30) {
      return { label: 'Needs Fix', style: 'bg-rose-500/10 text-rose-300 border-rose-500/20' };
    }
    if (score <= 60) {
      return { label: 'Average', style: 'bg-amber-500/10 text-amber-300 border-amber-500/20' };
    }
    if (score <= 80) {
      return { label: 'Solid', style: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' };
    }
    return { label: 'Elite', style: 'bg-purple-500/10 text-purple-300 border-purple-500/20' };
  };

  const getExplanation = (category: string) => {
    switch (category) {
      case "Needs a major overhaul":
        return "Your first impression is extremely passive, quiet, or sending conflicting vibes. You are currently invisible in the deck.";
      case "Needs a serious fix":
        return "Your first impression is too safe, too generic, and too easy to ignore.";
      case "Getting there but still rough":
        return "Your profile shows potential, but small friction points are killing your conversion rate. A few minor vibes look off.";
      case "Solid but could be smoother":
        return "You have a good baseline. You get matches, but you are missing the extra refinement that unlocks elite conversations.";
      case "Smooth Operator material":
        return "Your profile is clean, highly engaging, and exhibits high social intelligence. Keep doing what you're doing!";
      default:
        return "Your first impression has some areas that can be optimized for better profile conversion.";
    }
  };

  const handleContinueDashboard = () => {
    // If guest (not logged in), set demo mode before redirecting
    if (!user) {
      enterDemoMode();
    }
    router.push('/dashboard');
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-foreground">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground text-sm animate-pulse">
          Analyzing answers & scoring...
        </p>
      </div>
    );
  }

  // Handle empty state
  if (!result) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-foreground px-6 text-center space-y-6">
        <AlertCircle size={48} className="text-muted-foreground" />
        <h2 className="font-heading text-2xl font-bold text-white">
          No Quiz Result Found
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          Please take the 2-minute Smooth Score quiz to see your detailed audit.
        </p>
        <GradientButton href="/quiz" variant="primary" className="px-8">
          Take the Quiz
        </GradientButton>
      </div>
    );
  }

  const showDemoCTA = !user || isDemo;

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative px-6">
        {/* Glow orbs */}
        <GlowOrb color="purple" size={400} className="top-10 left-10 opacity-25" />
        <GlowOrb color="blue" size={350} className="bottom-10 right-10 opacity-20" />

        <div className="max-w-4xl mx-auto flex flex-col space-y-8 relative z-10">
          
          {/* Guest Save Alert */}
          {!user && (
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                  <Sparkles size={16} className="text-purple-300" />
                  Save your score permanently
                </span>
                <span className="text-xs text-muted-foreground">
                  Create a free account to log this score, track improvements, and unlock the AI chat helper.
                </span>
              </div>
              <GradientButton href="/signup" variant="primary" size="sm" className="whitespace-nowrap">
                Save My Score
              </GradientButton>
            </div>
          )}

          {/* Core Score Ring */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
              YOUR SMOOTH SCORE
            </span>
            
            <ScoreRing score={result.score} size={200} strokeWidth={12} animated={true} />
            
            <div className="flex flex-col space-y-2 max-w-xl">
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                {result.category}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {getExplanation(result.category)}
              </p>
            </div>
          </div>

          {/* Sub-metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Profile Warmth', val: result.subMetrics.profileWarmth },
              { label: 'Bio Personality', val: result.subMetrics.bioPersonality },
              { label: 'Reply Confidence', val: result.subMetrics.replyConfidence },
              { label: 'Conversation Hooks', val: result.subMetrics.firstImpression },
            ].map((metric) => {
              const badge = getMetricBadge(metric.val);
              return (
                <GlassCard key={metric.label} className="p-4 rounded-2xl border-white/5 flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-xs text-muted-foreground font-semibold">
                    {metric.label}
                  </span>
                  <span className="font-heading text-2xl font-black text-white">
                    {metric.val}%
                  </span>
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border rounded-md ${badge.style}`}>
                    {badge.label}
                  </span>
                </GlassCard>
              );
            })}
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Biggest Roadblock */}
            <GlassCard className="p-6 rounded-2xl border-white/5 flex flex-col space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
                ⚠️ Biggest Roadblock
              </span>
              <h3 className="font-heading text-base font-bold text-white">
                {result.biggestIssue === "First Impression" ? "Conversation Hooks" : result.biggestIssue}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {result.biggestIssue === "First Impression" 
                  ? "Your profile and replies feel over-formal. You are not giving enough personality or easy conversation hooks."
                  : "This bottleneck is pulling down your overall match quality. It indicates a friction point in your self-presentation or text flow."
                }
              </p>
            </GlassCard>

            {/* Actionable Free Fix */}
            <GlassCard className="p-6 rounded-2xl border-white/5 flex flex-col space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                🚀 Immediate Action Item
              </span>
              <h3 className="font-heading text-base font-bold text-white">
                Free Operator Fix
              </h3>
              <p className="text-teal-200/90 text-xs sm:text-sm leading-relaxed">
                {result.freeFix}
              </p>
            </GlassCard>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <GradientButton href="/dashboard/chat" variant="primary" size="lg" className="px-8 flex items-center justify-center gap-2">
                <span>Unlock Full AI Fix</span>
                <ArrowRight size={16} />
              </GradientButton>
              
              <GradientButton href="/dashboard/review-request" variant="outline" size="lg" className="px-8">
                Get Women's Perspective Review
              </GradientButton>
            </div>

            <button
              onClick={handleContinueDashboard}
              className="text-sm font-medium text-purple-300 hover:text-white underline transition-all focus:outline-none"
            >
              {showDemoCTA ? "Continue in Demo Dashboard →" : "Continue to Dashboard →"}
            </button>
          </div>

          {/* Safe policy reminder */}
          <div className="flex items-center justify-center space-x-2 text-center text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Reviews are strictly private. Your matches will never see this score.</span>
          </div>

        </div>
      </main>
    </div>
  );
}
