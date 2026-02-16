// app/[game]/page.tsx
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { GAMES, getPostBySlug, getPostsByGame, type Game, type Post } from "libposts";
import SearchBar from "@/components/SearchBar";

type PageProps = {
  params: Promise<{ game: string }>;
};

export default async function GamePage({ params }: PageProps) {
  const { game } = await params;

  const isGame = (GAMES as readonly string[]).includes(game);

  // ✅ Si NO es un game válido, tratamos /{game} como legacy /{slug}
  if (!isGame) {
    const legacyPost = await getPostBySlug(game);
    if (!legacyPost) notFound();

    redirect(`/${legacyPost.game}/${legacyPost.type}/${legacyPost.slug}`);
  }

  // ✅ Landing real del juego
  const posts = await getPostsByGame(game as Game);

  return (
    <main className="container-custom py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold uppercase">{game}</h1>
        <p className="text-dark-700">Últimos artículos de {game.toUpperCase()}.</p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link className="btn-secondary" href={`/${game}/noticias`}>Noticias</Link>
          <Link className="btn-secondary" href={`/${game}/guias`}>Guías</Link>
          <Link className="btn-secondary" href={`/${game}/analisis`}>Análisis</Link>
          <Link className="btn-secondary" href={`/${game}/trucos`}>Trucos</Link>
        </div>
      </header>

      {posts.length === 0 ? (
        <p className="text-dark-700">Aún no hay posts para este juego.</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p: Post) => (
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
                <p className="text-dark-700 mt-2 line-clamp-3">{p.description}</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}