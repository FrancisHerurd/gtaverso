// app/page.tsx
import Image from "next/image";
import { fetchAPI } from "@/lib/api"; // Conexión a WordPress
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";

// ─── 1. Query a WordPress ─────────────────────────────────────────────────
async function getHomePosts() {
  const data = await fetchAPI(`
    query HomePosts {
      posts(first: 9, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          title
          slug
          excerpt
          date
          featuredImage { node { sourceUrl } }
          juegos { nodes { slug name } }
          categories { nodes { slug name } }
        }
      }
    }
  `);

  const nodes = data?.posts?.nodes || [];

  // Mapeamos los datos de WP para que encajen con tu componente <PostCard />
  return nodes.map((node: any) => {
    const gameSlug = node.juegos?.nodes?.[0]?.slug || "gta-6";
    // Buscamos la categoría principal para usarla como "type" (noticias, guias, etc)
    const typeSlug = node.categories?.nodes?.find((c: any) => c.slug !== 'sin-categoria')?.slug || "noticias";

    return {
      title: node.title || "Sin título",
      slug: node.slug,
      // Limpiamos las etiquetas HTML del excerpt de WordPress
      description: (node.excerpt || "").replace(/<[^>]+>/g, "").trim(),
      date: node.date,
      cover: node.featuredImage?.node?.sourceUrl || "/images/default-cover.jpg",
      game: gameSlug,
      type: typeSlug,
    };
  });
}

// ─── 2. Metadatos de Next.js para SEO ─────────────────────────────────────
export const metadata = {
  title: "GTAVerso - Noticias GTA 6, GTA 5 Online, Guías y Leaks",
  description: "Últimas noticias, guías, trucos y análisis de GTA 6, GTA Online y toda la saga GTA.",
  openGraph: {
    title: "GTAVerso - Noticias GTA 6, GTA 5 Online, Guías y Leaks",
    description: "Últimas noticias, guías, trucos y análisis de GTA 6, GTA Online y toda la saga GTA.",
    url: "https://gtaverso.com",
    siteName: "GTAVerso",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1216,
        height: 630,
        alt: "GTAVerso Portada",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

// ─── 3. Componente Principal ──────────────────────────────────────────────
export default async function Page() {
  const posts = await getHomePosts();
  
  // Separamos los 3 primeros para Destacados y los 6 siguientes para Últimas Noticias
  const featured = posts.slice(0, 3);
  const latest = posts.slice(3, 9);

  const main = featured[0];
  const small = featured.slice(1);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GTAVerso",
    url: "https://gtaverso.com",
    description: "Noticias, guías, análisis y trucos de la saga GTA",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gtaverso.com/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="min-h-screen bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-125 flex-col justify-center overflow-hidden border-b border-white/8 bg-gray-950 sm:min-h-150">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.webp"
            alt="Fondo de la ciudad de GTA Vice City"
            fill
            className="object-cover opacity-80"
            style={{ objectPosition: "center 30%" }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.8)_100%)]" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-b from-transparent to-gray-950" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-(--container) flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-[5rem] lg:leading-none">
            GTAVerso
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium text-gray-100 drop-shadow-lg sm:text-xl">
            Noticias, guías, análisis y trucos de la saga GTA
          </p>
          <div className="mt-10 w-full max-w-xl">
            <div className="relative rounded-full bg-black/40 shadow-2xl ring-1 ring-white/10 backdrop-blur-md transition-all hover:bg-black/60 hover:ring-(--gta-green)/50">
               <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* ================= DESTACADOS ================= */}
      <section aria-labelledby="home-featured-heading" className="relative border-b border-white/8 bg-gray-950">
        <div className="mx-auto max-w-(--container) px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-(--gta-green)" aria-hidden="true" />
            <h2 id="home-featured-heading" className="text-2xl font-bold text-white">
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

      {/* ================= ÚLTIMAS NOTICIAS ================= */}
      <section aria-labelledby="home-latest-heading" className="relative bg-gray-950">
        <div className="mx-auto max-w-(--container) px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-(--gta-green)" aria-hidden="true" />
            <h2 id="home-latest-heading" className="text-2xl font-bold text-white">
              Últimas Noticias
            </h2>
          </div>

          {latest.length === 0 ? (
            <p className="text-gray-400">Aún no hay noticias publicadas en WordPress.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}