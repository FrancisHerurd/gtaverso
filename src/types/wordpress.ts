// src/types/wordpress.ts

/**
 * Taxonomía "Juegos" desde ACF/WordPress
 */
export interface WPJuego {
  name: string;
  slug: string;
  databaseId: number;
  count?: number;
}

/**
 * Taxonomía "Tipos" (noticias, guías, trucos, etc.)
 */
export interface WPTipo {
  name: string;
  slug: string;
}

/**
 * Metadatos SEO de Yoast
 */
export interface WPYoastSEO {
  title: string;
  metaDesc: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl: string;
    altText?: string;
  };
  twitterTitle?: string;
  twitterDescription?: string;
  fullHead?: string; // HTML completo pre-renderizado con JSON-LD
}

/**
 * Imagen destacada de WordPress
 */
export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText?: string;
    mediaDetails?: {
      width: number;
      height: number;
    };
  };
}

/**
 * Autor de WordPress
 */
export interface WPAuthor {
  node: {
    name: string;
    slug: string;
    avatar?: {
      url: string;
    };
  };
}

/**
 * Post básico de WordPress (lista)
 */
export interface WPPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  modified?: string;
  databaseId?: number;
  
  // Imagen destacada
  featuredImage?: WPFeaturedImage;
  
  // Taxonomías
  juegos?: { nodes: WPJuego[] };
  tipos?: { nodes: WPTipo[] };
  
  // SEO de Yoast
  seo?: WPYoastSEO;
  
  // Autor
  author?: WPAuthor;
  
  // Alias para compatibilidad con código legacy
  description?: string; // = excerpt
  cover?: string; // = featuredImage.node.sourceUrl
  game?: string; // = juegos.nodes[0].slug
  type?: string; // = tipos.nodes[0].slug
}

/**
 * Post completo con contenido HTML
 */
export interface WPPostDetail extends WPPost {
  content: string;
}

/**
 * Respuesta paginada de WordPress
 */
export interface WPPostsResponse {
  posts: {
    nodes: WPPost[];
    pageInfo?: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

/**
 * Respuesta de taxonomía Juegos
 */
export interface WPJuegosResponse {
  juegos: {
    nodes: Array<{
      name: string;
      slug: string;
      databaseId: number;
      count?: number;
      posts?: {
        nodes: WPPost[];
      };
    }>;
  };
}

/**
 * Respuesta de post individual
 */
export interface WPPostResponse {
  post: WPPostDetail;
}