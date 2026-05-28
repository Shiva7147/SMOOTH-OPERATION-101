import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  updateProfile,
  UserCredential,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import type { AuthProvider } from '@/types';

// ─── Error shape ────────────────────────────────────────────────────
interface AuthError {
  code: string;
  message: string;
}

type AuthResult<T> = { data: T; error: null } | { data: null; error: AuthError };

function toAuthError(err: unknown): AuthError {
  if (err instanceof Error) {
    const firebaseErr = err as Error & { code?: string };
    return {
      code: firebaseErr.code ?? 'unknown',
      message: firebaseErr.message,
    };
  }
  return { code: 'unknown', message: 'An unexpected error occurred.' };
}

// ─── Google Login ───────────────────────────────────────────────────
export async function loginWithGoogle(): Promise<AuthResult<UserCredential>> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await createOrUpdateUserDocument(result.user);
    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: toAuthError(err) };
  }
}

// ─── Email Login ────────────────────────────────────────────────────
export async function loginWithEmail(
  email: string,
  password: string
): Promise<AuthResult<UserCredential>> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createOrUpdateUserDocument(result.user);
    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: toAuthError(err) };
  }
}

// ─── Email Signup ───────────────────────────────────────────────────
export async function signupWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<AuthResult<UserCredential>> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(result.user, { displayName });

    await createOrUpdateUserDocument(result.user);
    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: toAuthError(err) };
  }
}

// ─── Demo / Anonymous Login ─────────────────────────────────────────
export async function loginAsDemo(): Promise<AuthResult<UserCredential>> {
  try {
    const result = await signInAnonymously(auth);
    await createOrUpdateUserDocument(result.user);
    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: toAuthError(err) };
  }
}

// ─── Logout ─────────────────────────────────────────────────────────
export async function logout(): Promise<{ error: AuthError | null }> {
  try {
    await signOut(auth);
    return { error: null };
  } catch (err) {
    return { error: toAuthError(err) };
  }
}

// ─── Determine auth provider ────────────────────────────────────────
function resolveAuthProvider(user: FirebaseUser): AuthProvider {
  if (user.isAnonymous) return 'anonymous';

  const providerId = user.providerData[0]?.providerId;

  switch (providerId) {
    case 'google.com':
      return 'google';
    case 'phone':
      return 'phone';
    case 'password':
      return 'email';
    default:
      return 'email';
  }
}

// ─── Create / Update user document ──────────────────────────────────
export async function createOrUpdateUserDocument(
  user: FirebaseUser
): Promise<void> {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const provider = resolveAuthProvider(user);

    if (userSnap.exists()) {
      // Existing user — update login timestamp
      await setDoc(
        userRef,
        {
          name: user.displayName || userSnap.data().name || '',
          email: user.email || userSnap.data().email || '',
          photoURL: user.photoURL || userSnap.data().photoURL || '',
          isAnonymous: user.isAnonymous,
          authProvider: provider,
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    } else {
      // New user — create full document
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        city: '',
        role: 'user',
        authProvider: provider,
        isAnonymous: user.isAnonymous,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
    }
  } catch (err) {
    console.error('Failed to create or update user document in Firestore:', err);
    // Suppress the error so the user can still log in and use the app.
  }
}
