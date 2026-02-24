import { fetchAPI } from "@/lib/api";
import PostCard from "@/components/PostCard";
import GameSubHeader from "@/components/GameSubHeader";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Definimos la interfaz de los datos que vienen de WP
interface GuiaWP {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export const revalidate = 60; // ISR: Revalidar cada 60 segundos

// Función para obtener las guías filtradas por juego
async function getGuiasPorJuego(gameSlug: string) {
  const query = `
    query GetGuiasPorJuego($game: String!) {
      guias(
        where: {
          taxQuery: {
            relation: AND,
            taxArray: [
              {
                taxonomy: JUEGO, 
                terms: [$game], 
                field: SLUG
              }
            ]
          }
          orderby: { field: DATE, order: DESC }
        }
      ) {
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
  `;

  // IMPORTANTE: Si tu taxonomía en CPT UI tiene "Nombre singular GraphQL" = juego,
  // el enum aquí suele ser JUEGO (en mayúsculas).

  try {
    const data = await fetchAPI(query, { game: gameSlug });
    return data?.guias?.nodes || [];
  } catch (error) {
    console.error("Error fetching guias:", error);
    return [];
  }
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: Promise<{ game: string }> }): Promise<Metadata> {
  const { game } = await params;
  return {
    title: `Guías de ${game.replace("-", " ").toUpperCase()} - GTAVerso`,
    description: `Las mejores guías, trucos y consejos para ${game}.`,
  };
}

export default async function GuiasPage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const guias = await getGuiasPorJuego(game);

  // Mapeamos los datos de WP al formato de PostCard
  const posts = guias.map((guia: GuiaWP) => ({
    title: guia.title,
    slug: guia.slug,
    // Limpiamos etiquetas HTML del excerpt si vienen
    excerpt: guia.excerpt?.replace(/<[^>]+>/g, "") || "",
    game: game, // Usamos el game de la URL
    type: "guias", // Forzamos el tipo 'guias' para la URL del enlace
    date: guia.date,
    cover: guia.featuredImage?.node?.sourceUrl || "/images/placeholder.jpg",
  }));

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <GameSubHeader
          title="Guías y Trucos"
          gameTitle={game.replace("-", " ").toUpperCase()}
          gameLink={`/juegos/${game}`}
          color="#00FF41"
        />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            {posts.map((post: any) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-white/60">Aún no hay guías publicadas para este juego.</p>
            <p className="text-sm text-white/40 mt-2">
              ¡Pero no te preocupes! Estamos trabajando para traerte las mejores guías muy pronto.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}