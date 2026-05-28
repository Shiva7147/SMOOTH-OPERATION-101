'use client';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { createOrUpdateUserDocument } from '@/lib/auth';
import type { User as DbUser } from '@/types';

interface AuthContextValue {
  user: FirebaseUser | null;
  profile: DbUser | null;
  loading: boolean;
  error: string | null;
  isDemo: boolean;
  enterDemoMode: () => void;
  exitDemoMode: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const enterDemoMode = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('smooth_operator_demo', 'true');
    }
    setIsDemo(true);
    setUser({
      uid: 'demo-user-id',
      displayName: 'Demo Operator',
      email: 'demo@smoothoperator.ai',
      photoURL: null,
      isAnonymous: true,
    } as any);
    setProfile({
      uid: 'demo-user-id',
      name: 'Demo Operator',
      email: 'demo@smoothoperator.ai',
      phone: '+91 98765 43210',
      photoURL: '',
      city: 'Mumbai, India',
      role: 'user',
      authProvider: 'anonymous',
      isAnonymous: true,
    } as any);
    setLoading(false);
  };

  const exitDemoMode = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('smooth_operator_demo');
    }
    setIsDemo(false);
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    // Check if demo is pre-enabled
    const isDemoEnabled = typeof window !== 'undefined' && localStorage.getItem('smooth_operator_demo') === 'true';
    if (isDemoEnabled) {
      setIsDemo(true);
      setUser({
        uid: 'demo-user-id',
        displayName: 'Demo Operator',
        email: 'demo@smoothoperator.ai',
        photoURL: null,
        isAnonymous: true,
      } as any);
      setProfile({
        uid: 'demo-user-id',
        name: 'Demo Operator',
        email: 'demo@smoothoperator.ai',
        phone: '+91 98765 43210',
        photoURL: '',
        city: 'Mumbai, India',
        role: 'user',
        authProvider: 'anonymous',
        isAnonymous: true,
      } as any);
      setLoading(false);
    }

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (unsubscribeProfile) {
            unsubscribeProfile();
            unsubscribeProfile = null;
          }

          if (firebaseUser) {
            // Real auth event: clear local demo state
            if (typeof window !== 'undefined') {
              localStorage.removeItem('smooth_operator_demo');
            }
            setIsDemo(false);

            // Ensure the document exists in Firestore
            await createOrUpdateUserDocument(firebaseUser);
            setUser(firebaseUser);

            // Listen to the Firestore user profile document in real-time
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            unsubscribeProfile = onSnapshot(
              userDocRef,
              (snapshot) => {
                if (snapshot.exists()) {
                  setProfile(snapshot.data() as DbUser);
                } else {
                  setProfile(null);
                }
                setLoading(false);
              },
              (err) => {
                console.error('Error listening to user profile:', err);
                setError(err.message);
                setLoading(false);
              }
            );
          } else {
            // No firebaseUser, fallback to demo if active
            const stillDemo = typeof window !== 'undefined' && localStorage.getItem('smooth_operator_demo') === 'true';
            if (stillDemo) {
              setIsDemo(true);
              setUser({
                uid: 'demo-user-id',
                displayName: 'Demo Operator',
                email: 'demo@smoothoperator.ai',
                photoURL: null,
                isAnonymous: true,
              } as any);
              setProfile({
                uid: 'demo-user-id',
                name: 'Demo Operator',
                email: 'demo@smoothoperator.ai',
                phone: '+91 98765 43210',
                photoURL: '',
                city: 'Mumbai, India',
                role: 'user',
                authProvider: 'anonymous',
                isAnonymous: true,
              } as any);
              setLoading(false);
            } else {
              setUser(null);
              setProfile(null);
              setIsDemo(false);
              setLoading(false);
            }
          }
          setError(null);
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'Failed to sync user document.';
          setError(message);
          setUser(firebaseUser);
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, error, isDemo, enterDemoMode, exitDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
