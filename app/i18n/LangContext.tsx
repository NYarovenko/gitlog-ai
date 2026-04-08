'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { t } from './translations'

type Lang = 'uk' | 'en'
type Translations = typeof t.uk

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  T: Translations
}>({ lang: 'uk', setLang: () => {}, T: t.uk })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('uk')

  useEffect(() => {
    const saved = localStorage.getItem('gitlog_lang') as Lang
    if (saved === 'uk' || saved === 'en') setLangState(saved)
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('gitlog_lang', l)
  }

  const T = t[lang] as Translations

  return (
    <LangContext.Provider value={{ lang, setLang, T }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}