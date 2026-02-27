// app/juegos/[game]/noticias/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByGameAndType, getAllJuegos } from '@/lib/wp';
import type { WPPost } from '@/types/wordpress';
import JuegoBadge from '@/components/JuegoBadge';

export const revalidate = 60;

interface Props {
  params: Promise<{ game: string }>;
}

const TITLES: Record<string, { label: string; color: string }> = {
  'gta-6': { label: 'GTA 6', color: '#FF00FF' },
  'gta-5': { label: 'GTA 5', color: '#569446' },
  'gta-4': { label: 'GTA 4', color: '#FBBF24' },
  'san-andreas': { label: 'GTA San Andreas', color: '#FFA500' },
  'vice-city': { label: 'GTA Vice City', color: '#00E5FF' },
  'gta-3': { label: 'GTA 3', color: '#E5E7EB' },
};

// Generar rutas estáticas
export async function generateStaticParams() {
  const juegos = await getAllJuegos();
  return juegos.map((juego) => ({
    game: juego.slug,
  }));
}

// Metadata dinámica
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game } = await params;
  const meta = TITLES[game] ?? { label: game.toUpperCase(), color: '#00FF41' };
  
  return {
    title: `Noticias de ${meta.label} | GTAVerso`,
    description: `Últimas noticias y novedades de ${meta.label}.`,
    alternates: { canonical: `https://www.gtaverso.com/juegos/${game}/noticias` },
  };
}

export default async function GameNewsPage({ params }: Props) {
  const { game } = await params;
  const posts = await getPostsByGameAndType(game, 'noticias');
  const meta = TITLES[game] ?? { label: game.toUpperCase().replace('-', ' '), color: '#00FF41' };

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#050508] pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            No hay noticias disponibles
          </h1>
          <Link href={`/juegos/${game}`} className="text-orange-500 hover:underline">
            ← Volver al hub del juego
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={`/juegos/${game}`}
            className="text-orange-500 hover:underline mb-4 inline-block"
          >
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-white">
            Noticias de {meta.label}
          </h1>
        </div>

        {/* Grid de noticias */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: WPPost) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}