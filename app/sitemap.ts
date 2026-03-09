// app/sitemap.ts
import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'

type PostNode = {
  slug: string
  modified: string
  juegos?: { nodes?: Array<{ slug?: string }> }
}

type CharacterNode = {
  slug: string
  modified: string
  juegos?: { nodes?: Array<{ slug?: string }> }
}

const GAMES = ['gta-6', 'gta-5', 'gta-4', 'gta-san-andreas', 'gta-vice-city', 'gta-3']

/**
 * Normaliza cualquier fecha a formato ISO 8601 válido
 * Soluciona errores "Fecha no válida" en Google Search Console
 */
function normalizeDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateString}, using current date`)
      return new Date().toISOString()
    }
    
    return date.toISOString()
  } catch (error) {
    console.error(`Error parsing date: ${dateString}`, error)
    return new Date().toISOString()
  }
}

async function getAllPosts(): Promise<PostNode[]> {
  try {
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
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
    return []
  }
}

async function getAllCharacters(): Promise<CharacterNode[]> {
  try {
    const data = await fetchAPI(`
      query AllCharactersForSitemap {
        personajes(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            slug
            modified
            juegos { nodes { slug } }
          }
        }
      }
    `)

    return (data?.personajes?.nodes ?? []) as CharacterNode[]
  } catch (error) {
    console.error('Error fetching characters for sitemap:', error)
    return []
  }
}

export const revalidate = 3600 // Revalidar cada hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gtaverso.com'
  const now = new Date().toISOString()
  
  const posts = await getAllPosts()
  const characters = await getAllCharacters()

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
      url: `${baseUrl}/juegos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/buscar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]

  const gamePages: MetadataRoute.Sitemap = GAMES.map((game) => ({
    url: `${baseUrl}/juegos/${game}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const gameNewsPages: MetadataRoute.Sitemap = GAMES.map((game) => ({
    url: `${baseUrl}/juegos/${game}/noticias`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const gameCharacterPages: MetadataRoute.Sitemap = GAMES.map((game) => ({
    url: `${baseUrl}/juegos/${game}/personajes`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6'

    return {
      url: `${baseUrl}/juegos/${gameSlug}/noticias/${post.slug}`,
      lastModified: normalizeDate(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  })

  const characterPages: MetadataRoute.Sitemap = characters
    .filter((character) => character.slug)
    .map((character) => {
      const gameSlug = character.juegos?.nodes?.[0]?.slug || 'gta-6'

      return {
        url: `${baseUrl}/juegos/${gameSlug}/personajes/${character.slug}`,
        lastModified: normalizeDate(character.modified),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }
    })

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
    ...gameCharacterPages,
    ...postPages,
    ...characterPages,
    ...legalPages,
  ]
}