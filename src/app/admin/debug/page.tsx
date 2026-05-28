'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function AdminDebugPage() {
  const [firebaseStatus, setFirebaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [writeStatus, setWriteStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [envData, setEnvData] = useState<any>(null);
  const [envLoading, setEnvLoading] = useState(false);

  const checkFirebase = async () => {
    setFirebaseStatus('checking');
    try {
      // Fetch a dummy document to verify connection
      const docRef = doc(db, 'admins', 'test_connection');
      await getDoc(docRef);
      setFirebaseStatus('connected');
    } catch (err) {
      console.error('Firebase connection error:', err);
      setFirebaseStatus('error');
    }
  };

  const triggerTestWrite = async () => {
    setWriteStatus('testing');
    try {
      const response = await fetch('/api/test-firestore-write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Diagnostic test write from debug dashboard' }),
      });
      const data = await response.json();
      if (data.success) {
        setWriteStatus('success');
      } else {
        setWriteStatus('error');
      }
    } catch (err) {
      console.error('Test write error:', err);
      setWriteStatus('error');
    }
  };

  const fetchEnvStatus = async () => {
    setEnvLoading(true);
    try {
      const res = await fetch('/api/env-check');
      const data = await res.json();
      setEnvData(data);
    } catch (err) {
      console.error('Env fetch error:', err);
    } finally {
      setEnvLoading(false);
    }
  };

  useEffect(() => {
    checkFirebase();
    fetchEnvStatus();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow max-w-4xl w-full mx-auto pt-32 pb-24 px-6 space-y-8 text-left">
        
        {/* Navigation back */}
        <Link
          href="/admin/dashboard"
          className="flex items-center space-x-1.5 text-xs font-semibold text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Admin Panel</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col space-y-1">
          <h1 className="font-heading text-2xl font-extrabold text-white">
            System Diagnostics
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Check API route loading states, Firebase database connections, and verify environment configurations.
          </p>
        </div>

        {/* Diagnostics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Connection Statuses */}
          <div className="flex flex-col space-y-6">
            
            {/* Firebase Connection Card */}
            <GlassCard className="p-6 rounded-2xl border-white/5 flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-sm font-bold text-white">
                  Firestore Connection
                </span>
                <button onClick={checkFirebase} className="text-muted-foreground hover:text-white transition-colors">
                  <RefreshCw size={14} className={firebaseStatus === 'checking' ? 'animate-spin' : ''} />
                </button>
              </div>

              {firebaseStatus === 'checking' && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <LoadingSpinner size="sm" />
                  <span>Checking Firestore socket...</span>
                </div>
              )}

              {firebaseStatus === 'connected' && (
                <div className="flex items-center space-x-2 text-xs text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span>Socket Connected (Database online)</span>
                </div>
              )}

              {firebaseStatus === 'error' && (
                <div className="flex items-center space-x-2 text-xs text-rose-400">
                  <AlertTriangle size={16} />
                  <span>Connection Error. Check firestore rules or env keys.</span>
                </div>
              )}
            </GlassCard>

            {/* Test Write Card */}
            <GlassCard className="p-6 rounded-2xl border-white/5 flex flex-col space-y-4">
              <span className="font-heading text-sm font-bold text-white">
                Firestore Test Write
              </span>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Trigger a server-side POST request to verify write permissions on the `debug_writes` collection.
              </p>

              <div className="flex items-center space-x-4">
                <GradientButton
                  onClick={triggerTestWrite}
                  variant="secondary"
                  size="sm"
                  disabled={writeStatus === 'testing'}
                >
                  {writeStatus === 'testing' ? 'Testing...' : 'Test Write'}
                </GradientButton>

                {writeStatus === 'success' && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Write Success!
                  </span>
                )}

                {writeStatus === 'error' && (
                  <span className="text-xs text-rose-400 flex items-center gap-1">
                    <AlertTriangle size={14} /> Write Failed
                  </span>
                )}
              </div>
            </GlassCard>

          </div>

          {/* Right Column: Masked Environment variables */}
          <div className="flex flex-col">
            <GlassCard className="p-6 rounded-2xl border-white/5 flex flex-col space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="font-heading text-sm font-bold text-white">
                  Environment Configurations
                </span>
                <button onClick={fetchEnvStatus} className="text-muted-foreground hover:text-white transition-colors">
                  <RefreshCw size={14} className={envLoading ? 'animate-spin' : ''} />
                </button>
              </div>

              {envLoading ? (
                <div className="flex items-center justify-center py-6">
                  <LoadingSpinner size="sm" />
                </div>
              ) : envData ? (
                <div className="flex flex-col space-y-3 font-mono text-xs text-white/95">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gemini Key Loaded:</span>
                    <span className={envData.geminiKeyLoaded ? 'text-emerald-400' : 'text-rose-400'}>
                      {envData.geminiKeyLoaded ? 'TRUE' : 'FALSE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Masked Key:</span>
                    <span>{envData.maskedKey || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gemini Model:</span>
                    <span>{envData.modelConfigured || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Firebase project:</span>
                    <span>{envData.firebaseProjectId || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Node Environment:</span>
                    <span>{envData.nodeEnv || 'development'}</span>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground">Failed to parse environments.</span>
              )}
            </GlassCard>
          </div>

        </div>

        {/* Safety audit notes */}
        <div className="flex items-center space-x-2 text-xs text-muted-foreground py-4 border-t border-white/5 mt-6">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Diagnostic dashboard does not expose raw keys or confidential credentials.</span>
        </div>

      </main>
    </div>
  );
}
