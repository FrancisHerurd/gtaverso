// src/components/CategoryHero/CategoryHero.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

// Quitamos la importación del Type antiguo
// import type { Post } from '@/types/posts'

interface LatestNewsSectionProps {
  posts: any[] // Temporalmente a any[] para evitar errores de Build
  game: string
  gameLabel: string
  accentColor?: string
  className?: string
}

export default function LatestNewsSection({
  posts,
  game,
  gameLabel,
  accentColor = '#00FF41',
  className = '',
}: LatestNewsSectionProps) {
  if (!posts || posts.length === 0) return null

  const mainPost = posts[0]
  const sidePosts = posts.slice(1, 5)

  return (
    <section className={`w-full ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="h-6 w-1.5 rounded-full" 
            style={{ backgroundColor: accentColor }}
          />
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
            Últimas Noticias <span className="text-white/50">{gameLabel}</span>
          </h2>
        </div>
        <Link 
          href={`/juegos/${game}/noticias`}
          className="group flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          Ver todas
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        {/* Noticia Principal (Izquierda) */}
        <Link 
          href={`/juegos/${game}/noticias/${mainPost.slug}`}
          className="group relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-2xl bg-white/3 lg:col-span-8 lg:min-h-[500px]"
        >
          <Image
            src={mainPost.cover || '/images/default-cover.jpg'}
            alt={mainPost.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
          
          <div className="relative p-6 sm:p-8">
            <span 
              className="mb-4 inline-block rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-black"
              style={{ backgroundColor: accentColor }}
            >
              Exclusiva
            </span>
            <h3 className="mb-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {mainPost.title}
            </h3>
            {mainPost.excerpt && (
              <p className="mb-4 line-clamp-2 max-w-2xl text-sm text-gray-300 sm:text-base">
                {mainPost.excerpt}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4" />
              <time dateTime={mainPost.date}>
                {new Date(mainPost.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
          </div>
        </Link>

        {/* Lista de Noticias (Derecha) */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {sidePosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/juegos/${game}/noticias/${post.slug}`}
              className="group flex gap-4 rounded-xl bg-white/2 p-3 transition-colors hover:bg-white/5"
            >
              <div className="relative w-28 shrink-0 overflow-hidden rounded-lg sm:w-32 aspect-video">
                <Image
                  src={post.cover || '/images/default-cover.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="line-clamp-2 text-sm font-bold leading-tight text-gray-100 group-hover:text-white sm:text-base">
                  {post.title}
                </h4>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}