// app/juegos/[game]/noticias/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAPI } from '@/lib/api'

// ─── Tipos ───────────────────────────────────────────────────────────────────
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
}

const GAME_COLORS: Record<string, string> = {
  'gta-6': '#00FF41',
  'gta-5': '#FF00FF',
  'gta-online': '#FFA500',
}

// ─── Query ───────────────────────────────────────────────────────────────────
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
      }
    }
  `,
    { id: slug } 
  )

  return data?.post || null
}

// ─── Metadata dinámica ───────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game, slug } = await params
  const noticia = await getNoticiaBySlug(slug)

  if (!noticia) return {}

  const plainExcerpt = noticia.excerpt?.replace(/<[^>]+>/g, '').trim() || ''
  const imageUrl = noticia.featuredImage?.node?.sourceUrl || ''
  const canonical = `https://www.gtaverso.com/juegos/${game}/noticias/${slug}`

  return {
    title: `${noticia.title} · GTAVerso`,
    description: plainExcerpt,
    alternates: { canonical },
    openGraph: {
      title: noticia.title,
      description: plainExcerpt,
      url: canonical,
      type: 'article',
      publishedTime: noticia.date,
      modifiedTime: noticia.modified,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.title,
      description: plainExcerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default async function NoticiaDetailPage({ params }: PageProps) {
  const { game, slug } = await params
  const noticia = await getNoticiaBySlug(slug)

  if (!noticia) {
    notFound()
  }

  const gameName = game.replace(/-/g, ' ').toUpperCase()
  const gameColor = GAME_COLORS[game] || '#00FF41'
  const imageUrl = noticia.featuredImage?.node?.sourceUrl
  const imageAlt = noticia.featuredImage?.node?.altText || `Imagen destacada de ${noticia.title}`
  const formattedDate = new Date(noticia.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // ─── JSON-LD (Structured Data) ──────────────────────────────────────────────
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Juegos', item: 'https://www.gtaverso.com/juegos' },
      { '@type': 'ListItem', position: 2, name: gameName, item: `https://www.gtaverso.com/juegos/${game}` },
      { '@type': 'ListItem', position: 3, name: 'Noticias', item: `https://www.gtaverso.com/juegos/${game}/noticias` },
      { '@type': 'ListItem', position: 4, name: noticia.title, item: `https://www.gtaverso.com/juegos/${game}/noticias/${slug}` }
    ]
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: noticia.title,
    image: imageUrl ? [imageUrl] : [],
    datePublished: noticia.date,
    dateModified: noticia.modified,
    author: [{ '@type': 'Person', name: noticia.author?.node?.name || 'Redacción GTAVerso' }]
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 lg:py-24 min-h-screen bg-[#050508] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Migas de pan (Breadcrumbs) */}
      <nav aria-label="Breadcrumb" className="mb-10 text-sm font-medium text-white/50 tracking-wide uppercase">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-white transition">Inicio</Link></li>
          <li><span className="px-1 opacity-50">/</span></li>
          <li><Link href={`/juegos/${game}`} className="hover:text-white transition">{gameName}</Link></li>
          <li><span className="px-1 opacity-50">/</span></li>
          <li><Link href={`/juegos/${game}/noticias`} className="hover:text-white transition">Noticias</Link></li>
        </ol>
      </nav>

      <article>
        {/* Cabecera del artículo */}
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

        {/* Imagen Destacada Principal (Above the fold) */}
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

        {/* Contenido HTML inyectado desde WordPress */}
        <div 
          className="prose prose-invert prose-lg md:prose-xl max-w-none 
          prose-a:text-(--gta-green) hover:prose-a:text-white prose-a:transition-colors
          prose-img:rounded-xl prose-img:border prose-img:border-white/10
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-strong:text-white
          prose-ul:text-gray-300 prose-li:marker:text-(--gta-green)"
          dangerouslySetInnerHTML={{ __html: noticia.content }}
        />
      </article>
    </main>
  )
}