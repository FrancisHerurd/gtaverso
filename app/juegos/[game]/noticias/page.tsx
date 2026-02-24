import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAPI } from '@/lib/api'

// ─── Tipos ───────────────────────────────────────────────────────────────────
type PageProps = {
  params: Promise<{ game: string }>
}

type NoticiaNode = {
  title: string
  slug: string
  excerpt: string
  date: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
  juegos?: { nodes?: Array<{ slug?: string; name?: string }> }
}

// ─── Query ───────────────────────────────────────────────────────────────────
async function getNoticiasForGame(game: string): Promise<NoticiaNode[]> {
  const data = await fetchAPI(
    `
    query GetNoticias {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          juegos {
            nodes {
              slug
              name
            }
          }
        }
      }
    }
    `
  )

  const allPosts = (data?.posts?.nodes || []) as NoticiaNode[]

  // Filtramos para asegurarnos de que la noticia pertenece al juego de la URL
  return allPosts.filter((post) => {
    const juegoSlugs = post.juegos?.nodes?.map((j) => j.slug).filter(Boolean) || []
    return juegoSlugs.includes(game)
  })
}

// ─── Metadata dinámica ───────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game } = await params
  const gameName = game.replace(/-/g, ' ').toUpperCase()
  const canonical = `https://www.gtaverso.com/juegos/${game}/noticias`

  return {
    title: `Noticias de ${gameName} · GTAVerso`,
    description: `Últimas noticias, actualizaciones, filtraciones y novedades sobre ${gameName}.`,
    alternates: { canonical },
    openGraph: {
      title: `Noticias de ${gameName}`,
      description: `Últimas noticias, actualizaciones, filtraciones y novedades sobre ${gameName}.`,
      url: canonical,
      type: 'website',
    },
  }
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default async function NoticiasIndexPage({ params }: PageProps) {
  const { game } = await params
  const noticias = await getNoticiasForGame(game)
  const gameName = game.replace(/-/g, ' ').toUpperCase()

  // JSON-LD (Structured Data) para Breadcrumbs
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Juegos', item: 'https://www.gtaverso.com/juegos' },
      { '@type': 'ListItem', position: 2, name: gameName, item: `https://www.gtaverso.com/juegos/${game}` },
      { '@type': 'ListItem', position: 3, name: 'Noticias', item: `https://www.gtaverso.com/juegos/${game}/noticias` }
    ]
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 lg:py-20 min-h-screen bg-[#050508] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Migas de pan (Breadcrumbs) */}
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/juegos" className="hover:text-[#00FF41] transition">Juegos</Link></li>
          <li><span className="px-1">/</span></li>
          <li><Link href={`/juegos/${game}`} className="hover:text-[#00FF41] transition capitalize">{game.replace(/-/g, ' ')}</Link></li>
          <li><span className="px-1">/</span></li>
          <li className="text-white/90" aria-current="page">Noticias</li>
        </ol>
      </nav>

      {/* Cabecera de sección */}
      <header className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-balance text-4xl font-extrabold text-white sm:text-5xl mb-4 tracking-tight">
          Noticias de <span className="text-[#00FF41]">{gameName}</span>
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
          Mantente al día con las últimas novedades, actualizaciones y rumores oficiales.
        </p>
      </header>

      {/* Grid de Noticias */}
      {noticias.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <h2 className="text-xl font-semibold text-white">Aún no hay noticias publicadas</h2>
          <p className="mt-2 text-white/60">Publica tu primera noticia en WordPress asignándole el juego "{gameName}" para que aparezca aquí.</p>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => {
            const href = `/juegos/${game}/noticias/${noticia.slug}`
            const imageUrl = noticia.featuredImage?.node?.sourceUrl
            const imageAlt = noticia.featuredImage?.node?.altText || `Imagen de ${noticia.title}`
            const plainExcerpt = noticia.excerpt?.replace(/<[^>]+>/g, '').trim() || ''
            
            const formattedDate = new Date(noticia.date).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })

            return (
              <article 
                key={noticia.slug} 
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0E] transition duration-300 hover:border-[#00FF41]/50 hover:bg-white/5"
              >
                {/* Imagen de la tarjeta */}
                <Link href={href} className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5">
                      <span className="text-white/20 text-sm">Sin imagen</span>
                    </div>
                  )}
                </Link>

                {/* Contenido de la tarjeta */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-white/50">
                    <time dateTime={noticia.date}>{formattedDate}</time>
                    <span className="rounded-full bg-[#00FF41]/10 px-2.5 py-0.5 text-[#00FF41]">
                      Noticia
                    </span>
                  </div>
                  
                  <h2 className="mb-3 text-xl font-bold text-white transition duration-300 group-hover:text-[#00FF41]">
                    <Link href={href} className="line-clamp-2">
                      {noticia.title}
                    </Link>
                  </h2>
                  
                  {plainExcerpt && (
                    <p className="mb-6 line-clamp-3 text-sm text-white/60 leading-relaxed">
                      {plainExcerpt}
                    </p>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <Link 
                      href={href} 
                      className="inline-flex items-center text-sm font-semibold text-[#00FF41] hover:text-white transition duration-300"
                    >
                      Leer artículo
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </main>
  )
}
