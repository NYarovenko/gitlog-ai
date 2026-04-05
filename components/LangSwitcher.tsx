'use client'

interface LangSwitcherProps {
  lang: 'uk' | 'en'
  onChange: (lang: 'uk' | 'en') => void
}

export default function LangSwitcher({ lang, onChange }: LangSwitcherProps) {
  return (
    <div style={{
      display: 'flex',
      background: '#1a1a1a',
      border: '1px solid #2a2a2a',
      borderRadius: 8,
      padding: 3,
      gap: 2,
    }}>
      {(['uk', 'en'] as const).map(l => (
        <button
          key={l}
          onClick={() => onChange(l)}
          style={{
            padding: '5px 10px',
            borderRadius: 6,
            border: 'none',
            fontSize: 12,
            fontFamily: 'DM Mono, monospace',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
            background: lang === l ? 'var(--accent)' : 'transparent',
            color: lang === l ? '#fff' : '#555',
            letterSpacing: 0.3,
          }}
        >
          {l === 'uk' ? '🇺🇦 UA' : '🇬🇧 EN'}
        </button>
      ))}
    </div>
  )
}
