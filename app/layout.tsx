import type { Metadata } from 'next'
import { Jura, Inter } from 'next/font/google'
import './globals.css'

const jura = Jura({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-title',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Urban Film - Láminas para Vehículos',
    template: '%s | Urban Film',
  },
  description: 'Especialistas en láminas de polarizado para vehículos. Calidad y protección para tu auto.',
  icons: {
    icon: '/img/logo-i.svg',
    shortcut: '/img/logo-i.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${jura.className} ${inter.className}`}
      style={{
        '--font-title': jura.style.fontFamily,
        '--font-sans': inter.style.fontFamily,
      } as React.CSSProperties}
    >
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
