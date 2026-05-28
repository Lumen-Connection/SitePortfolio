'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Bot, Shield, Clock } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { buildWhatsAppUrl } from '@/lib/contact'
import { sanitizeUrl } from '@/lib/url'
import { useTranslation } from '@/lib/i18n/LocaleContext'

export function LumenAIModal({ onClose, activeColor = '#f97316' }: { onClose: () => void; activeColor?: string }) {
  const { t } = useTranslation()
  const highlights = [
    { icon: Bot, title: t('lumenAI.highlight.conversation.title'), body: t('lumenAI.highlight.conversation.body') },
    { icon: Shield, title: t('lumenAI.highlight.privacy.title'), body: t('lumenAI.highlight.privacy.body') },
    { icon: Clock, title: t('lumenAI.highlight.availability.title'), body: t('lumenAI.highlight.availability.body') },
  ]
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.dispatchEvent(new Event('lumen-ai-modal:open'))
    return () => {
      window.dispatchEvent(new Event('lumen-ai-modal:close'))
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    previouslyFocused.current = document.activeElement as HTMLElement | null

    const dialog = dialogRef.current
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    focusables?.[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          data-a11y-filter="true"
          className="absolute inset-0 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lumen-ai-modal-title"
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border focus:outline-none"
            style={{ borderColor: `${activeColor}33` }}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <CornerBrackets color={`${activeColor}b3`} size={14} inset={-6} />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 border border-white/15 bg-black/60 text-white/90 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2"
              style={{ ['--tw-ring-color' as string]: activeColor }}
              aria-label={t('lumenAI.closeAria')}
            >
              <X aria-hidden="true" size={16} />
            </button>

            <div
              className="relative px-7 py-8 sm:px-9 sm:py-10"
              style={{
                background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${activeColor}14 0%, transparent 70%)`,
              }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <img
                  src="/LC - Logos/Lumen Connection Alternative white logo.png"
                  alt="Lumen AI"
                  className="h-14 w-auto mb-5 select-none"
                  draggable={false}
                  style={{ filter: `drop-shadow(0 2px 8px ${activeColor}40)` }}
                />
                <span
                  className="text-xs font-medium tracking-[0.3em] uppercase"
                  style={{ color: activeColor }}
                >
                  {t('lumenAI.label')}
                </span>
                <h2 id="lumen-ai-modal-title" className="mt-4 text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight">
                  {t('lumenAI.title.part1')}{' '}
                  <span style={{ color: activeColor }}>{t('lumenAI.title.highlight')}</span> {t('lumenAI.title.part2')}
                </h2>
              </div>

              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
                {t('lumenAI.intro.before')}{t('lumenAI.intro.before') ? ' ' : ''}
                <span className="text-white font-medium">{t('lumenAI.intro.brand')}</span>{' '}
                {t('lumenAI.intro.middle')}{' '}
                <span className="text-white/90 italic">{t('lumenAI.exampleMessage')}</span>{t('lumenAI.intro.end')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.title}
                      className="relative border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <Icon aria-hidden="true" className="w-4 h-4 mb-2" style={{ color: activeColor }} />
                      <p className="font-semibold text-sm mb-1 text-white">{item.title}</p>
                      <p className="text-white/60 text-xs leading-relaxed">{item.body}</p>
                    </div>
                  )
                })}
              </div>

              <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-7">
                {t('lumenAI.footer')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={sanitizeUrl(buildWhatsAppUrl(t('lumenAI.ctaMessage')))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-black text-sm font-semibold tracking-wide transition-colors"
                  style={{ backgroundColor: activeColor }}
                  whileHover={{ filter: 'brightness(1.1)' }}
                  onClick={onClose}
                >
                  <MessageCircle aria-hidden="true" size={16} />
                  {t('lumenAI.cta')}
                </motion.a>
                <button
                  type="button"
                  onClick={onClose}
                  className="relative inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-white/90 text-sm font-medium tracking-wide hover:border-white/35 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2"
                  style={{ ['--tw-ring-color' as string]: activeColor }}
                >
                  <CornerBrackets />
                  <X aria-hidden="true" size={14} />
                  {t('lumenAI.close')}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
