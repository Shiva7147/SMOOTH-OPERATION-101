import type { SmoothScoreSubMetrics } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScoringResult {
  score: number;
  category: string;
  biggestIssue: string;
  freeFix: string;
  subMetrics: SmoothScoreSubMetrics;
}

interface MetricScores {
  profileWarmth: number;
  bioPersonality: number;
  replyConfidence: number;
  firstImpression: number;
}

// ─── Answer → Sub-metric Score Maps ───────────────────────────────────────────
// Each question maps its option index (0-based) to sub-metric contributions.
// Scores are 0–100 per metric, per question. Final metric = weighted average.

const QUESTION_SCORE_MAP: Record<number, MetricScores[]> = {
  // Q1: What are you trying to improve?
  1: [
    { profileWarmth: 35, bioPersonality: 30, replyConfidence: 40, firstImpression: 30 }, // profile
    { profileWarmth: 55, bioPersonality: 50, replyConfidence: 25, firstImpression: 55 }, // conversation
    { profileWarmth: 45, bioPersonality: 45, replyConfidence: 30, firstImpression: 40 }, // confidence
    { profileWarmth: 30, bioPersonality: 30, replyConfidence: 30, firstImpression: 30 }, // overall vibe
    { profileWarmth: 40, bioPersonality: 35, replyConfidence: 40, firstImpression: 35 }, // matrimony
    { profileWarmth: 50, bioPersonality: 50, replyConfidence: 50, firstImpression: 50 }, // just curious
  ],
  // Q2: What is your biggest problem?
  2: [
    { profileWarmth: 20, bioPersonality: 25, replyConfidence: 35, firstImpression: 15 }, // barely any matches
    { profileWarmth: 40, bioPersonality: 30, replyConfidence: 20, firstImpression: 35 }, // matches but no replies
    { profileWarmth: 50, bioPersonality: 45, replyConfidence: 30, firstImpression: 50 }, // conversations fizzle
    { profileWarmth: 45, bioPersonality: 40, replyConfidence: 25, firstImpression: 45 }, // getting ghosted
    { profileWarmth: 55, bioPersonality: 55, replyConfidence: 35, firstImpression: 55 }, // can't convert to dates
    { profileWarmth: 30, bioPersonality: 30, replyConfidence: 30, firstImpression: 30 }, // don't know what's wrong
  ],
  // Q3: How confident about your profile?
  3: [
    { profileWarmth: 80, bioPersonality: 75, replyConfidence: 80, firstImpression: 80 }, // very confident
    { profileWarmth: 60, bioPersonality: 55, replyConfidence: 60, firstImpression: 60 }, // somewhat confident
    { profileWarmth: 40, bioPersonality: 35, replyConfidence: 40, firstImpression: 40 }, // not sure
    { profileWarmth: 25, bioPersonality: 25, replyConfidence: 25, firstImpression: 25 }, // not confident
    { profileWarmth: 15, bioPersonality: 15, replyConfidence: 20, firstImpression: 10 }, // random pics
  ],
  // Q4: What type of photos?
  4: [
    { profileWarmth: 20, bioPersonality: 30, replyConfidence: 40, firstImpression: 15 }, // selfies
    { profileWarmth: 25, bioPersonality: 25, replyConfidence: 35, firstImpression: 20 }, // group photos
    { profileWarmth: 20, bioPersonality: 20, replyConfidence: 30, firstImpression: 25 }, // old photos
    { profileWarmth: 55, bioPersonality: 35, replyConfidence: 50, firstImpression: 65 }, // professional
    { profileWarmth: 70, bioPersonality: 60, replyConfidence: 65, firstImpression: 75 }, // mix candid+posed
    { profileWarmth: 10, bioPersonality: 15, replyConfidence: 25, firstImpression: 8  }, // one blurry photo
  ],
  // Q5: What does your bio look like?
  5: [
    { profileWarmth: 10, bioPersonality: 5,  replyConfidence: 30, firstImpression: 15 }, // empty
    { profileWarmth: 25, bioPersonality: 15, replyConfidence: 35, firstImpression: 25 }, // just height/job
    { profileWarmth: 35, bioPersonality: 30, replyConfidence: 40, firstImpression: 35 }, // copy-pasted
    { profileWarmth: 30, bioPersonality: 20, replyConfidence: 35, firstImpression: 30 }, // generic line
    { profileWarmth: 75, bioPersonality: 80, replyConfidence: 60, firstImpression: 70 }, // thoughtful 2-3 liner
    { profileWarmth: 40, bioPersonality: 45, replyConfidence: 45, firstImpression: 35 }, // essay
  ],
  // Q6: What happens in your chats?
  6: [
    { profileWarmth: 30, bioPersonality: 25, replyConfidence: 10, firstImpression: 35 }, // hi/hey
    { profileWarmth: 40, bioPersonality: 35, replyConfidence: 20, firstImpression: 45 }, // paragraphs
    { profileWarmth: 55, bioPersonality: 50, replyConfidence: 40, firstImpression: 55 }, // vanish at meet
    { profileWarmth: 40, bioPersonality: 35, replyConfidence: 25, firstImpression: 45 }, // stuck after 2-3 msgs
    { profileWarmth: 70, bioPersonality: 70, replyConfidence: 80, firstImpression: 65 }, // flows well
    { profileWarmth: 35, bioPersonality: 30, replyConfidence: 15, firstImpression: 40 }, // wait for them
  ],
  // Q7: Dating or matrimony?
  7: [
    { profileWarmth: 55, bioPersonality: 55, replyConfidence: 50, firstImpression: 55 }, // casual
    { profileWarmth: 50, bioPersonality: 50, replyConfidence: 50, firstImpression: 50 }, // serious
    { profileWarmth: 40, bioPersonality: 40, replyConfidence: 45, firstImpression: 40 }, // matrimony
    { profileWarmth: 50, bioPersonality: 50, replyConfidence: 50, firstImpression: 50 }, // both
    { profileWarmth: 45, bioPersonality: 45, replyConfidence: 40, firstImpression: 45 }, // not sure
  ],
};

