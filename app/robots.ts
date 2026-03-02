// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-News',
        allow: '/juegos/*/noticias/',
        disallow: [],
      },
    ],
    sitemap: [
      'https://gtaverso.com/sitemap.xml',
      'https://gtaverso.com/news-sitemap.xml',
    ],
  };
}