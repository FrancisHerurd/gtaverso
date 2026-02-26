// app/buscar/BuscarClient.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X } from 'lucide-react'
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

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]+>/g, '').trim()
}

async function searchPosts(query: string): Promise<PostNode[]> {
  if (!query || query.length < 2) return []

  const data = await fetchAPI(`
    query BuscarPosts($search: String!) {
      posts(first: 50, where: { search: $search }) {
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
  `, { search: query })

  return (data?.posts?.nodes ?? []) as PostNode[]
}

export default function BuscarClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<PostNode[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm || searchTerm.length < 2) {
      setResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const posts = await searchPosts(searchTerm)
      setResults(posts)
    } catch (error) {
      console.error('Error en búsqueda:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
      performSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setSearched(false)
    router.push('/buscar')
  }

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
        
        <Breadcrumbs
          items={[{ label: 'Buscar' }]}
          className="mb-8"
        />

        <header className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Buscar en <span className="text-[#00FF41]">GTAVerso</span>
          </h1>

          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar noticias, guías, rumores..."
                className="w-full rounded-xl border border-white/20 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-white/40 focus:border-[#00FF41] focus:outline-none focus:ring-2 focus:ring-[#00FF41]/20"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="mt-4 rounded-lg bg-[#00FF41] px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
            >
              Buscar
            </button>
          </form>
        </header>

        {loading && (
          <div className="py-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-[#00FF41]" />
            <p className="mt-4 text-white/60">Buscando...</p>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <Search className="mx-auto h-12 w-12 text-white/20 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No se encontraron resultados</h2>
            <p className="text-white/60">
              No hay contenido que coincida con <strong className="text-white">"{initialQuery}"</strong>
            </p>
            <p className="mt-4 text-sm text-white/40">
              Intenta con otros términos o revisa la ortografía
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="mb-6 text-white/60">
              Se encontraron <strong className="text-white">{results.length}</strong> resultados para{' '}
              <strong className="text-[#00FF41]">"{initialQuery}"</strong>
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
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
                const gameColor = GAME_COLORS[gameSlug] || '#00FF41'
                
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
                        <span className="text-4xl font-black opacity-20" style={{ color: gameColor }}>
                          GTV
                        </span>
                      )}
                    </Link>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                        <time dateTime={dateIso} className="text-white/50">{dateFormatted}</time>
                        <span 
                          className="rounded-full px-2.5 py-0.5"
                          style={{ color: gameColor, backgroundColor: `${gameColor}1A` }}
                        >
                          {gameName}
                        </span>
                      </div>

                      <h2 className="mb-3 text-xl font-bold">
                        <Link href={href} className="line-clamp-2 text-white hover:text-gray-300 transition-colors">
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
                          className="inline-flex items-center text-sm font-semibold transition-opacity hover:opacity-80"
                          style={{ color: gameColor }}
                        >
                          Leer más
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
          </>
        )}

        {!loading && !searched && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <Search className="mx-auto h-12 w-12 text-white/20 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Introduce un término de búsqueda</h2>
            <p className="text-white/60">
              Busca noticias, guías, trucos y rumores sobre la saga GTA
            </p>
          </div>
        )}
      </div>
    </main>
  )
}