// ─── Metric Weights ───────────────────────────────────────────────────────────
// How much each sub-metric contributes to the total score

const METRIC_WEIGHTS: Record<keyof MetricScores, number> = {
  firstImpression: 0.30,
  profileWarmth: 0.25,
  bioPersonality: 0.25,
  replyConfidence: 0.20,
};

// ─── Category Thresholds ──────────────────────────────────────────────────────

function getCategory(score: number): string {
  if (score <= 30) return "Needs a major overhaul";
  if (score <= 50) return "Needs a serious fix";
  if (score <= 65) return "Getting there but still rough";
  if (score <= 80) return "Solid but could be smoother";
  return "Smooth Operator material";
}

// ─── Biggest Issue Detection ──────────────────────────────────────────────────

const METRIC_LABELS: Record<keyof MetricScores, string> = {
  profileWarmth: "Profile Warmth",
  bioPersonality: "Bio & Personality",
  replyConfidence: "Reply Confidence",
  firstImpression: "First Impression",
};

function getBiggestIssue(subMetrics: MetricScores): string {
  let lowestKey: keyof MetricScores = "profileWarmth";
  let lowestVal = Infinity;

  for (const key of Object.keys(subMetrics) as (keyof MetricScores)[]) {
    if (subMetrics[key] < lowestVal) {
      lowestVal = subMetrics[key];
      lowestKey = key;
    }
  }

  return METRIC_LABELS[lowestKey];
}

// ─── Free Fix Generator ──────────────────────────────────────────────────────

function getFreeFix(biggestIssue: string, subMetrics: MetricScores): string {
  const fixes: Record<string, string[]> = {
    "First Impression": [
      "Your first photo is everything. Replace it with a clear, well-lit photo where you're smiling and looking at the camera. No sunglasses, no group shots, no gym mirrors. Just you, looking approachable.",
      "Lead with your best photo — a clear headshot with natural lighting and a genuine smile. First impressions are made in under 2 seconds. Make those seconds count.",
    ],
    "Profile Warmth": [
      "Your profile feels cold or generic. Add a photo of you doing something you enjoy — cooking, playing guitar, hiking, anything. Show her you have a life outside of selfies.",
      "Warm up your profile by showing personality in your photos. A candid laugh, a travel moment, or even a pic with your dog. People swipe right on vibes, not just faces.",
    ],
    "Bio & Personality": [
      "Your bio needs personality. Drop the generic lines and write something only YOU could say. Mention a specific food opinion, a weekend ritual, or an unpopular take. Make her want to ask you about it.",
      "Rewrite your bio in your actual voice. Share one specific thing you love, one slightly controversial opinion, and one thing you're looking for. Keep it under 3 lines.",
    ],
    "Reply Confidence": [
      "Stop opening with 'Hi' or 'Hey'. Read her profile, find something specific, and ask a fun question about it. Example: 'Your Ladakh photos are insane — solo trip or were you the designated photographer for friends?'",
      "Your conversation game needs work. The key: ask questions that are easy and fun to answer. Skip generic ('how was your day?') and go specific ('okay but what's the most overrated restaurant in your city?').",
    ],
  };

  const fixOptions = fixes[biggestIssue] ?? fixes["First Impression"];

  // Pick based on score severity — lower score gets the more detailed fix
  const lowestScore = Math.min(...Object.values(subMetrics));
  return lowestScore < 30 ? fixOptions[0] : fixOptions[1];
}

// ─── Main Scoring Function ────────────────────────────────────────────────────

