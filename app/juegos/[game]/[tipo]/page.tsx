import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostsByGameAndType, getAllJuegos } from '@/lib/api';
import Breadcrumbs from '@/components/Breadcrumbs';

export const revalidate = 60;

interface Props {
  params: Promise<{ game: string; tipo: string }>;
}

const GAME_LABELS: Record<string, string> = {
  'gta-6': 'GTA 6',
  'gta-5': 'GTA 5',
  'gta-4': 'GTA 4',
  'gta-san-andreas': 'GTA San Andreas',
  'vice-city': 'GTA Vice City',
  'gta-3': 'GTA 3',
};

const TIPO_LABELS: Record<string, string> = {
  'noticias': 'Noticias',
  'guias': 'Guías',
  'trucos': 'Trucos',
};

export async function generateStaticParams() {
  const juegos = await getAllJuegos();
  const tipos = ['noticias', 'guias', 'trucos'];

  const params = [];
  for (const juego of juegos) {
    for (const tipo of tipos) {
      params.push({ game: juego.slug, tipo });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, tipo } = await params;

  // ✅ NUEVO: evita que [tipo] capture la ruta de personajes
  if (tipo === 'personajes') {
    return { robots: { index: false, follow: false } };
  }

  const gameLabel = GAME_LABELS[game] || game.toUpperCase();
  const tipoLabel = TIPO_LABELS[tipo] || tipo;

  return {
    title: `${tipoLabel} de ${gameLabel} | GTAVerso`,
    description: `Todas las ${tipoLabel.toLowerCase()} de ${gameLabel}.`,
    alternates: { canonical: `https://gtaverso.com/juegos/${game}/${tipo}` },
    openGraph: {
      title: `${tipoLabel} de ${gameLabel} | GTAVerso`,
      description: `Todas las ${tipoLabel.toLowerCase()} de ${gameLabel}.`,
      url: `https://gtaverso.com/juegos/${game}/${tipo}`,
      type: 'website',
    },
  };
}

export default async function GameTipoPage({ params }: Props) {
  const { game, tipo } = await params;

  // ✅ NUEVO: cede el control a app/juegos/[game]/personajes/page.tsx
  if (tipo === 'personajes') notFound();

  const posts = await getPostsByGameAndType(game, tipo);
  const gameLabel = GAME_LABELS[game] || game.toUpperCase();
  const tipoLabel = TIPO_LABELS[tipo] || tipo;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Juegos', href: '/juegos' },
    { label: gameLabel, href: `/juegos/${game}` },
    { label: tipoLabel, href: `/juegos/${game}/${tipo}` },
  ];

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#050508] pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-4xl font-bold text-white mb-4 mt-6">
            No hay {tipoLabel.toLowerCase()} disponibles para {gameLabel}
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
        <Breadcrumbs items={breadcrumbs} />

        <div className="mb-8 mt-6">
          <Link href={`/juegos/${game}`} className="text-orange-500 hover:underline mb-4 inline-block">
            ← Volver
          </Link>
          <h1 className="text-4xl font-bold text-white">
            {tipoLabel} de {gameLabel}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/juegos/${game}/${tipo}/${post.slug}`} className="group">
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