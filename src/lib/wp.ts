const WP_URL =
  process.env.NEXT_PUBLIC_WP_URL ?? "https://cms.gtaverso.com/graphql";

export async function fetchFromWP<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  try {
    const res = await fetch(WP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR: refresca cada 60 s
    });
    const json = await res.json();
    if (json.errors) {
      console.error("[WP GraphQL errors]", json.errors);
      throw new Error("Error en WP GraphQL");
    }
    return json.data as T;
  } catch (err) {
    console.error("[fetchFromWP]", err);
    return null;
  }
}

/* ─── Tipos ─────────────────────────────────────────── */
export type WPPost = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: { node: { sourceUrl: string } };
  /** Taxonomías custom (requiere WPGraphQL + ACF) */
  juegos?: { nodes: { slug: string }[] };
  tipos?: { nodes: { slug: string }[] };
};

/* ─── Queries reutilizables ─────────────────────────── */
export const QUERY_POSTS_BY_GAME_TYPE = /* GraphQL */ `
  query GetPostsByGameType($game: String!, $type: String!) {
    posts(
      first: 20
      where: {
        taxQuery: {
          relation: AND
          taxArray: [
            { taxonomy: JUEGO, terms: [$game], field: SLUG }
            { taxonomy: TIPO,  terms: [$type],  field: SLUG }
          ]
        }
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
          }
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = /* GraphQL */ `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      slug
      excerpt
      date
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
`;