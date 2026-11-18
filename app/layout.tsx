import type { Metadata } from 'next'
import { Jura, Inter } from 'next/font/google'
import './globals.css'

// Dos familias, cada una con los pesos que realmente se usan (antes Inter solo traía 400
// y las negritas eran sintéticas; además Montserrat llegaba por un @import aparte).
const jura = Jura({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-jura',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = 'https://urbanfilm.net'
const defaultTitle = 'Urban Film - Láminas para Vehículos'
const defaultDescription = 'Especialistas en láminas de polarizado para vehículos. Calidad y protección para tu auto.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: '%s | Urban Film',
  },
  description: defaultDescription,
  icons: {
    icon: '/img/logo-i.svg',
    shortcut: '/img/logo-i.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: siteUrl,
    siteName: 'Urban Film',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Urban Film - Láminas para Vehículos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/img/og-image.jpg'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Urban Film',
  url: siteUrl,
  logo: `${siteUrl}/img/logo-f.png`,
  description: defaultDescription,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${jura.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
