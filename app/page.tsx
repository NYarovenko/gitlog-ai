'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useLang } from './i18n/LangContext'
import { LangSwitcher } from './components/LangSwitcher'

export default function HomePage() {
  const { T } = useLang()
  const [commits, setCommits] = useState(`feat: додано темна тема в налаштуваннях\nfix: виправлено помилку авторизації через Google\nperf: оптимізовано завантаження зображень на 40%\nfeat: новий onboarding flow для нових користувачів\nfix: кнопка не відповідала на мобільному Safari`)
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState('markdown')
  const [audience, setAudience] = useState('users')

  async function generate() {
    if (!commits.trim()) return
    setLoading(true)
    setResult('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commits, format, audience, demo: true })
      })
      const data = await res.json()
      setResult(data.result || data.error || 'Error')
    } catch {
      setResult('Connection error')
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav style={{ borderBottom: '1px solid #1a1a1a', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: 'var(--accent)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono', fontSize: 13, fontWeight: 500, color: '#fff' }}>GL</div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>GitLog <span style={{ color: 'var(--accent)' }}>AI</span></span>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <LangSwitcher />
          <Link href="/pricing" className="btn-outline" style={{ padding: '8px 18px', fontSize: 14 }}>{T.nav_prices}</Link>
          <Link href="/dashboard" className="btn-primary" style={{ padding: '8px 18px', fontSize: 14 }}>{T.nav_try}</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 24px 60px', textAlign: 'center' }}>
        <div className="tag fade-up" style={{ marginBottom: 20 }}>{T.hero_tag}</div>
        <h1 className="fade-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 20 }}>
          {T.hero_h1_1}<br /><span style={{ color: 'var(--accent)' }}>{T.hero_h1_2}</span>
        </h1>
        <p className="fade-up delay-2" style={{ fontSize: 18, color: '#888', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>{T.hero_desc}</p>
        <div className="fade-up delay-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard" className="btn-primary" style={{ fontSize: 16, padding: '14px 28px' }}>{T.hero_cta1}</Link>
          <Link href="/pricing" className="btn-outline" style={{ fontSize: 16, padding: '14px 28px' }}>{T.hero_cta2}</Link>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="card fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>{T.demo_title}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              <select value={format} onChange={e => setFormat(e.target.value)} style={{ fontSize: 13, padding: '6px 10px' }}>
                <option value="markdown">{T.fmt_markdown}</option>
                <option value="html">{T.fmt_html}</option>
                <option value="plaintext">{T.fmt_plaintext}</option>
              </select>
              <select value={audience} onChange={e => setAudience(e.target.value)} style={{ fontSize: 13, padding: '6px 10px' }}>
                <option value="users">{T.aud_users}</option>
                <option value="devs">{T.aud_devs}</option>
                <option value="investors">{T.aud_investors}</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, color: '#555', marginBottom: 8, letterSpacing: 0.5 }}>{T.demo_commits_label}</div>
              <textarea value={commits} onChange={e => setCommits(e.target.value)} rows={8} placeholder={T.demo_placeholder} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 11, color: '#555', marginBottom: 8, letterSpacing: 0.5 }}>{T.demo_result_label}</div>
              <div style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: 10, padding: 14, minHeight: 180, fontFamily: 'DM Mono', fontSize: 13, color: '#ccc', whiteSpace: 'pre-wrap', lineHeight: 1.7, overflowY: 'auto', maxHeight: 220 }}>
                {loading ? <span style={{ color: 'var(--accent-mid)' }}>{T.demo_generating}</span> : result || <span style={{ color: '#444' }}>{T.demo_empty}</span>}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={generate} disabled={loading} style={{ fontSize: 15, padding: '12px 32px' }}>
              {loading ? T.demo_generating : T.demo_btn}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, letterSpacing: -1, marginBottom: 40 }}>{T.features_title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {T.features.map((f, i) => (
            <div key={i} className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: '#777', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px 100px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 16 }}>
          {T.cta_h2_1} <span style={{ color: 'var(--accent)' }}>{T.cta_h2_2}</span>
        </h2>
        <p style={{ color: '#777', marginBottom: 32, fontSize: 16 }}>{T.cta_desc}</p>
        <Link href="/dashboard" className="btn-primary" style={{ fontSize: 17, padding: '15px 36px' }}>{T.cta_btn}</Link>
      </div>

      <footer style={{ borderTop: '1px solid #1a1a1a', padding: '24px', textAlign: 'center', color: '#444', fontSize: 13, fontFamily: 'DM Mono' }}>
        {T.footer} · <Link href="/pricing" style={{ color: '#555', textDecoration: 'none' }}>{T.nav_prices}</Link>
      </footer>
    </div>
  )
}
