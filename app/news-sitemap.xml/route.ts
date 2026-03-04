// app/news-sitemap.xml/route.ts

import { getAllPosts } from "@/lib/api";

export const revalidate = 1800; // Revalidar cada 30 minutos

/**
 * News Sitemap específico para Google News 2026
 * Incluye noticias de los últimos 2 días
 * Formato: Google News Sitemap Protocol
 */

type Post = {
  slug: string;
  title: string;
  date: string;
  juegos?: {
    nodes?: Array<{
      slug?: string;
    }>;
  };
  tipos?: {
    nodes?: Array<{
      slug?: string;
    }>;
  };
};

export async function GET() {
  try {
    const posts = await getAllPosts();
    
    if (!posts || posts.length === 0) {
      console.error('[news-sitemap] No posts found from getAllPosts()');
      return new Response('No posts available', { status: 404 });
    }
    
    // ✅ Google News prefiere últimos 2 días (no 30)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const recentNews = posts.filter((post: Post) => {
      try {
        const postDate = new Date(post.date);
        const tipoSlug = post.tipos?.nodes?.[0]?.slug;
        
        const isRecent = postDate >= twoDaysAgo;
        const isNews = tipoSlug === 'noticias';
        
        if (isNews && !isRecent) {
          console.log(`[news-sitemap] Post "${post.slug}" is news but too old (${post.date})`);
        }
        
        return isRecent && isNews;
      } catch (error) {
        console.error('[news-sitemap] Error filtering post:', post.slug, error);
        return false;
      }
    });

    console.log(`[news-sitemap] Found ${recentNews.length} recent news from ${posts.length} total posts (last 2 days)`);

    // ✅ Si no hay noticias recientes, devolver 404
    if (recentNews.length === 0) {
      console.warn('[news-sitemap] No recent news found - returning 404');
      return new Response(
        'No recent news articles found in the last 2 days',
        { status: 404 }
      );
    }

    // Generar URLs
    const urlEntries = recentNews
      .map((post: Post): string => {
        try {
          const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
          const typeSlug = post.tipos?.nodes?.[0]?.slug || 'noticias';
          const url = `https://gtaverso.com/juegos/${gameSlug}/${typeSlug}/${post.slug}`;
          
          const publicationDate = new Date(post.date).toISOString();
          
          // Escapar caracteres especiales XML
          const title = post.title
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;')
            .substring(0, 110);

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
        } catch (error) {
          console.error('[news-sitemap] Error processing post:', post.slug, error);
          return '';
        }
      })
      .filter((entry: string): entry is string => entry !== '') // ✅ Type guard explícito
      .join('\n');

    // ✅ Verificación final
    if (!urlEntries || urlEntries.trim() === '') {
      console.error('[news-sitemap] No valid URL entries generated');
      return new Response('No valid news entries', { status: 404 });
    }

    // Generar sitemap completo
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

    console.log(`[news-sitemap] Generated sitemap with ${recentNews.length} entries`);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
    
  } catch (error) {
    console.error('[news-sitemap] Critical error:', error);
    
    return new Response(
      `Error generating news sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { status: 500 }
    );
  }
}