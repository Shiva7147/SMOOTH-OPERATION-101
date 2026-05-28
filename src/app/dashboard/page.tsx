'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MessageCircle,
  FileText,
  Upload,
  UserCheck,
  CreditCard,
  History,
  Mail,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getLatestSmoothScore } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import GlowOrb from '@/components/ui/GlowOrb';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { SmoothScoreResult } from '@/types';

export default function DashboardPage() {
  const { user, profile, isDemo } = useAuth();
  const [scoreResult, setScoreResult] = useState<SmoothScoreResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      if (user && !isDemo) {
        try {
          const res = await getLatestSmoothScore(user.uid);
          setScoreResult(res);
        } catch (err) {
          console.error('Error fetching score:', err);
        }
      } else {
        // Guest/Demo: check sessionStorage
        if (typeof window !== 'undefined') {
          const stored = sessionStorage.getItem('guest_score');
          if (stored) {
            try {
              setScoreResult(JSON.parse(stored) as SmoothScoreResult);
            } catch (e) {
              console.error('Error parsing guest score:', e);
            }
          } else if (isDemo) {
            // Default demo score
            setScoreResult({
              userId: 'demo-user-id',
              score: 61,
              category: 'Needs a serious fix',
              biggestIssue: 'First Impression',
              freeFix: 'Use one warmer photo first, rewrite your bio with one specific personal detail, and stop opening chats like a job interview.',
              subMetrics: {
                profileWarmth: 58,
                bioPersonality: 45,
                replyConfidence: 65,
                firstImpression: 50
              },
              createdAt: null as any
            });
          }
        }
      }
      setLoading(false);
    };
    fetchScore();
  }, [user, isDemo]);

  // Dashboard Cards Definition
  const dashboardCards = [
    {
      title: 'Smooth Score',
      desc: 'View your baseline report and check areas that need improvement.',
      href: scoreResult ? '/quiz/result' : '/quiz',
      icon: <Sparkles className="text-purple-300" size={20} />,
      badge: scoreResult ? `${scoreResult.score}/100` : 'Take Quiz'
    },
    {
      title: 'Ask Smooth AI',
      desc: 'Get immediate message rewrites, opener ideas, or response helpers.',
      href: '/dashboard/chat',
      icon: <MessageCircle className="text-blue-300" size={20} />,
    },
    {
      title: 'Review My Profile',
      desc: 'Submit your profile screens and let AI + vetted women audit your vibe.',
      href: '/dashboard/review-request?type=profile',
      icon: <Upload className="text-emerald-300" size={20} />,
    },
    {
      title: 'Fix My Bio',
      desc: 'Get your bio rewritten to display personality and easy hooks.',
      href: '/dashboard/chat?mode=bio',
      icon: <FileText className="text-teal-300" size={20} />,
    },
    {
      title: 'Chat Rescue',
      desc: 'Upload a screenshot of a stuck or ghosted chat and get response playbooks.',
      href: '/dashboard/review-request?type=chat',
      icon: <History className="text-rose-300" size={20} />,
    },
    {
      title: 'Women’s Perspective Review',
      desc: 'Get private feedback and voice notes from verified women in your age range.',
      href: '/dashboard/review-request?type=full',
      icon: <UserCheck className="text-amber-300" size={20} />,
      badge: 'Premium'
    },
    {
      title: 'Matrimony Call Prep',
      desc: 'Prepare for introductory calls and ask questions that evaluate compatibility.',
      href: '/dashboard/chat?mode=matrimony',
      icon: <ShieldCheck className="text-indigo-300" size={20} />,
    },
    {
      title: 'Upgrade Plan',
      desc: 'Unlock premium credits, direct reviewer matching, and call scripts.',
      href: '/pricing',
      icon: <CreditCard className="text-pink-300" size={20} />,
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-sm text-muted-foreground animate-pulse">
          Loading dashboard metrics...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 relative">
      {/* Glow decorator */}
      <div className="absolute right-[-40px] top-[-20px] w-80 h-80 rounded-full bg-purple/5 blur-[90px] pointer-events-none -z-10" />

      {/* Demo Warning Banner */}
      {isDemo && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2 animate-pulse">
          <Sparkles size={14} />
          <span>Demo Mode — create an account to save your progress.</span>
          <Link href="/signup" className="underline hover:text-white ml-1">
            Sign Up
          </Link>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          Stop Guessing What She Thinks.
          <br />
          <span className="gradient-text font-black">Start Understanding What She Sees.</span>
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Optimize your profile, polish your conversation openers, and review feedback privately.
        </p>
      </div>

      {/* Score Summary Banner / Call-to-action */}
      {scoreResult ? (
        <GlassCard className="p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-purple/5 to-blue/5">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-heading text-2xl font-black text-white shadow-inner">
              {scoreResult.score}
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
                Current Smooth Score
              </span>
              <span className="text-base font-bold text-white leading-snug">
                {scoreResult.category}
              </span>
              <span className="text-xs text-muted-foreground">
                Lowest sub-metric: {scoreResult.biggestIssue === "First Impression" ? "Conversation Hooks" : scoreResult.biggestIssue}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-3 w-full sm:w-auto justify-end">
            <Link
              href="/quiz/result"
              className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 text-white/95 transition-all text-center flex items-center justify-center whitespace-nowrap"
            >
              View Full Report
            </Link>
            <Link
              href="/quiz"
              className="text-xs font-bold px-4 py-2.5 rounded-xl gradient-bg text-white hover:opacity-90 transition-all text-center flex items-center justify-center whitespace-nowrap"
            >
              Retake Quiz
            </Link>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="p-6 rounded-2xl border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6 bg-purple-500/5">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold text-white flex items-center gap-1.5">
              <Sparkles size={16} className="text-purple-300" />
              Analyze your dating baseline
            </span>
            <span className="text-xs text-muted-foreground">
              You haven't recorded a baseline score yet. Take the 2-minute quiz to start.
            </span>
          </div>
          <Link
            href="/quiz"
            className="text-xs font-bold px-6 py-3 rounded-xl gradient-bg text-white hover:opacity-90 transition-all text-center whitespace-nowrap"
          >
            Take Smooth Score Quiz
          </Link>
        </GlassCard>
      )}

      {/* Grid of Actionable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card) => (
          <Link key={card.title} href={card.href} className="group focus:outline-none">
            <GlassCard
              hover={true}
              className="p-5 rounded-2xl border-white/5 hover:border-purple-500/25 h-full flex flex-col justify-between transition-all duration-300 min-h-[150px]"
            >
              <div className="flex flex-col space-y-3">
                {/* Icon wrapper & optional badge */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
                    {card.icon}
                  </div>
                  {card.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider text-purple-300 border border-purple-500/30 rounded-md bg-purple-500/10 uppercase">
                      {card.badge}
                    </span>
                  )}
                </div>
                {/* Text */}
                <div className="flex flex-col space-y-1">
                  <h3 className="font-heading text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="flex items-center text-[10px] font-semibold text-purple-300 group-hover:text-purple transition-colors pt-3 self-end">
                <span>Open</span>
                <ChevronRight size={12} className="ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* Privacy reminder */}
      <div className="flex items-center justify-center space-x-2 text-center text-xs text-muted-foreground py-4 border-t border-white/5 mt-6">
        <ShieldCheck size={14} className="text-emerald-400" />
        <span>Reviews are private. Uploaded images are stored securely on Google servers.</span>
      </div>
    </div>
  );
}
