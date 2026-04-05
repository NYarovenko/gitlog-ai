'use client'
import { useLang } from '../i18n/LangContext'

export function LangSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: 8, padding: 3, gap: 2 }}>
      {(['uk', 'en'] as const).map(l => (
        <button
          key={l}
          onClick={() => setLang(l)}
          style={{
            padding: '5px 11px',
            borderRadius: 6,
            border: 'none',
            fontFamily: 'DM Mono, monospace',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: lang === l ? 'var(--accent)' : 'transparent',
            color: lang === l ? '#fff' : '#555',
            letterSpacing: 0.3,
          }}
        >
          {l === 'uk' ? 'UA' : 'EN'}
        </button>
      ))}
    </div>
  )
}
