import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

interface RequestBody {
  planId: string
  amount: number
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json()
    const { planId, amount } = body

    if (!planId || typeof planId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'planId is required and must be a string' },
        { status: 400 }
      )
    }

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'amount is required and must be a positive number' },
        { status: 400 }
      )
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET
    const razorpayConfigured = !!razorpayKeySecret

    return NextResponse.json(
      {
        success: false,
        message:
          'Payment integration coming soon. Razorpay order creation will be implemented here.',
        planId,
        amount,
        razorpayConfigured,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('[payment/create-order] Error:', errorMessage)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process payment request',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
