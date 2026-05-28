'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Accessibility,
  X,
  Plus,
  Minus,
  Eye,
  Link as LinkIcon,
  Pause,
  Hand,
  RotateCcw,
  Contrast,
  Volume2,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n/LocaleContext'
import type { TranslationKey } from '@/lib/i18n/translations'

type Daltonism = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'
type ContrastTheme = 'none' | 'aquatic' | 'desert' | 'dusk' | 'nightsky'

type Prefs = {
  zoom: number
  contrastTheme: ContrastTheme
  daltonism: Daltonism
  underlineLinks: boolean
  pauseAnimations: boolean
  libras: boolean
  screenReader: boolean
}

const DEFAULTS: Prefs = {
  zoom: 1,
  contrastTheme: 'none',
  daltonism: 'none',
  underlineLinks: false,
  pauseAnimations: false,
  libras: false,
  screenReader: false,
}

const CONTRAST_THEMES: {
  id: ContrastTheme
  labelKey: TranslationKey
  descriptionKey: TranslationKey
  swatches: [string, string, string]
}[] = [
  { id: 'none', labelKey: 'a11y.theme.none.label', descriptionKey: 'a11y.theme.none.description', swatches: ['#0a0a0a', '#f5f5f5', '#f97316'] },
  { id: 'aquatic', labelKey: 'a11y.theme.aquatic.label', descriptionKey: 'a11y.theme.aquatic.description', swatches: ['#000000', '#ffffff', '#00b7ff'] },
  { id: 'desert', labelKey: 'a11y.theme.desert.label', descriptionKey: 'a11y.theme.desert.description', swatches: ['#fffaef', '#3b3b3b', '#00006e'] },
  { id: 'dusk', labelKey: 'a11y.theme.dusk.label', descriptionKey: 'a11y.theme.dusk.description', swatches: ['#2d3236', '#ffffff', '#ffaa44'] },
  { id: 'nightsky', labelKey: 'a11y.theme.nightsky.label', descriptionKey: 'a11y.theme.nightsky.description', swatches: ['#000000', '#ffffff', '#b5a8ff'] },
]

const STORAGE_KEY = 'lumen-a11y-prefs'
const BASE_FONT_PX = 15
const ZOOM_MIN = 0.85
const ZOOM_MAX = 1.5
const ZOOM_STEP = 0.1

function loadPrefs(): Prefs {
  if (typeof window === 'undefined') return DEFAULTS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULTS
    return { ...DEFAULTS, ...JSON.parse(raw) }
  } catch {
    return DEFAULTS
  }
}

function applyPrefs(prefs: Prefs) {
  if (typeof document === 'undefined') return
  const html = document.documentElement
  html.style.fontSize = `${(BASE_FONT_PX * prefs.zoom).toFixed(2)}px`

  html.classList.toggle('a11y-underline-links', prefs.underlineLinks)
  html.classList.toggle('a11y-pause-animations', prefs.pauseAnimations)
  html.classList.toggle('a11y-screen-reader', prefs.screenReader)

  html.classList.remove(
    'a11y-theme-aquatic',
    'a11y-theme-desert',
    'a11y-theme-dusk',
    'a11y-theme-nightsky',
  )
  if (prefs.contrastTheme !== 'none') {
    html.classList.add(`a11y-theme-${prefs.contrastTheme}`)
  }

  html.classList.remove('a11y-protanopia', 'a11y-deuteranopia', 'a11y-tritanopia', 'a11y-achromatopsia')
  if (prefs.daltonism !== 'none') {
    html.classList.add(`a11y-${prefs.daltonism}`)
  }
}

function ensureVLibras(enabled: boolean) {
  if (typeof window === 'undefined') return
  const SCRIPT_ID = 'vlibras-script'
  const WRAPPER_ID = 'vlibras-wrapper'

  if (!enabled) {
    const wrapper = document.getElementById(WRAPPER_ID)
    if (wrapper) wrapper.style.display = 'none'
    return
  }

  const existing = document.getElementById(WRAPPER_ID)
  if (existing) {
    existing.style.display = ''
    return
  }

  const wrapper = document.createElement('div')
  wrapper.id = WRAPPER_ID
  wrapper.setAttribute('vw', '')
  wrapper.className = 'enabled'
  wrapper.innerHTML = `
    <div vw-access-button class="active"></div>
    <div vw-plugin-wrapper>
      <div class="vw-plugin-top-wrapper"></div>
    </div>
  `
  document.body.appendChild(wrapper)

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js'
    script.async = true
    script.onload = () => {
      try {
        // @ts-expect-error VLibras is injected globally by the script
        new window.VLibras.Widget('https://vlibras.gov.br/app')
      } catch {
        /* no-op */
      }
    }
    document.body.appendChild(script)
  }
}

