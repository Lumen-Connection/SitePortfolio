import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { heroProjects as projects } from '@/app/portfolioData'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { buildWhatsAppUrl, buildProjectInterestMessage } from '@/lib/contact'
import { sanitizeUrl } from '@/lib/url'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import { tField } from '@/lib/i18n/tField'

function HeroSlide({ project, isActive, onVerProjeto }: { project: typeof projects[0]; isActive: boolean; onVerProjeto: () => void }) {
  const { t, locale } = useTranslation()
  const title = tField(project, 'title', locale)
  const category = tField(project, 'category', locale)
  const description = tField(project, 'description', locale)
  const subtitle = tField(project, 'subtitle', locale) || undefined
  const ctaLabel = tField(project, 'ctaLabel', locale) || t('hero.ctaPrimaryDefault')
  const explicitCtaHref: string | undefined = (project as any).ctaHref
  const whatsappHref = buildWhatsAppUrl(buildProjectInterestMessage(project.category))
  const ctaHref = sanitizeUrl(explicitCtaHref ?? whatsappHref)

  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={`${category}: ${title}`}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {project.image && project.image !== '/' && (
        <>
          <div className="absolute inset-0 z-0">
            <img src={project.image} alt={`${title} — ${category}`} className="w-full h-full object-cover" decoding={isActive ? 'sync' : 'async'} fetchPriority={isActive ? 'high' : 'low'} loading="eager" />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-br from-black/80 via-black/65 to-black/85" aria-hidden />
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/60 via-transparent to-transparent" aria-hidden />
        </>
      )}
      <div className={`absolute inset-0 z-[1] bg-gradient-to-br ${project.gradient} ${project.image && project.image !== '/' ? 'opacity-25' : ''}`} />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 25% 60%, ${project.color}55 0%, ${project.color}1a 40%, transparent 75%)`,
        }}
      />

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-5 sm:px-6 lg:px-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="h-px w-10" style={{ backgroundColor: project.color }} />
              <span
                className="text-xs font-medium tracking-[0.25em] uppercase"
                style={{ color: project.color }}
              >
                {category}
              </span>
            </motion.div>

            {project.title === 'Lumen Connection' ? (
              <motion.h1
                className="mb-4 sm:mb-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <span className="sr-only">{title}</span>
                <img
                  src="/LC - Logos/Lumen Connection white fonte.webp"
                  alt={title}
                  aria-hidden="true"
                  width={2573}
                  height={320}
                  className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-full"
                  style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }}
                  decoding="async"
                  fetchPriority={isActive ? 'high' : 'low'}
                  loading="eager"
                />
              </motion.h1>
            ) : (
              <motion.h1
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-5 leading-[1.05] tracking-tight text-white"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {title}
              </motion.h1>
            )}

            {subtitle && (
              <motion.p
                className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-6 text-yellow-300"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {subtitle}
              </motion.p>
            )}

            <motion.p
              className="text-sm sm:text-base md:text-lg text-white/90 mb-7 sm:mb-10 max-w-xl leading-relaxed"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <motion.a
                href={ctaHref}
                target={explicitCtaHref ? undefined : '_blank'}
                rel={explicitCtaHref ? undefined : 'noreferrer'}
                className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-medium text-xs sm:text-sm tracking-wide hover:bg-white/90 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                {ctaLabel}
                <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>

              <motion.button
                className="relative group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 text-white/90 font-medium text-xs sm:text-sm tracking-wide border border-white/15 hover:border-white/30 hover:bg-white/5 transition-colors"
                whileTap={{ scale: 0.98 }}
                onClick={onVerProjeto}
              >
                <CornerBrackets />
                {t('hero.ctaSecondary')}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection({
  onVerProjeto,
  onSlideChange,
}: {
  onVerProjeto: (category: string) => void
  onSlideChange?: (index: number) => void
}) {
  const { t, locale } = useTranslation()
  const HERO_STATS = [
    { value: t('hero.stats.projectsValue'), label: t('hero.stats.projectsLabel') },
    { value: t('hero.stats.techValue'), label: t('hero.stats.techLabel') },
    { value: t('hero.stats.dedicationValue'), label: t('hero.stats.dedicationLabel') },
  ]
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [a11yMode, setA11yMode] = useState(false)
  const [isLumenAIOpen, setIsLumenAIOpen] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (typeof document === 'undefined') return
    const html = document.documentElement
    const sync = () => setA11yMode(html.classList.contains('a11y-screen-reader'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(html, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onOpen = () => setIsLumenAIOpen(true)
    const onClose = () => setIsLumenAIOpen(false)
    window.addEventListener('lumen-ai-modal:open', onOpen)
    window.addEventListener('lumen-ai-modal:close', onClose)
    return () => {
      window.removeEventListener('lumen-ai-modal:open', onOpen)
      window.removeEventListener('lumen-ai-modal:close', onClose)
    }
  }, [])

  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1])
  const carouselDarken = useTransform(scrollY, [0, 700], [0, 1])
  const carouselDarkenSmooth = useSpring(carouselDarken, { stiffness: 400, damping: 40 })
  const overlayOpacity = useTransform(scrollY, [0, 300, 500], [1, 1, 0])
  const overlayPointer = useTransform(overlayOpacity, (v) => (v < 0.05 ? 'none' : 'auto'))

  const activeColor = projects[currentSlide]?.color ?? '#f97316'

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      const threshold = typeof window !== 'undefined' ? window.innerHeight * 0.45 : 400
      setIsCarouselPaused(y > threshold)
    })
    return unsubscribe
  }, [scrollY])

  useEffect(() => {
    onSlideChange?.(currentSlide)
  }, [currentSlide, onSlideChange])

  useEffect(() => {
    if (isCarouselPaused || a11yMode || isLumenAIOpen) return
    const timer = setTimeout(() => setCurrentSlide((prev) => (prev + 1) % projects.length), 8500)
    return () => clearTimeout(timer)
  }, [isCarouselPaused, currentSlide, a11yMode, isLumenAIOpen])

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % projects.length), [])
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length), [])

  const touchStartX = useRef<number | null>(null)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    const SWIPE_THRESHOLD = 50
    if (deltaX <= -SWIPE_THRESHOLD) nextSlide()
    else if (deltaX >= SWIPE_THRESHOLD) prevSlide()
  }, [nextSlide, prevSlide])

  return (
    <>
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      aria-roledescription="carrossel"
      aria-label={t('hero.carousel.label')}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div aria-hidden="true" className="absolute inset-0" style={{ scale: heroScale }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/55 to-[#0a0a0a]" />
      </motion.div>

      <div
        className="relative h-full z-0"
        aria-live={isCarouselPaused ? 'polite' : 'off'}
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          {projects.map((project, index) => currentSlide === index && (
            <HeroSlide key={project.id} project={project} isActive={currentSlide === index} onVerProjeto={() => onVerProjeto(project.category)} />
          ))}
        </AnimatePresence>
      </div>

      <motion.div aria-hidden="true" className="absolute inset-0 bg-[#0a0a0a] pointer-events-none z-10" style={{ opacity: carouselDarkenSmooth }} />

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {t('hero.carousel.slide')} {currentSlide + 1} {t('hero.carousel.slideOf')} {projects.length}: {projects[currentSlide] ? tField(projects[currentSlide], 'title', locale) : ''}
      </div>
      </section>

      {mounted && createPortal(
        <motion.div
          className="fixed inset-x-0 bottom-0 z-[45]"
          style={{ opacity: overlayOpacity, pointerEvents: overlayPointer }}
          aria-hidden={false}
        >
          <div data-a11y-filter="true" className="relative w-full h-full">
          <div className="hidden lg:block absolute bottom-28 right-6 lg:right-12">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative px-8 py-5 bg-white/[0.03] backdrop-blur-sm border border-white/10"
            >
              <CornerBrackets color="rgba(255,255,255,0.7)" size={12} inset={-5} />
              <div className="flex items-start gap-10">
                {HERO_STATS.map((stat, i) => (
                  <div key={i} className="min-w-[88px]">
                    <div
                      className="text-3xl font-semibold mb-1.5"
                      style={{ color: i === 0 ? activeColor : '#ffffff' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] tracking-wider uppercase text-white/90 whitespace-pre-line leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0">
            <div className="container mx-auto px-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <div role="tablist" aria-label={t('hero.carousel.select')} className="hidden sm:flex items-center gap-3 flex-wrap">
                  {projects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      aria-selected={currentSlide === index}
                      aria-label={`${t('hero.carousel.slide')} ${index + 1} ${t('hero.carousel.slideOf')} ${projects.length}: ${tField(project, 'title', locale)}`}
                      className="group relative h-1 rounded-full overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                      style={{
                        width: currentSlide === index ? '60px' : '40px',
                        backgroundColor: currentSlide === index ? project.color : 'rgba(255,255,255,0.2)',
                      }}
                      onClick={() => setCurrentSlide(index)}
                    >
                      {currentSlide === index && (
                        <div
                          className="absolute inset-y-0 left-0 bg-white/30"
                          style={{
                            animationName: 'carousel-progress',
                            animationDuration: '10s',
                            animationTimingFunction: 'linear',
                            animationFillMode: 'forwards',
                            animationPlayState: isCarouselPaused || isLumenAIOpen ? 'paused' : 'running',
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div
                  className="flex sm:hidden items-center gap-2 text-[11px] tracking-[0.2em] text-white/70 font-medium"
                  aria-label={`Slide ${currentSlide + 1} de ${projects.length}`}
                >
                  <span aria-hidden="true" style={{ color: activeColor }}>{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span aria-hidden="true" className="text-white/50">{String(projects.length).padStart(2, '0')}</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <motion.button
                    type="button"
                    className="w-9 h-9 sm:w-11 sm:h-11 border border-white/15 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    onClick={() => setIsCarouselPaused((p) => !p)}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isCarouselPaused ? t('hero.carousel.play') : t('hero.carousel.pause')}
                  >
                    {isCarouselPaused ? <Play aria-hidden="true" className="w-4 h-4" /> : <Pause aria-hidden="true" className="w-4 h-4" />}
                  </motion.button>
                  <motion.button
                    type="button"
                    className="w-9 h-9 sm:w-11 sm:h-11 border border-white/15 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    onClick={prevSlide}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t('hero.carousel.previous')}
                  >
                    <ChevronLeft aria-hidden="true" className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="w-9 h-9 sm:w-11 sm:h-11 border border-white/15 bg-black/40 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                    onClick={nextSlide}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t('hero.carousel.next')}
                  >
                    <ChevronRight aria-hidden="true" className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>,
        document.body,
      )}
    </>
  )
}