'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Bot, Shield, Clock } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { buildWhatsAppUrl } from '@/lib/contact'
import { sanitizeUrl } from '@/lib/url'

const CTA_MESSAGE = 'Olá, gostaria de saber mais sobre o Lumen AI'

const HIGHLIGHTS = [
  { icon: Bot, title: 'Conversação Natural', body: 'IA que entende intenção e contexto, com agendamentos sem menus rígidos.' },
  { icon: Shield, title: 'Privacidade Total', body: 'Modelos executados na infraestrutura da empresa, sem nuvem terceira.' },
  { icon: Clock, title: 'Disponível 24/7', body: 'Respostas precisas a qualquer hora, reduzindo abandono de atendimento.' },
]

export function LumenAIModal({ onClose, activeColor = '#f97316' }: { onClose: () => void; activeColor?: string }) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

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
              aria-label="Fechar Lumen AI"
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
                  IA · WhatsApp
                </span>
                <h2 id="lumen-ai-modal-title" className="mt-4 text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight">
                  Atendimento inteligente,{' '}
                  <span style={{ color: activeColor }}>privado</span> e 24/7
                </h2>
              </div>

              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
                O <span className="text-white font-medium">Lumen AI</span> integra uma inteligência artificial
                local diretamente ao WhatsApp da sua empresa. O bot entende o que o cliente fala de forma
                conversacional, como{' '}
                <span className="text-white/90 italic">&quot;tem vaga na próxima semana para um corte?&quot;</span>,
                interpreta o pedido, verifica a disponibilidade e confirma o horário com naturalidade.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
                {HIGHLIGHTS.map((item) => {
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
                Ideal para salões, clínicas, consultórios, academias, oficinas e qualquer negócio que
                transforme conversas em agendamentos. Toda a infraestrutura roda em servidor próprio com
                modelos de IA de 4B a 128B parâmetros, integrados via n8n e WAHA.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={sanitizeUrl(buildWhatsAppUrl(CTA_MESSAGE))}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-black text-sm font-semibold tracking-wide transition-colors"
                  style={{ backgroundColor: activeColor }}
                  whileHover={{ filter: 'brightness(1.1)' }}
                  onClick={onClose}
                >
                  <MessageCircle aria-hidden="true" size={16} />
                  Quero conhecer o Lumen AI
                </motion.a>
                <button
                  type="button"
                  onClick={onClose}
                  className="relative inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/15 text-white/90 text-sm font-medium tracking-wide hover:border-white/35 hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2"
                  style={{ ['--tw-ring-color' as string]: activeColor }}
                >
                  <CornerBrackets />
                  <X aria-hidden="true" size={14} />
                  Fechar
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
