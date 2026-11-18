import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

// Dos familias alojadas en el proyecto (app/fonts, subconjunto latin, fuentes variables):
// el build no depende de Google Fonts. Antes se descargaban en cada build y, cuando Google
// devolvía una respuesta inesperada, el build del VPS fallaba. Un solo archivo por familia
// cubre todos los pesos, así que las negritas dejan de ser sintéticas.
const jura = localFont({
  src: './fonts/jura-latin.woff2',
  weight: '300 700',
  style: 'normal',
  variable: '--font-jura',
  display: 'swap',
})

const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '100 900',
  style: 'normal',
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
