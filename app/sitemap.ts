import type { MetadataRoute } from 'next'
import { PRODUCTOS } from '@/lib/productos-urban'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://urbanfilm.net'

  const routes = ['', '/nosotros', '/contacto', '/instaladores', '/usuarios', '/laminas']
  const productos = PRODUCTOS.map((p) => `/laminas/${p.slug}`)

  return [...routes, ...productos].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route.startsWith('/laminas/') ? 0.6 : 0.7,
  }))
}
