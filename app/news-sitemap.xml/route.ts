// app/news-sitemap.xml/route.ts

import { getAllPosts } from "@/lib/api";

export const revalidate = 1800; // Revalidar cada 30 minutos

/**
 * News Sitemap específico para Google News
 * Solo incluye noticias de las últimas 48 horas
 * Formato: Google News Sitemap Protocol
 */
export async function GET() {
  try {
    const posts = await getAllPosts();
    
    // Solo noticias de los últimos 2 días
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const recentNews = posts.filter((post) => {
      const postDate = new Date(post.date);
      const isRecent = postDate >= twoDaysAgo;
      const isNews = post.tipos?.nodes?.[0]?.slug === 'noticias';
      return isRecent && isNews;
    });

    // Si no hay noticias recientes, devolver sitemap vacío válido
    if (recentNews.length === 0) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- No hay noticias en las últimas 48 horas -->
</urlset>`,
        {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=1800, s-maxage=1800',
          },
        }
      );
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentNews
  .map((post) => {
    const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
    const typeSlug = post.tipos?.nodes?.[0]?.slug || 'noticias';
    const url = `https://gtaverso.com/juegos/${gameSlug}/${typeSlug}/${post.slug}`;
    
    // Normalizar fecha a ISO 8601
    const publicationDate = new Date(post.date).toISOString();
    
    // Escapar caracteres especiales XML
    const title = post.title
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .substring(0, 110); // Google News limita a 110 caracteres

    return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>GTAVerso</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${publicationDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
  })
  .join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    
    // Sitemap vacío pero válido en caso de error
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- Error al generar sitemap -->
</urlset>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }
    );
  }
}