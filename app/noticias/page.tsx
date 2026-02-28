// app/noticias/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/api';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Todas las Noticias de GTA · GTAVerso',
  description: 'Últimas noticias, actualizaciones y rumores de GTA 6, GTA 5, Vice City, San Andreas, GTA 4 y GTA 3.',
  alternates: { canonical: 'https://www.gtaverso.com/noticias' },
  openGraph: {
    title: 'Todas las Noticias · GTAVerso',
    description: 'Últimas noticias de todos los juegos de la saga GTA.',
    url: 'https://www.gtaverso.com/noticias',
    type: 'website',
  },
};

export default async function GlobalNoticiasPage() {
  const posts = await getAllPosts();

  // Filtrar solo posts de tipo "noticias"
  const noticias = posts.filter(
    (post: any) => post.tipos?.nodes?.some((tipo: any) => tipo.slug === 'noticias')
  );

  const finalPosts = noticias.length > 0 ? noticias : posts;

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-bold text-white mb-8">
          Todas las Noticias
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finalPosts.map((post: any) => {
            const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
            const tipoSlug = post.tipos?.nodes?.[0]?.slug || 'noticias';

            return (
              <Link
                key={post.slug}
                href={`/juegos/${gameSlug}/${tipoSlug}/${post.slug}`}
                className="group"
              >
                <article className="bg-[#0a0b14] rounded-lg overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all h-full flex flex-col">
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

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Badge del juego */}
                    {post.juegos?.nodes?.[0] && (
                      <span className="text-xs font-bold text-orange-500 mb-2">
                        {post.juegos.nodes[0].name}
                      </span>
                    )}

                    <time className="text-xs text-gray-500 block mb-2">
                      {new Date(post.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <h2 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                      {post.excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}