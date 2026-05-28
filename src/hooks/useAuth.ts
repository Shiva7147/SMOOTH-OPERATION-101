'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import {
  loginWithGoogle,
  loginWithEmail,
  signupWithEmail,
  loginAsDemo,
  logout,
} from '@/lib/auth';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const handleLogout = async () => {
    context.exitDemoMode();
    return logout();
  };
  
  return {
    user: context.user,
    profile: context.profile,
    loading: context.loading,
    error: context.error,
    isDemo: context.isDemo,
    enterDemoMode: context.enterDemoMode,
    exitDemoMode: context.exitDemoMode,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    loginAsDemo,
    logout: handleLogout,
  };
}
