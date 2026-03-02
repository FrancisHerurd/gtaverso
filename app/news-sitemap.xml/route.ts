// app/news-sitemap.xml/route.ts

import { getAllPosts } from "@/lib/api";

export const revalidate = 1800; // Revalidar cada 30 minutos

/**
 * News Sitemap específico para Google News 2026
 * Incluye noticias de los últimos 30 días
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
      console.log('No posts found from getAllPosts()');
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- No se encontraron posts en WordPress -->
</urlset>`,
        {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=1800, s-maxage=1800',
          },
        }
      );
    }
    
    // Noticias de los últimos 30 días (ampliado para testing)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentNews = posts.filter((post: Post) => {
      try {
        const postDate = new Date(post.date);
        const isRecent = postDate >= thirtyDaysAgo;
        const tipoSlug = post.tipos?.nodes?.[0]?.slug;
        const isNews = tipoSlug === 'noticias';
        
        // Log para debugging
        if (!isNews) {
          console.log(`Post "${post.slug}" skipped - tipo: ${tipoSlug}`);
        }
        
        return isRecent && isNews;
      } catch (error) {
        console.error('Error filtering post:', post.slug, error);
        return false;
      }
    });

    console.log(`Found ${recentNews.length} recent news from ${posts.length} total posts`);

    // Si no hay noticias recientes, devolver XML válido con comentario
    if (recentNews.length === 0) {
      return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <!-- No hay noticias en los últimos 30 días. Total posts: ${posts.length} -->
</urlset>`,
        {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=1800, s-maxage=1800',
          },
        }
      );
    }

    // Generar URLs
    const urlEntries: string = recentNews
      .map((post: Post): string => {
        try {
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
          console.error('Error processing post:', post.slug, error);
          return '';
        }
      })
      .filter((entry: string) => entry !== '')
      .join('\n');

    // Generar sitemap completo
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
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
  <!-- Error al generar sitemap: ${error instanceof Error ? error.message : 'Unknown error'} -->
</urlset>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
        },
      }
    );
  }
}