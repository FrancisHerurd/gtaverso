// src/lib/api.ts (ACTUALIZADO)

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error(
    '❌ NEXT_PUBLIC_WORDPRESS_API_URL no está definida. ' +
    'Asegúrate de tener un archivo .env.local con esta variable.'
  );
}

/**
 * Fragmento reutilizable para campos de Post
 */
const POST_FIELDS = `
  id
  databaseId
  title
  slug
  excerpt
  content
  date
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
`;

/**
 * Query: Obtener todos los posts
 */
export const GET_ALL_POSTS_QUERY = `
  query GetAllPosts($first: Int = 100, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        ${POST_FIELDS}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Query: Obtener post por slug
 */
export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ${POST_FIELDS}
    }
  }
`;

/**
 * Query: Obtener posts por taxonomía Juegos
 */
export const GET_POSTS_BY_JUEGO_QUERY = `
  query GetPostsByJuego($slug: String!, $first: Int = 20) {
    juegos(where: { slug: [$slug] }) {
      nodes {
        name
        slug
        posts(first: $first) {
          nodes {
            ${POST_FIELDS}
          }
        }
      }
    }
  }
`;

/**
 * Query: Obtener todas las taxonomías Juegos
 */
export const GET_ALL_JUEGOS_QUERY = `
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
 * Función genérica para llamar a GraphQL
 */
export async function fetchAPI(
  query: string,
  variables?: Record<string, any>
): Promise<any> {
  const apiUrl = WORDPRESS_API_URL as string;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        revalidate: 60, // Revalidar cada 60 segundos
      },
    });

    if (!response.ok) {
      console.error('❌ Error en respuesta de WordPress:', response.status, response.statusText);
      return null;
    }

    const json = await response.json();

    if (json.errors) {
      console.error('❌ Errores en GraphQL:', json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('❌ Error conectando con WordPress:', error);
    return null;
  }
}

/**
 * Obtener todos los posts
 */
export async function getAllPosts() {
  const data = await fetchAPI(GET_ALL_POSTS_QUERY);
  return data?.posts?.nodes || [];
}

/**
 * Obtener post por slug
 */
export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(GET_POST_BY_SLUG_QUERY, { slug });
  return data?.post || null;
}

/**
 * Obtener posts filtrados por juego
 */
export async function getPostsByJuego(slug: string) {
  const data = await fetchAPI(GET_POSTS_BY_JUEGO_QUERY, { slug });
  const juego = data?.juegos?.nodes?.[0];
  
  return {
    juego: juego ? { name: juego.name, slug: juego.slug } : null,
    posts: juego?.posts?.nodes || [],
  };
}

/**
 * Obtener todas las taxonomías Juegos
 */
export async function getAllJuegos() {
  const data = await fetchAPI(GET_ALL_JUEGOS_QUERY);
  return data?.juegos?.nodes || [];
}