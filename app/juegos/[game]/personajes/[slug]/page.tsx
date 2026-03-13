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

const SITE_URL = 'https://gtaverso.com';

// ✅ Nombres cortos — se usan en breadcrumbs, badges, sidebar, H1...
const GAME_LABELS: Record<string, string> = {
  'gta-6':           'GTA 6',
  'gta-5':           'GTA 5',
  'gta-4':           'GTA 4',
  'gta-san-andreas': 'GTA San Andreas',
  'gta-vice-city':   'GTA Vice City',
  'vice-city':       'GTA Vice City',
  'gta-3':           'GTA 3',
};

// ✅ Nombres completos — solo para el campo "Juego(s) donde aparece"
const GAME_FULL_NAMES: Record<string, string> = {
  'gta-6':           'Grand Theft Auto VI',
  'gta-5':           'Grand Theft Auto V',
  'gta-4':           'Grand Theft Auto IV',
  'gta-san-andreas': 'Grand Theft Auto: San Andreas',
  'gta-vice-city':   'Grand Theft Auto: Vice City',
  'vice-city':       'Grand Theft Auto: Vice City',
  'gta-3':           'Grand Theft Auto III',
};

function stripHtml(html?: string) {
  return (html || '').replace(/<[^>]*>/g, '').trim();
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

  const belongsToGame = character.juegos?.nodes?.some((j: any) => j.slug === game);
  if (!belongsToGame) {
    return { title: 'Personaje no encontrado | GTAVerso', robots: { index: false, follow: false } };
  }

  const description = stripHtml(character.excerpt) || `Descubre a ${character.title}, personaje de ${gameLabel}, en GTAVerso.`;
  const canonical   = `${SITE_URL}/juegos/${game}/personajes/${slug}`;
  const image       = character.featuredImage?.node?.sourceUrl || `${SITE_URL}/og-default.webp`;

  return {
    title: `${character.title} en ${gameLabel} | Personajes GTA`,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${character.title} en ${gameLabel} | Personajes GTA | GTAVerso`,
      description,
      url: canonical,
      type: 'article',
      images: [{ url: image, alt: character.featuredImage?.node?.altText || character.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${character.title} en ${gameLabel} | Personajes GTA`,
      description,
      images: [image],
    },
  };
}

// ── Auxiliares ──────────────────────────────────────────────────────────────

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-6 flex items-center gap-3 text-2xl font-bold text-white scroll-mt-24">
      <span className="h-6 w-1 rounded-full bg-[#FF00FF]" aria-hidden="true" />
      {children}
    </h2>
  );
}

function FichaFila({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 px-6 py-4 bg-white/[0.03]">
      <dt className="text-xs font-bold uppercase tracking-widest text-[#FF00FF]">{label}</dt>
      <dd className="text-base font-semibold text-white leading-snug">{value}</dd>
    </div>
  );
}

