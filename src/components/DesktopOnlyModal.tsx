'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Monitor, Copy, Check, Download, Smartphone } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { sanitizeUrl } from '@/lib/url'
import type { ProjectItem } from '@/data/types'
import { hasMedia, isVideoSource } from '@/lib/media'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { tField } from '@/lib/i18n/tField'

export function DesktopOnlyModal({ item, onClose }: { item: ProjectItem; onClose: () => void }) {
  const { t, locale } = useTranslation()
  const itemTitle = tField(item, 'title', locale)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = `desktop-only-title-${item.id}`

  useEffect(() => { setMounted(true) }, [])

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

  const handleCopy = async () => {
    if (!item.downloadUrl) return
    try {
      await navigator.clipboard.writeText(item.downloadUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = item.downloadUrl
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      document.body.removeChild(ta)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    }
  }

  if (!mounted) return null

  const hasImage = hasMedia(item.image)
  const isVideo = isVideoSource(item.image)

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
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#0f0f0f] border border-orange-500/30 focus:outline-none"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <CornerBrackets color="rgba(249,115,22,0.7)" size={12} inset={-5} />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 border border-white/15 bg-black/60 text-white/80 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              aria-label={t('desktopOnly.closeAria')}
            >
              <X aria-hidden="true" size={14} />
            </button>

            {hasImage && (
              <div className="relative w-full aspect-video overflow-hidden border-b border-white/5">
                {isVideo ? (
                  <video
                    src={item.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
              </div>
            )}

            <div className="px-6 py-5 sm:px-7 sm:py-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="relative inline-flex items-center gap-1.5 px-2.5 py-1 border border-orange-500/40 bg-orange-500/[0.07]">
                  <Monitor aria-hidden="true" className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-400">
                    {t('desktopOnly.badge')}
                  </span>
                </div>
              </div>

              <h2 id={titleId} className="text-lg sm:text-xl font-semibold text-white leading-tight tracking-tight mb-2">
                {itemTitle} {t('desktopOnly.titleSuffix')}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                {t('desktopOnly.body.intro')}{' '}
                <span className="text-white font-medium">{itemTitle}</span>{' '}
                {t('desktopOnly.body.middle')}{' '}
                <span className="text-white">{t('desktopOnly.body.platform')}</span>{' '}
                {t('desktopOnly.body.and')}{' '}
                <span className="inline-flex items-center gap-1 text-white/85">
                  <Smartphone aria-hidden="true" className="w-3.5 h-3.5" />{t('desktopOnly.android')}
                </span>{' '}
                {t('desktopOnly.body.or')} <span className="text-white/85">{t('desktopOnly.iosLabel')}</span>.
              </p>

              <p className="text-white/55 text-xs leading-relaxed mb-5">
                {t('desktopOnly.copyHint')}
              </p>

              <div className="flex flex-col gap-2">
                {item.downloadUrl && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="relative inline-flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-400 text-black text-xs font-semibold tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    aria-live="polite"
                  >
                    {copied ? (
                      <>
                        <Check aria-hidden="true" className="w-4 h-4" />
                        {t('desktopOnly.linkCopied')}
                      </>
                    ) : (
                      <>
                        <Copy aria-hidden="true" className="w-4 h-4" />
                        {t('desktopOnly.copyLink')}
                      </>
                    )}
                  </button>
                )}

                {item.downloadUrl && (
                  <a
                    href={sanitizeUrl(item.downloadUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onClick={onClose}
                    className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/15 text-white/75 hover:text-white hover:border-white/35 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  >
                    <CornerBrackets />
                    <Download aria-hidden="true" className="w-3.5 h-3.5" />
                    {t('desktopOnly.downloadAnyway')}
                  </a>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white/55 hover:text-white/80 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {t('desktopOnly.close')}
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
