'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { t, Lang } from './translations'

const LangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  T: typeof t['uk']
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

  return (
    <LangContext.Provider value={{ lang, setLang, T: t[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
