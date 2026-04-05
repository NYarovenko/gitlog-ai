import { NextRequest, NextResponse } from 'next/server'

const AUDIENCE_MAP: Record<string, string> = {
  users: 'non-technical end-users who care about new features and bug fixes, not technical details',
  devs: 'developers who appreciate technical context, API changes, and implementation details',
  investors: 'business stakeholders and investors who care about product progress and business value',
}

const FORMAT_MAP: Record<string, string> = {
  markdown: 'Markdown with ## and ### headers, bullet points starting with "- ", and **bold** for important items',
  html: 'HTML with <h2>, <h3>, <ul><li> tags, and <strong> for highlights. Clean, semantic HTML.',
  plaintext: 'plain text with dashes (- ) for lists and line breaks. No markdown, no HTML.',
}

const LANGUAGE_MAP: Record<string, string> = {
  uk: 'Ukrainian (Українська)',
  en: 'English',
  de: 'German (Deutsch)',
  pl: 'Polish (Polski)',
}

export async function POST(req: NextRequest) {
  try {
    const { commits, format = 'markdown', audience = 'users', language = 'uk', plan } = await req.json()

    if (!commits?.trim()) {
      return NextResponse.json({ error: 'Коміти не можуть бути порожніми' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API ключ не налаштований. Додайте ANTHROPIC_API_KEY у .env.local' }, { status: 500 })
    }

    const prompt = `You are a professional changelog writer helping development teams communicate updates clearly.

Convert these git commits into a well-structured changelog:

<commits>
${commits.trim()}
</commits>

Requirements:
- Language: ${LANGUAGE_MAP[language] || 'Ukrainian'}
- Format: ${FORMAT_MAP[format] || FORMAT_MAP.markdown}
- Audience: ${AUDIENCE_MAP[audience] || AUDIENCE_MAP.users}
- Group changes into sections: New Features (Нові функції), Improvements (Покращення), Bug Fixes (Виправлення) — only include sections that have items
- Add a version header: "## v1.x.0 — [current month and year in the target language]"
- Each item should be ONE clear, friendly sentence
- Skip technical jargon for non-dev audiences
- Do NOT include the commit hash or branch names
- Make it feel human, not auto-generated

Respond with ONLY the changelog text. No preamble, no explanations.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return NextResponse.json({ error: err.error?.message || 'Помилка API' }, { status: 500 })
    }

    const data = await response.json()
    const result = data.content?.[0]?.text?.trim()

    if (!result) {
      return NextResponse.json({ error: 'Порожня відповідь від AI' }, { status: 500 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: 'Внутрішня помилка сервера' }, { status: 500 })
  }
}
