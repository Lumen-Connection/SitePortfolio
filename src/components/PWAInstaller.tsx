'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, X, Share, Plus } from 'lucide-react'
import { CornerBrackets } from '@/components/ui/corner-brackets'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISS_KEY = 'lc-pwa-dismissed-at'
const DISMISS_TTL_MS = 1000 * 60 * 60 * 24 * 14 // 14 days

function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  const isIPad = /iPad/.test(ua) || (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1)
  return /iPhone|iPod/.test(ua) || isIPad
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  )
}

function recentlyDismissed(): boolean {
  if (typeof window === 'undefined') return false
  const raw = window.localStorage.getItem(DISMISS_KEY)
  if (!raw) return false
  const at = Number(raw)
  if (!Number.isFinite(at)) return false
  return Date.now() - at < DISMISS_TTL_MS
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showIOS, setShowIOS] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (isStandalone()) return

    if ('serviceWorker' in navigator) {
      const register = () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .catch(() => undefined)
      }
      if (document.readyState === 'complete') register()
      else window.addEventListener('load', register, { once: true })
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      if (!recentlyDismissed()) {
        window.setTimeout(() => setVisible(true), 12000)
      }
    }
    window.addEventListener('beforeinstallprompt', onBeforeInstall)

    const onInstalled = () => {
      setVisible(false)
      setDeferredPrompt(null)
    }
    window.addEventListener('appinstalled', onInstalled)

    if (isIOS() && !recentlyDismissed()) {
      window.setTimeout(() => {
        setShowIOS(true)
        setVisible(true)
      }, 15000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome !== 'accepted') {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    }
    setDeferredPrompt(null)
    setVisible(false)
  }, [deferredPrompt])

  const handleDismiss = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
    }
    setVisible(false)
  }, [])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="false"
        aria-labelledby="pwa-install-title"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[55] w-[calc(100%-2rem)] max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div
          data-a11y-filter="true"
          className="relative bg-[#0f0f0f] border border-orange-500/40 px-5 py-4 shadow-2xl shadow-black/60"
          style={{ boxShadow: '0 12px 40px -8px rgba(249,115,22,0.35)' }}
        >
          <CornerBrackets color="rgba(249,115,22,0.75)" size={12} inset={-5} />
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Dispensar prompt de instalação"
          >
            <X aria-hidden="true" className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3 pr-7">
            <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-[#0a0a0a] border border-orange-500/30">
              <img
                src="/icons/icon-192.png"
                alt=""
                aria-hidden="true"
                width={28}
                height={28}
                className="select-none"
                draggable={false}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p
                id="pwa-install-title"
                className="text-sm font-semibold text-white leading-tight mb-1"
              >
                Adicione à tela inicial
              </p>
              {showIOS ? (
                <p className="text-xs text-white/65 leading-relaxed">
                  Toque em{' '}
                  <span className="inline-flex items-center gap-1 align-middle text-white">
                    <Share aria-hidden="true" className="w-3.5 h-3.5" />
                    Compartilhar
                  </span>{' '}
                  e depois em{' '}
                  <span className="inline-flex items-center gap-1 align-middle text-white">
                    <Plus aria-hidden="true" className="w-3.5 h-3.5" />
                    Adicionar à Tela de Início
                  </span>
                  .
                </p>
              ) : (
                <p className="text-xs text-white/65 leading-relaxed">
                  Instale a Lumen Connection para acesso rápido, modo offline e
                  experiência como app nativo.
                </p>
              )}
            </div>
          </div>

          {!showIOS && (
            <div className="flex items-center gap-2 mt-4">
              <button
                type="button"
                onClick={handleInstall}
                disabled={!deferredPrompt}
                className="relative flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-semibold tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <Download aria-hidden="true" className="w-4 h-4" />
                Instalar
              </button>
              <button
                type="button"
                onClick={handleDismiss}
                className="relative px-4 py-2.5 border border-white/15 text-white/80 hover:text-white hover:border-white/35 text-xs font-medium tracking-[0.15em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <CornerBrackets />
                Agora não
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
