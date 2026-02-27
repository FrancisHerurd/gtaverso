// src/lib/wp.ts

import type {
  WPPost,
  WPPostDetail,
  WPJuego,
  WPPostsResponse,
  WPJuegosResponse,
  WPPostResponse,
} from '@/types/wordpress';

const WP_URL =
  process.env.NEXT_PUBLIC_WP_URL ?? 'https://csm.gtaverso.com/graphql';

/**
 * Función genérica para llamar a WordPress GraphQL
 */
export async function fetchFromWP<T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T | null> {
  try {
    const res = await fetch(WP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }, // ISR: refresca cada 60s
    });

    if (!res.ok) {
      console.error('[WP] HTTP error:', res.status, res.statusText);
      return null;
    }

    const json = await res.json();

    if (json.errors) {
      console.error('[WP GraphQL errors]', json.errors);
      return null;
    }

    return json.data as T;
  } catch (err) {
    console.error('[fetchFromWP] Error:', err);
    return null;
  }
}

/* ─── Fragmento reutilizable de campos POST ─────────── */
const POST_FIELDS = `
  title
  slug
  excerpt
  date
  modified
  databaseId
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
  }
  juegos {
    nodes {
      name
      slug
      databaseId
    }
  }
  tipos {
    nodes {
      name
      slug
    }
  }
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
    }
    twitterTitle
    twitterDescription
    fullHead
  }
  author {
    node {
      name
      slug
    }
  }
`;

/* ─── QUERIES GRAPHQL ─────────────────────────────────── */

/**
 * Obtener todos los juegos (taxonomía)
 */
export const QUERY_ALL_JUEGOS = /* GraphQL */ `
  query GetAllJuegos {
    juegos(first: 100) {
      nodes {
        name
        slug
        databaseId
        count
      }
    }
  }
`;

/**
 * Obtener posts por juego (ej: gta-5, san-andreas)
 */
export const QUERY_POSTS_BY_JUEGO = /* GraphQL */ `
  query GetPostsByJuego($slug: String!, $first: Int = 20) {
    juegos(where: { slug: [$slug] }) {
      nodes {
        name
        slug
        databaseId
        posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            ${POST_FIELDS}
          }
        }
      }
    }
  }
`;

/**
 * Obtener posts por juego + tipo (ej: gta-5 + noticias)
 */
export const QUERY_POSTS_BY_GAME_TYPE = /* GraphQL */ `
  query GetPostsByGameType($game: String!, $type: String!, $first: Int = 20) {
    posts(
      first: $first
      where: {
        taxQuery: {
          relation: AND
          taxArray: [
            { taxonomy: JUEGO, terms: [$game], field: SLUG }
            { taxonomy: TIPO, terms: [$type], field: SLUG }
          ]
        }
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

/**
 * Obtener post individual por slug
 */
export const QUERY_POST_BY_SLUG = /* GraphQL */ `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
      content
    }
  }
`;

/**
 * Obtener todos los posts (homepage, etc.)
 */
export const QUERY_ALL_POSTS = /* GraphQL */ `
  query GetAllPosts($first: Int = 100) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ${POST_FIELDS}
      }
    }
  }
`;

/* ─── FUNCIONES HELPERS ─────────────────────────────── */

/**
 * Obtener todos los juegos
 */
export async function getAllJuegos(): Promise<WPJuego[]> {
  const data = await fetchFromWP<WPJuegosResponse>(QUERY_ALL_JUEGOS);
  return data?.juegos?.nodes || [];
}

/**
 * Obtener posts filtrados por juego
 */
export async function getPostsByJuego(slug: string) {
  const data = await fetchFromWP<WPJuegosResponse>(QUERY_POSTS_BY_JUEGO, {
    slug,
  });

  const juego = data?.juegos?.nodes?.[0];

  return {
    juego: juego ? { name: juego.name, slug: juego.slug } : null,
    posts: juego?.posts?.nodes || [],
  };
}

/**
 * Obtener posts filtrados por juego + tipo
 */
export async function getPostsByGameAndType(
  game: string,
  type: string
): Promise<WPPost[]> {
  const data = await fetchFromWP<WPPostsResponse>(QUERY_POSTS_BY_GAME_TYPE, {
    game,
    type,
  });
  return data?.posts?.nodes || [];
}

/**
 * Obtener post individual por slug
 */
export async function getPostBySlug(slug: string): Promise<WPPostDetail | null> {
  const data = await fetchFromWP<WPPostResponse>(QUERY_POST_BY_SLUG, { slug });
  return data?.post || null;
}

/**
 * Obtener todos los posts
 */
export async function getAllPosts(): Promise<WPPost[]> {
  const data = await fetchFromWP<WPPostsResponse>(QUERY_ALL_POSTS);
  return data?.posts?.nodes || [];
}

/**
 * Helper: Normalizar WPPost a formato legacy (compatibilidad)
 */
export function normalizeWPPost(post: WPPost): WPPost & {
  description: string;
  cover?: string;
  game?: string;
  type?: string;
} {
  return {
    ...post,
    description: post.excerpt,
    cover: post.featuredImage?.node?.sourceUrl,
    game: post.juegos?.nodes?.[0]?.slug,
    type: post.tipos?.nodes?.[0]?.slug,
  };
}