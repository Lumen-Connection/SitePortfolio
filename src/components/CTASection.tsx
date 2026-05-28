'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { useTranslation } from '@/lib/i18n/LocaleContext'

export function CTASection({ onVerPortfolio }: { onVerPortfolio?: () => void }) {
  const { t } = useTranslation()
  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-black overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel color="#f97316" className="mb-8">{t('cta.label')}</SectionLabel>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5 sm:mb-6 text-white">
            {t('cta.title.part1')}{' '}
            <span style={{ color: '#f97316' }}>{t('cta.title.highlight')}</span>{t('cta.title.end')}
          </h2>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 max-w-2xl">
            {t('cta.body')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-black font-medium text-xs sm:text-sm tracking-wide hover:bg-white/90 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              {t('cta.start')} <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </motion.a>
            <motion.button
              onClick={onVerPortfolio}
              className="relative inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 border border-white/15 text-white/85 font-medium text-xs sm:text-sm tracking-wide hover:border-white/35 hover:bg-white/5 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <CornerBrackets />
              {t('cta.portfolio')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}