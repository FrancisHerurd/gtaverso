// src/components/RelatedPosts.tsx
import Link from 'next/link'
import Image from 'next/image'

type RelatedPost = {
  title: string
  slug: string
  excerpt?: string
  date: string
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } }
}

type RelatedPostsProps = {
  posts: RelatedPost[]
  gameSlug: string
  gameColor: string
  gameName: string
}

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]+>/g, '').trim()
}

export default function RelatedPosts({ posts, gameSlug, gameColor, gameName }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-20 border-t border-white/10 pt-16">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <span style={{ color: gameColor }}>Te puede interesar</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const excerpt = stripHtml(post.excerpt)
          const imageUrl = post.featuredImage?.node?.sourceUrl
          const imageAlt = post.featuredImage?.node?.altText || post.title
          const href = `/juegos/${gameSlug}/noticias/${post.slug}`
          const dateFormatted = new Date(post.date).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })

          return (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0E] transition-all duration-300 hover:bg-white/5 hover:border-white/20"
            >
              <Link href={href} className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-[#13141c] flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <span className="text-3xl font-black opacity-20" style={{ color: gameColor }}>
                    GTV
                  </span>
                )}
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <time dateTime={post.date} className="text-white/50">{dateFormatted}</time>
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-semibold"
                    style={{ color: gameColor, backgroundColor: `${gameColor}1A` }}
                  >
                    {gameName}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-bold leading-tight">
                  <Link
                    href={href}
                    className="text-white transition-colors hover:text-gray-300"
                  >
                    {post.title}
                  </Link>
                </h3>

                {excerpt && (
                  <p className="mb-4 line-clamp-2 text-sm text-white/60">
                    {excerpt}
                  </p>
                )}

                <Link
                  href={href}
                  className="mt-auto inline-flex items-center text-sm font-semibold transition-opacity hover:opacity-80"
                  style={{ color: gameColor }}
                >
                  Leer más
                  <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}