import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://dinepueblo.com'),
  title: { default: 'Dine Pueblo | Pueblo CO Dining Guide', template: '%s | Dine Pueblo' },
  description: "Pueblo, Colorado's premier dining directory. Discover Pueblo Sloppers, authentic Mexican food, craft breweries, Italian restaurants, and the best dining along the Arkansas River Riverwalk.",
  keywords: ['Pueblo CO restaurants', 'Pueblo Slopper', 'dining Pueblo Colorado', 'best restaurants Pueblo', 'Pueblo food guide', 'green chile restaurants'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dinepueblo.com',
    siteName: 'Dine Pueblo',
    title: 'Dine Pueblo | Pueblo CO Dining Guide',
    description: "Pueblo, Colorado's premier dining directory.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Dine Pueblo' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dine Pueblo | Pueblo CO Dining Guide',
    description: "Pueblo, Colorado's premier dining directory.",
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  verification: {
    google: '7jc12-lVG5f_urymoqzGqftRCjj_5iFngU0PSXzXdPI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="beforeInteractive"
            />
            <Script id="gtag-init" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
// GA4 + GSC v2 - 2026-03-23
