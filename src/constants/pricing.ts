import type { PricingPlan } from "@/types";

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "smooth-start",
    name: "Smooth Start",
    price: 99,
    badge: "Start Here",
    features: [
      "Full Smooth Score breakdown",
      "AI-powered profile analysis",
      "Instant AI bio rewrite suggestions",
      "Natural, context-aware reply support",
      "AI photo ranking feedback",
      "Cancel anytime. Cancel in 1 click.",
    ],
    valueLine: "AI help, Smooth Score, bio tips, and reply support",
    trustLine: "Cancel anytime. No commitments. No drama.",
    cta: "Get My Smooth Score",
  },
  {
    id: "first-impression-review",
    name: "First Impression Review",
    price: 399,
    badge: "Most Valuable",
    features: [
      "Everything in Smooth Start",
      "1 private profile/chat review per month",
      "Reviewed by a verified woman in your age range",
      "Voice note or written feedback",
      "3 exact improvements",
      "1 follow-up question",
      "Private dashboard delivery",
      "No direct contact. No public roasting.",
    ],
    valueLine: "For men who want real human perspective, not just AI guesses",
    trustLine: "Voice note feedback. No direct contact. No public roasting.",
    cta: "Get My Smooth Score",
  },
  {
    id: "smooth-operator-elite",
    name: "Smooth Operator Elite",
    price: 1599,
    badge: "Full Transformation",
    features: [
      "Everything in First Impression Review",
      "3 detailed human reviews per month",
      "1-on-1 coaching session (mock date or matrimony call prep)",
      "Comprehensive communication & style assessment",
      "Priority review queue & fast turnaround",
      "Complete profile overhaul by a dating coach",
      "Custom bio writing by a professional",
    ],
    valueLine: "Your complete profile and communication overhaul, handled",
    trustLine: "For the serious ones. Real coaching. Real transformation.",
    cta: "Get My Smooth Score",
  },
];

export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";
