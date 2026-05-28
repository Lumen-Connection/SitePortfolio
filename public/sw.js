// Lumen Connection - Service Worker
// Strategy: stale-while-revalidate for static assets, network-first for navigation,
// cache-first for images/fonts. Offline fallback for navigation.

const VERSION = 'v2'
const STATIC_CACHE = `lc-static-${VERSION}`
const RUNTIME_CACHE = `lc-runtime-${VERSION}`
const IMAGE_CACHE = `lc-images-${VERSION}`

const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/LC - Logos/Lumen Connection white logo.webp',
  '/LC - Logos/Lumen Connection white fonte.webp',
  '/images/hero/lumen-bg.webp',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE].includes(k))
          .map((k) => caches.delete(k)),
      ),
    ).then(() => self.clients.claim()),
  )
})

const isNavigation = (req) => req.mode === 'navigate'
const isImage = (req) => req.destination === 'image'
const isStaticAsset = (req) =>
  ['style', 'script', 'font', 'manifest'].includes(req.destination)

async function networkFirstNavigation(req) {
  try {
    const fresh = await fetch(req)
    const cache = await caches.open(RUNTIME_CACHE)
    cache.put(req, fresh.clone())
    return fresh
  } catch {
    const cache = await caches.open(RUNTIME_CACHE)
    const cached = await cache.match(req)
    if (cached) return cached
    const fallback = await caches.match('/')
    if (fallback) return fallback
    return new Response('Offline', { status: 503, statusText: 'Offline' })
  }
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  if (cached) {
    // refresh in background
    fetch(req)
      .then((res) => {
        if (res && res.status === 200) cache.put(req, res.clone())
      })
      .catch(() => undefined)
    return cached
  }
  const res = await fetch(req)
  if (res && res.status === 200) cache.put(req, res.clone())
  return res
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  const networkPromise = fetch(req)
    .then((res) => {
      if (res && res.status === 200) cache.put(req, res.clone())
      return res
    })
    .catch(() => cached)
  return cached || networkPromise
}

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  if (isNavigation(req)) {
    event.respondWith(networkFirstNavigation(req))
    return
  }

  if (isImage(req)) {
    event.respondWith(cacheFirst(req, IMAGE_CACHE))
    return
  }

  if (isStaticAsset(req) || url.pathname.startsWith('/_next/static/')) {
    event.respondWith(staleWhileRevalidate(req, STATIC_CACHE))
    return
  }
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})