function FichaFilaGrid({
  left,
  right,
}: {
  left:  { label: string; value?: string | null };
  right: { label: string; value?: string | null };
}) {
  const hasLeft  = !!left.value;
  const hasRight = !!right.value;

  if (!hasLeft && !hasRight) return null;

  if (!hasLeft || !hasRight) {
    return (
      <FichaFila
        label={hasLeft ? left.label : right.label}
        value={hasLeft ? left.value : right.value}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
      <FichaFila label={left.label}  value={left.value} />
      <FichaFila label={right.label} value={right.value} />
    </div>
  );
}

function RelationshipCard({ node, game }: { node: any; game: string }) {
  const avatar    = node.featuredImage?.node?.sourceUrl || '/og-default.webp';
  const avatarAlt = node.featuredImage?.node?.altText   || node.title || '';

  const juegosSlug = node.juegos?.nodes?.[0]?.slug || game;
  const href = `/juegos/${juegosSlug}/personajes/${node.slug}`;

  return (
    <li>
      <Link href={href} className="group transition">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10">
            <Image
              src={avatar}
              alt={avatarAlt}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              quality={85}
            />
          </div>
          <span className="text-sm font-medium text-orange-500 group-hover:underline">
            {node.title}
          </span>
        </div>
      </Link>
    </li>
  );
}

// ── Página ──────────────────────────────────────────────────────────────────

export default async function CharacterDetailPage({ params }: Props) {
  const { game, slug } = await params;

  const gameLabel = GAME_LABELS[game];
  const character = await getCharacterBySlug(slug);

  if (!gameLabel || !character) notFound();

  const belongsToGame = character.juegos?.nodes?.some((j: any) => j.slug === game);
  if (!belongsToGame) notFound();

  const cf = character.characterFields;

  const familia: any[] = cf?.familia?.nodes || [];
  const banda:   any[] = cf?.banda?.nodes   || [];
  const galeria: any[] = cf?.galeria?.nodes || [];

  const allCharacters = await getCharactersByGame(game);
  const relatedChars  = allCharacters
    .filter((c: any) => c.slug !== slug)
    .slice(0, 6);

  const canonical = `${SITE_URL}/juegos/${game}/personajes/${slug}`;
  const image     = character.featuredImage?.node?.sourceUrl || `${SITE_URL}/og-default.webp`;
  const imageAlt  = character.featuredImage?.node?.altText   || character.title;
  const excerpt   = stripHtml(character.excerpt);

  const hasFicha = cf && (
    cf.nombreCompleto || cf.alias || cf.nacionalidad || cf.genero ||
    cf.fechaDeNacimiento || cf.ubicacion || cf.rol ||
    familia.length > 0 || banda.length > 0 ||
    cf.actividad || cf.actor
  );

  const breadcrumbs = [
    { label: 'Inicio',        href: '/' },
    { label: 'Juegos',        href: '/juegos' },
    { label: gameLabel,       href: `/juegos/${game}` },
    { label: 'Personajes',    href: `/juegos/${game}/personajes` },
    { label: character.title, href: `/juegos/${game}/personajes/${slug}` },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
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
    ...(cf?.rol            && { jobTitle: cf.rol }),
    ...(cf?.nombreCompleto && { alternateName: cf.nombreCompleto }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <article className="min-h-screen bg-[#050508] pt-24 pb-20 text-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <Breadcrumbs items={breadcrumbs} />

          <div className="mt-6 mb-8">
            <Link href={`/juegos/${game}/personajes`} className="text-orange-500 transition hover:underline">
              ← Volver a personajes de {gameLabel}
            </Link>
          </div>

          {/* H1 */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {cf?.rol && (
                <span className="inline-flex rounded-full bg-[#FF00FF] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-black">
                  {cf.rol}
                </span>
              )}
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-300">
                {gameLabel}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              {character.title}
            </h1>
            {excerpt && (
              <p className="mt-4 max-w-2xl text-lg text-gray-400">{excerpt}</p>
            )}
          </header>

          <div className="grid gap-10 lg:grid-cols-12">

            {/* COLUMNA PRINCIPAL */}
            <div className="lg:col-span-8 space-y-14">

              {/* Imagen hero */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0b14]">
                <div className="relative aspect-video w-full">
                  <Image
                    src={image} alt={imageAlt} fill priority
                    className="object-cover"
                    sizes="(max-width:1024px) 100vw, 66vw"
                  />
                </div>
              </div>

              {/* H2: FICHA */}
              {hasFicha && (
                <section aria-labelledby="ficha-personaje">
                  <SectionTitle id="ficha-personaje">Ficha del personaje</SectionTitle>
                  <dl className="overflow-hidden rounded-2xl border border-white/10 divide-y divide-white/8">

                    <FichaFilaGrid
                      left={{ label: 'Nombre completo', value: cf?.nombreCompleto }}
                      right={{ label: 'Alias',           value: cf?.alias }}
                    />
                    <FichaFilaGrid
                      left={{ label: 'Nacionalidad', value: cf?.nacionalidad }}
                      right={{ label: 'Género',      value: cf?.genero }}
                    />
                    <FichaFilaGrid
                      left={{ label: 'Fecha de nacimiento',     value: cf?.fechaDeNacimiento }}
                      right={{ label: 'Ubicación / Residencia', value: cf?.ubicacion }}
                    />
                    <FichaFilaGrid
                      left={{ label: 'Rol',       value: cf?.rol }}
                      right={{ label: 'Actividad', value: cf?.actividad }}
                    />

                    {cf?.actor && (
                      <FichaFila label="Actor de voz" value={cf.actor} />
                    )}

                    {/* ✅ Juego(s) donde aparece — nombre completo + enlace */}
                    {character.juegos?.nodes?.length > 0 && (
                      <div className="flex flex-col gap-1 px-6 py-4 bg-white/[0.03]">
                        <dt className="text-xs font-bold uppercase tracking-widest text-[#FF00FF]">
                          Juego(s) donde aparece
                        </dt>
                        <dd className="flex flex-wrap gap-2 mt-1">
                          {character.juegos.nodes.map((j: any) => (
                            <Link
                              key={j.slug}
                              href={`/juegos/${j.slug}`}
                              className="text-base font-semibold text-orange-500 hover:underline"
                            >
                              {GAME_FULL_NAMES[j.slug] || j.slug}
                            </Link>
                          ))}
                        </dd>
                      </div>
                    )}

                    {/* ✅ Familia */}
                    {familia.length > 0 && (
                      <div className="flex flex-col gap-3 px-6 py-4 bg-white/[0.03]">
                        <dt className="text-xs font-bold uppercase tracking-widest text-[#FF00FF]">Familia</dt>
                        <dd>
                          <ul className="flex flex-col gap-2" role="list">
                            {familia.map((node: any) => (
                              <RelationshipCard key={node.id} node={node} game={game} />
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}

                    {/* ✅ Banda */}
                    {banda.length > 0 && (
                      <div className="flex flex-col gap-3 px-6 py-4 bg-white/[0.03]">
                        <dt className="text-xs font-bold uppercase tracking-widest text-[#FF00FF]">Banda / Afiliación</dt>
                        <dd>
                          <ul className="flex flex-col gap-2" role="list">
                            {banda.map((node: any) => (
                              <RelationshipCard key={node.id} node={node} game={game} />
                            ))}
                          </ul>
                        </dd>
                      </div>
                    )}

                  </dl>
                </section>
              )}

              {/* CONTENIDO WORDPRESS */}
              {character.content && (
                <section aria-labelledby="contenido-personaje">
                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:text-white prose-headings:scroll-mt-24
                      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                      prose-p:text-gray-300 prose-p:leading-relaxed
                      prose-a:text-[#00FF41] hover:prose-a:text-[#00cc34] prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-white
                      prose-ul:text-gray-300 prose-ol:text-gray-300
                      prose-li:marker:text-[#00FF41]
                      prose-img:rounded-lg prose-img:my-8
                      prose-blockquote:border-l-4 prose-blockquote:border-[#00FF41] prose-blockquote:italic prose-blockquote:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: character.content }}
                  />
                </section>
              )}

              {/* H2: GALERÍA */}
              {galeria.length > 0 && (
                <section aria-labelledby="galeria-personaje">
                  <SectionTitle id="galeria-personaje">Galería de imágenes</SectionTitle>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {galeria.map((img: any) => (
                      <div key={img.id} className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-[#0a0b14]">
                        <Image
                          src={img.sourceUrl}
                          alt={img.altText || character.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                          sizes="(max-width:640px) 50vw, 33vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* H2: VÍDEO */}
              {cf?.video && (
                <section aria-labelledby="video-personaje">
                  <SectionTitle id="video-personaje">Vídeo</SectionTitle>
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                    <iframe
                      src={cf.video.replace('watch?v=', 'embed/')}
                      title={`Vídeo de ${character.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </section>
              )}

            </div>

            {/* SIDEBAR */}
            {relatedChars.length > 0 && (
              <aside className="lg:col-span-4">
                <div className="sticky top-28">
                  <section aria-labelledby="otros-personajes" className="rounded-2xl border border-white/10 bg-[#0a0b14] p-6">
                    <h2 id="otros-personajes" className="mb-5 flex items-center gap-3 text-lg font-bold uppercase tracking-[0.16em] text-white">
                      <span className="h-5 w-1 rounded-full bg-[#FF00FF]" aria-hidden="true" />
                      Otros personajes de {gameLabel}
                    </h2>
                    <div className="space-y-4">
                      {relatedChars.map((item: any) => (
                        <Link
                          key={item.slug}
                          href={`/juegos/${game}/personajes/${item.slug}`}
                          className="group flex items-center gap-4 rounded-xl border border-white/5 bg-white/2 p-3 transition hover:border-orange-500/40 hover:bg-white/4"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#050508]">
                            <Image
                              src={item.featuredImage?.node?.sourceUrl || '/og-default.webp'}
                              alt={item.featuredImage?.node?.altText || item.title}
                              fill className="object-cover" sizes="80px"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-bold text-white group-hover:text-orange-500">
                              {item.title}
                            </h3>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-400">
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