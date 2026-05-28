'use client'

import { motion } from 'framer-motion'
import { Phone, ArrowUpRight, User } from 'lucide-react'
import { CornerBrackets, SectionLabel } from '@/components/ui/corner-brackets'
import { CONTACT, buildWhatsAppUrl } from '@/lib/contact'
import { useTranslation } from '@/lib/i18n/LocaleContext'

type TeamMember = {
  name: string
  roleKey: 'team.role.matheus' | 'team.role.gabriel' | 'team.role.luiz'
}

const team: TeamMember[] = [
  { name: 'Matheus Moreira Fermino', roleKey: 'team.role.matheus' },
  { name: 'Gabriel Dias Ângelo', roleKey: 'team.role.gabriel' },
  { name: 'Luiz Felipe do Nascimento Gomes', roleKey: 'team.role.luiz' },
]

export function ContactSection() {
  const { t } = useTranslation()
  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-black border-t border-white/5">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 flex flex-col items-center">
          <SectionLabel color="#f97316" className="mb-5 sm:mb-6">{t('contact.label')}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 leading-[1.05] tracking-tight text-white">
            {t('contact.title.part1')} <span style={{ color: '#f97316' }}>{t('contact.title.highlight')}</span>
          </h2>
          <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
            {t('contact.body')}
          </p>
        </div>

        <div className="max-w-md mx-auto mb-10 sm:mb-12">
          <motion.a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label={`${t('contact.whatsappAria')} ${CONTACT.phoneDisplay}`}
            className="group relative border border-white/10 bg-white/[0.02] px-6 py-6 sm:px-8 sm:py-8 flex flex-col gap-5 hover:border-white/35 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <CornerBrackets color="rgba(255,255,255,0.6)" size={10} inset={-4} />
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 border border-white/15 bg-black/40 flex items-center justify-center text-white/80 group-hover:text-orange-400 group-hover:border-orange-400/40 transition-colors">
                <Phone aria-hidden="true" className="w-5 h-5" />
              </div>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </div>
            <div className="text-left">
              <p className="text-base font-semibold text-white leading-tight mb-1">{t('contact.studioName')}</p>
              <p className="text-xs text-white/90 leading-relaxed">{t('contact.studioTagline')}</p>
            </div>
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/10">
              <span className="text-sm text-white/80 truncate font-medium">+55 {CONTACT.phoneDisplay}</span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/35 group-hover:text-orange-400 transition-colors">
                {t('contact.callNow')}
              </span>
            </div>
          </motion.a>
        </div>

        <div className="max-w-5xl mx-auto" role="region" aria-labelledby="team-heading">
          <h3 id="team-heading" className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/90 mb-6 text-center">
            {t('contact.meetTeam')}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 list-none">
            {team.map((member, index) => (
              <motion.li
                key={member.name}
                className="group relative border border-white/10 bg-white/[0.02] px-6 py-6 flex flex-col gap-4"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <CornerBrackets color="rgba(255,255,255,0.6)" size={10} inset={-4} />
                <div className="w-10 h-10 border border-white/15 bg-black/40 flex items-center justify-center text-white/80">
                  <User aria-hidden="true" className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white leading-tight mb-1">{member.name}</p>
                  <p className="text-xs text-white/90 leading-relaxed">{t(member.roleKey)}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
