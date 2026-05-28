'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'

export function AboutSection({ activeColor = '#f97316' }: { activeColor?: string }) {
  const { t } = useTranslation()
  const pillars = [
    {
      word: 'Lumen',
      subtitle: t('about.pillar1.subtitle'),
      body: t('about.pillar1.body'),
      accent: '#f97316',
      number: '01',
    },
    {
      word: 'Connection',
      subtitle: t('about.pillar2.subtitle'),
      body: t('about.pillar2.body'),
      accent: '#3b82f6',
      number: '02',
    },
  ]
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <section id="about" ref={sectionRef} aria-labelledby="about-heading" className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 bg-black">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[140px] transition-all duration-[1200ms] ease-in-out"
          style={{ background: `radial-gradient(ellipse, ${activeColor}0d 0%, transparent 70%)` }}
        />
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[260px] rounded-full blur-[90px] transition-all duration-[1200ms] ease-in-out"
          style={{ background: `radial-gradient(ellipse, ${activeColor}18 0%, transparent 65%)` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center mb-14 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel color={activeColor} className="mb-7">{t('about.label')}</SectionLabel>
          <h2 id="about-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5 sm:mb-6 text-white">
            Lumen <span style={{ color: activeColor }}>Connection</span>
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('about.intro')}
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/5 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-orange-500 via-blue-500 to-transparent origin-top"
              style={{ scaleY: lineScale, height: '100%' }}
            />
          </div>

          <div className="space-y-16 md:space-y-0">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.word}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="flex-1 w-full relative border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 md:p-10">
                  <CornerBrackets color={`${pillar.accent}aa`} size={12} inset={-5} />
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="text-[10px] font-medium tracking-[0.3em] uppercase"
                      style={{ color: pillar.accent }}
                    >
                      — {pillar.number}
                    </span>
                    <span className="text-6xl md:text-7xl font-bold opacity-[0.08] leading-none" style={{ color: pillar.accent }}>
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 tracking-tight" style={{ color: pillar.accent }}>
                    {pillar.word}
                  </h3>
                  <p className="text-[10px] text-white/90 font-medium uppercase tracking-[0.25em] mb-5">
                    {pillar.subtitle}
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
                <div
                  className="hidden md:flex w-3 h-3 rotate-45 flex-shrink-0 z-10"
                  style={{ backgroundColor: pillar.accent, boxShadow: `0 0 12px ${pillar.accent}80` }}
                />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 sm:mt-20 md:mt-28 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-12 h-px bg-white/20 mx-auto mb-10" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-white/85 leading-relaxed italic tracking-tight">
            {t('about.quote.part1')}{' '}
            <span className="font-semibold not-italic" style={{ color: activeColor }}>{t('about.quote.highlight1')}</span>{' '}
            {t('about.quote.and')}{' '}
            <span className="text-white font-semibold not-italic">{t('about.quote.highlight2')}</span>{t('about.quote.end')}
          </blockquote>
          <p className="mt-8 text-white/90 text-[10px] tracking-[0.3em] uppercase">
            — Lumen Connection
          </p>
        </motion.div>
      </div>
    </section>
  )
}