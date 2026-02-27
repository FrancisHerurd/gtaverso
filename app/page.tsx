// app/page.tsx

import Image from "next/image";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/api"; // ✅ Cambio: usar getAllPosts de api.ts
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import { generateSEO, generateWebsiteSchema } from "@/lib/seo";
import type { WPPost } from "@/types/wordpress";

export const revalidate = 300;

async function getHomePosts() {
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      console.log('No posts from WordPress');
      return [];
    }

    // Tomar los últimos 9 posts
    return posts.slice(0, 9);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

// Metadatos mejorados con utilidad SEO
export const metadata: Metadata = generateSEO({
  title: "Inicio",
  description: "Descubre las últimas noticias, guías completas y trucos de GTA 6, GTA 5, GTA 4, San Andreas, Vice City y toda la saga Grand Theft Auto.",
  image: "/og-default.webp",
  url: "/",
  type: "website",
});

export default async function Page() {
  const posts = await getHomePosts();
  
  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">No hay posts disponibles</h1>
          <p className="text-gray-400">Añade posts en WordPress para verlos aquí</p>
        </div>
      </main>
    );
  }

  const featured = posts.slice(0, 3);
  const latest = posts.slice(3, 9);

  const main = featured[0];
  const small = featured.slice(1);

  // Structured Data mejorado
  const websiteSchema = generateWebsiteSchema();

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative flex min-h-125 flex-col justify-center overflow-hidden border-b border-white/8 bg-gray-950 sm:min-h-150">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-950/60 to-gray-950" />
          <Image
            src={main?.featuredImage?.node?.sourceUrl || "/images/hero-fallback.jpg"}
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-center text-center">
            <h1 className="mb-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              GTA<span className="text-[#00FF41]">Verso</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
              Tu fuente definitiva de noticias, guías y análisis de la saga Grand Theft Auto
            </p>
            <SearchBar />
          </div>

          {/* Featured Post Principal */}
          {main && (
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-white/20">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative aspect-video lg:aspect-auto">
                  <Image
                    src={main.featuredImage?.node?.sourceUrl || "/images/hero-fallback.jpg"}
                    alt={main.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <span className="mb-3 inline-block w-fit rounded-md bg-[#00FF41] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                    Destacado
                  </span>
                  <h2 className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                    {main.title}
                  </h2>
                  <p className="mb-6 text-gray-300 line-clamp-3">
                    {main.excerpt.replace(/<[^>]+>/g, "").trim()}
                  </p>
                  <a
                    href={`/noticias/${main.slug}`}
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#00FF41] px-6 py-3 font-semibold text-black transition-colors hover:bg-[#00FF41]/90"
                  >
                    Leer más
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Posts Secundarios */}
      {small.length > 0 && (
        <section className="border-b border-white/8 bg-gray-950 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {small.map((post: WPPost) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Últimas Noticias */}
      <section className="bg-gray-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Últimas Noticias</h2>
            <a
              href="/noticias"
              className="text-sm font-semibold text-[#00FF41] transition-colors hover:text-[#00FF41]/80"
            >
              Ver todas →
            </a>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post: WPPost) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}