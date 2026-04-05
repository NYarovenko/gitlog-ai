'use client'
import { useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLang } from '../i18n/LangContext'

function SuccessContent() {
  const { T } = useLang()
  const params = useSearchParams()
  const plan = params.get('plan') || 'starter'

  useEffect(() => {
    const usage = JSON.parse(localStorage.getItem('gitlog_usage') || '{"used":0,"plan":"free"}')
    usage.plan = plan
    localStorage.setItem('gitlog_usage', JSON.stringify(usage))
  }, [plan])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ width: 72, height: 72, background: 'rgba(29,158,117,0.15)', border: '2px solid var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>✓</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>{T.success_h1}</h1>
        <p style={{ color: '#777', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          {T.success_desc_1} <strong style={{ color: 'var(--accent-mid)' }}>{plan === 'pro' ? 'Pro' : 'Starter'}</strong>. {T.success_desc_2}
        </p>
        <Link href="/dashboard" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>{T.success_btn}</Link>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  const { T } = useLang()
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>{T.success_loading}</div>}>
      <SuccessContent />
    </Suspense>
  )
}
