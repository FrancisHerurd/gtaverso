// app/juegos/[game]/noticias/NoticiasGameClient.tsx
'use client'

import { useState } from 'react'
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
}

type PageInfo = {
  hasNextPage: boolean
  endCursor: string | null
}

async function loadMoreGamePosts(gameSlug: string, cursor: string) {
  const data = await fetchAPI(
    `
    query CargarMas($gameSlug: String!, $after: String!) {
      posts(first: 12, after: $after, where: { categoryName: $gameSlug, orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl altText } }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `,
    { gameSlug, after: cursor }
  );

  return {
    posts: data?.posts?.nodes || [],
    pageInfo: data?.posts?.pageInfo || { hasNextPage: false, endCursor: null }
  };
}

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]+>/g, '').trim()
}

export default function NoticiasGameClient({
  game,
  initialPosts,
  initialPageInfo,
  meta
}: {
  game: string
  initialPosts: PostNode[]
  initialPageInfo: PageInfo
  meta: { label: string; color: string }
}) {
  const [posts, setPosts] = useState<PostNode[]>(initialPosts)
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo)
  const [loading, setLoading] = useState(false)

  const handleLoadMore = async () => {
    if (!pageInfo.hasNextPage || !pageInfo.endCursor || loading) return

    setLoading(true)
    try {
      const { posts: newPosts, pageInfo: newPageInfo } = await loadMoreGamePosts(game, pageInfo.endCursor)
      setPosts(prev => [...prev, ...newPosts])
      setPageInfo(newPageInfo)
    } catch (error) {
      console.error('Error cargando más posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050508] pt-24 pb-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Breadcrumbs
          items={[
            { label: meta.label, href: `/juegos/${game}` },
            { label: 'Noticias' },
          ]}
          className="mb-8"
        />

        <header className="mb-10">
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: meta.color }}
          >
            Noticias de {meta.label}
          </h1>
        </header>

        {posts.length === 0 ? (
          <div className="py-12 border-t border-white/10 mt-8">
            <p className="text-gray-400 text-lg">
              Todavía no hay noticias publicadas para <strong className="text-white">{meta.label}</strong> en WordPress.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => {
                const cover = post.featuredImage?.node?.sourceUrl;
                const altText = post.featuredImage?.node?.altText || post.title;
                const excerpt = stripHtml(post.excerpt);
                const fecha = new Date(post.date).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'long', year: 'numeric',
                });

                return (
                  <article
                    key={post.slug}
                    className="group flex flex-col bg-[#0a0b14] border border-[#1a1b26] rounded-xl overflow-hidden hover:border-white/20 transition-colors"
                  >
                    {cover ? (
                      <div className="aspect-video w-full overflow-hidden relative">
                        <Image
                          src={cover}
                          alt={altText}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div
                        className="aspect-video w-full flex items-center justify-center text-3xl font-black"
                        style={{ background: '#0a0b14', color: meta.color }}
                      >
                        GTV
                      </div>
                    )}

                    <div className="flex flex-col flex-1 p-5">
                      <time dateTime={post.date} className="text-xs text-gray-500 mb-2">
                        {fecha}
                      </time>
                      <h2 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-gray-300 transition-colors">
                        {post.title}
                      </h2>
                      {excerpt && (
                        <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
                          {excerpt}
                        </p>
                      )}
                      <Link
                        href={`/juegos/${game}/noticias/${post.slug}`}
                        className="text-sm font-semibold mt-auto inline-flex items-center gap-1"
                        style={{ color: meta.color }}
                      >
                        Leer más <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {pageInfo.hasNextPage && (
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
  );
}