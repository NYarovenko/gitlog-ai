import { NextRequest, NextResponse } from 'next/server'

const VARIANT_IDS: Record<string, string> = {
  starter: process.env.LEMONSQUEEZY_STARTER_VARIANT_ID || '',
  pro: process.env.LEMONSQUEEZY_PRO_VARIANT_ID || '',
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.LEMONSQUEEZY_API_KEY
    const storeId = process.env.LEMONSQUEEZY_STORE_ID

    if (!apiKey || !storeId) {
      return NextResponse.json({ error: 'Lemon Squeezy не налаштований. Додайте ключі в .env.local' }, { status: 500 })
    }

    const { plan } = await req.json()
    const variantId = VARIANT_IDS[plan]
    if (!variantId) return NextResponse.json({ error: 'Невідомий план' }, { status: 400 })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: { custom: { plan } },
            product_options: { redirect_url: `${appUrl}/success?plan=${plan}` },
          },
          relationships: {
            store: { data: { type: 'stores', id: storeId } },
            variant: { data: { type: 'variants', id: variantId } },
          },
        },
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      console.error('LemonSqueezy error:', err)
      return NextResponse.json({ error: 'Помилка створення оплати' }, { status: 500 })
    }

    const data = await response.json()
    const checkoutUrl = data?.data?.attributes?.url

    if (!checkoutUrl) return NextResponse.json({ error: 'Не вдалось отримати посилання' }, { status: 500 })

    return NextResponse.json({ url: checkoutUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
