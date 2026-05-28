// ─── Hero Section ─────────────────────────────────────────────────────────────

export const HERO = {
  headline: "Your dating profile isn't working. Let's fix that.",
  subheadline:
    "Get brutally honest feedback from real women, AI-powered scoring, and a complete profile glow-up — because guessing isn't a strategy.",
  microcopy: "Free score in 2 minutes. No sign-up needed.",
  cta: "Take the Smooth Score Quiz",
  ctaSecondary: "See How It Works",
} as const;

// ─── Reality Check Cards ──────────────────────────────────────────────────────

export interface RealityCheckCard {
  emoji: string;
  title: string;
  description: string;
}

export const REALITY_CHECK_CARDS: RealityCheckCard[] = [
  {
    emoji: "🪞",
    title: "Your mirror lies to you",
    description:
      "Your friends say 'bro you look great' but your match rate says otherwise. We give you the truth.",
  },
  {
    emoji: "📸",
    title: "That selfie isn't it",
    description:
      "Bathroom mirror selfie with flash on? Gym pic with the protein shaker? Yeah, she swiped left.",
  },
  {
    emoji: "💬",
    title: "'Hey' is not a conversation starter",
    description:
      "You matched. You typed 'hi'. She never replied. Shocking, right? Let's fix your opener game.",
  },
  {
    emoji: "📝",
    title: "Your bio says nothing",
    description:
      "'Just a simple guy looking for a simple girl.' Cool. So is every other guy on the app. Stand out or get skipped.",
  },
  {
    emoji: "👻",
    title: "You're getting ghosted for a reason",
    description:
      "It's not them, it's your profile. Hard to hear, but that's why we exist — to tell you what nobody else will.",
  },
  {
    emoji: "🎯",
    title: "Matches ≠ dates",
    description:
      "Getting matches means nothing if you can't hold a conversation. We teach you to convert, not just collect.",
  },
  {
    emoji: "💍",
    title: "Matrimony profiles are worse",
    description:
      "'Family-oriented boy from good family seeks homely girl.' Bhai, it's 2026. Let's write something she actually wants to read.",
  },
  {
    emoji: "🤖",
    title: "AI won't save you alone",
    description:
      "ChatGPT can write your bio but it can't tell you why your photos feel off. Real women can. That's our edge.",
  },
] as const;

// ─── Before/After Examples ────────────────────────────────────────────────────

