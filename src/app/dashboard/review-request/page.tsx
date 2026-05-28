'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createReviewRequest } from '@/lib/firestore';
import { uploadReviewFile } from '@/lib/storage';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { ArrowLeft, ArrowRight, Upload, X, CheckCircle2, FileText, Camera, Sparkles } from 'lucide-react';
import type { ReviewType, ReviewRequest } from '@/types';

export default function ReviewRequestPage() {
  const { user, isDemo } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') as ReviewType || '';

  const [step, setStep] = useState(1);
  const [reviewType, setReviewType] = useState<ReviewType>(
    initialType === 'profile' || initialType === 'chat' || initialType === 'full' ? initialType : 'profile'
  );
  
  // Form fields
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [goal, setGoal] = useState('Get more matches');
  const [situationText, setSituationText] = useState('');
  const [specificQuestion, setSpecificQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Review Types definition
  const reviewTypes = [
    {
      id: 'profile' as ReviewType,
      title: 'Dating Profile Audit',
      desc: 'Get your Tinder, Bumble, or Hinge screenshots reviewed for photo order, bio, and vibe.',
      icon: <Camera className="text-purple-300" size={24} />,
    },
    {
      id: 'chat' as ReviewType,
      title: 'Chat Conversion Audit',
      desc: 'Got ghosted or stuck in a chat? Upload chat screenshots to get specific openers or save replies.',
      icon: <FileText className="text-blue-300" size={24} />,
    },
    {
      id: 'full' as ReviewType,
      title: 'Matrimony Portfolio Audit',
      desc: 'Matrimony profile review (Shaadi, Jeevansathi) to balance parental trust with personal charm.',
      icon: <Camera className="text-amber-300" size={24} />,
    },
  ];

  // File Handlers
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      if (files.length + selected.length > 5) {
        setErrorMsg('You can upload a maximum of 5 images.');
        return;
      }
      setErrorMsg(null);
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (step === 2 && files.length === 0) {
      setErrorMsg('Please upload at least one screenshot or image to proceed.');
      return;
    }
    setErrorMsg(null);
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg(null);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!situationText || !specificQuestion) {
      setErrorMsg('Please provide context and a specific question.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    setUploading(true);

    try {
      if (isDemo) {
        // Demo Mode: Simulate network latency and local success
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setUploading(false);
        setSubmitted(true);
      } else {
        // Real Mode: Upload files to Storage and collect download URLs
        const uploadUrls: string[] = [];
        for (const file of files) {
          const url = await uploadReviewFile(user.uid, file);
          uploadUrls.push(url);
        }

        setUploading(false);

        // Create Review Request document in Firestore
        const requestPayload: Omit<ReviewRequest, 'createdAt' | 'updatedAt'> = {
          userId: user.uid,
          reviewType,
          goal,
          situationText: `Goal: ${goal} | Context: ${situationText} | Question: ${specificQuestion}`,
          uploadUrls,
          status: 'pending',
          assignedReviewerId: '',
          creditsUsed: 1,
        };

        await createReviewRequest(requestPayload);
        setSubmitted(true);
      }
    } catch (err) {
      console.error('Submit review request error:', err);
      setErrorMsg('Failed to submit review request. Please try again.');
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
          Request Profile Audit
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Get constructive, private feedback from real women. Step-by-step.
        </p>
      </div>

      {submitted ? (
        <GlassCard className="p-8 rounded-3xl text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="font-heading text-xl font-bold text-white">
            {isDemo ? "Demo Audit Submitted!" : "Audit Request Submitted!"}
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            {isDemo
              ? "Your simulated review request has been processed successfully. In the real application, your photos are securely audited."
              : "Your request has been submitted privately. A reviewer will audit your materials and upload feedback (with optional voice note) in your dashboard within 48 hours."}
          </p>

          {isDemo && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2 text-xs text-amber-300 font-semibold max-w-md mt-2">
              <Sparkles size={14} className="flex-shrink-0" />
              <span>Create an account to save this request permanently.</span>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <GradientButton href="/dashboard/reviews" variant="primary">
              View My Reviews
            </GradientButton>
            <GradientButton href="/dashboard" variant="secondary">
              Back to Dashboard
            </GradientButton>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="p-6 md:p-8 rounded-3xl border-white/5 relative overflow-hidden flex flex-col space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
            <span>Step {step} of 3</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`w-4 h-1 rounded-full ${s === step ? 'bg-purple' : 'bg-white/10'}`}
                />
              ))}
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center leading-relaxed">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: CHOOSE TYPE */}
          {step === 1 && (
            <div className="flex flex-col space-y-4">
              <h2 className="font-heading text-lg font-bold text-white">
                Select Audit Category
              </h2>
              <div className="flex flex-col space-y-4">
                {reviewTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setReviewType(type.id)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start space-x-4 cursor-pointer focus:outline-none ${
                      reviewType === type.id
                        ? 'border-purple/40 bg-purple-500/10'
                        : 'border-white/5 bg-white/5 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {type.icon}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="font-heading text-sm sm:text-base font-bold text-white">
                        {type.title}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {type.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <GradientButton
                onClick={handleNextStep}
                variant="primary"
                className="mt-6 py-3 self-end flex items-center justify-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </GradientButton>
            </div>
          )}

          {/* STEP 2: UPLOAD IMAGES */}
          {step === 2 && (
            <div className="flex flex-col space-y-4">
              <h2 className="font-heading text-lg font-bold text-white">
                Upload Screenshots / Photos
              </h2>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Please upload 1-5 screenshots of your profile, chats, or photos. Max size 10MB each.
              </p>

              {/* Upload Drop Zone */}
              <label className="border-2 border-dashed border-white/10 hover:border-purple/40 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 cursor-pointer bg-white/5 hover:bg-white/[0.08] transition-all">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="text-purple-300" size={32} />
                <span className="text-sm font-semibold text-white/90">
                  Click to Browse Screenshots
                </span>
                <span className="text-xs text-muted-foreground">
                  Supports PNG, JPG, JPEG (Max 5 images)
                </span>
              </label>

              {/* Upload List */}
              {files.length > 0 && (
                <div className="flex flex-col space-y-2 pt-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Selected Files ({files.length}/5)
                  </span>
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 text-sm"
                    >
                      <span className="truncate text-white/95">{file.name}</span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="p-1 text-muted-foreground hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <GradientButton
                  onClick={handlePrevStep}
                  variant="secondary"
                  className="py-3 flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </GradientButton>

                <GradientButton
                  onClick={handleNextStep}
                  variant="primary"
                  className="py-3 flex items-center justify-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </GradientButton>
              </div>
            </div>
          )}

          {/* STEP 3: CONTEXT & QUESTIONS */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <h2 className="font-heading text-lg font-bold text-white">
                Add Context & Goals
              </h2>

              {/* Goal */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                  Primary Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-sm py-3 px-4 focus:border-purple focus:outline-none cursor-pointer"
                  disabled={loading}
                >
                  <option value="Get more matches">Get more matches</option>
                  <option value="Fix my opener replies">Fix my opener replies</option>
                  <option value="Prepare for matrimony contact">Prepare for matrimony contact</option>
                  <option value="Increase quality of matches">Increase quality of matches</option>
                  <option value="Rescue a dying chat">Rescue a dying chat</option>
                </select>
              </div>

              {/* Context Text */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                  Brief Situation / Context
                </label>
                <textarea
                  value={situationText}
                  onChange={(e) => setSituationText(e.target.value)}
                  placeholder="Describe your current situation (e.g. 'I match but they stop replying after 3 messages', or 'I want to stand out to modern independent women on matrimony sites')."
                  required
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-sm py-3 px-4 focus:border-purple resize-none focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* Specific Question */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                  What specific question do you want answered?
                </label>
                <textarea
                  value={specificQuestion}
                  onChange={(e) => setSpecificQuestion(e.target.value)}
                  placeholder="e.g. 'Does my third photo look generic?', or 'What opener should I send to make this chat interesting again?'"
                  required
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-xl text-sm py-3 px-4 focus:border-purple resize-none focus:outline-none"
                  disabled={loading}
                />
              </div>

              <div className="flex justify-between mt-6">
                <GradientButton
                  onClick={handlePrevStep}
                  variant="secondary"
                  className="py-3 flex items-center justify-center gap-1.5"
                  disabled={loading}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </GradientButton>

                <GradientButton
                  type="submit"
                  variant="primary"
                  className="py-3 flex items-center justify-center gap-1.5"
                  loading={loading}
                >
                  {uploading ? 'Uploading Files...' : 'Submit Audit Request'}
                </GradientButton>
              </div>
            </form>
          )}

        </GlassCard>
      )}
    </div>
  );
}