export function AccessibilityWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)
  const [hydrated, setHydrated] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const initial = loadPrefs()
    setPrefs(initial)
    applyPrefs(initial)
    ensureVLibras(initial.libras)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    applyPrefs(prefs)
    ensureVLibras(prefs.libras)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    } catch {
      /* no-op */
    }
  }, [prefs, hydrated])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const update = useCallback(<K extends keyof Prefs>(key: K, value: Prefs[K]) => {
    setPrefs((p) => ({ ...p, [key]: value }))
  }, [])

  const incZoom = () => update('zoom', Math.min(ZOOM_MAX, +(prefs.zoom + ZOOM_STEP).toFixed(2)))
  const decZoom = () => update('zoom', Math.max(ZOOM_MIN, +(prefs.zoom - ZOOM_STEP).toFixed(2)))
  const reset = () => setPrefs(DEFAULTS)

  return (
    <>
      <SvgFilters />

      <div className="fixed bottom-5 right-5 z-[70]">
        <button
          ref={buttonRef}
          type="button"
          data-a11y-filter="true"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
          aria-expanded={open}
          aria-controls="a11y-panel"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-black/50 ring-2 ring-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-orange-300/60"
        >
          <Accessibility aria-hidden="true" className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="a11y-backdrop"
              className="sm:hidden fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              id="a11y-panel"
              ref={panelRef}
              role="dialog"
              aria-label={t('a11y.panelLabel')}
              aria-modal="true"
              className="
                fixed z-[70] bg-[#0f0f0f] text-white shadow-2xl shadow-black/60
                inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto border-t border-white/15 rounded-t-2xl
                sm:inset-x-auto sm:bottom-24 sm:right-5 sm:w-[22rem] sm:max-h-[min(70vh,640px)] sm:rounded-none sm:border sm:border-white/15
              "
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="sm:hidden flex justify-center pt-2.5 pb-1" aria-hidden>
                <div className="w-10 h-1 rounded-full bg-white/25" />
              </div>
            <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <Accessibility aria-hidden="true" className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-semibold tracking-wide uppercase">{t('a11y.title')}</h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('a11y.close')}
                className="p-1.5 rounded hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <X aria-hidden="true" className="w-4 h-4" />
              </button>
            </header>

            <div className="p-4 space-y-5">
              <Group title={t('a11y.group.textSize')}>
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={decZoom}
                    disabled={prefs.zoom <= ZOOM_MIN + 0.001}
                    aria-label={t('a11y.decreaseText')}
                  >
                    <Minus aria-hidden="true" className="w-4 h-4" />
                  </IconButton>
                  <div className="flex-1 text-center text-sm font-medium tabular-nums">
                    {Math.round(prefs.zoom * 100)}%
                  </div>
                  <IconButton
                    onClick={incZoom}
                    disabled={prefs.zoom >= ZOOM_MAX - 0.001}
                    aria-label={t('a11y.increaseText')}
                  >
                    <Plus aria-hidden="true" className="w-4 h-4" />
                  </IconButton>
                </div>
              </Group>

              <Group title={t('a11y.group.contrast')}>
                <div role="radiogroup" aria-label={t('a11y.contrastSelectLabel')} className="grid grid-cols-1 gap-1.5">
                  {CONTRAST_THEMES.map((theme) => {
                    const active = prefs.contrastTheme === theme.id
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => update('contrastTheme', theme.id)}
                        className={`flex items-center gap-3 px-3 py-2 text-left border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                          active
                            ? 'border-orange-400 bg-orange-400/10'
                            : 'border-white/10 hover:bg-white/5 hover:border-white/25'
                        }`}
                      >
                        <span aria-hidden="true" className="flex shrink-0 border border-white/20 overflow-hidden">
                          {theme.swatches.map((c, i) => (
                            <span key={i} className="w-3 h-6 block" style={{ backgroundColor: c }} />
                          ))}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-xs font-semibold text-white leading-tight">{t(theme.labelKey)}</span>
                          <span className="block text-[10px] text-white/60 leading-tight mt-0.5">{t(theme.descriptionKey)}</span>
                        </span>
                        <Contrast aria-hidden="true" className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-orange-400' : 'text-white/40'}`} />
                      </button>
                    )
                  })}
                </div>
              </Group>

              <Group title={t('a11y.group.vision')}>
                <ToggleRow
                  icon={<LinkIcon aria-hidden="true" className="w-4 h-4" />}
                  label={t('a11y.underlineLinks')}
                  active={prefs.underlineLinks}
                  onChange={(v) => update('underlineLinks', v)}
                />
                <ToggleRow
                  icon={<Pause aria-hidden="true" className="w-4 h-4" />}
                  label={t('a11y.pauseAnimations')}
                  active={prefs.pauseAnimations}
                  onChange={(v) => update('pauseAnimations', v)}
                />
              </Group>

              <Group title={t('a11y.group.screenReader')}>
                <ToggleRow
                  icon={<Volume2 aria-hidden="true" className="w-4 h-4" />}
                  label={t('a11y.screenReaderMode')}
                  active={prefs.screenReader}
                  onChange={(v) => update('screenReader', v)}
                />
                {prefs.screenReader && (
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    {t('a11y.screenReaderHint')}
                  </p>
                )}
              </Group>

              <Group title={t('a11y.group.colorBlind')}>
                <div role="radiogroup" aria-label={t('a11y.colorBlindFilterLabel')} className="grid grid-cols-1 gap-1.5">
                  {([
                    { id: 'none', labelKey: 'a11y.colorBlind.none' },
                    { id: 'protanopia', labelKey: 'a11y.colorBlind.protanopia' },
                    { id: 'deuteranopia', labelKey: 'a11y.colorBlind.deuteranopia' },
                    { id: 'tritanopia', labelKey: 'a11y.colorBlind.tritanopia' },
                    { id: 'achromatopsia', labelKey: 'a11y.colorBlind.achromatopsia' },
                  ] as { id: Daltonism; labelKey: TranslationKey }[]).map((opt) => {
                    const active = prefs.daltonism === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => update('daltonism', opt.id)}
                        className={`flex items-center gap-2 px-3 py-2 text-left text-xs border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
                          active
                            ? 'border-orange-400 bg-orange-400/10 text-white'
                            : 'border-white/10 text-white/85 hover:bg-white/5 hover:border-white/25'
                        }`}
                      >
                        <Eye aria-hidden="true" className="w-3.5 h-3.5 shrink-0" />
                        {t(opt.labelKey)}
                      </button>
                    )
                  })}
                </div>
              </Group>

              <Group title={t('a11y.group.libras')}>
                <ToggleRow
                  icon={<Hand aria-hidden="true" className="w-4 h-4" />}
                  label={t('a11y.libras.toggle')}
                  active={prefs.libras}
                  onChange={(v) => update('libras', v)}
                />
                {prefs.libras && (
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    {t('a11y.libras.hint')}
                  </p>
                )}
              </Group>

              <button
                type="button"
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-white/15 text-xs font-medium tracking-wide uppercase hover:bg-white/5 hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-colors"
              >
                <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" />
                {t('a11y.restoreDefaults')}
              </button>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/50">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </section>
  )
}

