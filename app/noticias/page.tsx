// app/noticias/page.tsx
import type { Metadata } from 'next'
import { fetchAPI } from '@/lib/api'
import NoticiasClient from './NoticiasClient'

export const revalidate = 300;

type PostNode = {
  title?: string
  slug?: string
  excerpt?: string
  date?: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
  juegos?: { nodes?: Array<{ slug?: string; name?: string }> }
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string | null
}

async function getAllNews(): Promise<{ posts: PostNode[]; pageInfo: PageInfo }> {
  const data = await fetchAPI(`
    query TodasLasNoticias {
      posts(first: 12, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
          juegos { nodes { slug name } }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `)
  return {
    posts: (data?.posts?.nodes ?? []) as PostNode[],
    pageInfo: data?.posts?.pageInfo ?? { hasNextPage: false, endCursor: null }
  }
}

export const metadata: Metadata = {
  title: 'Todas las Noticias de GTA · GTAVerso',
  description: 'Últimas noticias, actualizaciones y rumores de GTA 6, GTA 5, Vice City, San Andreas, GTA 4 y GTA 3.',
  alternates: { canonical: 'https://www.gtaverso.com/noticias' },
  openGraph: {
    title: 'Todas las Noticias · GTAVerso',
    description: 'Últimas noticias de todos los juegos de la saga GTA.',
    url: 'https://www.gtaverso.com/noticias',
    type: 'website',
  },
}

export default async function GlobalNoticiasPage() {
  const { posts, pageInfo } = await getAllNews()
  return <NoticiasClient initialPosts={posts} initialPageInfo={pageInfo} />
}