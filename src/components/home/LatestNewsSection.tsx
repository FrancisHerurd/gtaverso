import PostCard from "@/components/PostCard";
import getAllPosts from "@/lib/posts";

type Props = {
  title?: string;
  limit?: number;
};

export default async function LatestNewsSection({
  title = "Últimas Noticias",
  limit = 6,
}: Props) {
  const posts = await getAllPosts();

  // Por si acaso, orden defensivo (si tu loader ya ordena, no hace daño).
  const latest = [...posts]
    .sort((a: any, b: any) => {
      const da = new Date(a?.date ?? 0).getTime();
      const db = new Date(b?.date ?? 0).getTime();
      return db - da;
    })
    .slice(0, limit);

  return (
    <section aria-labelledby="latest-news-title" className="relative">
      <div className="mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--gta-green)]" aria-hidden="true" />
          <h2 id="latest-news-title" className="text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        {latest.length === 0 ? (
          <p className="text-sm text-white/70">
            Aún no hay noticias publicadas.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post: any) => (
              <PostCard key={`${post.game ?? "post"}-${post.slug}`} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}