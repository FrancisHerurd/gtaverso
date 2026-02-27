// src/types/wordpress.ts

/**
 * Taxonomía personalizada "Juegos" desde ACF
 */
export interface JuegoTaxonomy {
  name: string;        // Ej: "GTA V"
  slug: string;        // Ej: "gta-v"
  databaseId: number;  // ID de WordPress
}

/**
 * Metadatos SEO de Yoast
 */
export interface YoastSEO {
  title: string;                    // Meta title
  metaDesc: string;                 // Meta description
  canonical?: string;               // URL canónica
  opengraphTitle?: string;          // OG title
  opengraphDescription?: string;    // OG description
  opengraphImage?: {
    sourceUrl: string;
    altText?: string;
  };
  twitterTitle?: string;
  twitterDescription?: string;
  fullHead?: string;                // HTML completo pre-renderizado
}

/**
 * Post de WordPress con taxonomías y SEO
 */
export interface WordPressPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  
  // Taxonomía Juegos
  juegos?: {
    nodes: JuegoTaxonomy[];
  };
  
  // SEO de Yoast
  seo?: YoastSEO;
}

/**
 * Respuesta paginada de posts
 */
export interface PostsConnection {
  nodes: WordPressPost[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}