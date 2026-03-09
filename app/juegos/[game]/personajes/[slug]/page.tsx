// app/juegos/[game]/personajes/[slug]/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllJuegos, getCharactersByGame, getCharacterBySlug } from '@/lib/api';

export const revalidate = 60;

interface Props {
  params: Promise<{ game: string; slug: string }>;
}

const GAME_LABELS: Record<string, string> = {
  'gta-6': 'GTA 6',
  'gta-5': 'GTA 5',
  'gta-4': 'GTA 4',
  'gta-san-andreas': 'GTA San Andreas',
  'vice-city': 'GTA Vice City',
  'gta-vice-city': 'GTA Vice City',
  'gta-3': 'GTA 3',
};

export async function generateStaticParams() {
  const juegos = await getAllJuegos();
  const params: Array<{ game: string; slug: string }> = [];

  for (const juego of juegos) {
    const characters = await getCharactersByGame(juego.slug);

    for (const character of characters) {
      params.push({
        game: juego.slug,
        slug: character.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, slug } = await params;

  const gameLabel = GAME_LABELS[game];
  const character = await getCharacterBySlug(slug);

  if (!gameLabel || !character) {
    return {
      title: 'Personaje no encontrado | GTAVerso',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description =
    character.excerpt?.replace(/<[^>]*>/g, '').trim() ||
    `Ficha del personaje ${character.title} en ${gameLabel}.`;

  const canonical = `https://gtaverso.com/juegos/${game}/personajes/${slug}`;

  return {
    title: `${character.title} | Personajes de ${gameLabel} | GTAVerso`,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${character.title} | Personajes de ${gameLabel} | GTAVerso`,
      description,
      url: canonical,
      type: 'article',
      images: character.featuredImage?.node?.sourceUrl
        ? [
            {
              url: character.featuredImage.node.sourceUrl,
              alt: character.featuredImage.node.altText || character.title,
            },
          ]
        : [],
    },
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { game, slug } = await params;

  const gameLabel = GAME_LABELS[game];
  const character = await getCharacterBySlug(slug);

  if (!gameLabel || !character) {
    notFound();
  }

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Juegos', href: '/juegos' },
    { label: gameLabel, href: `/juegos/${game}` },
    { label: 'Personajes', href: `/juegos/${game}/personajes` },
    { label: character.title, href: `/juegos/${game}/personajes/${slug}` },
  ];

  const excerpt =
    character.excerpt?.replace(/<[^>]*>/g, '').trim() ||
    `Ficha del personaje ${character.title} en GTAVerso.`;

  return (
    <article className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-6 mb-8">
          <Link
            href={`/juegos/${game}/personajes`}
            className="inline-block text-orange-500 transition hover:underline"
          >
            ← Volver a personajes de {gameLabel}
          </Link>
        </div>

        <header className="mb-10">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            {character.title}
          </h1>

          <p className="max-w-3xl text-lg leading-8 text-gray-300">
            {excerpt}
          </p>
        </header>

        {character.featuredImage?.node?.sourceUrl && (
          <div className="relative mb-10 h-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b14] md:h-[440px]">
            <Image
              src={character.featuredImage.node.sourceUrl}
              alt={character.featuredImage.node.altText || character.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        <section aria-labelledby="contenido-personaje" className="max-w-4xl">
          <h2
            id="contenido-personaje"
            className="mb-6 text-2xl font-bold text-white"
          >
            Quién es {character.title}
          </h2>

          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-[#00FF41] hover:prose-a:text-[#00cc34]
              prose-strong:text-white
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:marker:text-[#00FF41]
              prose-img:rounded-lg prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: character.content || '' }}
          />
        </section>
      </div>
    </article>
  );
}
