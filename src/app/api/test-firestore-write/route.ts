import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface RequestBody {
  message: string
  userId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { message, userId } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    const firebaseConfigured = !!(
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    )

    return NextResponse.json({
      success: true,
      routeWorking: true,
      firebaseConfigured,
      receivedData: {
        message,
        userId: userId || 'anonymous',
        timestamp: new Date().toISOString(),
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'not configured',
      },
      clientSideDebug: {
        description:
          'To perform an actual Firestore write, use the debugWrite utility from the client side.',
        usage: [
          "import { debugWrite } from '@/lib/debugWrite'",
          "await debugWrite({ message: 'test', userId: 'user123' })",
        ],
        functionSignature:
          "debugWrite(data: { message: string; userId?: string }): Promise<DocumentReference>",
        firestoreCollection: 'debug_writes',
        note: 'The client-side write uses the Firebase Client SDK with the authenticated user context. This ensures Firestore security rules are properly applied.',
      },
    })
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[test-firestore-write] Error:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process request',
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
