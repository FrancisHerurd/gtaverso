// app/page.tsx

import Image from "next/image";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/api";
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

    return posts.slice(0, 9);
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return [];
  }
}

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

  const featured = posts[0];
  const latest = posts.slice(1, 9);

  const websiteSchema = generateWebsiteSchema();

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section - Estilo Figma */}
      <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden border-b border-white/8 bg-linear-to-b from-gray-900 to-gray-950">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl">
              GTA<span className="text-[#00FF41]">Verso</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
              Tu fuente definitiva de noticias, guías y análisis de la saga Grand Theft Auto
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Post Billboard - Estilo Figma */}
      {featured && (
        <section className="border-b border-white/8 bg-gray-950 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-1 bg-[#00FF41]" />
                <h2 className="text-2xl font-bold text-white">Destacado</h2>
              </div>
            </div>

            <a
              href={`/juegos/${featured.juegos?.nodes?.[0]?.slug || 'gta-6'}/${featured.tipos?.nodes?.[0]?.slug || 'noticias'}/${featured.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 transition-all hover:border-[#00FF41]/50 hover:shadow-xl hover:shadow-[#00FF41]/10">
                <div className="grid gap-0 lg:grid-cols-5">
                  {/* Imagen - 3 columnas */}
                  <div className="relative aspect-video lg:col-span-3 lg:aspect-auto">
                    <Image
                      src={featured.featuredImage?.node?.sourceUrl || "/images/hero-fallback.jpg"}
                      alt={featured.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block rounded-md bg-[#00FF41] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
                        Destacado
                      </span>
                    </div>
                  </div>

                  {/* Texto - 2 columnas */}
                  <div className="flex flex-col justify-center p-6 lg:col-span-2 lg:p-8">
                    <h3 className="mb-3 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-[#00FF41] sm:text-3xl">
                      {featured.title}
                    </h3>
                    <p className="mb-4 text-gray-400 line-clamp-3">
                      {featured.excerpt.replace(/<[^>]+>/g, "").trim()}
                    </p>
                    <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#00FF41] transition-colors">
                      Leer más
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Últimas Noticias */}
      <section className="bg-gray-950 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-[#00FF41]" />
              <h2 className="text-3xl font-bold text-white">Últimas Noticias</h2>
            </div>
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