function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="w-10 h-10 flex items-center justify-center border border-white/15 hover:bg-white/5 hover:border-white/35 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 transition-colors"
    >
      {children}
    </button>
  )
}

function ToggleRow({
  icon,
  label,
  active,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={active}
      onClick={() => onChange(!active)}
      className={`w-full flex items-center justify-between gap-3 px-3 py-2 border text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
        active
          ? 'border-orange-400 bg-orange-400/10'
          : 'border-white/10 hover:bg-white/5 hover:border-white/25'
      }`}
    >
      <span className="flex items-center gap-2 text-white/90">
        {icon}
        {label}
      </span>
      <span
        aria-hidden
        className={`relative w-8 h-4 rounded-full transition-colors ${active ? 'bg-orange-400' : 'bg-white/20'}`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${active ? 'left-4' : 'left-0.5'}`}
        />
      </span>
    </button>
  )
}

function SvgFilters() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="a11y-protanopia" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.567 0.433 0     0 0
                   0.558 0.442 0     0 0
                   0     0.242 0.758 0 0
                   0     0     0     1 0"
          />
        </filter>
        <filter id="a11y-deuteranopia" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.625 0.375 0   0 0
                   0.7   0.3   0   0 0
                   0     0.3   0.7 0 0
                   0     0     0   1 0"
          />
        </filter>
        <filter id="a11y-tritanopia" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0.95 0.05  0     0 0
                   0    0.433 0.567 0 0
                   0    0.475 0.525 0 0
                   0    0     0     1 0"
          />
        </filter>
      </defs>
    </svg>
  )
}
