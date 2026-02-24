// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Cambia esto por tu dominio real cuando lo tengas
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gtaverso.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Evita que Google indexe rutas privadas o la API
      disallow: ['/api/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}