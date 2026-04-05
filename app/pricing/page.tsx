'use client'

import Link from 'next/link'
import { useLang } from '../i18n/LangContext'
import { LangSwitcher } from '../components/LangSwitcher'

export default function PricingPage() {
  const { T } = useLang()


  const plans = [
    {
      id: 'free', name: 'Free', price: 0,
      limit: T.plan_free_limit,
      features: T.plan_free_features,
      cta: T.plan_free_cta,
      href: '/dashboard', featured: false,
    },
    {
      id: 'starter', name: 'Starter', price: 9,
      limit: T.plan_starter_limit,
      features: T.plan_starter_features,
      cta: T.plan_starter_cta,
      href: '#', featured: false,
    },
    {
      id: 'pro', name: 'Pro', price: 29,
      limit: T.plan_pro_limit,
      features: T.plan_pro_features,
      cta: T.plan_pro_cta,
      href: '#', featured: true,
    },
  ]

  // Gumroad посилання — вставте свої після реєстрації на gumroad.com
  const GUMROAD_LINKS: Record<string, string> = {
    starter: process.env.NEXT_PUBLIC_GUMROAD_STARTER_URL || 'https://gumroad.com/l/STARTER_ID',
    pro: process.env.NEXT_PUBLIC_GUMROAD_PRO_URL || 'https://gumroad.com/l/PRO_ID',
  }

  function handleCheckout(plan: typeof plans[0]) {
    if (plan.id === 'free') { window.location.href = '/dashboard'; return }
    const url = GUMROAD_LINKS[plan.id]
    if (url) window.location.href = url
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ width: 30, height: 30, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono', fontSize: 12, color: '#fff' }}>GL</div>
          <span style={{ fontSize: 17, fontWeight: 700 }}>GitLog <span style={{ color: 'var(--accent)' }}>AI</span></span>
        </Link>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <LangSwitcher />
          <Link href="/dashboard" className="btn-outline" style={{ fontSize: 14, padding: '8px 18px' }}>{T.nav_open_app}</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '70px 24px 80px', textAlign: 'center' }}>
        <div className="tag" style={{ marginBottom: 18 }}>{T.pricing_tag}</div>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.5, marginBottom: 14 }}>{T.pricing_h1}</h1>
        <p style={{ color: '#777', fontSize: 17, maxWidth: 440, margin: '0 auto 52px' }}>{T.pricing_desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'left' }}>
          {plans.map(plan => (
            <div key={plan.id} style={{ background: plan.featured ? '#0f1f1a' : '#111', border: plan.featured ? '2px solid var(--accent)' : '1px solid #222', borderRadius: 18, padding: 28, position: 'relative' }}>
              {plan.featured && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#fff', fontSize: 11, fontFamily: 'DM Mono', padding: '4px 14px', borderRadius: 20, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                  {T.pricing_popular}
                </div>
              )}
              <div style={{ fontFamily: 'DM Mono', fontSize: 12, color: '#555', marginBottom: 8 }}>{plan.name.toUpperCase()}</div>
              <div style={{ marginBottom: 6 }}>
                <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: -2, color: plan.featured ? 'var(--accent-mid)' : '#f0f0f0' }}>${plan.price}</span>
                <span style={{ color: '#555', fontSize: 14 }}>{T.pricing_month}</span>
              </div>
              <div style={{ fontFamily: 'DM Mono', fontSize: 12, color: 'var(--accent-mid)', marginBottom: 22 }}>{plan.limit}</div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#aaa', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--accent)', flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className={plan.featured ? 'btn-primary' : 'btn-outline'} style={{ width: '100%', padding: '12px', fontSize: 15 }} onClick={() => handleCheckout(plan)}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, padding: 24, background: '#111', border: '1px solid #1e1e1e', borderRadius: 14, maxWidth: 500, margin: '48px auto 0' }}>
          <div style={{ fontSize: 14, color: '#666', fontFamily: 'DM Mono', marginBottom: 10 }}>{T.pricing_path_label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, textAlign: 'left' }}>
            <div style={{ background: '#0d0d0d', padding: 14, borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)' }}>35</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>Pro {T.pricing_pro_clients.split('Pro ')[1] || T.pricing_pro_clients}</div>
            </div>
            <div style={{ background: '#0d0d0d', padding: 14, borderRadius: 10 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#B5D4F4' }}>112</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 2 }}>Starter {T.pricing_starter_clients.split('Starter ')[1] || T.pricing_starter_clients}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
