import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { fetchAPI } from '@/lib/api'

// ─── Tipos y Configuración ───────────────────────────────────────────────────

type PostNode = {
  title?: string
  slug?: string
  excerpt?: string
  date?: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
  juegos?: { nodes?: Array<{ slug?: string; name?: string }> }
}

// Configuración de colores para cada juego según tu diseño
const GAME_COLORS: Record<string, string> = {
  'gta-6': '#e401e4', // Rosa/Fucsia (Confirmado por ti)
  'gta-5': '#00ff41', // Verde nenón (Confirmado por ti)
  'gta-4': '#00BFFF', // Azul claro (Típico GTA 4 logo)
  'gta-3': '#FF8C00', // Naranja/Dorado
  'gta-san-andreas': '#008000', // Verde oscuro SA
  'gta-vice-city': '#FF1493', // Rosa brillante VC
}

// Configuración de imagen por defecto si WordPress no envía "featuredImage"
const GAME_FALLBACK_IMAGES: Record<string, string> = {
  'gta-6': '/images/gta6-news.webp',
  'gta-5': '/images/gta5-news.webp',
  'gta-4': '/images/gta4-news.webp',
  'gta-3': '/images/gta3-news.webp',
  'gta-san-andreas': '/images/gtasa-news.webp',
  'gta-vice-city': '/images/gtavc-news.webp',
}

// Función auxiliar para obtener el color
function getGameColor(slug?: string) {
  return (slug && GAME_COLORS[slug]) || '#00FF41' // Por defecto verde
}

// Función auxiliar para obtener la imagen si falla WP
function getGameFallbackImage(slug?: string) {
  return (slug && GAME_FALLBACK_IMAGES[slug]) || '/images/default-cover.webp'
}

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]+>/g, '').trim()
}

// ─── Query a WordPress ───────────────────────────────────────────────────────

async function getAllNews(): Promise<PostNode[]> {
  // Pide hasta 60 noticias, ordenadas de más reciente a más antigua.
  const data = await fetchAPI(
    `
    query TodasLasNoticias {
      posts(first: 60, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
          juegos { nodes { slug name } }
        }
      }
    }
    `
  )
  return (data?.posts?.nodes ?? []) as PostNode[]
}

// ─── Metadatos ───────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Noticias de todos los GTA · GTAVerso',
  description: 'Últimas noticias, actualizaciones y rumores de GTA 6, GTA 5, Vice City, San Andreas, GTA 4 y GTA 3.',
  alternates: { canonical: 'https://www.gtaverso.com/noticias' },
  openGraph: {
    title: 'Noticias · GTAVerso',
    description: 'Últimas noticias de todos los juegos de la saga GTA.',
    url: 'https://www.gtaverso.com/noticias',
    type: 'website',
  },
}

// ─── Componente Principal ────────────────────────────────────────────────────

export default async function GlobalNoticiasPage() {
  const posts = await getAllNews()

  return (
    <main className="min-h-screen bg-[#050508] text-white mx-auto w-full max-w-6xl px-4 py-12 lg:py-20">
      
      {/* 1. Cabecera */}
      <header className="mb-12 border-b border-white/10 pb-8">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          Todas las <span className="text-[#00FF41]">Noticias</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/60">
          Últimas novedades, filtraciones y parches oficiales de todos los títulos de la franquicia Grand Theft Auto.
        </p>
      </header>

      {/* 2. Listado de noticias (Grid) */}
      {posts.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <h2 className="text-xl font-semibold">Aún no hay noticias publicadas</h2>
          <p className="mt-2 text-white/60">Escribe desde tu panel de WordPress y se mostrarán aquí.</p>
        </section>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            // Extraer info de la noticia
            const title = post.title || 'Sin título'
            const slug = post.slug || ''
            const excerpt = stripHtml(post.excerpt)
            const dateIso = post.date || new Date().toISOString()
            const dateFormatted = new Date(dateIso).toLocaleDateString('es-ES', {
              day: 'numeric', month: 'short', year: 'numeric',
            })

            // Averiguar a qué juego pertenece (usamos el primero que venga en la taxonomía)
            const gameNode = post.juegos?.nodes?.[0]
            const gameSlug = gameNode?.slug || ''
            const gameName = gameNode?.name || 'Saga GTA'

            // Aplicar estilo de color e imagen
            const gameColor = getGameColor(gameSlug)
            
            // Imagen: prioriza WordPress, si no usa la de la carpeta public local de Next
            const wpImage = post.featuredImage?.node?.sourceUrl
            const finalImage = wpImage || getGameFallbackImage(gameSlug)
            const imageAlt = post.featuredImage?.node?.altText || `Imagen para ${title}`

            // Enlace respetando tu estructura SILO (/juegos/[game]/noticias/[slug])
            const href = gameSlug && slug ? `/juegos/${gameSlug}/noticias/${slug}` : '#'

            return (
              <article
                key={`${gameSlug}-${slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0E] transition duration-300 hover:bg-white/5 hover:border-[var(--hover-border)]"
                style={{ '--hover-border': gameColor } as CSSProperties}
              >
                
                {/* A. Imagen (clicable) */}
                <Link href={href} className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/10">
                  <Image
                    src={finalImage}
                    alt={imageAlt}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>

                {/* B. Cuerpo de la tarjeta */}
                <div className="flex flex-1 flex-col p-6">
                  
                  {/* Categoría / Juego (con color dinámico) y Fecha */}
                  <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                    <time dateTime={dateIso} className="text-white/50">{dateFormatted}</time>
                    <span 
                      className="rounded-full px-2.5 py-0.5"
                      style={{ color: gameColor, backgroundColor: `${gameColor}1A` }} // 10% de opacidad del color
                    >
                      {gameName}
                    </span>
                  </div>

                  {/* Título */}
                  <h2 className="mb-3 text-xl font-bold">
                    <Link 
                      href={href} 
                      className="line-clamp-2 text-white transition duration-300 hover:text-[var(--hover-border)]"
                    >
                      {title}
                    </Link>
                  </h2>

                  {/* Extracto */}
                  {excerpt && (
                    <p className="mb-6 line-clamp-3 text-sm text-white/60 leading-relaxed">
                      {excerpt}
                    </p>
                  )}

                  {/* Botón de lectura */}
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <Link
                      href={href}
                      className="inline-flex items-center text-sm font-semibold opacity-80 transition duration-300 hover:opacity-100 text-[var(--hover-border)]"
                    >
                      Leer noticia
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