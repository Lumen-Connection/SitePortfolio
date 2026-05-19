import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/app/portfolioData'
import { CornerBrackets } from '@/components/ui/corner-brackets'
import { LumenAIModal } from '@/components/LumenAIModal'

export function Header({ activeColor = '#f97316' }: { activeColor?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLumenAIModalOpen, setIsLumenAIModalOpen] = useState(false)
  const openLumenAIModal = () => {
    setIsLumenAIModalOpen(true)
    setIsMenuOpen(false)
  }

  const lumenStyle = {
    color: activeColor,
    borderColor: `${activeColor}66`,
    backgroundColor: `${activeColor}0d`,
    boxShadow: `0 0 24px -8px ${activeColor}66`,
    transition: 'color 600ms ease, border-color 600ms ease, background-color 600ms ease, box-shadow 600ms ease',
  } as const

  const { scrollY } = useScroll()
  const headerBackground = useTransform(scrollY, [0, 100], ['transparent', 'rgba(10, 10, 10, 0.95)'])
  const headerOpacity = useTransform(scrollY, [0, 700], [1, 0])
  const headerY = useTransform(scrollY, [0, 700], [0, -120])

  return (
    <motion.header role="banner" className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: headerBackground, opacity: headerOpacity, y: headerY }}>
      <div className="container mx-auto px-5 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            aria-label="Lumen Connection — ir para o início"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/LC - Logos/Lumen Connection white logo.png"
              alt="Lumen Connection"
              className="h-6 sm:h-7 w-auto select-none"
              draggable={false}
            />
          </motion.a>

          <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-7">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              type="button"
              onClick={openLumenAIModal}
              className="group relative inline-flex items-center px-3.5 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase border focus-visible:outline-none focus-visible:ring-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * navItems.length }}
              whileHover={{
                backgroundColor: `${activeColor}1a`,
                borderColor: `${activeColor}b3`,
              }}
              whileTap={{ scale: 0.97 }}
              aria-haspopup="dialog"
              style={{ ...lumenStyle, ['--tw-ring-color' as string]: activeColor }}
            >
              <CornerBrackets color={`${activeColor}bf`} />
              Lumen AI
            </motion.button>
          </nav>

          <motion.a
            href="#contact"
            className="relative hidden md:inline-flex items-center px-5 py-2.5 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15 hover:border-white/40 hover:bg-white/5 transition-colors"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CornerBrackets />
            Fale Conosco
          </motion.a>

          <button
            type="button"
            className="md:hidden p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X aria-hidden="true" className="w-5 h-5" /> : <Menu aria-hidden="true" className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav"
            className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-t border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav aria-label="Navegação móvel" className="container mx-auto px-6 py-6 flex flex-col gap-5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium tracking-[0.15em] uppercase text-white/90 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={openLumenAIModal}
                className="relative inline-flex items-center justify-center mt-1 px-5 py-3 text-xs font-semibold tracking-[0.15em] uppercase border focus-visible:outline-none focus-visible:ring-2"
                aria-haspopup="dialog"
                style={{ ...lumenStyle, ['--tw-ring-color' as string]: activeColor }}
              >
                <CornerBrackets color={`${activeColor}bf`} />
                Lumen AI
              </button>
              <a
                href="#contact"
                className="relative mt-3 inline-flex items-center justify-center px-5 py-3 text-xs font-medium tracking-[0.15em] uppercase text-white/90 border border-white/15"
                onClick={() => setIsMenuOpen(false)}
              >
                <CornerBrackets />
                Fale Conosco
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {isLumenAIModalOpen && <LumenAIModal onClose={() => setIsLumenAIModalOpen(false)} activeColor={activeColor} />}
    </motion.header>
  )
}