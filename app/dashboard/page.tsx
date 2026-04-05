'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLang } from '../i18n/LangContext'
import { LangSwitcher } from '../components/LangSwitcher'

const PLANS: Record<string, { name: string; limit: number; color: string }> = {
  free: { name: 'Free', limit: 10, color: '#555' },
  starter: { name: 'Starter', limit: 100, color: 'var(--accent)' },
  pro: { name: 'Pro', limit: 999999, color: '#B5D4F4' },
}

export default function Dashboard() {
  const { T } = useLang()
  const [commits, setCommits] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState('markdown')
  const [audience, setAudience] = useState('users')
  const [language, setLanguage] = useState('uk')
  const [usage, setUsage] = useState({ used: 0, plan: 'free' })
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('gitlog_usage')
    if (saved) { try { setUsage(JSON.parse(saved)) } catch {} }
  }, [])

  const plan = PLANS[usage.plan] || PLANS.free
  const remaining = usage.plan === 'pro' ? '∞' : Math.max(0, plan.limit - usage.used)
  const atLimit = usage.plan !== 'pro' && usage.used >= plan.limit

  async function generate() {
    if (!commits.trim()) { setError('Вставте ваші git-коміти'); return }
    if (atLimit) { setError(T.dash_limit_msg); return }
    setError('')
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commits, format, audience, language, plan: usage.plan })
      })
      const data = await res.json()
      if (data.result) {
        setResult(data.result)
        const newUsage = { ...usage, used: usage.used + 1 }
        setUsage(newUsage)
        localStorage.setItem('gitlog_usage', JSON.stringify(newUsage))
      } else {
        setError(data.error || 'Generation error')
      }
    } catch { setError('Connection error') }
    setLoading(false)
  }

  function copyResult() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #1a1a1a', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ width: 30, height: 30, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono', fontSize: 12, color: '#fff' }}>GL</div>
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.5 }}>GitLog <span style={{ color: 'var(--accent)' }}>AI</span></span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: 12, color: '#666' }}>
            {T.dash_remaining} <span style={{ color: plan.color, fontWeight: 500 }}>{remaining}</span>
            <span style={{ marginLeft: 8, background: '#1a1a1a', padding: '2px 8px', borderRadius: 20, color: plan.color }}>{plan.name}</span>
          </div>
          <LangSwitcher />
          {usage.plan === 'free' && (
            <Link href="/pricing" className="btn-primary" style={{ fontSize: 13, padding: '7px 14px' }}>{T.dash_upgrade}</Link>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.8, marginBottom: 8 }}>{T.dash_title}</h1>
        <p style={{ color: '#666', marginBottom: 28, fontSize: 14 }}>{T.dash_desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#555', letterSpacing: 0.5, marginBottom: 8 }}>{T.dash_commits_label}</div>
            <textarea
              value={commits}
              onChange={e => setCommits(e.target.value)}
              rows={14}
              placeholder={`fix: виправлено помилку авторизації\nfeat: нова темна тема\nperf: прискорено завантаження`}
            />
            <div style={{ fontSize: 12, color: '#444', marginTop: 6, fontFamily: 'DM Mono' }}>
              {T.dash_commits_count(commits.split('\n').filter(l => l.trim()).length)}
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#555', letterSpacing: 0.5 }}>{T.dash_result_label}</div>
              {result && (
                <button onClick={copyResult} style={{ fontFamily: 'DM Mono', fontSize: 11, padding: '4px 10px', border: '1px solid #333', borderRadius: 6, background: 'transparent', color: copied ? 'var(--accent-mid)' : '#666', cursor: 'pointer', transition: 'color 0.15s' }}>
                  {copied ? T.dash_copied : T.dash_copy}
                </button>
              )}
            </div>
            <div style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 10, padding: 14, minHeight: 280, fontFamily: 'DM Mono', fontSize: 13, color: '#ccc', whiteSpace: 'pre-wrap', lineHeight: 1.8, overflowY: 'auto', maxHeight: 340 }}>
              {loading ? (
                <div style={{ color: 'var(--accent-mid)' }}>{T.dash_generating}</div>
              ) : result || <span style={{ color: '#333' }}>{T.dash_empty}</span>}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20, padding: 18 }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#555', marginBottom: 6 }}>{T.dash_format_label}</div>
              <select value={format} onChange={e => setFormat(e.target.value)}>
                <option value="markdown">{T.fmt_markdown}</option>
                <option value="html">{T.fmt_html}</option>
                <option value="plaintext">{T.fmt_plaintext}</option>
              </select>
            </div>
            <div>
              <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#555', marginBottom: 6 }}>{T.dash_audience_label}</div>
              <select value={audience} onChange={e => setAudience(e.target.value)}>
                <option value="users">{T.dash_aud_users}</option>
                <option value="devs">{T.dash_aud_devs}</option>
                <option value="investors">{T.dash_aud_investors}</option>
              </select>
            </div>
            <div>
              <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#555', marginBottom: 6 }}>{T.dash_lang_label}</div>
              <select value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="uk">{T.dash_output_lang_uk}</option>
                <option value="en">{T.dash_output_lang_en}</option>
                <option value="de">{T.dash_output_lang_de}</option>
                <option value="pl">{T.dash_output_lang_pl}</option>
              </select>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <button className="btn-primary" onClick={generate} disabled={loading || atLimit} style={{ fontSize: 15, padding: '12px 32px' }}>
                {loading ? T.dash_btn_loading : atLimit ? T.dash_btn_limit : T.dash_btn}
              </button>
            </div>
          </div>
          {error && <div style={{ marginTop: 12, fontFamily: 'DM Mono', fontSize: 13, color: '#E24B4A' }}>⚠ {error}</div>}
        </div>

        {usage.plan !== 'pro' && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'DM Mono', fontSize: 11, color: '#555', marginBottom: 6 }}>
              <span>{T.dash_used}</span>
              <span>{usage.used} / {plan.limit}</span>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: 4, height: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (usage.used / plan.limit) * 100)}%`, background: atLimit ? '#E24B4A' : 'var(--accent)', borderRadius: 4, transition: 'width 0.3s' }} />
            </div>
            {atLimit && (
              <div style={{ marginTop: 12, padding: 14, background: 'rgba(226,75,74,0.1)', border: '1px solid rgba(226,75,74,0.3)', borderRadius: 10, fontSize: 14, color: '#F09595' }}>
                {T.dash_limit_msg} <Link href="/pricing" style={{ color: 'var(--accent-mid)', textDecoration: 'none', fontWeight: 600 }}>{T.dash_limit_link}</Link>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 24, padding: 16, background: '#0d0d0d', borderRadius: 12, border: '1px solid #1e1e1e' }}>
          <div style={{ fontFamily: 'DM Mono', fontSize: 11, color: '#555', marginBottom: 10, letterSpacing: 0.5 }}>{T.dash_tips_label}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {T.dash_tips.map((tip, i) => (
              <div key={i} style={{ fontSize: 13 }}>
                <span style={{ color: 'var(--accent-mid)', fontWeight: 600 }}>{tip.t}</span>
                <span style={{ color: '#555', marginLeft: 6 }}>{tip.d}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
