// app/juegos/[game]/noticias/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

const TITLES: Record<string, { label: string; color: string }> = {
  'gta-6':      { label: 'GTA 6',      color: '#00FF41' },
  'gta-5':      { label: 'GTA 5',      color: '#FF00FF' },
  'gta-online': { label: 'GTA Online', color: '#FFA500' },
};

async function getNewsByGame(game: string) {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL!;

  // 🔑 Usamos categoryName para filtrar por juego.
  // Crea en WordPress la categoría "gta-6", "gta-5", etc. (con ese slug)
  // y asígnala a cada noticia.
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query GetNewsByGame($game: String!) {
          posts(first: 20, where: { categoryName: $game, orderby: { field: DATE, order: DESC } }) {
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
      variables: { game },
    }),
    next: { revalidate: 60 },
  });

  const json = await res.json();

  // Si no tiene la categoría creada aún, devolvemos todos los posts
  if (json.errors || !json.data?.posts?.nodes?.length) {
    const fallback = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query AllPosts {
            posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
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
      }),
      next: { revalidate: 60 },
    });
    const fallbackJson = await fallback.json();
    return fallbackJson.data?.posts?.nodes ?? [];
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
  const meta = TITLES[game] ?? { label: game.toUpperCase(), color: '#00FF41' };
  return {
    title: `Noticias de ${meta.label} - GTAVerso`,
    description: `Últimas noticias y novedades de ${meta.label}.`,
    alternates: { canonical: `https://gtaverso.com/juegos/${game}/noticias` },
  };
}

export default async function GameNewsPage(
  { params }: { params: Promise<{ game: string }> }
) {
  const { game } = await params;
  const posts = await getNewsByGame(game);
  const meta = TITLES[game] ?? { label: game.toUpperCase().replace('-', ' '), color: '#00FF41' };

  return (
    <main className="min-h-screen bg-[#050508] pt-24 pb-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <header className="mb-10">
          <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">
            <Link href={`/juegos/${game}`} className="hover:text-white transition-colors">
              {meta.label}
            </Link>
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: meta.color }}
          >
            Noticias
          </h1>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-lg mt-8">
            Todavía no hay noticias publicadas para {meta.label}.
          </p>
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
                  className="group flex flex-col bg-[#0a0b14] border border-[#1a1b26] rounded-xl overflow-hidden hover:border-white/20 transition-colors"
                >
                  {cover ? (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={cover}
                        alt={altText}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-video w-full flex items-center justify-center text-3xl font-black"
                      style={{ background: '#0a0b14', color: meta.color }}
                    >
                      GTV
                    </div>
                  )}

                  <div className="flex flex-col flex-1 p-5">
                    <time
                      dateTime={post.date}
                      className="text-xs text-gray-500 mb-2"
                    >
                      {fecha}
                    </time>
                    <h2 className="text-lg font-bold text-white mb-2 leading-snug">
                      {post.title}
                    </h2>
                    {excerpt && (
                      <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
                        {excerpt}
                      </p>
                    )}
                    <Link
                      href={`/juegos/${game}/noticias/${post.slug}`}
                      className="text-sm font-semibold mt-auto"
                      style={{ color: meta.color }}
                    >
                      Leer más →
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