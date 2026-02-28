// lib/api.ts - VERSIÓN COMPATIBLE CON WPGRAPHQL

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL no está definida');
}

async function fetchAPI(query: string, variables = {}) {
  if (!query || query.trim() === '') {
    console.error('❌ Query GraphQL vacía');
    return null;
  }

  try {
    const res = await fetch(WORDPRESS_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    const json = await res.json();

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

export async function getAllPosts() {
  const data = await fetchAPI(`
    query AllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
          modified
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          author {
            node {
              name
            }
          }
          juegos {
            nodes {
              name
              slug
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
            }
            twitterTitle
            twitterDescription
            fullHead
          }
        }
      }
    }
  `);

  if (!data?.posts?.nodes) {
    console.log('No posts from WordPress');
    return [];
  }

  return data.posts.nodes;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        modified
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
            slug
          }
        }
        juegos {
          nodes {
            name
            slug
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
          }
          twitterTitle
          twitterDescription
          fullHead
        }
      }
    }
  `,
    { slug }
  );

  return data?.post;
}

export async function getAllJuegos() {
  const data = await fetchAPI(`
    query AllJuegos {
      juegos(first: 100) {
        nodes {
          id
          name
          slug
          description
        }
      }
    }
  `);

  return data?.juegos?.nodes || [];
}

// ✅ NUEVA FUNCIÓN: Obtener posts por juego (sin taxQuery)
export async function getPostsByGame(gameSlug: string) {
  // Obtener TODOS los posts y filtrar en el cliente
  const allPosts = await getAllPosts();
  
  if (!allPosts || allPosts.length === 0) {
    return [];
  }
  
  return allPosts.filter((post: any) => 
    post.juegos?.nodes?.some((juego: any) => juego.slug === gameSlug)
  );
}

// ✅ NUEVA FUNCIÓN: Obtener posts por juego Y tipo
export async function getPostsByGameAndType(gameSlug: string, tipoSlug: string) {
  // Obtener TODOS los posts y filtrar en el cliente
  const allPosts = await getAllPosts();
  
  if (!allPosts || allPosts.length === 0) {
    console.log('⚠️ No hay posts disponibles');
    return [];
  }
  
  const filtered = allPosts.filter((post: any) => {
    const hasGame = post.juegos?.nodes?.some((juego: any) => juego.slug === gameSlug);
    const hasTipo = post.tipos?.nodes?.some((tipo: any) => tipo.slug === tipoSlug);
    
    return hasGame && hasTipo;
  });
  
  console.log(`✅ Posts filtrados para ${gameSlug}/${tipoSlug}:`, filtered.length);
  
  return filtered;
}