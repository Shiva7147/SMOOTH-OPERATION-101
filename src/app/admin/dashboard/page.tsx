'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  getAllUsers,
  getAllReviewRequests,
  getAllContactMessages,
  getAllQuizResults,
  getAllAIMessages,
  updateReviewRequestStatus,
  isAdmin,
} from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import GradientButton from '@/components/ui/GradientButton';
import Navbar from '@/components/layout/Navbar';
import { Users, FileText, Bot, HelpCircle, ShieldAlert, Award, CreditCard } from 'lucide-react';
import type { User, ReviewRequest, ContactMessage, SmoothScoreResult, AIMessage } from '@/types';

export default function AdminDashboardPage() {
  const { user, profile, loading: authLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'users' | 'quiz' | 'ai' | 'reviews' | 'contacts' | 'payments'>('users');
  const [loading, setLoading] = useState(true);

  // Firestore collections data
  const [usersList, setUsersList] = useState<User[]>([]);
  const [reviewsList, setReviewsList] = useState<ReviewRequest[]>([]);
  const [contactsList, setContactsList] = useState<ContactMessage[]>([]);
  const [quizList, setQuizList] = useState<SmoothScoreResult[]>([]);
  const [aiList, setAiList] = useState<AIMessage[]>([]);

  // Reviewer assign state
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [reviewerIdInput, setReviewerIdInput] = useState('');
  const [submittingAssign, setSubmittingAssign] = useState(false);

  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (user) {
        const isUserAdmin = await isAdmin(user.uid);
        setAuthorized(isUserAdmin);
      } else {
        setAuthorized(false);
      }
    };
    if (!authLoading) {
      checkAuth();
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const u = await getAllUsers();
      const r = await getAllReviewRequests();
      const c = await getAllContactMessages();
      const q = await getAllQuizResults();
      const a = await getAllAIMessages();

      setUsersList(u);
      setReviewsList(r);
      setContactsList(c);
      setQuizList(q);
      setAiList(a);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized === true) {
      fetchData();
    }
  }, [authorized]);

  const handleAssignReviewer = async (requestId: string) => {
    if (!reviewerIdInput.trim()) return;
    setSubmittingAssign(true);
    try {
      await updateReviewRequestStatus(requestId, 'assigned', reviewerIdInput);
      setAssigningId(null);
      setReviewerIdInput('');
      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Assign reviewer error:', err);
      alert('Failed to assign reviewer.');
    } finally {
      setSubmittingAssign(false);
    }
  };

  if (authLoading || authorized === null) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-foreground">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground text-sm animate-pulse">
          Authenticating administrator access...
        </p>
      </div>
    );
  }

  if (authorized === false) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-foreground px-6 text-center space-y-4">
        <ShieldAlert size={48} className="text-rose-500" />
        <h2 className="font-heading text-xl font-bold text-white">
          Access Denied
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          Your account does not possess administrator permissions for this workspace.
        </p>
        <GradientButton href="/dashboard" variant="primary">
          Back to Dashboard
        </GradientButton>
      </div>
    );
  }

  const tabs = [
    { id: 'users' as const, label: 'Users', icon: <Users size={16} /> },
    { id: 'quiz' as const, label: 'Quiz Results', icon: <HelpCircle size={16} /> },
    { id: 'ai' as const, label: 'AI Logs', icon: <Bot size={16} /> },
    { id: 'reviews' as const, label: 'Reviews', icon: <FileText size={16} /> },
    { id: 'contacts' as const, label: 'Contacts', icon: <Users size={16} /> },
    { id: 'payments' as const, label: 'Payments', icon: <CreditCard size={16} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      {/* Admin header nav */}
      <div className="w-full py-6 px-6 bg-[#0f0f18] border-b border-white/5 flex items-center justify-between z-30">
        <span className="font-heading text-lg font-bold text-white flex items-center gap-2">
          <Award size={18} className="text-purple-300 animate-pulse" />
          <span>Smooth Operator Admin Panel</span>
        </span>
        <GradientButton href="/admin/debug" variant="secondary" size="sm">
          Server Debug Tools
        </GradientButton>
      </div>

      <main className="flex-grow w-full max-w-7xl mx-auto p-6 space-y-8 text-left">
        
        {/* Tab Row */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4 select-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-purple text-white shadow-lg'
                  : 'text-muted-foreground hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <LoadingSpinner size="md" />
            <p className="mt-2 text-xs text-muted-foreground">Syncing Firestore records...</p>
          </div>
        ) : (
          <div className="animate-fade-in">
            
            {/* 1. USERS TAB */}
            {activeTab === 'users' && (
              <GlassCard className="p-6 rounded-2xl border-white/5 overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-muted-foreground font-semibold">
                      <th className="py-3 px-4">UID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Provider</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {usersList.map((u) => (
                      <tr key={u.uid} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-mono text-[10px] text-purple-300 max-w-[100px] truncate">{u.uid}</td>
                        <td className="py-3 px-4 font-semibold text-white/90">{u.name || 'Anonymous'}</td>
                        <td className="py-3 px-4 text-muted-foreground">{u.email || 'N/A'}</td>
                        <td className="py-3 px-4 font-semibold capitalize text-purple-300">{u.role}</td>
                        <td className="py-3 px-4 text-muted-foreground capitalize text-[10px]">{u.authProvider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            )}

            {/* 2. QUIZ TAB */}
            {activeTab === 'quiz' && (
              <div className="flex flex-col space-y-4">
                {quizList.map((q, idx) => (
                  <GlassCard key={idx} className="p-4 rounded-xl border-white/5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold text-white/90">User: {q.userId}</span>
                      <span className="text-muted-foreground text-xs">Roadblock: {q.biggestIssue}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-heading text-lg font-black text-purple">{q.score}%</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase">{q.category}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* 3. AI LOGS TAB */}
            {activeTab === 'ai' && (
              <div className="flex flex-col space-y-4">
                {aiList.map((a, idx) => (
                  <GlassCard key={idx} className="p-4 rounded-xl border-white/5 text-xs">
                    <div className="flex justify-between text-muted-foreground font-semibold pb-1.5 border-b border-white/5 mb-1.5">
                      <span>User: {a.userId}</span>
                      <span className="capitalize text-purple-300 font-bold">{a.role} ({a.mode})</span>
                    </div>
                    <p className="text-white/90 whitespace-pre-wrap leading-relaxed">{a.message}</p>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* 4. REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div className="flex flex-col space-y-4">
                {reviewsList.map((req) => (
                  <GlassCard key={req.id} className="p-5 rounded-2xl border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs sm:text-sm">
                    <div className="flex flex-col space-y-1 max-w-lg text-left">
                      <div className="flex items-center space-x-3">
                        <span className="font-heading font-bold text-white capitalize">{req.reviewType} Audit</span>
                        <span className="px-2 py-0.5 text-[8px] font-bold uppercase rounded-md bg-white/5 text-muted-foreground">{req.status}</span>
                      </div>
                      <span className="text-muted-foreground text-[10px]">Context: {req.situationText}</span>
                    </div>
                    
                    {/* Review assignment widget */}
                    <div className="flex flex-col space-y-2 items-end">
                      {assigningId === req.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={reviewerIdInput}
                            onChange={(e) => setReviewerIdInput(e.target.value)}
                            placeholder="Reviewer UID"
                            className="bg-white/5 border border-white/10 rounded-xl px-2 py-1 text-xs text-white"
                          />
                          <button
                            onClick={() => handleAssignReviewer(req.id || '')}
                            disabled={submittingAssign}
                            className="px-3 py-1 rounded-lg gradient-bg text-white text-xs font-semibold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAssigningId(req.id || '');
                            setReviewerIdInput(req.assignedReviewerId || '');
                          }}
                          className="px-4 py-2 border border-white/10 hover:border-purple/30 bg-white/5 text-xs rounded-xl font-bold text-white transition-all whitespace-nowrap"
                        >
                          {req.assignedReviewerId ? 'Re-assign Reviewer' : 'Assign Reviewer'}
                        </button>
                      )}
                      <span className="text-[10px] text-muted-foreground">Assigned: {req.assignedReviewerId || 'None'}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* 5. CONTACTS TAB */}
            {activeTab === 'contacts' && (
              <div className="flex flex-col space-y-4">
                {contactsList.map((c, idx) => (
                  <GlassCard key={idx} className="p-5 rounded-2xl border-white/5 flex flex-col space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.email}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 font-bold uppercase text-[9px]">{c.reason}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{c.message}</p>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* 6. PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <GlassCard className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center">
                <CreditCard size={32} className="opacity-30 mb-3" />
                <span className="text-sm font-semibold">Razorpay Transaction Logs</span>
                <span className="text-xs max-w-xs mt-1">Stubs are configured. Order creation logging will automatically hook here once Razorpay script goes live.</span>
              </GlassCard>
            )}

          </div>
        )}

      </main>
    </div>
  );
}
