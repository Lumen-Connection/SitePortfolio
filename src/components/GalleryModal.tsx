'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'

export function GalleryModal({
  images,
  title,
  description,
  onClose,
  initialIndex = 0,
}: {
  images: string[]
  title: string
  description?: string
  onClose: () => void
  initialIndex?: number
}) {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(initialIndex)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const titleId = `gallery-title-${title.replace(/\s+/g, '-').toLowerCase()}`

  const total = images.length
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

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
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
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
  }, [mounted, onClose, next, prev])

  // Preload adjacent images
  useEffect(() => {
    if (!mounted) return
    const preload = (src: string) => {
      const img = new window.Image()
      img.src = src
    }
    const nextSrc = images[(index + 1) % total]
    const prevSrc = images[(index - 1 + total) % total]
    if (nextSrc) preload(nextSrc)
    if (prevSrc) preload(prevSrc)
  }, [index, images, total, mounted])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx <= -50) next()
    else if (dx >= 50) prev()
  }

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
          className="absolute inset-0 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 w-full max-w-5xl max-h-[95vh] flex flex-col bg-[#0a0a0a] border border-white/10 focus:outline-none"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <CornerBrackets color="rgba(255,255,255,0.6)" size={14} inset={-6} />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 shrink-0">
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-sm sm:text-base font-semibold text-white truncate tracking-tight">
                  {title}
                </h2>
                {total > 1 && (
                  <p className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/50 mt-0.5">
                    {t('gallery.page')} <span className="text-orange-400 font-semibold">{String(index + 1).padStart(2, '0')}</span>{' '}
                    <span className="text-white/30">/</span> {String(total).padStart(2, '0')}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 w-9 h-9 border border-white/15 bg-black/60 text-white/90 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label={t('gallery.close')}
              >
                <X aria-hidden="true" size={16} />
              </button>
            </div>

            {/* Image area */}
            <div
              className="relative flex-1 min-h-0 bg-black flex items-center justify-center overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt={`${title} — ${t('gallery.pageAria')} ${index + 1} ${t('gallery.of')} ${total}`}
                  className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  loading="eager"
                  decoding="async"
                />
              </AnimatePresence>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/15 bg-black/60 text-white hover:bg-black/80 hover:border-white/40 transition-colors items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    aria-label={t('gallery.prev')}
                  >
                    <ChevronLeft aria-hidden="true" className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 border border-white/15 bg-black/60 text-white hover:bg-black/80 hover:border-white/40 transition-colors items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    aria-label={t('gallery.next')}
                  >
                    <ChevronRight aria-hidden="true" className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Footer: description (optional) + thumbnails */}
            <div className="shrink-0 border-t border-white/10">
              {description && (
                <p className="hidden sm:block px-6 pt-3 pb-2 text-white/65 text-xs leading-relaxed">
                  {description}
                </p>
              )}

              {total > 1 && (
                <div
                  className="px-3 sm:px-4 py-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  role="tablist"
                  aria-label={t('gallery.selectPage')}
                >
                  <div className="flex items-center gap-2">
                    {images.map((src, i) => {
                      const active = i === index
                      return (
                        <button
                          key={src}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-label={`${t('gallery.goToPage')} ${i + 1}`}
                          onClick={() => setIndex(i)}
                          className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 overflow-hidden border transition-all duration-200 ${
                            active
                              ? 'border-orange-500 ring-1 ring-orange-500/40'
                              : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={src}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile nav buttons (overlay bottom) */}
            {total > 1 && (
              <div className="sm:hidden absolute bottom-24 left-0 right-0 flex justify-between px-3 pointer-events-none">
                <button
                  type="button"
                  onClick={prev}
                  className="w-10 h-10 border border-white/15 bg-black/60 text-white pointer-events-auto flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  aria-label="Página anterior"
                >
                  <ChevronLeft aria-hidden="true" className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-10 h-10 border border-white/15 bg-black/60 text-white pointer-events-auto flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                  aria-label="Próxima página"
                >
                  <ChevronRight aria-hidden="true" className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}
