// lib/api.ts

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL no está definida');
}

function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return '/og-default.webp';
  if (url.startsWith('/wp-images/') || url.startsWith('/images/')) return url;
  if (url.includes('csm.gtaverso.com/wp-content/uploads')) {
    return url.replace(/https?:\/\/csm\.gtaverso\.com\/wp-content\/uploads/, '/wp-images');
  }
  if (url.includes('gtaverso.com/wp-images')) {
    return url.replace(/https?:\/\/gtaverso\.com/, '');
  }
  if (url.startsWith('/')) return url;
  return url;
}

function normalizePost(post: any) {
  if (!post) return null;
  return {
    ...post,
    featuredImage: post.featuredImage?.node
      ? { node: { ...post.featuredImage.node, sourceUrl: normalizeImageUrl(post.featuredImage.node.sourceUrl) } }
      : null,
    seo: post.seo
      ? {
          ...post.seo,
          opengraphImage: post.seo.opengraphImage?.sourceUrl
            ? { sourceUrl: normalizeImageUrl(post.seo.opengraphImage.sourceUrl) }
            : undefined,
        }
      : undefined,
  };
}

function normalizeCharacter(character: any) {
  if (!character) return null;
  return {
    ...character,
    featuredImage: character.featuredImage?.node
      ? { node: { ...character.featuredImage.node, sourceUrl: normalizeImageUrl(character.featuredImage.node.sourceUrl) } }
      : null,
  };
}

// ✅ imagen viene como { node: { sourceUrl, altText } }
// ✅ enlace viene como AcfLink { url, title, target } → lo aplanamos a string
function normalizeRepeaterWithImage(items: any[]) {
  return (items || []).map((item: any) => ({
    ...item,
    imagen: item.imagen?.node?.sourceUrl
      ? {
          sourceUrl: normalizeImageUrl(item.imagen.node.sourceUrl),
          altText:   item.imagen.node.altText || '',
        }
      : null,
    enlace: item.enlace?.url || null,
  }));
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
          id title slug date modified excerpt content
          featuredImage { node { sourceUrl altText } }
          author { node { name } }
          juegos { nodes { name slug } }
          tipos { nodes { name slug } }
          tags { nodes { name slug } }
          seo {
            title metaDesc canonical
            opengraphTitle opengraphDescription
            opengraphImage { sourceUrl }
            twitterTitle twitterDescription fullHead
          }
        }
      }
    }
  `);
  if (!data?.posts?.nodes) return [];
  return data.posts.nodes.map(normalizePost);
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(`
    query PostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id title slug date modified content excerpt
        featuredImage { node { sourceUrl altText } }
        author { node { name slug } }
        juegos { nodes { name slug } }
        tipos { nodes { name slug } }
        tags { nodes { name slug } }
        seo {
          title metaDesc canonical
          opengraphTitle opengraphDescription
          opengraphImage { sourceUrl }
          twitterTitle twitterDescription fullHead
        }
      }
    }
  `, { slug });
  return normalizePost(data?.post);
}

export async function getAllJuegos() {
  const data = await fetchAPI(`
    query AllJuegos {
      juegos(first: 100) {
        nodes { id name slug description }
      }
    }
  `);
  return data?.juegos?.nodes || [];
}

export async function getAllCharacters() {
  const data = await fetchAPI(`
    query AllCharacters {
      personajes(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id title slug date modified excerpt content
          featuredImage { node { sourceUrl altText } }
          juegos { nodes { name slug } }
        }
      }
    }
  `);
  if (!data?.personajes?.nodes) return [];
  return data.personajes.nodes.map(normalizeCharacter);
}

export async function getCharacterBySlug(slug: string) {
  const data = await fetchAPI(`
    query CharacterBySlug($slug: ID!) {
      personaje(id: $slug, idType: SLUG) {
        id title slug date modified excerpt content
        featuredImage { node { sourceUrl altText } }
        juegos { nodes { name slug } }
        characterFields {
          nombreCompleto
          alias
          nacionalidad
          genero
          fechaDeNacimiento
          ubicacion
          rol
          actividad
          actor
          galeria {
            nodes { id sourceUrl altText }
          }
          video
          familiaDestacada {
            nombre
            imagen {
              node {
                sourceUrl
                altText
              }
            }
            enlace {
              url
              title
              target
            }
          }
          bandasDestacadas {
            nombre
            imagen {
              node {
                sourceUrl
                altText
              }
            }
            enlace {
              url
              title
              target
            }
          }
        }
      }
    }
  `, { slug });

  const character = data?.personaje;
  if (!character) return null;

  const cf = character.characterFields;

  // 🔍 DEBUG TEMPORAL — eliminar tras verificar
  console.log('familiaDestacada raw:', JSON.stringify(cf?.familiaDestacada, null, 2));

  return {
    ...normalizeCharacter(character),
    characterFields: cf
      ? {
          ...cf,
          galeria: {
            nodes: (cf.galeria?.nodes || []).map((img: any) => ({
              ...img,
              sourceUrl: normalizeImageUrl(img.sourceUrl),
            })),
          },
          familiaDestacada: normalizeRepeaterWithImage(cf.familiaDestacada || []),
          bandasDestacadas: normalizeRepeaterWithImage(cf.bandasDestacadas || []),
        }
      : null,
  };
}

export async function getCharactersByGame(gameSlug: string) {
  const allCharacters = await getAllCharacters();
  if (!allCharacters || allCharacters.length === 0) return [];
  return allCharacters.filter((character: any) =>
    character.juegos?.nodes?.some((juego: any) => juego.slug === gameSlug)
  );
}

export async function getPostsByGame(gameSlug: string) {
  const allPosts = await getAllPosts();
  if (!allPosts || allPosts.length === 0) return [];
  return allPosts.filter((post: any) =>
    post.juegos?.nodes?.some((juego: any) => juego.slug === gameSlug)
  );
}

export async function getPostsByGameAndType(gameSlug: string, tipoSlug: string) {
  const allPosts = await getAllPosts();
  if (!allPosts || allPosts.length === 0) return [];
  return allPosts.filter((post: any) => {
    const hasGame = post.juegos?.nodes?.some((juego: any) => juego.slug === gameSlug);
    const hasTipo = post.tipos?.nodes?.some((tipo: any) => tipo.slug === tipoSlug);
    return hasGame && hasTipo;
  });
}