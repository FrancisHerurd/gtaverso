// src/components/LatestNewsSidebar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/api';
import { ClockIcon } from '@heroicons/react/24/outline';

interface LatestNewsSidebarProps {
  currentSlug: string; // Para excluir el artículo actual
  limit?: number;
}

export default async function LatestNewsSidebar({ 
  currentSlug, 
  limit = 5 
}: LatestNewsSidebarProps) {
  // Obtener todos los posts
  const allPosts = await getAllPosts();
  
  // Filtrar: excluir post actual y limitar resultados
  const latestPosts = allPosts
    .filter((post: any) => post.slug !== currentSlug)
    .slice(0, limit);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <aside className="bg-[#0a0b14] border border-[#00FF41]/20 rounded-lg p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
        <ClockIcon className="w-5 h-5 text-[#00FF41]" />
        <h2 className="text-lg font-bold text-white uppercase tracking-wider">
          Últimas Noticias
        </h2>
      </div>

      {/* Lista de noticias */}
      <div className="space-y-4">
        {latestPosts.map((post: any, index: number) => {
          const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
          const tipoSlug = post.tipos?.nodes?.[0]?.slug || 'noticias';
          const postUrl = `/juegos/${gameSlug}/${tipoSlug}/${post.slug}`;

          return (
            <Link
              key={post.slug}
              href={postUrl}
              className="group block"
            >
              <article className="flex gap-3 hover:bg-[#00FF41]/5 p-2 rounded-lg transition-colors">
                {/* Número */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00FF41]/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-[#00FF41]">
                    {index + 1}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  {/* Badge del juego */}
                  {post.juegos?.nodes?.[0] && (
                    <span className="text-xs font-bold text-[#00FF41] uppercase tracking-wider block mb-1">
                      {post.juegos.nodes[0].name}
                    </span>
                  )}

                  {/* Título */}
                  <h3 className="text-sm font-semibold text-white group-hover:text-[#00FF41] transition-colors line-clamp-2 mb-1">
                    {post.title}
                  </h3>

                  {/* Fecha */}
                  <time className="text-xs text-gray-500">
                    {new Date(post.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </time>
                </div>

                {/* Miniatura (opcional) */}
                {post.featuredImage && (
                  <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                )}
              </article>
            </Link>
          );
        })}
      </div>

      {/* Link a todas las noticias */}
      <Link
        href="/noticias"
        className="mt-6 pt-4 border-t border-gray-800 block text-center text-sm text-[#00FF41] hover:text-[#00cc34] font-semibold transition-colors"
      >
        Ver todas las noticias →
      </Link>
    </aside>
  );
}