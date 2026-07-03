import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://urbanfilm.net'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/login', '/dashboard', '/blog-admin', '/estadisticas', '/productos'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
