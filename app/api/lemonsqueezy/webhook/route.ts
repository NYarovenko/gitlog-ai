import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: 'Webhook secret не налаштований' }, { status: 500 })

  const body = await req.text()
  const signature = req.headers.get('x-signature')

  // Verify webhook signature
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(body).digest('hex')

  if (signature !== digest) {
    console.error('Invalid webhook signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)
  const eventName = event.meta?.event_name
  const customData = event.meta?.custom_data

  switch (eventName) {
    case 'order_created':
      console.log('✅ New order:', customData?.plan, event.data?.attributes?.user_email)
      // TODO: зберегти в базі даних і активувати план
      break

    case 'subscription_created':
      console.log('✅ New subscription:', customData?.plan)
      // TODO: активувати підписку для користувача
      break

    case 'subscription_cancelled':
      console.log('❌ Subscription cancelled')
      // TODO: понизити план до free
      break

    case 'subscription_payment_failed':
      console.log('⚠️ Payment failed')
      // TODO: надіслати email користувачу
      break
  }

  return NextResponse.json({ received: true })
}
