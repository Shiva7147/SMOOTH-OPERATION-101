import { Timestamp } from "firebase/firestore";

// ─── User Roles ───────────────────────────────────────────────────────────────

export type UserRole = "user" | "admin" | "reviewer" | "coach";

export type AuthProvider = "google" | "phone" | "email" | "anonymous";

// ─── Core User ────────────────────────────────────────────────────────────────

export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  photoURL: string;
  city: string;
  role: UserRole;
  authProvider: AuthProvider;
  isAnonymous: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
}

// ─── Quiz & Scoring ───────────────────────────────────────────────────────────

export interface QuizAnswer {
  userId: string;
  answers: Record<number, string>;
  createdAt: Timestamp;
}

export interface SmoothScoreSubMetrics {
  profileWarmth: number;
  bioPersonality: number;
  replyConfidence: number;
  firstImpression: number;
}

export interface SmoothScoreResult {
  userId: string;
  score: number;
  category: string;
  biggestIssue: string;
  freeFix: string;
  subMetrics: SmoothScoreSubMetrics;
  createdAt: Timestamp;
}

// ─── AI Chat ──────────────────────────────────────────────────────────────────

export type AIMessageRole = "user" | "assistant";

export type AIMessageMode = "live" | "offline";

export interface AIMessage {
  userId: string;
  role: AIMessageRole;
  message: string;
  mode: AIMessageMode;
  createdAt: Timestamp;
}

// ─── Review System ────────────────────────────────────────────────────────────

export type ReviewRequestStatus =
  | "pending"
  | "assigned"
  | "completed"
  | "rejected";

export type ReviewType =
  | "profile"
  | "bio"
  | "photos"
  | "chat"
  | "full";

export interface ReviewRequest {
  id?: string;
  userId: string;
  reviewType: ReviewType;
  goal: string;
  situationText: string;
  uploadUrls: string[];
  status: ReviewRequestStatus;
  assignedReviewerId: string;
  creditsUsed: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Review {
  id?: string;
  userId: string;
  reviewerId: string;
  reviewRequestId: string;
  firstImpression: string;
  whatWorks: string;
  whatDoesntWork: string;
  exactFixes: string[];
  voiceNoteUrl: string;
  adminApproved: boolean;
  createdAt: Timestamp;
}

export interface ReviewCredit {
  userId: string;
  credits: number;
  planId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ─── Reviewer ─────────────────────────────────────────────────────────────────

export interface ReviewerProfile {
  userId: string;
  name: string;
  ageRange: string;
  isVerified: boolean;
  assignedCount: number;
  completedCount: number;
  createdAt: Timestamp;
}

// ─── Coaching ─────────────────────────────────────────────────────────────────

export type CoachSessionStatus =
  | "scheduled"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface CoachSession {
  userId: string;
  coachId: string;
  scheduledAt: Timestamp;
  status: CoachSessionStatus;
  notes: string;
  createdAt: Timestamp;
}

// ─── Contact ──────────────────────────────────────────────────────────────────

export type ContactMessageStatus = "new" | "read" | "replied";

export interface ContactMessage {
  name: string;
  email: string;
  reason: string;
  message: string;
  status: ContactMessageStatus;
  createdAt: Timestamp;
}

// ─── Payments & Subscriptions ─────────────────────────────────────────────────

export type PaymentStatus =
  | "created"
  | "authorized"
  | "captured"
  | "failed"
  | "refunded";

export interface Payment {
  userId: string;
  amount: number;
  currency: string;
  planId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: PaymentStatus;
  createdAt: Timestamp;
}

export type SubscriptionStatus = "active" | "cancelled" | "expired";

export interface Subscription {
  userId: string;
  planId: string;
  status: SubscriptionStatus;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
}

// ─── Debug ────────────────────────────────────────────────────────────────────

export interface DebugWrite {
  message: string;
  userId: string;
  projectId: string;
  environment: string;
  createdAt: Timestamp;
}

// ─── Quiz Questions ───────────────────────────────────────────────────────────

export type QuizCategory =
  | "goal"
  | "problem"
  | "confidence"
  | "photos"
  | "bio"
  | "chat"
  | "intent";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  category: QuizCategory;
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  badge: string;
  features: string[];
  valueLine: string;
  trustLine: string;
  cta: string;
}
