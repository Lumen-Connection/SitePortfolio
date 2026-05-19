import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.shortDescription}`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: '/?utm_source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    lang: 'pt-BR',
    dir: 'ltr',
    categories: ['business', 'productivity', 'design'],
    prefer_related_applications: false,
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Portfólio',
        short_name: 'Portfólio',
        description: 'Veja nossos projetos',
        url: '/?utm_source=pwa#projects',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Contato',
        short_name: 'Contato',
        description: 'Fale com a Lumen Connection',
        url: '/?utm_source=pwa#contact',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],
  }
}
