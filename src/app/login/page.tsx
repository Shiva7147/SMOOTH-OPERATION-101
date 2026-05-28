'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function getFriendlyErrorMessage(code: string): string {
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'Login is having trouble. This domain is not authorized. You can still explore in demo mode below.';
    case 'auth/operation-not-allowed':
      return 'This login option is disabled in the Firebase Console. Try demo mode below.';
    case 'auth/popup-closed-by-user':
      return 'The authentication popup was closed before completing. Please try again.';
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please verify your entries.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Try logging in instead.';
    case 'permission-denied':
      return 'Database access denied. Try exploring in demo mode.';
    case 'auth/invalid-api-key':
      return 'Firebase configuration is incomplete. You can still explore in demo mode below.';
    default:
      if (code && (code.includes('key') || code.includes('config') || code.includes('API'))) {
        return 'Firebase keys are not configured yet. Bypassing login with Demo Mode is recommended.';
      }
      return 'Login is having trouble. You can still explore Smooth Operator in demo mode.';
  }
}

export default function LoginPage() {
  const { user, loginWithEmail, loginWithGoogle, enterDemoMode, loading: authLoading, isDemo } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingType, setLoadingType] = useState<'email' | 'google' | 'demo' | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already logged in or in demo mode
  useEffect(() => {
    if (!mounted) return;
    if ((user || isDemo) && !authLoading) {
      router.push('/dashboard');
    }
  }, [user, isDemo, authLoading, router, mounted]);

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }
    setErrorMsg(null);
    setLoadingType('email');
    try {
      const { data, error } = await loginWithEmail(email, password);
      if (error) {
        setErrorMsg(getFriendlyErrorMessage(error.code || error.message));
      } else if (data) {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg('An unexpected login error occurred. You can still explore in demo mode.');
    } finally {
      setLoadingType(null);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setLoadingType('google');
    try {
      const { data, error } = await loginWithGoogle();
      if (error) {
        setErrorMsg(getFriendlyErrorMessage(error.code || error.message));
      } else if (data) {
        router.push('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Google login is not configured on this host. Try demo mode instead.');
    } finally {
      setLoadingType(null);
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg(null);
    setLoadingType('demo');
    try {
      enterDemoMode();
      router.push('/dashboard');
    } catch (err) {
      setErrorMsg('Demo mode failed to initialize.');
    } finally {
      setLoadingType(null);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0f] text-foreground">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground text-sm animate-pulse">
          Verifying credentials...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] py-16 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-purple/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-blue/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[450px] z-10"
      >
        {/* Brand Header */}
        <div className="text-center mb-8 flex flex-col items-center space-y-2">
          <Link href="/" className="font-heading text-3xl font-extrabold text-white tracking-tight">
            Smooth<span className="gradient-text font-black">Operator</span>
          </Link>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-semibold">
            Fix the vibe before you fix the reply
          </p>
        </div>

        {/* Login Card */}
        <GlassCard className="p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col space-y-6">
          <h2 className="font-heading text-xl font-bold text-white text-center">
            Sign In to Your Workspace
          </h2>

          {errorMsg && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center leading-relaxed">
              {errorMsg}
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-1 relative">
              <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl text-sm"
                  disabled={loadingType !== null}
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col space-y-1 relative">
              <div className="flex justify-between items-center ml-1 mb-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl text-sm"
                  disabled={loadingType !== null}
                />
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Email Login Button */}
            <GradientButton
              type="submit"
              variant="primary"
              fullWidth
              loading={loadingType === 'email'}
              disabled={loadingType !== null}
              className="mt-2 py-3"
            >
              <span className="flex items-center justify-center gap-2">
                <LogIn size={16} />
                <span>Sign In with Email</span>
              </span>
            </GradientButton>
          </form>

          {/* Separator line */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-muted-foreground text-xs uppercase tracking-wider font-semibold">
              or
            </span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Third-party buttons */}
          <div className="flex flex-col space-y-3">
            {/* Google button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loadingType !== null}
              className="w-full flex items-center justify-center gap-3 py-3 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              {loadingType === 'google' ? (
                <LoadingSpinner size="sm" />
              ) : (
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            {/* Demo Button */}
            <button
              onClick={handleDemoLogin}
              disabled={loadingType !== null}
              className="w-full flex items-center justify-center gap-3 py-3 border border-purple-500/20 hover:border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 rounded-xl text-sm font-medium text-purple-300 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loadingType === 'demo' ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span className="text-base">⚡</span>
              )}
              <span>Try Demo Without Login</span>
            </button>
          </div>

          {/* Link to signup */}
          <p className="text-center text-xs text-muted-foreground mt-2">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple hover:underline hover:text-purple/80 transition-colors font-semibold">
              Sign up free
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
