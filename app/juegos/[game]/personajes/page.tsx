// app/juegos/[game]/personajes/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllJuegos, getCharactersByGame } from '@/lib/api';

export const revalidate = 60;

interface Props {
  params: Promise<{ game: string }>;
}

type CharacterGroup = 'principal' | 'secundario' | 'otros';

const GAME_LABELS: Record<string, string> = {
  'gta-6': 'GTA 6',
  'gta-5': 'GTA 5',
  'gta-4': 'GTA 4',
  'gta-san-andreas': 'GTA San Andreas',
  'gta-vice-city': 'GTA Vice City',
  'vice-city': 'GTA Vice City',
  'gta-3': 'GTA 3',
};

const GAME_META: Record<
  string,
  {
    accent: string;
    heroImage: string;
    intro: string;
  }
> = {
  'gta-6': {
    accent: '#FF00FF',
    heroImage: '/images/gta6-characters.webp',
    intro:
      'Descubre a los protagonistas y personajes clave de GTA 6 con fichas individuales conectadas a WordPress.',
  },
  'gta-5': {
    accent: '#569446',
    heroImage: '/images/gta5-hero.webp',
    intro:
      'Consulta los personajes más importantes de GTA 5 en GTAVerso.',
  },
  'gta-4': {
    accent: '#FBBF24',
    heroImage: '/images/gta4-hero.webp',
    intro:
      'Explora personajes de GTA 4 con acceso a sus fichas individuales.',
  },
  'gta-san-andreas': {
    accent: '#FFA500',
    heroImage: '/images/sa-hero.webp',
    intro:
      'Landing de personajes de GTA San Andreas preparada para fichas individuales.',
  },
  'gta-vice-city': {
    accent: '#00E5FF',
    heroImage: '/images/vc-hero.webp',
    intro:
      'Consulta personajes de GTA Vice City en una sección editorial propia.',
  },
  'vice-city': {
    accent: '#00E5FF',
    heroImage: '/images/vc-hero.webp',
    intro:
      'Consulta personajes de GTA Vice City en una sección editorial propia.',
  },
  'gta-3': {
    accent: '#E5E7EB',
    heroImage: '/images/gta3-hero.webp',
    intro:
      'Página índice de personajes de GTA 3 preparada para crecer.',
  },
};

const CHARACTER_UI_META: Record<
  string,
  {
    actor?: string;
    group: CharacterGroup;
    order?: number;
  }
> = {
  'jason-duval': {
    actor: 'Pendiente de confirmar',
    group: 'principal',
    order: 1,
  },
  'lucia-caminos': {
    actor: 'Pendiente de confirmar',
    group: 'principal',
    order: 2,
  },
};

const SECTION_COPY: Record<
  CharacterGroup,
  {
    title: string;
    description: string;
  }
> = {
  principal: {
    title: 'Personajes principales: Protagonistas de GTA 6',
    description:
      'Los protagonistas principales de GTA 6 y las figuras centrales de la historia en Leonida.',
  },
  secundario: {
    title: 'Personajes secundarios',
    description:
      'Aliados, rivales y figuras relevantes que amplían el universo narrativo de GTA 6.',
  },
  otros: {
    title: 'Otros personajes de GTA 6',
    description:
      'Personajes adicionales del juego que también forman parte del universo de GTA 6.',
  },
};

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]*>/g, '').trim();
}

function getCharacterMeta(slug: string) {
  return (
    CHARACTER_UI_META[slug] || {
      actor: undefined,
      group: 'otros' as CharacterGroup,
      order: 999,
    }
  );
}

function sortCharacters(characters: any[]) {
  return [...characters].sort((a, b) => {
    const metaA = getCharacterMeta(a.slug);
    const metaB = getCharacterMeta(b.slug);

    const orderA = metaA.order ?? 999;
    const orderB = metaB.order ?? 999;

    if (orderA !== orderB) return orderA - orderB;

    return String(a.title).localeCompare(String(b.title), 'es');
  });
}

function groupCharacters(characters: any[]) {
  const sorted = sortCharacters(characters);

  return {
    principal: sorted.filter(
      (character) => getCharacterMeta(character.slug).group === 'principal'
    ),
    secundario: sorted.filter(
      (character) => getCharacterMeta(character.slug).group === 'secundario'
    ),
    otros: sorted.filter(
      (character) => getCharacterMeta(character.slug).group === 'otros'
    ),
  };
}

function CharacterCard({
  character,
  game,
}: {
  character: any;
  game: string;
}) {
  const meta = getCharacterMeta(character.slug);
  const excerpt =
    stripHtml(character.excerpt) ||
    `Ficha de ${character.title} disponible en GTAVerso.`;

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b14] transition-all hover:border-orange-500/40 hover:bg-[#0f101a]">
      <Link
        href={`/juegos/${game}/personajes/${character.slug}`}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        aria-label={`Ver ficha de ${character.title}`}
      >
        <div className="relative aspect-video overflow-hidden bg-[#050508]">
          <Image
            src={character.featuredImage?.node?.sourceUrl || '/og-default.webp'}
            alt={character.featuredImage?.node?.altText || character.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-white transition-colors group-hover:text-orange-500">
            {character.title}
          </h3>

          {meta.actor && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Intérprete / actor:{' '}
              <span className="text-white normal-case tracking-normal">
                {meta.actor}
              </span>
            </p>
          )}

          <p className="mt-4 text-sm leading-7 text-gray-400 line-clamp-4">
            {excerpt}
          </p>

          <span className="mt-5 inline-flex text-sm font-semibold text-white">
            Ver personaje
          </span>
        </div>
      </Link>
    </article>
  );
}

