// app/sitemap.ts
import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'

type PostNode = {
  slug: string
  modified: string
  juegos?: { nodes?: Array<{ slug?: string }> }
}

const GAMES = ['gta-6', 'gta-5', 'gta-4', 'gta-san-andreas', 'gta-vice-city', 'gta-3']

async function getAllPosts(): Promise<PostNode[]> {
  const data = await fetchAPI(`
    query AllPostsForSitemap {
      posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          modified
          juegos { nodes { slug } }
        }
      }
    }
  `)
  return (data?.posts?.nodes ?? []) as PostNode[]
}

export const revalidate = 3600 // Revalidar cada hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.gtaverso.com'
  const posts = await getAllPosts()
  const now = new Date().toISOString()

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]

  // Páginas de juegos (hubs)
  const gamePages: MetadataRoute.Sitemap = GAMES.map(game => ({
    url: `${baseUrl}/juegos/${game}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Páginas de noticias por juego
  const gameNewsPages: MetadataRoute.Sitemap = GAMES.map(game => ({
    url: `${baseUrl}/juegos/${game}/noticias`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // Posts individuales
  const postPages: MetadataRoute.Sitemap = posts.map(post => {
    const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6'
    return {
      url: `${baseUrl}/juegos/${gameSlug}/noticias/${post.slug}`,
      lastModified: post.modified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  })

  // Páginas legales
  const legalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/aviso-legal`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-cookies`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terminos-de-uso`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
  ]

  return [
    ...staticPages,
    ...gamePages,
    ...gameNewsPages,
    ...postPages,
    ...legalPages,
  ]
}