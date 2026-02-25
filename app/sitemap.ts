// app/sitemap.ts
import { MetadataRoute } from 'next';
import { fetchAPI } from '@/lib/api';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gtaverso.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/juegos/gta-6`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/juegos/gta-5`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/juegos/gta-4`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/juegos/gta-san-andreas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/juegos/gta-vice-city`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/juegos/gta-3`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/juegos/gta-6/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/juegos/gta-5/noticias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/juegos/gta-4/noticias`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-de-uso`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const data = await fetchAPI(`
      query AllPostsForSitemap {
        posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            slug
            modified
            juegos {
              nodes {
                slug
              }
            }
            categories {
              nodes {
                slug
              }
            }
          }
        }
      }
    `);

    const posts = data?.posts?.nodes || [];

    dynamicRoutes = posts.map((post: any) => {
      const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
      const typeSlug = post.categories?.nodes?.find((c: any) => c.slug !== 'sin-categoria')?.slug || 'noticias';

      return {
        url: `${baseUrl}/juegos/${gameSlug}/${typeSlug}/${post.slug}`,
        lastModified: post.modified ? new Date(post.modified) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('❌ Error generando sitemap dinámico desde WordPress:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}