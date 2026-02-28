// app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',  // ❌ Bloquea TODA la web
    },
    // NO incluir sitemap cuando está en noindex
  };
}