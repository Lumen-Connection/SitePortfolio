import { CornerBrackets } from '@/components/ui/corner-brackets'
import { CONTACT, buildMailtoUrl, buildWhatsAppUrl } from '@/lib/contact'

export function Footer() {
  return (
    <footer role="contentinfo" className="py-10 sm:py-12 md:py-14 border-t border-white/10 bg-black">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center mb-5">
              <img
                src="/LC - Logos/Lumen Connection white logo.png"
                alt="Lumen Connection"
                className="h-9 sm:h-10 w-auto select-none"
                draggable={false}
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-sm">
              Estúdio digital que une engenharia de software e produção visual de alta fidelidade.
            </p>
          </div>
          <div className="hidden md:block" />
          <div>
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/90 mb-5">
              Entre em contato
            </p>
            <ul className="space-y-3 text-white/90 text-sm">
              <li className="break-all">
                <a
                  href={buildMailtoUrl()}
                  aria-label={`Enviar e-mail para ${CONTACT.email}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                Lumen Connection —{' '}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Falar no WhatsApp pelo número ${CONTACT.phoneDisplay}`}
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="text-white/90 pt-1">{CONTACT.location}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 md:mt-14 pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/90 text-xs tracking-wider">© 2026 Lumen Connection. Todos os direitos reservados.</p>
          <a
            href="#contact"
            className="relative inline-flex items-center px-4 py-2 text-[10px] font-medium tracking-[0.25em] uppercase text-white/70 border border-white/10 hover:border-white/30 hover:text-white transition-colors"
          >
            <CornerBrackets color="rgba(255,255,255,0.4)" />
            Luiz Felipe · Matheus Moreira
          </a>
        </div>
      </div>
    </footer>
  )
}