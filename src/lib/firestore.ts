import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  updateDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  User,
  QuizAnswer,
  SmoothScoreResult,
  AIMessage,
  ReviewRequest,
  Review,
  ContactMessage,
  DebugWrite,
} from '@/types';

// Helper to convert Firestore snapshot to typed object
const toTypedDoc = <T>(docSnap: QueryDocumentSnapshot<DocumentData>): T => {
  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as T;
};

// ─── Quiz Answers ────────────────────────────────────────────────────────────
export async function saveQuizAnswers(
  userId: string,
  answers: Record<number, string>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'quiz_answers'), {
      userId,
      answers,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving quiz answers:', error);
    throw error;
  }
}

export async function getQuizAnswers(userId: string): Promise<QuizAnswer[]> {
  try {
    const q = query(
      collection(db, 'quiz_answers'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<QuizAnswer>(docSnap));
  } catch (error) {
    console.error('Error getting quiz answers:', error);
    return [];
  }
}

// ─── Smooth Score Result ──────────────────────────────────────────────────────
export async function saveSmoothScore(
  userId: string,
  result: Omit<SmoothScoreResult, 'userId' | 'createdAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'smooth_score_results'), {
      userId,
      ...result,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving smooth score:', error);
    throw error;
  }
}

export async function getLatestSmoothScore(
  userId: string
): Promise<SmoothScoreResult | null> {
  try {
    const q = query(
      collection(db, 'smooth_score_results'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;
    return toTypedDoc<SmoothScoreResult>(snap.docs[0]);
  } catch (error) {
    console.error('Error getting latest smooth score:', error);
    return null;
  }
}

// ─── AI Messages ──────────────────────────────────────────────────────────────
export async function saveAIMessage(
  userId: string,
  role: 'user' | 'assistant',
  message: string,
  mode: 'live' | 'offline'
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'ai_messages'), {
      userId,
      role,
      message,
      mode,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving AI message:', error);
    throw error;
  }
}

export async function getAIMessages(
  userId: string,
  limitCount?: number
): Promise<AIMessage[]> {
  try {
    let q = query(
      collection(db, 'ai_messages'),
      where('userId', '==', userId),
      orderBy('createdAt', 'asc')
    );
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<AIMessage>(docSnap));
  } catch (error) {
    console.error('Error getting AI messages:', error);
    return [];
  }
}

// ─── Review Requests ──────────────────────────────────────────────────────────
export async function createReviewRequest(
  data: Omit<ReviewRequest, 'createdAt' | 'updatedAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'review_requests'), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating review request:', error);
    throw error;
  }
}

export async function getReviewRequests(userId: string): Promise<ReviewRequest[]> {
  try {
    const q = query(
      collection(db, 'review_requests'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<ReviewRequest>(docSnap));
  } catch (error) {
    console.error('Error getting review requests:', error);
    return [];
  }
}

export async function getAssignedReviews(
  reviewerId: string
): Promise<ReviewRequest[]> {
  try {
    const q = query(
      collection(db, 'review_requests'),
      where('assignedReviewerId', '==', reviewerId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<ReviewRequest>(docSnap));
  } catch (error) {
    console.error('Error getting assigned reviews:', error);
    return [];
  }
}

export async function updateReviewRequestStatus(
  requestId: string,
  status: 'pending' | 'assigned' | 'completed' | 'rejected',
  reviewerId?: string
): Promise<void> {
  try {
    const ref = doc(db, 'review_requests', requestId);
    const updateData: Record<string, any> = {
      status,
      updatedAt: serverTimestamp(),
    };
    if (reviewerId) {
      updateData.assignedReviewerId = reviewerId;
    }
    await updateDoc(ref, updateData);
  } catch (error) {
    console.error('Error updating review request status:', error);
    throw error;
  }
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
export async function saveReview(
  data: Omit<Review, 'createdAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving review:', error);
    throw error;
  }
}

export async function getReviews(userId: string): Promise<Review[]> {
  try {
    const q = query(
      collection(db, 'reviews'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<Review>(docSnap));
  } catch (error) {
    console.error('Error getting reviews:', error);
    return [];
  }
}

// ─── Contact Messages ────────────────────────────────────────────────────────
export async function saveContactMessage(
  data: Omit<ContactMessage, 'status' | 'createdAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving contact message:', error);
    throw error;
  }
}

// ─── Debug Writes ────────────────────────────────────────────────────────────
export async function debugWrite(data: {
  message: string;
  userId?: string;
}): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'debug_writes'), {
      message: data.message,
      userId: data.userId || 'anonymous',
      projectId: 'smooth-operator-fda60',
      environment: process.env.NODE_ENV || 'development',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error in debugWrite:', error);
    throw error;
  }
}

// ─── Admin Queries ───────────────────────────────────────────────────────────
export async function getAllUsers(): Promise<User[]> {
  try {
    const snap = await getDocs(collection(db, 'users'));
    return snap.docs.map((docSnap) => toTypedDoc<User>(docSnap));
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

export async function getAllReviewRequests(): Promise<ReviewRequest[]> {
  try {
    const q = query(collection(db, 'review_requests'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<ReviewRequest>(docSnap));
  } catch (error) {
    console.error('Error getting all review requests:', error);
    return [];
  }
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, 'contact_messages'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<ContactMessage>(docSnap));
  } catch (error) {
    console.error('Error getting all contact messages:', error);
    return [];
  }
}

export async function isAdmin(uid: string): Promise<boolean> {
  try {
    // Check admins collection doc
    const adminRef = doc(db, 'admins', uid);
    const adminSnap = await getDoc(adminRef);
    if (adminSnap.exists() && adminSnap.data().isAdmin === true) {
      return true;
    }

    // Fallback: check users collection role
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().role === 'admin') {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
}

export async function getAllQuizResults(): Promise<SmoothScoreResult[]> {
  try {
    const q = query(collection(db, 'smooth_score_results'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<SmoothScoreResult>(docSnap));
  } catch (error) {
    console.error('Error getting all quiz results:', error);
    return [];
  }
}

export async function getAllAIMessages(): Promise<AIMessage[]> {
  try {
    const q = query(collection(db, 'ai_messages'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((docSnap) => toTypedDoc<AIMessage>(docSnap));
  } catch (error) {
    console.error('Error getting all AI messages:', error);
    return [];
  }
}

export async function updateUserProfile(uid: string, data: Partial<User>): Promise<void> {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}
