import type { QuizQuestion } from '@/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What are you trying to improve most?',
    options: [
      'My dating profile (photos, bio, prompts)',
      'My conversation skills (replying, keeping chats alive)',
      'My dating confidence & mindset',
      'My overall first impression & vibe',
      'My matrimony profile (making it modern & attractive)',
      "I'm just curious to see my score",
    ],
    category: 'goal',
  },
  {
    id: 2,
    question: 'What is your biggest roadblock in dating right now?',
    options: [
      'I barely get any matches on dating apps',
      'I get matches, but they never reply to my openers',
      'My conversations fizzle out after a few messages',
      'Everything seems fine, then I suddenly get ghosted',
      'I can chat, but I struggle to convert matches into actual dates',
      "I honestly don't know what I'm doing wrong",
    ],
    category: 'problem',
  },
  {
    id: 3,
    question: 'How confident are you about your current profiles?',
    options: [
      'Very confident — just looking for fine-tuning',
      'Somewhat confident — could be improved',
      "Not sure — I've never had anyone audit it",
      'Not confident at all — it feels outdated',
      "I don't even have photos that represent me well",
    ],
    category: 'confidence',
  },
  {
    id: 4,
    question: 'What type of photos do you mostly use?',
    options: [
      'Mostly selfies (car, room, gym mirror)',
      'Mostly group photos (hard to tell which one is me)',
      'A mix of older photos and cropping friends out',
      'Professional, high-quality headshots or portrait shoots',
      'A good mix of outdoor candids, lifestyle, and social shots',
      'Just a couple of random, slightly blurry pictures',
    ],
    category: 'photos',
  },
  {
    id: 5,
    question: 'What does your profile bio look like?',
    options: [
      "It's empty, or just has my Instagram handle/emoji",
      'Just basic stats (height, job, city, gym)',
      'A copy-pasted quote or generic funny line from the internet',
      'A short bio that feels a bit generic',
      'A thoughtful 2-3 liner showing my real hobbies & personality',
      'A long paragraph detailing my entire life story & criteria',
    ],
    category: 'bio',
  },
  {
    id: 6,
    question: 'What happens most frequently in your chats?',
    options: [
      "I send 'Hi' or 'Hey' and get left on read",
      'I send long messages and they reply with one-word answers',
      'Conversations are great, but they vanish when I suggest meeting up',
      'Chats fizzle out and get stuck after 2-3 basic exchanges',
      'The conversation flows well and is highly engaging',
      'I wait for them to carry the conversation and ask questions',
    ],
    category: 'chat',
  },
  {
    id: 7,
    question: 'Are you preparing for dating or matrimony?',
    options: [
      'Dating (casual/short-term)',
      'Dating (serious/long-term)',
      'Matrimony (family-assisted/self-arranged)',
      'Both — open to whatever comes',
      "I'm not sure yet, just exploring",
    ],
    category: 'intent',
  },
];
