import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function maskKey(key: string | undefined): string {
  if (!key) return 'not set'
  if (key.length <= 8) return '****'
  return `${key.slice(0, 4)}...${key.slice(-4)}`
}

export async function GET() {
  const geminiKey = process.env.GEMINI_API_KEY
  const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  const firebaseProjectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not set'
  const nodeEnv = process.env.NODE_ENV || 'development'

  return NextResponse.json({
    geminiKeyLoaded: !!geminiKey,
    startsWithAIzaSy: geminiKey?.startsWith('AIzaSy') ?? false,
    maskedKey: maskKey(geminiKey),
    modelConfigured: geminiModel,
    runtime: 'nodejs',
    nodeEnv,
    firebaseProjectId,
    timestamp: new Date().toISOString(),
  })
}
