// app/news-sitemap.xml/route.ts

import { getAllPosts } from '@/lib/api';

export const revalidate = 1800;

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

function normalizeNewsDate(dateString: string): string | null {
  try {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      console.warn(`[news-sitemap] Invalid date: ${dateString}`);
      return null;
    }

    return date.toISOString();
  } catch (error) {
    console.error('[news-sitemap] Error parsing date:', dateString, error);
    return null;
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      console.warn('[news-sitemap] No posts found from getAllPosts()');

      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;

      return new Response(emptySitemap, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
        },
      });
    }

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentNews = posts.filter((post: Post) => {
      const tipoSlug = post.tipos?.nodes?.[0]?.slug;
      const normalizedDate = normalizeNewsDate(post.date);

      if (!normalizedDate) return false;

      const postDate = new Date(normalizedDate);
      const isRecent = postDate >= twoDaysAgo;
      const isNews = tipoSlug === 'noticias';

      return isRecent && isNews;
    });

    const urlEntries = recentNews
      .map((post: Post) => {
        const normalizedDate = normalizeNewsDate(post.date);

        if (!normalizedDate) return '';

        const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
        const url = `https://gtaverso.com/juegos/${gameSlug}/noticias/${post.slug}`;
        const title = escapeXml(post.title).substring(0, 110);

        return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>GTAVerso</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${normalizedDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
      })
      .filter((entry: string): entry is string => entry !== '')
      .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('[news-sitemap] Critical error:', error);

    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;

    return new Response(emptySitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  }
}