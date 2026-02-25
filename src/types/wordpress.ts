// src/types/wordpress.ts

/**
 * Tipo base para un post que viene de WordPress (WPGraphQL)
 * Adaptado para que funcione con los componentes existentes
 */
export interface WPPost {
  title: string;
  slug: string;
  excerpt?: string;
  description?: string; // Alias de excerpt para compatibilidad
  date: string;
  modified?: string;
  cover?: string; // URL de la imagen destacada
  game?: string; // Slug del juego (gta-6, gta-5, etc.)
  type?: string; // Tipo de contenido (noticias, guias, trucos, etc.)
  author?: {
    name: string;
  };
  featuredImage?: {
    node?: {
      sourceUrl?: string;
      altText?: string;
    };
  };
}

/**
 * Estructura completa de un post individual con contenido HTML
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
      endCursor: string;
    };
  };
}