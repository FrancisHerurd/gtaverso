import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: "GTAVerso - Noticias GTA 6, GTA 5 Online, Guías y Leaks",
  description:
    "Últimas noticias, guías, trucos y análisis de GTA 6, GTA Online y toda la saga GTA.",
};

export default async function Page() {
  const posts = await getAllPosts();
  const featured = posts.slice(0, 3);
  const latest = posts.slice(0, 6);

  const main = featured[0];
  const small = featured.slice(1);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* HERO OPTIMIZADO: Clases estándar aplicadas (min-h-125 y min-h-150) */}
      <section className="relative flex min-h-125 flex-col justify-center overflow-hidden border-b border-white/8 bg-gray-950 sm:min-h-150">
        
        {/* IMAGEN DE FONDO */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.webp"
            alt="GTA Noticias"
            fill
            className="object-cover opacity-80"
            style={{ objectPosition: 'center 30%' }}
            priority
            sizes="100vw"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.8)_100%)]" />
          
          {/* Degradado inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-b from-transparent to-gray-950" />
        </div>

        {/* CONTENIDO */}
        <div className="relative z-10 mx-auto flex w-full max-w-(--container) flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          
          {/* H1: Corregido lg:leading-[1] -> lg:leading-none */}
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-[5rem] lg:leading-none">
            GTAVerso
          </h1>

          {/* TEXTO */}
          <p className="mt-6 max-w-2xl text-lg font-medium text-gray-100 drop-shadow-lg sm:text-xl">
            Noticias, guías, análisis y trucos de la saga GTA
          </p>

          {/* BUSCADOR */}
          <div className="mt-10 w-full max-w-xl">
            <div className="relative rounded-full bg-black/40 backdrop-blur-md shadow-2xl ring-1 ring-white/10 transition-all hover:bg-black/60 hover:ring-(--gta-green)/50">
               <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      <section
        aria-labelledby="home-featured-heading"
        className="relative border-b border-white/8 bg-gray-950"
      >
        <div className="mx-auto max-w-(--container) px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-(--gta-green)" />
            <h2
              id="home-featured-heading"
              className="text-2xl font-bold text-white"
            >
              Destacados
            </h2>
          </div>

          {main && (
            <div className="mb-6">
              <PostCard post={main} featured />
            </div>
          )}

          {small.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {small.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ÚLTIMAS NOTICIAS */}
      <section
        aria-labelledby="home-latest-heading"
        className="relative bg-gray-950"
      >
        <div className="mx-auto max-w-(--container) px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-(--gta-green)" />
            <h2
              id="home-latest-heading"
              className="text-2xl font-bold text-white"
            >
              Últimas Noticias
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}