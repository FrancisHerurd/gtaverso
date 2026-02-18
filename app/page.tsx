import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO/SEO";
import { WebsiteStructuredData } from "@/components/SEO/WebsiteStructuredData";

export const metadata = {
  title: "GTAVerso - Noticias GTA 6, GTA 5 Online, Guías y Leaks",
  description: "Últimas noticias, guías, trucos y análisis de GTA 6, GTA Online y toda la saga GTA. Tema oscuro neón verde.",
};

export default async function Page() {
  const posts = await getAllPosts();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(0, 6);

  const main = featured[0];
  const small = featured.slice(1);

  return (
    <>
      {/* SEO INVISIBLE */}
      <SEO 
        title="GTAVerso - Noticias GTA 6, GTA 5 Online, Guías y Leaks"
        description="Últimas noticias, guías, trucos y análisis de GTA 6, GTA Online y toda la saga GTA. Tema oscuro neón verde."
        image="/images/og-home.jpg" // Añade esta imagen 1216x630px
        type="website"
        url="https://gtaverso.com"
      />
      <WebsiteStructuredData />

      <div className="min-h-screen">
        {/* HERO (textos + buscador) */}
        <section className="relative">
          <div className="mx-auto max-w-[var(--container)] px-4 pt-10 pb-6 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              GTAVerso
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">
              Noticias, guías, análisis y trucos de la saga GTA (tema oscuro, verde neón).
            </p>

            <div className="mt-6">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* DESTACADOS */}
        <section className="relative">
          <div className="mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-[var(--gta-green)]">🔥</span>
              <h2 className="text-2xl font-bold text-white">Destacados</h2>
            </div>

            {/* Card grande featured */}
            {main && <PostCard post={main} featured />}

            {/* 2 cards pequeñas */}
            {small.length > 0 && (
              <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
                {small.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ÚLTIMAS NOTICIAS */}
        <section className="relative">
          <div className="mx-auto max-w-[var(--container)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="text-[var(--gta-green)]">📈</span>
              <h2 className="text-2xl font-bold text-white">Últimas Noticias</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}