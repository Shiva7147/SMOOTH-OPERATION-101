'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getAssignedReviews, saveReview, updateReviewRequestStatus } from '@/lib/firestore';
import { uploadVoiceNote } from '@/lib/storage';
import GlassCard from '@/components/ui/GlassCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import GradientButton from '@/components/ui/GradientButton';
import { ClipboardList, ShieldAlert, Sparkles, Upload, Play, CheckCircle2 } from 'lucide-react';
import type { ReviewRequest, Review } from '@/types';

interface ExtendedReviewRequest extends ReviewRequest {
  id?: string;
  review?: Review | null;
}

export default function ReviewerDashboardPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [assigned, setAssigned] = useState<ExtendedReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Active audit form state
  const [activeRequest, setActiveRequest] = useState<ExtendedReviewRequest | null>(null);
  
  // Form input fields
  const [firstImpression, setFirstImpression] = useState('');
  const [whatWorks, setWhatWorks] = useState('');
  const [whatDoesntWork, setWhatDoesntWork] = useState('');
  const [fix1, setFix1] = useState('');
  const [fix2, setFix2] = useState('');
  const [fix3, setFix3] = useState('');
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAssigned = async () => {
    if (user) {
      try {
        const list = await getAssignedReviews(user.uid);
        setAssigned(list);
      } catch (err) {
        console.error('Error fetching assigned reviews:', err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!authLoading) {
      fetchAssigned();
    }
  }, [user, authLoading]);

  const handleOpenForm = (req: ExtendedReviewRequest) => {
    setActiveRequest(req);
    setErrorMsg(null);
    setSuccess(false);
    
    // Pre-fill form if review already completed
    if (req.review) {
      setFirstImpression(req.review.firstImpression);
      setWhatWorks(req.review.whatWorks);
      setWhatDoesntWork(req.review.whatDoesntWork);
      setFix1(req.review.exactFixes[0] || '');
      setFix2(req.review.exactFixes[1] || '');
      setFix3(req.review.exactFixes[2] || '');
    } else {
      setFirstImpression('');
      setWhatWorks('');
      setWhatDoesntWork('');
      setFix1('');
      setFix2('');
      setFix3('');
      setVoiceFile(null);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVoiceFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!activeRequest || !user || !activeRequest.id) return;
    if (!firstImpression || !whatWorks || !whatDoesntWork || !fix1 || !fix2 || !fix3) {
      setErrorMsg('Please fill in all core feedback sections and action items.');
      return;
    }

    setErrorMsg(null);
    setFormLoading(true);

    try {
      let voiceNoteUrl = activeRequest.review?.voiceNoteUrl || '';
      
      // 1. Upload voice note if selected
      if (voiceFile) {
        voiceNoteUrl = await uploadVoiceNote(user.uid, voiceFile);
      }

      // 2. Save Review doc in Firestore
      const reviewPayload: Omit<Review, 'createdAt'> = {
        userId: activeRequest.userId,
        reviewerId: user.uid,
        reviewRequestId: activeRequest.id,
        firstImpression,
        whatWorks,
        whatDoesntWork,
        exactFixes: [fix1, fix2, fix3],
        voiceNoteUrl,
        adminApproved: true, // Auto-approve by default in staging
      };

      await saveReview(reviewPayload);

      // 3. Update Review Request Status to completed
      await updateReviewRequestStatus(activeRequest.id, 'completed', user.uid);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setActiveRequest(null);
      }, 2000);

      // Re-fetch list
      await fetchAssigned();
    } catch (err) {
      console.error('Submit review error:', err);
      setErrorMsg('Failed to save review. Please check console.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-foreground">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground text-sm animate-pulse">
          Opening reviewer dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      {/* Fake Header/Nav within Reviewer scope */}
      <div className="w-full py-6 px-6 bg-[#0f0f18] border-b border-white/5 flex items-center justify-between z-30">
        <span className="font-heading text-lg font-bold text-white">
          Smooth<span className="text-purple">Reviewer</span> Dashboard
        </span>
        <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground">
          <span>Reviewer ID:</span>
          <span className="text-purple-300 font-bold">{profile?.name || user?.displayName || 'Vetted Reviewer'}</span>
        </div>
      </div>

      <main className="flex-grow max-w-5xl w-full mx-auto p-6 space-y-8 text-left">
        
        {/* Intro */}
        <div className="flex flex-col space-y-1">
          <h1 className="font-heading text-2xl font-extrabold text-white">
            Assigned Profile Audits
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Deliver honest, constructive audits. Maintain privacy and ensure no user PII (names, phone numbers) is shared outside context.
          </p>
        </div>

        {/* Columns: Left (List), Right (Active Form if selected) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* List column */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            {assigned.length === 0 ? (
              <GlassCard className="p-8 text-center flex flex-col items-center justify-center space-y-4">
                <ClipboardList size={32} className="text-muted-foreground opacity-50" />
                <h3 className="font-heading text-base font-bold text-white">
                  No Assigned Audits
                </h3>
                <p className="text-muted-foreground text-xs max-w-xs">
                  Once an administrator assigns a profile review or chat screenshot to your reviewer ID, it will appear here.
                </p>
              </GlassCard>
            ) : (
              assigned.map((req) => (
                <GlassCard
                  key={req.id}
                  onClick={() => handleOpenForm(req)}
                  className={`p-5 rounded-2xl border transition-all text-left flex flex-col space-y-3 cursor-pointer ${
                    activeRequest?.id === req.id
                      ? 'border-purple/40 bg-purple-500/10'
                      : 'border-white/5 bg-white/5 hover:bg-white/[0.08]'
                  }`}
                  as="button"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-bold text-white capitalize">
                      {req.reviewType} Audit
                    </span>
                    <span className={`px-2 py-0.5 text-[8px] font-bold uppercase rounded-md ${
                      req.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : 'bg-amber-500/10 text-amber-300'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-xs line-clamp-2">
                    {req.situationText}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-white/5">
                    <span>Screenshots: {req.uploadUrls?.length || 0}</span>
                    <span className="font-bold text-purple-300">Click to Audit</span>
                  </div>
                </GlassCard>
              ))
            )}
          </div>

          {/* Form column */}
          <div className="lg:col-span-6">
            {activeRequest ? (
              <GlassCard className="p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col space-y-6">
                
                {success ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      Review Submitted Successfully!
                    </h3>
                    <p className="text-muted-foreground text-xs max-w-xs">
                      The user will be notified and can view this audit inside their dashboard.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                      <h2 className="font-heading text-base font-bold text-white">
                        Perform Audit
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveRequest(null)}
                        className="text-xs text-muted-foreground hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center leading-relaxed">
                        {errorMsg}
                      </div>
                    )}

                    {/* Screenshot Previews */}
                    {activeRequest.uploadUrls && activeRequest.uploadUrls.length > 0 && (
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground">
                          User Uploads (Click to expand)
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {activeRequest.uploadUrls.map((url, idx) => (
                            <a
                              key={idx}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden bg-black flex-shrink-0"
                            >
                              <img
                                src={url}
                                alt="audit-img"
                                className="w-full h-full object-cover"
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Anonymized Context Text */}
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs font-semibold text-muted-foreground">
                        User Context Context
                      </span>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-white/90 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
                        {activeRequest.situationText}
                      </div>
                    </div>

                    <hr className="border-white/5" />

                    {/* First Impression */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">
                        First Impression Vibe
                      </label>
                      <textarea
                        value={firstImpression}
                        onChange={(e) => setFirstImpression(e.target.value)}
                        placeholder="What is your first reaction to this profile/message? (Be honest but constructive)"
                        required
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-xs py-2 px-3 focus:outline-none"
                        disabled={formLoading}
                      />
                    </div>

                    {/* What Works */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">
                        What is working well?
                      </label>
                      <textarea
                        value={whatWorks}
                        onChange={(e) => setWhatWorks(e.target.value)}
                        placeholder="List the photos or texts that actually stand out and look attractive."
                        required
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-xs py-2 px-3 focus:outline-none"
                        disabled={formLoading}
                      />
                    </div>

                    {/* What Needs Change */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">
                        What is hurting their impression?
                      </label>
                      <textarea
                        value={whatDoesntWork}
                        onChange={(e) => setWhatDoesntWork(e.target.value)}
                        placeholder="What photos should they delete? What texts feel awkward, generic, or desperate?"
                        required
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-xs py-2 px-3 focus:outline-none"
                        disabled={formLoading}
                      />
                    </div>

                    {/* 3 Exact Action Items */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-bold text-white flex items-center space-x-1">
                        <Sparkles size={12} className="text-purple-300" />
                        <span>Three Action Items (Must do)</span>
                      </label>
                      <input
                        type="text"
                        value={fix1}
                        onChange={(e) => setFix1(e.target.value)}
                        placeholder="Action Item 1: e.g. Delete the gym selfie"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-xs py-2.5 px-3 focus:outline-none"
                        disabled={formLoading}
                      />
                      <input
                        type="text"
                        value={fix2}
                        onChange={(e) => setFix2(e.target.value)}
                        placeholder="Action Item 2: e.g. Put the smiling blue shirt photo first"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-xs py-2.5 px-3 focus:outline-none"
                        disabled={formLoading}
                      />
                      <input
                        type="text"
                        value={fix3}
                        onChange={(e) => setFix3(e.target.value)}
                        placeholder="Action Item 3: e.g. Rewrite bio to focus on roadtrip opinion"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl text-xs py-2.5 px-3 focus:outline-none"
                        disabled={formLoading}
                      />
                    </div>

                    {/* Voice Note Upload */}
                    <div className="flex flex-col space-y-1.5 pt-2">
                      <label className="text-xs font-semibold text-muted-foreground flex items-center space-x-1">
                        <Upload size={12} />
                        <span>Upload Voice Note (Optional)</span>
                      </label>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleFileChange}
                        className="text-xs border border-white/10 p-2 rounded-xl bg-white/5"
                        disabled={formLoading}
                      />
                    </div>

                    {/* Submit */}
                    <GradientButton
                      type="submit"
                      variant="primary"
                      fullWidth
                      loading={formLoading}
                      className="py-3 mt-2"
                    >
                      Submit Audit Report
                    </GradientButton>

                  </form>
                )}

              </GlassCard>
            ) : (
              <GlassCard className="p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center text-muted-foreground min-h-[300px]">
                <ShieldAlert size={36} className="opacity-30" />
                <span className="text-xs mt-3">Select an assigned audit from the left list to begin auditing.</span>
              </GlassCard>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
