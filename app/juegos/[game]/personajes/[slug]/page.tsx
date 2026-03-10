// app/juegos/[game]/personajes/[slug]/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getAllCharacters, getCharactersByGame, getCharacterBySlug } from '@/lib/api';

export const revalidate = 60;

interface Props {
  params: Promise<{ game: string; slug: string }>;
}

type CharacterGroup = 'principal' | 'secundario' | 'otros';

const SITE_URL = 'https://gtaverso.com';

const GAME_LABELS: Record<string, string> = {
  'gta-6': 'GTA 6',
  'gta-5': 'GTA 5',
  'gta-4': 'GTA 4',
  'gta-san-andreas': 'GTA San Andreas',
  'gta-vice-city': 'GTA Vice City',
  'vice-city': 'GTA Vice City',
  'gta-3': 'GTA 3',
};

const CHARACTER_UI_META: Record<string, { role?: string; group: CharacterGroup; order?: number }> = {
  'jason-duval': { role: 'Protagonista', group: 'principal', order: 1 },
  'lucia-caminos': { role: 'Protagonista', group: 'principal', order: 2 },
};

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]*>/g, '').trim();
}

function getCharacterMeta(slug: string) {
  return CHARACTER_UI_META[slug] || { role: undefined, group: 'otros' as CharacterGroup, order: 999 };
}

function sortCharacters(characters: any[]) {
  return [...characters].sort((a, b) => {
    const orderA = getCharacterMeta(a.slug).order ?? 999;
    const orderB = getCharacterMeta(b.slug).order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return String(a.title).localeCompare(String(b.title), 'es');
  });
}

