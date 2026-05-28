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
      "3 AI chat practice sessions/month",
      "Basic bio rewrite suggestions",
      "Photo ranking insights",
      "Weekly dating tips via email",
      "Access to community tips board",
      "Priority quiz retakes",
    ],
    valueLine: "Less than a cup of chai per day",
    trustLine: "Cancel anytime. No commitments. No drama.",
    cta: "Start Smooth",
  },
  {
    id: "first-impression-review",
    name: "First Impression Review",
    price: 399,
    badge: "Most Valuable",
    features: [
      "Everything in Smooth Start",
      "1 detailed human review per month from a real woman",
      "First impression score with honest breakdown",
      "What works & what doesn't — no sugarcoating",
      "3 exact fixes you can apply today",
      "Voice note review (hear real reactions)",
      "Unlimited AI chat practice sessions",
      "Priority profile optimization queue",
      "Before/after profile comparison",
      "Access to reviewer Q&A (async)",
    ],
    valueLine: "One honest review > 100 confused swipes",
    trustLine:
      "Real women. Real feedback. Admin-approved quality.",
    cta: "Get Reviewed",
  },
  {
    id: "smooth-operator-elite",
    name: "Smooth Operator Elite",
    price: 1599,
    badge: "Full Transformation",
    features: [
      "Everything in First Impression Review",
      "3 detailed human reviews per month",
      "1-on-1 video coaching session (30 min/month)",
      "Complete profile overhaul by a dating coach",
      "Custom bio writing by a professional",
      "Photo selection & ordering strategy",
      "Live chat simulation with feedback",
      "Dedicated WhatsApp support line",
    ],
    valueLine: "Your complete dating glow-up, handled",
    trustLine:
      "For the serious ones. Real coaching. Real transformation.",
    cta: "Go Elite",
  },
];

export const CURRENCY = "INR";
export const CURRENCY_SYMBOL = "₹";
