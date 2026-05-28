'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getReviewRequests, getReviews } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import GradientButton from '@/components/ui/GradientButton';
import { ClipboardCheck, Hourglass, CheckCircle2, ChevronDown, ChevronUp, Play, Sparkles } from 'lucide-react';
import type { ReviewRequest, Review } from '@/types';

interface ExtendedReviewRequest extends ReviewRequest {
  id?: string;
  review?: Review | null;
}

export default function ReviewsPage() {
  const { user, isDemo } = useAuth();
  const [requests, setRequests] = useState<ExtendedReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (user) {
        if (isDemo) {
          // Load premium mock review data in Demo Mode
          const mockRequests: ExtendedReviewRequest[] = [
            {
              id: 'demo-req-1',
              userId: 'demo-user-id',
              reviewType: 'profile',
              goal: 'Get more matches',
              situationText: 'Goal: Get more matches | Context: My matches are very low, only 1-2 a month. I am not sure if my photos look too serious. | Question: Does my third photo look generic?',
              uploadUrls: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e'],
              status: 'completed',
              assignedReviewerId: 'reviewer-demo',
              creditsUsed: 1,
              createdAt: null as any,
              updatedAt: null as any,
              review: {
                id: 'demo-rev-1',
                userId: 'demo-user-id',
                reviewerId: 'reviewer-demo',
                reviewRequestId: 'demo-req-1',
                firstImpression: 'Your third photo is actually your best one, you look natural there! But your lead photo (the gym mirror selfie) is a bit intimidating and makes you look unapproachable.',
                whatWorks: 'Nice choice of outfits in photo 3, and your bio has a good hook about filter coffee.',
                whatDoesntWork: 'The gym mirror selfie feels standard, and your second photo has poor resolution.',
                exactFixes: [
                  'Move photo 3 first.',
                  'Remove the gym mirror selfie and replace it with a candid laugh photo.',
                  'Add one bio line that gives her something to reply to.'
                ],
                voiceNoteUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Safe mock audio url
                adminApproved: true,
                createdAt: null as any
              }
            }
          ];
          setRequests(mockRequests);
          setExpandedId('demo-req-1'); // Auto-expand the sample review
        } else {
          try {
            const reqList = await getReviewRequests(user.uid);
            const revList = await getReviews(user.uid);

            // Map completed reviews to their requests
            const extended: ExtendedReviewRequest[] = reqList.map((req) => ({
              ...req,
              review: revList.find((rev) => rev.reviewRequestId === req.id) || null,
            }));

            setRequests(extended);
          } catch (err) {
            console.error('Error fetching review history:', err);
          }
        }
      }
      setLoading(false);
    };
    fetchReviews();
  }, [user, isDemo]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        );
      case 'assigned':
        return (
          <span className="flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 animate-pulse">
            <Hourglass size={12} />
            <span>Assigned</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Hourglass size={12} />
            <span>Pending</span>
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-sm text-muted-foreground animate-pulse">
          Retrieving audit history...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          Review History
          {isDemo && (
            <span className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/25 rounded-md font-semibold uppercase tracking-wider">
              Demo
            </span>
          )}
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Listen to reviewer voice notes, check first impression summaries, and review exact tweaks.
        </p>
      </div>

      {isDemo && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2 max-w-2xl">
          <Sparkles size={14} />
          <span>Demo Mode — showing sample reviewer feedback. Create an account to request real audits.</span>
        </div>
      )}

      {requests.length === 0 ? (
        <GlassCard className="p-12 text-center flex flex-col items-center justify-center space-y-4">
          <ClipboardCheck size={48} className="text-muted-foreground opacity-50" />
          <h2 className="font-heading text-xl font-bold text-white">
            No Reviews Yet
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Submit screenshots of your profile or chats to receive your first Women's Perspective Review.
          </p>
          <GradientButton href="/dashboard/review-request" variant="primary" className="mt-2 px-8">
            Request My First Review
          </GradientButton>
        </GlassCard>
      ) : (
        <div className="flex flex-col space-y-4 max-w-3xl">
          {requests.map((req) => {
            const isExpanded = expandedId === req.id;
            const docDate = req.createdAt ? (req.createdAt as any).toDate?.() : new Date();
            const formattedDate = new Date(docDate).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });

            return (
              <GlassCard
                key={req.id}
                className="p-6 rounded-2xl border border-white/5 flex flex-col space-y-4"
              >
                {/* Header Summary Row */}
                <div
                  onClick={() => toggleExpand(req.id || '')}
                  className="flex items-center justify-between w-full cursor-pointer select-none"
                >
                  <div className="flex flex-col space-y-1 text-left min-w-0">
                    <div className="flex items-center space-x-3">
                      <span className="font-heading text-base font-bold text-white capitalize">
                        {req.reviewType === 'full' ? "Matrimony Profile" : `${req.reviewType} Profile`} Audit
                      </span>
                      {getStatusBadge(req.status)}
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                      Submitted on {formattedDate}
                    </span>
                  </div>
                  
                  <div className="text-muted-foreground ml-4">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* Expandable Details Container */}
                {isExpanded && (
                  <div className="border-t border-white/5 pt-4 flex flex-col space-y-6 animate-fade-in text-left">
                    
                    {/* User upload context */}
                    <div className="flex flex-col space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
                        My Context Details
                      </span>
                      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                        {req.situationText}
                      </p>
                      
                      {/* Grid of uploaded images */}
                      {req.uploadUrls && req.uploadUrls.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-2">
                          {req.uploadUrls.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-black flex-shrink-0 hover:border-purple/40 transition-colors"
                            >
                              <img
                                src={url}
                                alt={`screenshot-${idx}`}
                                className="w-full h-full object-cover"
                              />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vetted Reviewer Response Block */}
                    {req.status === 'completed' && req.review ? (
                      <div className="border-t border-white/5 pt-4 flex flex-col space-y-6">
                        
                        {/* Title badge */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                            👩‍🦰 Verified Reviewer Perspective
                          </span>
                          <span className="text-xs text-muted-foreground font-semibold">
                            Anonymous (F, 24)
                          </span>
                        </div>

                        {/* First Impression */}
                        <div className="flex flex-col space-y-1">
                          <span className="text-xs font-bold text-white/95">
                            First Impression Vibe
                          </span>
                          <p className="text-muted-foreground text-sm leading-relaxed italic">
                            "{req.review.firstImpression}"
                          </p>
                        </div>

                        {/* What Works / What Doesn't */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col space-y-1">
                            <span className="text-xs font-bold text-emerald-400">
                              What is working well
                            </span>
                            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                              {req.review.whatWorks}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 flex flex-col space-y-1">
                            <span className="text-xs font-bold text-rose-400">
                              What needs to change
                            </span>
                            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                              {req.review.whatDoesntWork}
                            </p>
                          </div>
                        </div>

                        {/* 3 Actionable Fixes */}
                        {req.review.exactFixes && req.review.exactFixes.length > 0 && (
                          <div className="flex flex-col space-y-3 pt-2">
                            <span className="text-xs font-bold text-white/95 flex items-center space-x-1.5">
                              <Sparkles size={14} className="text-purple-300" />
                              <span>Exact Fixes Action Checklist</span>
                            </span>
                            <div className="flex flex-col space-y-2">
                              {req.review.exactFixes.map((fix, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl border border-white/5 text-xs sm:text-sm"
                                >
                                  <div className="w-5 h-5 rounded-full bg-purple/10 flex items-center justify-center text-purple text-xs font-bold flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </div>
                                  <span className="text-white/90">{fix}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Voice Note Player */}
                        {req.review.voiceNoteUrl && (
                          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple/10 to-blue/10 border border-purple/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-purple flex items-center justify-center text-white flex-shrink-0">
                                <Play size={16} fill="white" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-xs font-bold text-white">
                                  Reviewer Voice Note (Audio)
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  Hear their exact reaction and advice
                                </span>
                              </div>
                            </div>
                            <audio
                              controls
                              src={req.review.voiceNoteUrl}
                              className="w-full sm:w-60 h-10 rounded-xl"
                            />
                          </div>
                        )}

                      </div>
                    ) : (
                      <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center text-xs text-muted-foreground">
                        Your request is currently in queue. Once a vetted woman reviewer claims the request, your audit will appear here. Thanks for your patience!
                      </div>
                    )}
                    
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