export interface BeforeAfterExample {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

export const BEFORE_AFTER_EXAMPLES: BeforeAfterExample[] = [
  {
    label: "The Bio",
    before:
      "Love to travel. Foodie. Looking for someone real. 6'1\". Gym 5x a week.",
    after:
      "I'll plan the road trip, you pick the playlist. Warning: I have strong opinions about biryani and will defend Hyderabadi to the death. 6'1\" but my personality is taller.",
    improvement:
      "Shows personality instead of a checklist. Makes her smile, not scroll.",
  },
  {
    label: "The Opener",
    before: "Hey, how are you? 😊",
    after:
      "Your travel photos are making me jealous — okay but real question, Goa or Himachal and why is the only correct answer Himachal?",
    improvement:
      "Specific, playful, gives her something to respond to. Not a dead-end 'hey'.",
  },
  {
    label: "The Photo Strategy",
    before:
      "5 selfies, 1 group photo where you can't tell who's who, 1 car photo",
    after:
      "Lead with a clear smiling photo outdoors, add a candid with friends (you're clearly identifiable), a hobby shot, and one slightly dressed-up photo",
    improvement:
      "Variety + clarity. She can see your face, your vibe, and your life. That's attractive.",
  },
] as const;

// ─── Women's Perspective Section ──────────────────────────────────────────────

export const WOMENS_PERSPECTIVE = {
  headline: "What women actually think (but won't tell you)",
  subheadline:
    "We asked real women to review dating profiles. Here's what they said — unfiltered.",
  quotes: [
    {
      text: "If your first photo is a group photo, I'm not playing detective. I just swipe left.",
      attribution: "Priya, 26, Mumbai",
    },
    {
      text: "A good bio makes me actually read it. A bad bio makes me skip even if you're good-looking.",
      attribution: "Ananya, 24, Bangalore",
    },
    {
      text: "'Hey beautiful' as an opener? Immediate ick. Say something about MY profile, not my face.",
      attribution: "Rhea, 28, Delhi",
    },
    {
      text: "I can tell in 3 seconds if a guy put effort into his profile. Most don't. It shows.",
      attribution: "Meera, 25, Pune",
    },
  ],
  footnote:
    "All reviews on Smooth Operator are done by verified women aged 21-35. Real perspectives, not AI guesses.",
} as const;

// ─── Dashboard Copy ───────────────────────────────────────────────────────────

export const DASHBOARD = {
  welcomeBack: "Welcome back, Smooth Operator",
  welcomeNew: "Let's see where you stand",
  scoreTitle: "Your Smooth Score",
  scoreDescription:
    "This is how your profile stacks up. Higher is smoother.",
  reviewsTitle: "Your Reviews",
  reviewsEmpty:
    "No reviews yet. Get your first honest review from a real woman.",
  aiChatTitle: "AI Chat Coach",
  aiChatDescription:
    "Practice your openers and conversations with our AI. No judgment, just improvement.",
  upgradePrompt:
    "Upgrade to unlock human reviews, coaching, and the full Smooth Operator experience.",
} as const;

// ─── About Page ───────────────────────────────────────────────────────────────

export const ABOUT = {
  headline: "We're not a dating app. We make you better at them.",
  mission:
    "Smooth Operator exists because nobody tells you the truth about your dating profile. Your friends won't. The apps won't. We will — respectfully, honestly, and with actual fixes you can use today.",
  story: {
    title: "The origin story",
    paragraphs: [
      "It started with a frustrated group chat. Five guys, zero dates, and a lot of 'bro what am I doing wrong?' messages. Turns out, the answer was: everything. Bad photos, boring bios, and openers that were basically conversation repellent.",
      "So we did something wild — we asked women. Real women. Not dating coaches who charge ₹50,000 for 'be yourself' advice. Actual women in our age group who told us exactly what was wrong. And it worked. Profiles got fixed. Matches went up. Conversations lasted longer.",
      "That's Smooth Operator. We took that group chat energy and turned it into a platform. Real feedback from real women, backed by AI analysis, at a price that doesn't require a personal loan.",
    ],
  },
  values: [
    {
      title: "Honest, not harsh",
      description:
        "We'll tell you your photo sucks, but we'll also tell you exactly how to take a better one. No ego-crushing without a fix.",
    },
    {
      title: "Confidence, not manipulation",
      description:
        "We don't teach tricks or pickup lines. We help you present the best version of who you already are. No games.",
    },
    {
      title: "Affordable, not exploitative",
      description:
        "Dating improvement shouldn't cost a month's rent. Our prices are designed for real people with real budgets.",
    },
    {
      title: "Women-reviewed, not bro-approved",
      description:
        "Your boys will gas you up. We connect you with women who'll give you the perspective that actually matters.",
    },
  ],
  team: {
    title: "Built by guys who needed this themselves",
    description:
      "We're not relationship gurus. We're regular guys who figured out that a little honest feedback goes a long way. Now we're making that feedback available to everyone.",
  },
} as const;

// ─── CTA Texts ────────────────────────────────────────────────────────────────

export const CTA = {
  takeQuiz: "Take the Smooth Score Quiz",
  getReview: "Get Your First Review",
  startFree: "Start Free",
  upgradePlan: "Upgrade Your Plan",
  tryAIChat: "Try AI Chat Coach",
  viewResults: "View My Results",
  retakeQuiz: "Retake Quiz",
  submitReview: "Submit for Review",
  bookCoaching: "Book a Coaching Session",
  contactUs: "Get in Touch",
  learnMore: "Learn More",
  seeExamples: "See Real Examples",
  joinWaitlist: "Join the Waitlist",
  viewPricing: "View Pricing",
  goToDashboard: "Go to Dashboard",
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV = {
  brand: "Smooth Operator",
  links: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  authLinks: {
    signIn: "Sign In",
    signUp: "Sign Up",
    dashboard: "Dashboard",
    signOut: "Sign Out",
  },
} as const;

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER = {
  tagline:
    "Honest feedback. Real improvement. No BS.",
  copyright: `© ${new Date().getFullYear()} Smooth Operator. All rights reserved.`,
  links: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ],
  socials: {
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
} as const;

// ─── Misc / Toasts ───────────────────────────────────────────────────────────

export const TOAST = {
  quizSubmitted: "Quiz submitted! Calculating your Smooth Score...",
  reviewSubmitted:
    "Review request submitted! You'll hear from us within 48 hours.",
  paymentSuccess: "Payment successful! Your plan is now active.",
  paymentFailed: "Payment failed. Please try again or contact support.",
  profileUpdated: "Profile updated successfully!",
  messageSent: "Message sent! We'll get back to you soon.",
  errorGeneric: "Something went wrong. Please try again.",
  copied: "Copied to clipboard!",
} as const;