export async function generateStaticParams() {
  const characters = await getAllCharacters();
  const params: Array<{ game: string; slug: string }> = [];
  for (const character of characters) {
    for (const juego of character.juegos?.nodes || []) {
      params.push({ game: juego.slug, slug: character.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, slug } = await params;
  const gameLabel = GAME_LABELS[game];
  const character = await getCharacterBySlug(slug);

  if (!gameLabel || !character) {
    return { title: 'Personaje no encontrado | GTAVerso', robots: { index: false, follow: false } };
  }

  const belongsToGame = character.juegos?.nodes?.some((juego: any) => juego.slug === game);
  if (!belongsToGame) {
    return { title: 'Personaje no encontrado | GTAVerso', robots: { index: false, follow: false } };
  }

  const description =
    stripHtml(character.excerpt) ||
    `Descubre a ${character.title}, personaje de ${gameLabel}, en GTAVerso.`;
  const canonical = `${SITE_URL}/juegos/${game}/personajes/${slug}`;
  const image = character.featuredImage?.node?.sourceUrl || `${SITE_URL}/og-default.webp`;

  return {
    title: `${character.title} | Personajes de ${gameLabel}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${character.title} | Personajes de ${gameLabel} | GTAVerso`,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: image, alt: character.featuredImage?.node?.altText || character.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${character.title} | Personajes de ${gameLabel} | GTAVerso`,
      description,
      images: [image],
    },
  };
}

export default async function CharacterDetailPage({ params }: Props) {
  const { game, slug } = await params;

  const gameLabel = GAME_LABELS[game];
  const character = await getCharacterBySlug(slug);

  if (!gameLabel || !character) notFound();

  const belongsToGame = character.juegos?.nodes?.some((juego: any) => juego.slug === game);
  if (!belongsToGame) notFound();

  const meta = getCharacterMeta(slug);
  const fields = character.characterFields;

  const allCharacters = await getCharactersByGame(game);
  const relatedCharacters = sortCharacters(
    allCharacters.filter((item: any) => item.slug !== slug)
  ).slice(0, 6);

  const canonical = `${SITE_URL}/juegos/${game}/personajes/${slug}`;
  const image = character.featuredImage?.node?.sourceUrl || `${SITE_URL}/og-default.webp`;
  const imageAlt = character.featuredImage?.node?.altText || character.title;
  const excerpt = stripHtml(character.excerpt) || '';

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Juegos', href: '/juegos' },
    { label: gameLabel, href: `/juegos/${game}` },
    { label: 'Personajes', href: `/juegos/${game}/personajes` },
    { label: character.title, href: `/juegos/${game}/personajes/${slug}` },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`,
    })),
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: character.title,
    description: excerpt,
    image,
    url: canonical,
    jobTitle: meta.role || 'Personaje de videojuego',
  };

  const galleryImages: any[] = fields?.galeria?.nodes || [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <article className="min-h-screen bg-[#050508] pt-24 pb-20 text-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-6 mb-8">
            <Link
              href={`/juegos/${game}/personajes`}
              className="inline-block text-orange-500 transition hover:underline"
            >
              ← Volver a personajes de {gameLabel}
            </Link>
          </div>

          {/* HEADER */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {meta.role && (
                <span className="inline-flex rounded-full bg-[#FF00FF] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-black">
                  {meta.role}
                </span>
              )}
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                {gameLabel}
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {character.title}
            </h1>
          </header>

          <div className="grid gap-10 lg:grid-cols-12">

            {/* COLUMNA PRINCIPAL */}
            <div className="lg:col-span-8 space-y-12">

              {/* Imagen destacada */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b14]">
                <div className="relative aspect-video w-full">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              </div>

              {/* Contenido WordPress */}
              {character.content && (
                <div
                  className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:scroll-mt-24
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-a:text-[#00FF41] hover:prose-a:text-[#00cc34]
                    prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-ul:text-gray-300 prose-ol:text-gray-300
                    prose-li:marker:text-[#00FF41]
                    prose-img:rounded-lg prose-img:my-8
                    prose-blockquote:border-l-4 prose-blockquote:border-[#00FF41]
                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: character.content }}
                />
              )}

              {/* Vídeo de YouTube */}
              {fields?.videoUrl && (
                <section aria-labelledby="video-personaje">
                  <h2
                    id="video-personaje"
                    className="mb-5 flex items-center gap-3 text-2xl font-bold text-white"
                  >
                    <span className="h-6 w-1 rounded-full bg-[#FF00FF]" />
                    Vídeo
                  </h2>
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                    <iframe
                      src={fields.videoUrl.replace('watch?v=', 'embed/')}
                      title={`Vídeo de ${character.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </section>
              )}

              {/* ✅ FICHA — justo encima de Galería, con h2 grande */}
              {fields && (
                <section aria-labelledby="info-personaje">
                  <h2
                    id="info-personaje"
                    className="mb-6 flex items-center gap-3 text-2xl font-bold text-white"
                  >
                    <span className="h-6 w-1 rounded-full bg-[#FF00FF]" />
                    Información del personaje
                  </h2>
                  <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-3">
                    {fields.actor && (
                      <div className="flex flex-col gap-1 bg-white/[0.03] px-5 py-4">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Actor
                        </dt>
                        <dd className="text-sm font-bold text-white">{fields.actor}</dd>
                      </div>
                    )}
                    {fields.genero && (
                      <div className="flex flex-col gap-1 bg-white/[0.03] px-5 py-4">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Género
                        </dt>
                        <dd className="text-sm font-bold text-white">{fields.genero}</dd>
                      </div>
                    )}
                    {fields.ubicacion && (
                      <div className="flex flex-col gap-1 bg-white/[0.03] px-5 py-4">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Ubicación
                        </dt>
                        <dd className="text-sm font-bold text-white">{fields.ubicacion}</dd>
                      </div>
                    )}
                    {fields.ocupacion && (
                      <div className="flex flex-col gap-1 bg-white/[0.03] px-5 py-4">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Ocupación
                        </dt>
                        <dd className="text-sm font-bold text-white">{fields.ocupacion}</dd>
                      </div>
                    )}
                    {meta.role && (
                      <div className="flex flex-col gap-1 bg-white/[0.03] px-5 py-4">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Rol
                        </dt>
                        <dd className="text-sm font-bold text-white">{meta.role}</dd>
                      </div>
                    )}
                    {fields.afiliaciones && (
                      <div className="col-span-2 flex flex-col gap-1 bg-white/[0.03] px-5 py-4 sm:col-span-3">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                          Afiliaciones
                        </dt>
                        <dd className="text-sm font-bold text-white">{fields.afiliaciones}</dd>
                      </div>
                    )}
                  </dl>
                </section>
              )}

              {/* ✅ GALERÍA — h2 grande, debajo de la ficha */}
              {galleryImages.length > 0 && (
                <section aria-labelledby="galeria-personaje">
                  <h2
                    id="galeria-personaje"
                    className="mb-6 flex items-center gap-3 text-2xl font-bold text-white"
                  >
                    <span className="h-6 w-1 rounded-full bg-[#FF00FF]" />
                    Galería
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {galleryImages.map((img: any) => (
                      <div
                        key={img.id}
                        className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#0a0b14]"
                      >
                        <Image
                          src={img.sourceUrl}
                          alt={img.altText || character.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width: 640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* SIDEBAR — solo personajes relacionados */}
            {relatedCharacters.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="sticky top-28">
                  <section
                    aria-labelledby="otros-personajes"
                    className="rounded-2xl border border-white/10 bg-[#0a0b14] p-6"
                  >
                    <h2
                      id="otros-personajes"
                      className="mb-5 text-lg font-bold uppercase tracking-[0.16em] text-white"
                    >
                      Otros personajes de {gameLabel}
                    </h2>
                    <div className="space-y-4">
                      {relatedCharacters.map((item: any) => (
                        <Link
                          key={item.slug}
                          href={`/juegos/${game}/personajes/${item.slug}`}
                          className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/2 p-3 transition hover:border-orange-500/40 hover:bg-white/4"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#050508]">
                            <Image
                              src={item.featuredImage?.node?.sourceUrl || '/og-default.webp'}
                              alt={item.featuredImage?.node?.altText || item.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-bold text-white group-hover:text-orange-500">
                              {item.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-400">
                              {stripHtml(item.excerpt) || `Ficha de ${item.title} en GTAVerso.`}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>
    </>
  );
}