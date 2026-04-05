import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from './i18n/LangContext'

export const metadata: Metadata = {
  title: 'GitLog AI — Automated changelogs in seconds',
  description: 'Turn git commits into beautiful changelogs with AI. For developers, teams and open-source projects.',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'GitLog AI',
    description: 'Automated changelogs from git commits using AI',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  )
}
