'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { LOCALES, LOCALE_LABEL, type Locale } from '@/lib/i18n/translations'

const SHORT_LABEL: Record<Locale, string> = { pt: 'PT', en: 'EN' }

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      className={`relative inline-flex items-center shrink-0 border border-white/15 bg-black/40 ${className}`}
      role="group"
      aria-label={t('lang.label')}
    >
      <Globe
        aria-hidden="true"
        className="hidden sm:block w-3.5 h-3.5 text-white/55 ml-2 mr-1"
      />
      {LOCALES.map((code, i) => {
        const active = code === locale
        return (
          <motion.button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`relative inline-flex items-center justify-center px-2 sm:px-2.5 py-1 text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
              active
                ? 'text-black bg-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            } ${i === LOCALES.length - 1 ? '' : 'border-r border-white/10'}`}
            whileTap={{ scale: 0.95 }}
            aria-pressed={active}
            aria-label={`${t('lang.switchTo')} ${LOCALE_LABEL[code]}`}
          >
            {SHORT_LABEL[code]}
          </motion.button>
        )
      })}
    </div>
  )
}
