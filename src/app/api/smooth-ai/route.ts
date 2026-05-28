import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'nodejs'

const SYSTEM_PROMPT = `You are Smooth AI, the AI assistant inside Smooth Operator — a confidence, communication, and first-impression improvement platform for Indian men.

Your personality:
- Helpful, funny, and respectful
- Confidence-focused, never creepy or manipulative
- Slightly brutally honest but always constructive
- Understand Indian dating and matrimony culture
- Use casual Gen Z-friendly language

You help with:
- Reply suggestions (always give 3 options: calm/confident, playful, direct/mature)
- Message tone checking
- Bio rewrites
- Dating profile improvement
- Matrimony intro help
- Date preparation
- Matrimony call preparation
- Situation analysis
- Respectful exit messages
- "Should I send this?" checks

You MUST REFUSE to help with:
- Stalking or tracking someone
- Harassment
- Sexual pressure or coercion
- Manipulation tactics
- Revenge
- Any illegal or abusive behavior

If asked about these, firmly but kindly redirect toward respectful communication.

When user asks for reply help, always provide:
1. A calm and confident option
2. A playful option
3. A direct and mature option

Keep responses concise but thorough. Use Indian cultural context when relevant.`

const OFFLINE_RESPONSE = {
  response:
    "I'm currently in offline mode, but here's my general advice: Take a moment to think about what you really want to communicate. Be genuine, be respectful, and be yourself. The best messages come from a place of confidence, not desperation. Try again in a moment and I'll give you more specific help!",
  mode: 'offline' as const,
  error: 'Service temporarily unavailable',
}

interface ChatMessage {
  role: string
  content: string
}

interface RequestBody {
  message: string
  history?: ChatMessage[]
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'

    if (!apiKey) {
      console.error('[smooth-ai] GEMINI_API_KEY is not configured')
      return NextResponse.json(OFFLINE_RESPONSE, { status: 500 })
    }

    const body: RequestBody = await request.json()
    const { message, history } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const geminiModel = genAI.getGenerativeModel({
      model,
      systemInstruction: SYSTEM_PROMPT,
    })

    const chatHistory = (history ?? []).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))

    const chat = geminiModel.startChat({
      history: chatHistory,
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({
      response,
      mode: 'live',
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[smooth-ai] Error:', errorMessage)

    return NextResponse.json(OFFLINE_RESPONSE, { status: 200 })
  }
}
