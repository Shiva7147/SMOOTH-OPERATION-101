import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface EnvVarStatus {
  loaded: boolean
}

interface FirebaseDebugResponse {
  projectId: string
  envVars: Record<string, EnvVarStatus>
  timestamp: string
  summary: {
    total: number
    loaded: number
    missing: number
  }
}

export async function GET() {
  const firebaseEnvVars: Record<string, string | undefined> = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  }

  const envVarStatuses: Record<string, EnvVarStatus> = {}
  let loadedCount = 0

  for (const [key, value] of Object.entries(firebaseEnvVars)) {
    const isLoaded = !!value && value.trim().length > 0
    envVarStatuses[key] = { loaded: isLoaded }
    if (isLoaded) loadedCount++
  }

  const totalVars = Object.keys(firebaseEnvVars).length

  const response: FirebaseDebugResponse = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not configured',
    envVars: envVarStatuses,
    timestamp: new Date().toISOString(),
    summary: {
      total: totalVars,
      loaded: loadedCount,
      missing: totalVars - loadedCount,
    },
  }

  return NextResponse.json(response)
}
