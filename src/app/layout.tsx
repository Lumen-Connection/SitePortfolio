import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PWAInstaller } from "@/components/PWAInstaller";
import { heroProjects } from "./portfolioData";
import { SITE } from "@/lib/site";
import { CONTACT } from "@/lib/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.shortDescription}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  generator: "Next.js",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/LC - Logos/Lumen Connection Alternative orange logo.png", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/icon-192.png",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.shortDescription}`,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.shortDescription}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "o92WqKJ0J2PgDdBqHcELb6dObAIjgzRJMFrf-GcIufs",
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  image: `${SITE.url}${SITE.ogImage}`,
  logo: `${SITE.url}/favicon.svg`,
  email: CONTACT.email,
  telephone: `+${CONTACT.phoneE164}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT.email,
    telephone: `+${CONTACT.phoneE164}`,
    areaServed: "BR",
    availableLanguage: ["Portuguese"],
  },
  sameAs: [
    'https://www.instagram.com/lumenconnection',
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  inLanguage: "pt-BR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const firstHeroImage = heroProjects[0]?.image;
  const otherHeroImages = heroProjects
    .slice(1)
    .map((p) => p.image)
    .filter((src): src is string => !!src && src !== "/" && src !== firstHeroImage);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {firstHeroImage && (
          <link
            rel="preload"
            as="image"
            href={firstHeroImage}
            fetchPriority="high"
          />
        )}
        <link
          rel="preload"
          as="image"
          href="/LC - Logos/Lumen Connection white fonte.webp"
          fetchPriority="high"
        />
        {otherHeroImages.map((src) => (
          <link key={src} rel="prefetch" as="image" href={src} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-black focus:font-semibold focus:rounded focus:shadow-lg"
        >
          Pular para o conteúdo principal
        </a>
        {children}
        <Toaster />
        <PWAInstaller />
      </body>
    </html>
  );
}