function CharacterSection({
  id,
  title,
  description,
  characters,
  game,
  accent,
}: {
  id: string;
  title: string;
  description: string;
  characters: any[];
  game: string;
  accent: string;
}) {
  if (characters.length === 0) return null;

  return (
    <section aria-labelledby={id} className="mb-16">
      <div className="mb-6 flex items-center gap-3">
        <span
          className="h-6 w-1 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <h2
          id={id}
          className="text-2xl font-extrabold tracking-tight text-white md:text-3xl"
        >
          {title}
        </h2>
      </div>

      <p className="mb-8 max-w-3xl text-base leading-8 text-gray-300">
        {description}
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {characters.map((character) => (
          <CharacterCard
            key={character.slug}
            character={character}
            game={game}
          />
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const juegos = await getAllJuegos();

  return juegos.map((juego: { slug: string }) => ({
    game: juego.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game } = await params;

  const gameLabel = GAME_LABELS[game];
  const gameMeta = GAME_META[game];

  if (!gameLabel || !gameMeta) {
    return {
      title: 'Página no encontrada | GTAVerso',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `https://gtaverso.com/juegos/${game}/personajes`;

  return {
    title: `Personajes de ${gameLabel} | GTAVerso`,
    description: `Descubre los personajes de ${gameLabel} en GTAVerso: protagonistas, secundarios y fichas individuales.`,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `Personajes de ${gameLabel} | GTAVerso`,
      description: `Descubre los personajes de ${gameLabel} en GTAVerso: protagonistas, secundarios y fichas individuales.`,
      url: canonical,
      type: 'website',
      images: [
        {
          url: gameMeta.heroImage,
          alt: `Personajes de ${gameLabel}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Personajes de ${gameLabel} | GTAVerso`,
      description: `Descubre los personajes de ${gameLabel} en GTAVerso.`,
      images: [gameMeta.heroImage],
    },
  };
}

export default async function GameCharactersPage({ params }: Props) {
  const { game } = await params;

  const gameLabel = GAME_LABELS[game];
  const gameMeta = GAME_META[game];

  if (!gameLabel || !gameMeta) {
    notFound();
  }

  const characters = await getCharactersByGame(game);
  const grouped = groupCharacters(characters);

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Juegos', href: '/juegos' },
    { label: gameLabel, href: `/juegos/${game}` },
    { label: 'Personajes', href: `/juegos/${game}/personajes` },
  ];

  return (
    <main className="min-h-screen bg-[#050508] pt-24 pb-20 text-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 mb-10">
          <Link
            href={`/juegos/${game}`}
            className="mb-4 inline-block text-orange-500 transition hover:underline"
          >
            ← Volver al hub del juego
          </Link>

          <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0f] shadow-2xl">
            <div className="relative aspect-16/7 w-full">
              <Image
                src={gameMeta.heroImage}
                alt={`Banner de personajes de ${gameLabel}`}
                fill
                priority
                className="object-cover opacity-90"
              />
            </div>
            <div
              className="absolute bottom-0 left-0 h-1 w-full"
              style={{ backgroundColor: gameMeta.accent }}
            />
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-400">
              Universo GTA
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Personajes de {gameLabel}
            </h1>
            <p className="mt-4 text-base leading-8 text-gray-300 md:text-lg">
              {gameMeta.intro}
            </p>
          </div>
        </header>

        {characters.length > 0 ? (
          <>
            <CharacterSection
              id="personajes-principales"
              title={SECTION_COPY.principal.title}
              description={SECTION_COPY.principal.description}
              characters={grouped.principal}
              game={game}
              accent={gameMeta.accent}
            />

            <CharacterSection
              id="personajes-secundarios"
              title={SECTION_COPY.secundario.title}
              description={SECTION_COPY.secundario.description}
              characters={grouped.secundario}
              game={game}
              accent={gameMeta.accent}
            />

            <CharacterSection
              id="otros-personajes"
              title={SECTION_COPY.otros.title}
              description={SECTION_COPY.otros.description}
              characters={grouped.otros}
              game={game}
              accent={gameMeta.accent}
            />
          </>
        ) : (
          <section aria-labelledby="personajes-vacios">
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-6 w-1 rounded-full"
                style={{ backgroundColor: gameMeta.accent }}
              />
              <h2
                id="personajes-vacios"
                className="text-lg font-bold uppercase tracking-wider text-white"
              >
                Personajes de {gameLabel}
              </h2>
            </div>

            <div className="rounded-2xl border border-dashed border-white/10 bg-[#0a0b14] p-8">
              <p className="text-base leading-7 text-gray-300">
                Todavía no hay personajes publicados para este juego.
              </p>
              <p className="mt-3 text-sm leading-7 text-gray-400">
                Cuando añadas personajes con la taxonomía <strong>gta-6</strong> en WordPress,
                aparecerán automáticamente aquí.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}