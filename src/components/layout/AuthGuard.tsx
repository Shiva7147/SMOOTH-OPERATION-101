'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { UserRole } from '@/types';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = profile?.role || 'user';
      if (!allowedRoles.includes(userRole)) {
        // Not authorized, redirect to general dashboard
        router.push('/dashboard');
      }
    }
  }, [user, profile, loading, allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-muted-foreground text-sm animate-pulse">
          Securing session...
        </p>
      </div>
    );
  }

  // If loading is done, check if authenticated and authorized before showing page contents
  if (!user) {
    return null; // Prevents flashing content while redirect is triggered
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = profile?.role || 'user';
    if (!allowedRoles.includes(userRole)) {
      return null; // Prevents flashing content while redirecting unauthorized user
    }
  }

  return <>{children}</>;
}

export default AuthGuard;
