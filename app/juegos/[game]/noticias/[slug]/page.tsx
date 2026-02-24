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
    { id: slug } // Corrección: Se pasa directamente el objeto sin anidar en 'variables'
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
    <main className="mx-auto w-full max-w-4xl px-4 py-12 lg:py-20 min-h-screen bg-[#050508] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Migas de pan (Breadcrumbs) */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/juegos" className="hover:text-[#00FF41] transition">Juegos</Link></li>
          <li><span className="px-1">/</span></li>
          <li><Link href={`/juegos/${game}`} className="hover:text-[#00FF41] transition capitalize">{game.replace(/-/g, ' ')}</Link></li>
          <li><span className="px-1">/</span></li>
          <li><Link href={`/juegos/${game}/noticias`} className="hover:text-[#00FF41] transition">Noticias</Link></li>
          <li><span className="px-1">/</span></li>
          <li className="text-white/90 truncate max-w-50 sm:max-w-md" aria-current="page">
            {noticia.title}
          </li>
        </ol>
      </nav>

      <article>
        {/* Cabecera del artículo */}
        <header className="mb-10">
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl mb-6">
            {noticia.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-white/60 border-b border-white/10 pb-6">
            <time dateTime={noticia.date} className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formattedDate}
            </time>
            <span>•</span>
            <span className="text-[#00FF41] font-medium">
              {noticia.author?.node?.name || 'Redacción'}
            </span>
          </div>
        </header>

        {/* Imagen Destacada */}
        {imageUrl && (
          <figure className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 border border-white/10 bg-white/5">
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

        {/* Contenido HTML desde WordPress */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-a:text-[#00FF41] hover:prose-a:text-white prose-img:rounded-xl prose-headings:font-bold"
          dangerouslySetInnerHTML={{ __html: noticia.content }}
        />
      </article>
    </main>
  )
}