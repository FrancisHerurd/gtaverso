// app/noticias/NoticiasClient.tsx
'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAPI } from '@/lib/api'
import Breadcrumbs from '@/components/Breadcrumbs'

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

const GAME_COLORS: Record<string, string> = {
  'gta-6': '#FF00FF',
  'gta-5': '#569446',
  'gta-4': '#FBBF24',
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

function getGameColor(slug?: string) {
  return (slug && GAME_COLORS[slug]) || '#00FF41'
}

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]+>/g, '').trim()
}

async function loadMorePosts(cursor: string, gameFilter?: string) {
  const whereClause = gameFilter && gameFilter !== 'all' 
    ? `categoryName: "${gameFilter}",` 
    : ''

  const data = await fetchAPI(`
    query CargarMas($after: String!) {
      posts(first: 12, after: $after, where: { ${whereClause} orderby: { field: DATE, order: DESC } }) {
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
  `, { after: cursor })

  return {
    posts: (data?.posts?.nodes ?? []) as PostNode[],
    pageInfo: data?.posts?.pageInfo ?? { hasNextPage: false, endCursor: null }
  }
}

export default function NoticiasClient({ 
  initialPosts, 
  initialPageInfo 
}: { 
  initialPosts: PostNode[]
  initialPageInfo: PageInfo
}) {
  const [posts, setPosts] = useState<PostNode[]>(initialPosts)
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo)
  const [selectedGame, setSelectedGame] = useState<string>('all')
  const [loading, setLoading] = useState(false)

  const filteredPosts = useMemo(() => {
    if (selectedGame === 'all') return posts
    return posts.filter(post => post.juegos?.nodes?.[0]?.slug === selectedGame)
  }, [posts, selectedGame])

  const availableGames = useMemo(() => {
    const games = new Set<string>()
    posts.forEach(post => {
      const slug = post.juegos?.nodes?.[0]?.slug
      if (slug) games.add(slug)
    })
    return Array.from(games).sort()
  }, [posts])

  const handleLoadMore = async () => {
    if (!pageInfo.hasNextPage || !pageInfo.endCursor || loading) return

    setLoading(true)
    try {
      const { posts: newPosts, pageInfo: newPageInfo } = await loadMorePosts(
        pageInfo.endCursor,
        selectedGame !== 'all' ? selectedGame : undefined
      )
      setPosts(prev => [...prev, ...newPosts])
      setPageInfo(newPageInfo)
    } catch (error) {
      console.error('Error cargando más posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 lg:py-20">
        
        <Breadcrumbs
          items={[{ label: 'Noticias' }]}
          className="mb-8"
        />

        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
            Todas las <span className="text-[#00FF41]">Noticias</span>
          </h1>
          <p className="max-w-2xl text-lg text-white/60">
            Últimas novedades, filtraciones y parches oficiales de todos los títulos de la franquicia Grand Theft Auto.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-3 border-b border-white/10 pb-6">
          <button
            onClick={() => setSelectedGame('all')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              selectedGame === 'all'
                ? 'bg-[#00FF41] text-black'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            Todos
          </button>
          {availableGames.map(gameSlug => (
            <button
              key={gameSlug}
              onClick={() => setSelectedGame(gameSlug)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                selectedGame === gameSlug
                  ? 'text-black'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
              style={{
                backgroundColor: selectedGame === gameSlug ? GAME_COLORS[gameSlug] : undefined
              }}
            >
              {GAME_LABELS[gameSlug] || gameSlug.toUpperCase()}
            </button>
          ))}
        </div>

        <p className="mb-6 text-sm text-white/50">
          Mostrando {filteredPosts.length} {filteredPosts.length === 1 ? 'noticia' : 'noticias'}
        </p>

        {filteredPosts.length === 0 ? (
          <section className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-xl font-semibold">No hay noticias disponibles</h2>
            <p className="mt-2 text-white/60">
              {selectedGame === 'all' 
                ? 'Publica desde tu panel de WordPress y aparecerán aquí.'
                : 'No hay noticias publicadas para este juego.'
              }
            </p>
          </section>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const title = post.title || 'Sin título'
                const slug = post.slug || ''
                const excerpt = stripHtml(post.excerpt)
                const dateIso = post.date || new Date().toISOString()
                const dateFormatted = new Date(dateIso).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })

                const gameNode = post.juegos?.nodes?.[0]
                const gameSlug = gameNode?.slug || ''
                const gameName = GAME_LABELS[gameSlug] || gameNode?.name || 'Saga GTA'
                const gameColor = getGameColor(gameSlug)
                
                const wpImage = post.featuredImage?.node?.sourceUrl
                const imageAlt = post.featuredImage?.node?.altText || `Imagen para ${title}`
                const href = gameSlug && slug ? `/juegos/${gameSlug}/noticias/${slug}` : '#'

                return (
                  <article
                    key={`${gameSlug}-${slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0E] transition-all duration-300 hover:bg-white/5 hover:border-white/20"
                  >
                    
                    <Link href={href} className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#13141c] flex items-center justify-center">
                      {wpImage ? (
                        <Image
                          src={wpImage}
                          alt={imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <span className="text-4xl font-black opacity-20 tracking-tighter" style={{ color: gameColor }}>
                          GTV
                        </span>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      
                      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                        <time dateTime={dateIso} className="text-white/50">{dateFormatted}</time>
                        <span 
                          className="rounded-full px-2.5 py-0.5"
                          style={{ 
                            color: gameColor, 
                            backgroundColor: `${gameColor}1A` 
                          }}
                        >
                          {gameName}
                        </span>
                      </div>

                      <h2 className="mb-3 text-xl font-bold">
                        <Link 
                          href={href} 
                          className="line-clamp-2 text-white transition-colors duration-300 hover:text-gray-300"
                        >
                          {title}
                        </Link>
                      </h2>

                      {excerpt && (
                        <p className="mb-6 line-clamp-3 text-sm text-white/60 leading-relaxed">
                          {excerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-white/10">
                        <Link
                          href={href}
                          className="inline-flex items-center text-sm font-semibold transition-opacity duration-300 hover:opacity-80"
                          style={{ color: gameColor }}
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

            {pageInfo.hasNextPage && selectedGame === 'all' && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      Cargando...
                    </>
                  ) : (
                    <>
                      Cargar más noticias
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}