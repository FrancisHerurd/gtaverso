// app/[game]/[type]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GAMES,
  TYPES,
  getPostsByGameAndType,
  type Game,
  type PostType,
} from "libposts";

type PageProps = {
  params: Promise<{ game: string; type: string }>;
};

export default async function GameTypePage({ params }: PageProps) {
  const { game, type } = await params;

  const validGame = (GAMES as readonly string[]).includes(game);
  const validType = (TYPES as readonly string[]).includes(type);
  if (!validGame || !validType) notFound();

  const posts = await getPostsByGameAndType(game as Game, type as PostType);

  return (
    <main className="container-custom py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-sm text-dark-700 uppercase">{game}</p>
        <h1 className="text-4xl font-bold uppercase">{type}</h1>
        <p className="text-dark-700">
          Artículos de {type.toUpperCase()} sobre {game.toUpperCase()}.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-dark-700">Aún no hay posts en esta sección.</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <Link
              key={`${p.game}-${p.type}-${p.slug}`}
              href={`/${p.game}/${p.type}/${p.slug}`}
              className="card block"
            >
              <div className="p-6">
                <div className="text-xs text-dark-700 uppercase">
                  {p.game} · {p.type} · {p.date}
                </div>
                <h2 className="text-xl font-bold mt-2">{p.title}</h2>
                <p className="text-dark-700 mt-2 line-clamp-3">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}