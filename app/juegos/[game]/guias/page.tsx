// app/juegos/[game]/guias/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

// Reutilizamos el diccionario para saber los colores
const TITLES: Record<string, { label: string; color: string }> = {
  'gta-6': { label: 'GTA 6', color: '#FF00FF' },
  'gta-5': { label: 'GTA 5', color: '#00FF41' },
  'gta-4': { label: 'GTA 4', color: '#00BFFF' },
  'gta-san-andreas': { label: 'San Andreas', color: '#FF8C00' },
  'gta-vice-city': { label: 'Vice City', color: '#FF1493' },
  'gta-3': { label: 'GTA 3', color: '#FFD700' },
};

// Pedimos a WordPress los posts de la categoría "guias" que además pertenezcan a este juego
async function getGuidesByGame(gameSlug: string) {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

  // Buscamos posts que tengan la categoría del juego Y la etiqueta/categoría "guias"
  // (Dependiendo de cómo lo tengas en WP, aquí buscamos por categoryName del juego)
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetGuidesByGame($gameSlug: String!) {
          posts(first: 20, where: { categoryName: $gameSlug, tag: "guia", orderby: { field: DATE, order: DESC } }) {
            nodes {
              title
              slug
              excerpt
              date
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      `,
      variables: { gameSlug },
    }),
    next: { revalidate: 60 },
  });

  const json = await res.json();

  if (json.errors || !json.data?.posts?.nodes) {
    return [];
  }

  return json.data.posts.nodes as Array<{
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    featuredImage?: { node: { sourceUrl: string; altText: string } };
  }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ game: string }> }
): Promise<Metadata> {
  const { game } = await params;
  const meta = TITLES[game] ?? { label: game.replace('-', ' ').toUpperCase(), color: '#00FF41' };
  return {
    title: `Guías y Trucos de ${meta.label} - GTAVerso`,
    description: `Las mejores guías, misiones, coleccionables y trucos de ${meta.label}.`,
    alternates: { canonical: `https://gtaverso.com/juegos/${game}/guias` },
  };
}

export default async function GameGuidesPage(
  { params }: { params: Promise<{ game: string }> }
) {
  const { game } = await params;
  
  // Si alguien entra en /juegos/gta-6/guias, le damos 404 porque lo quitamos del menú
  if (game === 'gta-6') {
    notFound();
  }

  const posts = await getGuidesByGame(game);
  const meta = TITLES[game] ?? { label: game.replace('-', ' ').toUpperCase(), color: '#00FF41' };

  return (
    <main className="min-h-screen bg-[#050508] pt-24 pb-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <header className="mb-10 border-b border-white/10 pb-8">
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-widest">
            <Link href={`/juegos/${game}`} className="hover:text-white transition-colors">
              {meta.label}
            </Link>
          </p>
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight uppercase"
            style={{ color: meta.color }}
          >
            Guías y Trucos
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl">
            Domina {meta.label} al 100% con nuestras guías paso a paso, secretos ocultos y listas de códigos.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="py-12 mt-8 bg-white/5 border border-white/10 rounded-2xl text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Sección en construcción</h2>
            <p className="text-gray-400">
              Todavía no hemos publicado guías para <strong style={{ color: meta.color }}>{meta.label}</strong>.<br/>
              Añade posts en WordPress con la etiqueta "guia" para que aparezcan aquí.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const cover = post.featuredImage?.node?.sourceUrl;
              const altText = post.featuredImage?.node?.altText || post.title;
              const excerpt = post.excerpt?.replace(/<[^>]+>/g, '') ?? '';
              const fecha = new Date(post.date).toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', year: 'numeric',
              });

              return (
                <article
                  key={post.slug}
                  className="group flex flex-col bg-[#0a0b14] border border-[#1a1b26] rounded-xl overflow-hidden transition-colors"
                  style={{ '--hover-border': meta.color } as React.CSSProperties}
                >
                  <Link href={`/juegos/${game}/guias/${post.slug}`} className="block">
                    {cover ? (
                      <div className="aspect-video w-full overflow-hidden relative border-b border-white/5">
                        <img
                          src={cover}
                          alt={altText}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                        />
                      </div>
                    ) : (
                      <div
                        className="aspect-video w-full flex items-center justify-center text-4xl font-black border-b border-white/5"
                        style={{ background: '#0a0b14', color: meta.color }}
                      >
                        GTV
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-col flex-1 p-6">
                    <time
                      dateTime={post.date}
                      className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3"
                    >
                      {fecha}
                    </time>
                    <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-[var(--hover-border)] transition-colors">
                      <Link href={`/juegos/${game}/guias/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    {excerpt && (
                      <p className="text-sm text-gray-400 line-clamp-3 mb-6 flex-1">
                        {excerpt}
                      </p>
                    )}
                    <Link
                      href={`/juegos/${game}/guias/${post.slug}`}
                      className="text-sm font-bold mt-auto inline-flex items-center"
                      style={{ color: meta.color }}
                    >
                      Ver guía completa
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}