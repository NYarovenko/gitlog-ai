import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const params = new URLSearchParams(body)

    const saleId = params.get('sale_id')
    const productName = params.get('product_name')
    const email = params.get('email')
    const customFields = params.get('custom_fields')
    const refunded = params.get('refunded')
    const chargebacked = params.get('chargebacked')

    // Визначаємо план по назві продукту
    let plan = 'starter'
    if (productName?.toLowerCase().includes('pro')) plan = 'pro'

    if (refunded === 'true' || chargebacked === 'true') {
      console.log('❌ Refund/chargeback:', email)
      // TODO: понизити план до free
      return NextResponse.json({ received: true })
    }

    console.log('✅ New sale:', { saleId, plan, email, productName })
    // TODO: зберегти в базі даних і активувати план для користувача

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
