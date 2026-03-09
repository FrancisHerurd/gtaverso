// lib/api.ts - VERSIÓN COMPATIBLE CON WPGRAPHQL + TAGS + PROXY DE IMÁGENES

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL no está definida');
}

// ✅ FUNCIÓN: Normalizar URLs de imágenes de WordPress a rutas relativas
function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return '/og-default.webp';
  
  // Si ya es una ruta relativa de gtaverso.com, retornar sin cambios
  if (url.startsWith('/wp-images/') || url.startsWith('/images/')) return url;
  
  // Convertir URLs de WordPress a ruta relativa del proxy
  if (url.includes('csm.gtaverso.com/wp-content/uploads')) {
    return url.replace(
      /https?:\/\/csm\.gtaverso\.com\/wp-content\/uploads/,
      '/wp-images'
    );
  }
  
  // Si ya es gtaverso.com, convertir a ruta relativa
  if (url.includes('gtaverso.com/wp-images')) {
    return url.replace(/https?:\/\/gtaverso\.com/, '');
  }
  
  // Si es ruta relativa, retornar tal cual
  if (url.startsWith('/')) {
    return url;
  }
  
  // Fallback: retornar sin cambios
  return url;
}

// ✅ FUNCIÓN: Normalizar post (aplicar a imágenes)
function normalizePost(post: any) {
  if (!post) return null;
  
  return {
    ...post,
    featuredImage: post.featuredImage?.node 
      ? {
          node: {
            ...post.featuredImage.node,
            sourceUrl: normalizeImageUrl(post.featuredImage.node.sourceUrl),
          }
        }
      : null,
    seo: post.seo
      ? {
          ...post.seo,
          opengraphImage: post.seo.opengraphImage?.sourceUrl
            ? {
                sourceUrl: normalizeImageUrl(post.seo.opengraphImage.sourceUrl),
              }
            : undefined,
        }
      : undefined,
  };
}

// ✅ FUNCIÓN: Normalizar personaje (aplicar a imágenes)
function normalizeCharacter(character: any) {
  if (!character) return null;

  return {
    ...character,
    featuredImage: character.featuredImage?.node
      ? {
          node: {
            ...character.featuredImage.node,
            sourceUrl: normalizeImageUrl(character.featuredImage.node.sourceUrl),
          },
        }
      : null,
  };
}

export async function fetchAPI(query: string, variables = {}) {
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
          tags {
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

  // ✅ Normalizar URLs de imágenes en todos los posts
  return data.posts.nodes.map(normalizePost);
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
        tags {
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

  // ✅ Normalizar URLs de imágenes en el post individual
  return normalizePost(data?.post);
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

// ✅ NUEVO: Obtener todos los personajes
export async function getAllCharacters() {
  const data = await fetchAPI(`
    query AllCharacters {
      personajes(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
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
          juegos {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `);

  if (!data?.personajes?.nodes) {
    console.log('No characters from WordPress');
    return [];
  }

  return data.personajes.nodes.map(normalizeCharacter);
}

// ✅ NUEVO: Obtener personaje por slug
export async function getCharacterBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query CharacterBySlug($slug: ID!) {
      personaje(id: $slug, idType: SLUG) {
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
        juegos {
          nodes {
            name
            slug
          }
        }
      }
    }
    `,
    { slug }
  );

  return normalizeCharacter(data?.personaje);
}

// ✅ NUEVO: Obtener personajes por juego
export async function getCharactersByGame(gameSlug: string) {
  const allCharacters = await getAllCharacters();

  if (!allCharacters || allCharacters.length === 0) {
    return [];
  }

  return allCharacters.filter((character: any) =>
    character.juegos?.nodes?.some((juego: any) => juego.slug === gameSlug)
  );
}

// Obtener posts por juego (sin taxQuery)
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

// Obtener posts por juego Y tipo
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