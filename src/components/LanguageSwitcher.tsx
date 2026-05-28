'use client'

import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useLocale } from '@/lib/i18n/LocaleContext'
import { LOCALES, LOCALE_LABEL, type Locale } from '@/lib/i18n/translations'

const SHORT_LABEL: Record<Locale, string> = { pt: 'PT', en: 'EN' }

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <div
      className={`group relative inline-flex h-8 sm:h-9 shrink-0 items-stretch border border-white/15 bg-black/45 text-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.28)] backdrop-blur-[2px] transition-colors hover:border-white/40 hover:bg-black/55 ${className}`}
      role="group"
      aria-label={t('lang.label')}
    >
      <CornerBrackets color="rgba(255,255,255,0.38)" size={8} inset={-3} />
      <span
        aria-hidden="true"
        className="inline-flex w-7 sm:w-8 items-center justify-center border-r border-white/10 text-white/65 transition-colors group-hover:text-white/90"
      >
        <Globe className="h-3.5 w-3.5" />
      </span>
      {LOCALES.map((code, i) => {
        const active = code === locale
        return (
          <motion.button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`relative inline-flex min-w-8 sm:min-w-9 items-center justify-center px-2 sm:px-2.5 text-[10px] sm:text-xs font-semibold tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
              active
                ? 'bg-white text-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            } ${i < LOCALES.length - 1 ? 'border-r border-white/10' : ''}`}
            whileTap={{ scale: 0.96 }}
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
