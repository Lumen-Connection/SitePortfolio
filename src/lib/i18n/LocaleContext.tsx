'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_HTML_LANG,
  translations,
  type Locale,
  type TranslationKey,
} from './translations'

const STORAGE_KEY = 'lc-locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (key: TranslationKey) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && (LOCALES as readonly string[]).includes(stored)) {
    return stored as Locale
  }
  const browser = (navigator.language || '').toLowerCase()
  if (browser.startsWith('pt')) return 'pt'
  if (browser.startsWith('en')) return 'en'
  return DEFAULT_LOCALE
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    const detected = detectInitialLocale()
    setLocaleState(detected)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = LOCALE_HTML_LANG[locale]
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = translations[locale] as Record<string, string>
      return dict[key] ?? translations[DEFAULT_LOCALE][key] ?? key
    },
    [locale],
  )

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
      t: ((key: TranslationKey) => translations[DEFAULT_LOCALE][key] ?? key) as LocaleContextValue['t'],
    }
  }
  return ctx
}

export function useTranslation() {
  return useLocale()
}