export function calculateSmoothScore(
  answers: Record<number, string>
): ScoringResult {
  const metricTotals: MetricScores = {
    profileWarmth: 0,
    bioPersonality: 0,
    replyConfidence: 0,
    firstImpression: 0,
  };

  let questionsAnswered = 0;

  for (const [questionIdStr, selectedOption] of Object.entries(answers)) {
    const questionId = parseInt(questionIdStr, 10);
    const scoreMap = QUESTION_SCORE_MAP[questionId];

    if (!scoreMap) continue;

    // Find the option index by matching the answer text against quiz options
    // The answers come in as the selected option text
    const optionIndex = findOptionIndex(questionId, selectedOption);
    if (optionIndex === -1 || optionIndex >= scoreMap.length) continue;

    const scores = scoreMap[optionIndex];
    metricTotals.profileWarmth += scores.profileWarmth;
    metricTotals.bioPersonality += scores.bioPersonality;
    metricTotals.replyConfidence += scores.replyConfidence;
    metricTotals.firstImpression += scores.firstImpression;
    questionsAnswered++;
  }

  // Avoid division by zero
  if (questionsAnswered === 0) {
    return {
      score: 0,
      category: getCategory(0),
      biggestIssue: "First Impression",
      freeFix: getFreeFix("First Impression", metricTotals),
      subMetrics: { profileWarmth: 0, bioPersonality: 0, replyConfidence: 0, firstImpression: 0 },
    };
  }

  // Average each metric across answered questions
  const subMetrics: SmoothScoreSubMetrics = {
    profileWarmth: Math.round(metricTotals.profileWarmth / questionsAnswered),
    bioPersonality: Math.round(metricTotals.bioPersonality / questionsAnswered),
    replyConfidence: Math.round(metricTotals.replyConfidence / questionsAnswered),
    firstImpression: Math.round(metricTotals.firstImpression / questionsAnswered),
  };

  // Weighted total score
  const rawScore =
    subMetrics.profileWarmth * METRIC_WEIGHTS.profileWarmth +
    subMetrics.bioPersonality * METRIC_WEIGHTS.bioPersonality +
    subMetrics.replyConfidence * METRIC_WEIGHTS.replyConfidence +
    subMetrics.firstImpression * METRIC_WEIGHTS.firstImpression;

  // Apply a slight curve to ensure most users land in 35-70 range
  // This uses a soft sigmoid-like compression
  const score = Math.round(applyScoringCurve(rawScore));

  const category = getCategory(score);
  const biggestIssue = getBiggestIssue(subMetrics);
  const freeFix = getFreeFix(biggestIssue, subMetrics);

  return {
    score,
    category,
    biggestIssue,
    freeFix,
    subMetrics,
  };
}

// ─── Scoring Curve ────────────────────────────────────────────────────────────
// Compresses extreme scores toward the 35-70 range while keeping the full 0-100
// range technically reachable. This makes results feel realistic — most people
// aren't a 15 or a 95.

function applyScoringCurve(raw: number): number {
  // Clamp input
  const clamped = Math.max(0, Math.min(100, raw));

  // Center around 52 (slightly below middle to skew toward "needs work")
  const center = 52;
  const spread = 38;

  // Soft compression: pull extreme values toward center
  if (clamped <= center) {
    // Lower half: compress toward 35
    const ratio = clamped / center;
    return 35 * ratio + (clamped * 0.15);
  } else {
    // Upper half: compress toward 70
    const ratio = (clamped - center) / (100 - center);
    return center + (spread * ratio) - (ratio * ratio * 8);
  }
}

// ─── Option Index Finder ──────────────────────────────────────────────────────
// Maps the selected option text back to its 0-based index in the question.
// We import quiz questions lazily to avoid circular dependencies.

function findOptionIndex(questionId: number, selectedOption: string): number {
  // If the answer is already a number (index), use it directly
  const asNumber = parseInt(selectedOption, 10);
  if (!isNaN(asNumber) && asNumber >= 0) {
    return asNumber;
  }

  // Otherwise, match against option text
  // We define the option counts per question for validation
  const optionCounts: Record<number, number> = {
    1: 6, 2: 6, 3: 5, 4: 6, 5: 6, 6: 6, 7: 5,
  };

  const count = optionCounts[questionId];
  if (!count) return -1;

  // Try to match by finding the option in a lazy-loaded manner
  // For now, return -1 if text-based matching is needed
  // The quiz UI should pass option indices, not text
  return -1;
}

// ─── Exported Helpers ─────────────────────────────────────────────────────────

export function getScoreColor(score: number): string {
  if (score <= 30) return "#ef4444"; // red-500
  if (score <= 50) return "#f97316"; // orange-500
  if (score <= 65) return "#eab308"; // yellow-500
  if (score <= 80) return "#22c55e"; // green-500
  return "#8b5cf6"; // purple-500
}

export function getScoreEmoji(score: number): string {
  if (score <= 30) return "😬";
  if (score <= 50) return "😐";
  if (score <= 65) return "🤔";
  if (score <= 80) return "😎";
  return "🔥";
}

export { type ScoringResult };
