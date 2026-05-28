'use client'

import { useState, useEffect, useRef, memo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { successCases } from '@/app/portfolioData'
import { X, Play, ExternalLink } from 'lucide-react'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { hasMedia } from '@/lib/media'
import { sanitizeUrl } from '@/lib/url'
import { LumenAIModal } from '@/components/LumenAIModal'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { tField } from '@/lib/i18n/tField'

const isLumenAICase = (stat: typeof successCases[0]) => stat.nome === 'Lumen AI'

const isYoutubeCaseStat = (stat: typeof successCases[0]) =>
  !!stat.url?.includes('youtube.com')

const sharedMotionProps = (index: number) => ({
  className: 'relative flex flex-row items-center gap-4 flex-1 border border-white/10 bg-white/[0.02] p-4 hover:border-white/25 hover:bg-white/[0.04] transition-colors',
  initial: { opacity: 0, x: 24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay: index * 0.08 },
})

function CaseModal({ stat, onClose }: { stat: typeof successCases[0]; onClose: () => void }) {
  const { t, locale } = useTranslation()
  const nome = tField(stat, 'nome', locale)
  const descricaoLonga =
    tField(stat, 'descriçãoLonga', locale) || tField(stat, 'descrição', locale)
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const titleId = `case-modal-title-${stat.nome.replace(/\s+/g, '-').toLowerCase()}`

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

  const isYoutube = isYoutubeCaseStat(stat)
  const labelText = isYoutube ? t('cases.youtubeLabel') : t('cases.webDevLabel')
  const labelColor = isYoutube ? '#f87171' : '#f97316'
  const ctaText = isYoutube ? t('cases.watchYoutube') : t('cases.visitSite')
  const ctaIcon = isYoutube ? <Play aria-hidden="true" size={14} fill="black" /> : <ExternalLink aria-hidden="true" size={14} />
  const hoverCtaText = ctaText
  const hoverCtaBg = isYoutube ? 'bg-red-600' : 'bg-orange-500'
  const hoverCtaIcon = isYoutube ? <Play aria-hidden="true" size={18} fill="white" /> : <ExternalLink aria-hidden="true" size={18} />

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
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
          aria-labelledby={titleId}
          className="relative z-10 w-full max-w-2xl overflow-hidden bg-[#0f0f0f] border border-white/10 focus:outline-none"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <CornerBrackets color="rgba(255,255,255,0.7)" size={14} inset={-6} />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 border border-white/15 bg-black/60 text-white/90 hover:text-white hover:border-white/40 transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label={t('cases.closeAria')}
          >
            <X aria-hidden="true" size={16} />
          </button>
          <a
            href={sanitizeUrl(stat.url)}
            target="_blank"
            rel="noreferrer"
            className="block relative group"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <img
                src={stat.imagem}
                alt={nome}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`flex items-center gap-3 px-6 py-3 ${hoverCtaBg} text-white font-medium text-sm shadow-lg`}>
                  {hoverCtaIcon}
                  <span>{hoverCtaText}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent pointer-events-none" />
            </div>
          </a>
          <div className="px-7 py-6">
            <div className="mb-4">
              <SectionLabel color={labelColor}>{labelText}</SectionLabel>
            </div>
            <h2 id={titleId} className="text-xl md:text-2xl font-semibold text-white mb-3 leading-tight tracking-tight">
              {nome}
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              {isYoutube ? (
                <>
                  {t('cases.youtubeDescription.part1')}{' '}
                  <span className="text-white font-medium">{t('cases.youtubeDescription.channel')}</span>{' '}
                  {t('cases.youtubeDescription.part2')}{' '}
                  <span className="text-white font-medium">{t('cases.youtubeDescription.tool')}</span>
                  {t('cases.youtubeDescription.part3')}
                </>
              ) : (
                descricaoLonga
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={sanitizeUrl(stat.url)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
              >
                {ctaIcon}
                {ctaText}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-white/90 text-sm font-medium tracking-wide hover:border-white/35 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <CornerBrackets />
                <X aria-hidden="true" size={14} />
                {t('cases.close')}
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

const StatCardInner = memo(function StatCardInner({ stat, index }: { stat: typeof successCases[0]; index: number }) {
  const { t, locale } = useTranslation()
  const nome = tField(stat, 'nome', locale)
  const descricao = tField(stat, 'descrição', locale)
  const tagLabel = tField(stat, 'tagLabel', locale)
  const hasImage = hasMedia(stat.imagem)
  const labelText = tagLabel || `${t('successCases.casePrefix')} ${String(index + 1).padStart(2, '0')}`

  if (!hasImage) {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center text-center flex-1 min-w-0 py-2">
        <span className="text-[10px] text-orange-300/80 font-medium tracking-[0.25em] uppercase mb-1.5">
          {labelText}
        </span>
        <p className="text-sm md:text-base font-semibold text-white mb-1">
          {nome}
        </p>
        <p className="text-white/90 text-xs md:text-sm leading-relaxed">
          {descricao}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-20 h-20 md:w-24 md:h-24 overflow-hidden border border-white/10 bg-black/40 shrink-0">
        <img
          src={stat.imagem}
          alt={nome}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 flex flex-col justify-center flex-1 min-w-0">
        <span className="text-[10px] text-orange-300/80 font-medium tracking-[0.25em] uppercase mb-1.5">
          {labelText}
        </span>
        <p className="text-sm md:text-base font-semibold text-white mb-1 truncate">
          {nome}
        </p>
        <p className="text-white/90 text-xs md:text-sm leading-relaxed">
          {descricao}
        </p>
      </div>
    </>
  )
})

const StatCard = memo(function StatCard({
  stat,
  index,
  onOpenModal,
  onOpenLumenAI,
}: {
  stat: typeof successCases[0]
  index: number
  onOpenModal: (stat: typeof successCases[0]) => void
  onOpenLumenAI: () => void
}) {
  const isLumenAI = isLumenAICase(stat)

  if (stat.url || isLumenAI) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        className="relative flex flex-row items-center gap-4 flex-1 border border-white/10 bg-white/[0.02] p-4 hover:border-white/25 hover:bg-white/[0.04] transition-colors"
      >
        <button
          type="button"
          onClick={() => (isLumenAI ? onOpenLumenAI() : onOpenModal(stat))}
          className="relative flex flex-row items-center gap-4 flex-1 cursor-pointer text-left bg-transparent border-0 p-0 w-full"
          aria-haspopup={isLumenAI ? 'dialog' : undefined}
        >
          <StatCardInner stat={stat} index={index} />
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div {...sharedMotionProps(index)}>
      <StatCardInner stat={stat} index={index} />
    </motion.div>
  )
})

export function SuccessCasesSection() {
  const { t } = useTranslation()
  const [modalCase, setModalCase] = useState<typeof successCases[0] | null>(null)
  const [isLumenAIOpen, setIsLumenAIOpen] = useState(false)
  const handleOpenModal = useCallback((stat: typeof successCases[0]) => setModalCase(stat), [])
  const handleCloseModal = useCallback(() => setModalCase(null), [])
  const handleOpenLumenAI = useCallback(() => setIsLumenAIOpen(true), [])
  const handleCloseLumenAI = useCallback(() => setIsLumenAIOpen(false), [])

  return (
    <section id="success-cases" aria-labelledby="success-cases-heading" className="relative lg:min-h-screen flex flex-col py-10 sm:py-12 md:py-16">
      <h2 id="success-cases-heading" className="sr-only">{t('section.successCases')}</h2>
      <div className="container mx-auto px-5 sm:px-6 flex-1 flex flex-col min-h-0 relative z-10">
        <div className="w-full max-w-7xl mx-auto h-full flex items-stretch">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 w-full lg:min-h-[95vh] items-stretch">
            <motion.div
              className="lg:col-span-7 relative overflow-hidden group h-full flex flex-col bg-white/[0.02] border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <CornerBrackets color="rgba(255,255,255,0.6)" size={14} inset={-6} />
              <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden">
                <img
                  src="/success-cases/banner-code-edit.jpeg"
                  alt={t('successCases.bannerAlt')}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
              </div>
              <div className="relative z-10 px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7 flex flex-col justify-start flex-grow">
                <div className="mb-4 sm:mb-5">
                  <SectionLabel color="#f97316">{t('successCases.label')}</SectionLabel>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-3 sm:mb-4 leading-[1.1] tracking-tight">
                  {t('successCases.title')}
                </h3>
                <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                  {t('successCases.body1')}
                </p>
                <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-xl mb-5 sm:mb-6">
                  {t('successCases.body2')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs md:text-sm">
                  {[
                    { title: t('successCases.card1.title'), body: t('successCases.card1.body') },
                    { title: t('successCases.card2.title'), body: t('successCases.card2.body') },
                    { title: t('successCases.card3.title'), body: t('successCases.card3.body') },
                  ].map((card) => (
                    <div key={card.title} className="relative border border-white/10 bg-white/[0.03] px-4 py-3">
                      <p className="font-semibold mb-1 text-white">{card.title}</p>
                      <p className="text-white/55">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-5 flex flex-col gap-4 h-full">
              {successCases.map((stat, index) => (
                <StatCard
                  key={`${stat.nome}-${index}`}
                  stat={stat}
                  index={index}
                  onOpenModal={handleOpenModal}
                  onOpenLumenAI={handleOpenLumenAI}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalCase && (
        <CaseModal stat={modalCase} onClose={handleCloseModal} />
      )}

      {isLumenAIOpen && (
        <LumenAIModal onClose={handleCloseLumenAI} activeColor="#f97316" />
      )}
    </section>
  )
}