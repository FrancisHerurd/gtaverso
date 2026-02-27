// app/noticias/NoticiasClient.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { WPPost } from '@/types/wordpress';
import JuegoBadge from '@/components/JuegoBadge';

interface Props {
  initialPosts: WPPost[];
  initialPageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export default function NoticiasClient({ initialPosts, initialPageInfo }: Props) {
  const [posts] = useState<WPPost[]>(initialPosts);
  // const [pageInfo] = useState(initialPageInfo); // Si necesitas paginación

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Todas las Noticias
          </h1>
          <p className="text-gray-400 text-lg">
            Últimas novedades de la saga GTA
          </p>
        </div>

        {/* Grid de noticias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/noticias/${post.slug}`}
              className="group"
            >
              <article className="bg-[#0a0b14] rounded-lg overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all h-full flex flex-col">
                {/* Imagen */}
                {post.featuredImage && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Contenido */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Fecha */}
                  <time className="text-xs text-gray-500 block mb-2">
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>

                  {/* Título */}
                  <h2 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                    {post.excerpt.replace(/<[^>]*>/g, '')}
                  </p>

                  {/* Badges de Juegos */}
                  {post.juegos && post.juegos.nodes.length > 0 && (
                    <JuegoBadge juegos={post.juegos.nodes} className="mt-auto" />
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mensaje si no hay noticias */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No hay noticias disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}