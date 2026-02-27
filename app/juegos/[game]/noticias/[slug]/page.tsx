// app/juegos/[game]/noticias/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { fetchAPI } from '@/lib/api'
import { generateSEO, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import RelatedPosts from '@/components/RelatedPosts'
import ShareButtons from '@/components/ShareButtons'

// ─── Configuración ISR ────────────────────────────────────────────────
export const revalidate = 600;

// ─── Generación estática de rutas ─────────────────────────────────────
export async function generateStaticParams() {
  const data = await fetchAPI(`
    query RecentPosts {
      posts(first: 50, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          slug
          juegos { nodes { slug } }
        }
      }
    }
  `);

  const posts = data?.posts?.nodes || [];

  return posts.map((post: any) => ({
    game: post.juegos?.nodes?.[0]?.slug || 'gta-6',
    slug: post.slug,
  }));
}

// ─── Tipos ────────────────────────────────────────────────────────────
type PageProps = {
  params: Promise<{ game: string; slug: string }>
}

type SingleNoticia = {
  title: string
  content: string
  excerpt: string
  date: string
  modified: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
  author?: { node?: { name?: string } }
  tags?: { nodes?: Array<{ name?: string }> }
}

type RelatedPost = {
  title: string
  slug: string
  excerpt?: string
  date: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
}

const GAME_COLORS: Record<string, string> = {
  'gta-6': '#FF00FF',
  'gta-5': '#569446',
  'gta-4': '#FBBF24',
  'gta-online': '#FFA500',
  'gta-san-andreas': '#FFA500',
  'gta-vice-city': '#00E5FF',
  'gta-3': '#E5E7EB',
}

const GAME_LABELS: Record<string, string> = {
  'gta-6': 'GTA 6',
  'gta-5': 'GTA 5',
  'gta-4': 'GTA 4',
  'gta-san-andreas': 'GTA San Andreas',
  'gta-vice-city': 'GTA Vice City',
  'gta-3': 'GTA 3',
}

// ─── Función auxiliar ─────────────────────────────────────────────────
function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]+>/g, '').trim()
}

// ─── Query post individual ────────────────────────────────────────────
async function getNoticiaBySlug(slug: string): Promise<SingleNoticia | null> {
  const data = await fetchAPI(
    `
    query NoticiaBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        content
        excerpt
        date
        modified
        featuredImage { node { sourceUrl altText } }
        author { node { name } }
        tags { nodes { name } }
      }
    }
  `,
    { id: slug }
  )

  return data?.post || null
}

// ─── Query posts relacionados ─────────────────────────────────────────
async function getRelatedPosts(gameSlug: string, currentSlug: string): Promise<RelatedPost[]> {
  const data = await fetchAPI(
    `
    query RelatedPosts($gameSlug: String!) {
      posts(first: 4, where: { categoryName: $gameSlug, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
        }
      }
    }
  `,
    { gameSlug }
  )

  const allPosts = (data?.posts?.nodes || []) as RelatedPost[]
  
  // Excluir el post actual y limitar a 3
  return allPosts.filter(post => post.slug !== currentSlug).slice(0, 3)
}

// ─── Metadata dinámica mejorada ───────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game, slug } = await params
  const noticia = await getNoticiaBySlug(slug)

  if (!noticia) {
    return generateSEO({ 
      title: 'Noticia no encontrada', 
      noindex: true 
    })
  }

  const plainExcerpt = stripHtml(noticia.excerpt).slice(0, 155)
  const imageUrl = noticia.featuredImage?.node?.sourceUrl || '/og-default.webp'
  const postUrl = `/juegos/${game}/noticias/${slug}`
  const tags = noticia.tags?.nodes?.map(t => t.name || '') || []

  return generateSEO({
    title: noticia.title,
    description: plainExcerpt,
    image: imageUrl,
    url: postUrl,
    type: 'article',
    publishedTime: noticia.date,
    modifiedTime: noticia.modified,
    author: noticia.author?.node?.name || 'Equipo GTAVerso',
    tags,
  })
}

// ─── Componente principal ─────────────────────────────────────────────
export default async function NoticiaDetailPage({ params }: PageProps) {
  const { game, slug } = await params
  const noticia = await getNoticiaBySlug(slug)

  if (!noticia) {
    notFound()
  }

  // Obtener posts relacionados
  const relatedPosts = await getRelatedPosts(game, slug)

  const gameName = GAME_LABELS[game] || game.replace(/-/g, ' ').toUpperCase()
  const gameColor = GAME_COLORS[game] || '#00FF41'
  const imageUrl = noticia.featuredImage?.node?.sourceUrl
  const imageAlt = noticia.featuredImage?.node?.altText || `Imagen destacada de ${noticia.title}`
  const formattedDate = new Date(noticia.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // URL completa para compartir
  const fullUrl = `https://www.gtaverso.com/juegos/${game}/noticias/${slug}`

  // Structured Data mejorados
  const articleSchema = generateArticleSchema({
    title: noticia.title,
    description: stripHtml(noticia.excerpt).slice(0, 155),
    image: imageUrl || '/og-default.webp',
    url: fullUrl,
    publishedTime: noticia.date,
    modifiedTime: noticia.modified,
    author: noticia.author?.node?.name || 'Equipo GTAVerso',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: 'https://www.gtaverso.com' },
    { name: gameName, url: `https://www.gtaverso.com/juegos/${game}` },
    { name: 'Noticias', url: `https://www.gtaverso.com/juegos/${game}/noticias` },
    { name: noticia.title, url: fullUrl },
  ])

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 lg:py-24 min-h-screen bg-[#050508] text-white">
      {/* Structured Data - NewsArticle */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} 
      />
      
      {/* Structured Data - Breadcrumbs */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: gameName, href: `/juegos/${game}` },
          { label: 'Noticias', href: `/juegos/${game}/noticias` },
          { label: noticia.title },
        ]}
        className="mb-10"
      />

      <article>
        <header className="mb-12">
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl mb-6">
            {noticia.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 border-b border-white/10 pb-6">
            <time dateTime={noticia.date} className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold" style={{ color: gameColor }}>
              {noticia.author?.node?.name || 'Redacción GTAVerso'}
            </span>
          </div>
        </header>

        {imageUrl && (
          <figure className="relative aspect-video w-full overflow-hidden rounded-2xl mb-14 border border-white/10 bg-[#0A0A0E] shadow-2xl">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </figure>
        )}

        <div 
          className="prose prose-invert prose-lg md:prose-xl max-w-none 
          prose-a:text-[#00FF41] hover:prose-a:text-white prose-a:transition-colors
          prose-img:rounded-xl prose-img:border prose-img:border-white/10
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-strong:text-white
          prose-ul:text-gray-300 prose-li:marker:text-[#00FF41]"
          dangerouslySetInnerHTML={{ __html: noticia.content }}
        />

        {/* Botones de compartir */}
        <ShareButtons
          url={fullUrl}
          title={noticia.title}
          description={stripHtml(noticia.excerpt)}
        />
      </article>

      {/* Posts relacionados */}
      <RelatedPosts
        posts={relatedPosts}
        gameSlug={game}
        gameColor={gameColor}
        gameName={gameName}
      />
    </main>
  )
}