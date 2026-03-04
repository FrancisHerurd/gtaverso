// lib/seo.ts
import { Metadata } from 'next'
import { normalizeImageUrl, toAbsoluteUrl } from './utils'

type SEOProps = {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  noindex?: boolean
}

const SITE_NAME = 'GTAVerso'
const SITE_URL = 'https://gtaverso.com'
const DEFAULT_TITLE = 'GTAVerso - Noticias, Guías y Trucos de GTA'
const DEFAULT_DESCRIPTION = 'Tu fuente definitiva de noticias, guías, trucos y análisis de Grand Theft Auto: GTA 6, GTA 5, GTA 4, San Andreas y toda la saga.'
const DEFAULT_IMAGE = `${SITE_URL}/og-default.webp`
const TWITTER_HANDLE = '@GTA_Verso'

export function generateSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags = [],
  noindex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`
  const normalizedImage = toAbsoluteUrl(normalizeImageUrl(image)) // ✅ Absoluta para metadatos

  const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    
    // Open Graph
    openGraph: {
      type,
      locale: 'es_ES',
      url: fullUrl,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: normalizedImage,
          width: 1200,
          height: 630,
          alt: title || DEFAULT_TITLE,
        },
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [normalizedImage],
    },

    // Robots
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Alternates
    alternates: {
      canonical: fullUrl,
    },

    // Meta keywords para Google News (opcional pero ayuda)
    other: {
      'news_keywords': tags.join(', '),
    },
  }

  // Open Graph adicional para artículos
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : ['GTAVerso'],
      section: 'Videojuegos',
      tags,
    }
  }

  return metadata
}

/**
 * Genera NewsArticle Schema COMPLETO para Google News 2026
 * Incluye TODOS los campos requeridos y recomendados
 */
export function generateNewsArticleSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = 'GTAVerso',
  game,
  category,
}: {
  title: string
  description: string
  image: string
  url: string
  publishedTime: string
  modifiedTime: string
  author?: string
  game?: string
  category?: string
}) {
  // Normalizar fechas a ISO 8601
  const normalizeDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImage = toAbsoluteUrl(normalizeImageUrl(image)); // ✅ Absoluta para schema

  // Detectar si es autor personal o de organización
  const isPersonalAuthor = author && author !== 'GTAVerso' && author !== 'Equipo GTAVerso' && author !== 'GTA Verso';

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    
    // Campos REQUERIDOS
    headline: title.substring(0, 110),
    image: {
      '@type': 'ImageObject',
      url: fullImage,
      width: 1200,
      height: 630,
    },
    datePublished: normalizeDate(publishedTime),
    dateModified: normalizeDate(modifiedTime || publishedTime),
    
    // Autor dinámico (Person u Organization)
    author: isPersonalAuthor ? {
      '@type': 'Person',
      name: author,
      url: SITE_URL,
    } : {
      '@type': 'Organization',
      name: author || 'GTAVerso',
      url: SITE_URL,
    },
    
    // Publisher REQUERIDO con logo
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-header.png`,
        width: 300,
        height: 80,
      },
    },
    
    // URL canónica
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    
    // Campos RECOMENDADOS para Google News
    description: description.substring(0, 200),
    articleSection: category || 'Videojuegos',
    about: {
      '@type': 'VideoGame',
      name: game || 'Grand Theft Auto',
    },
    
    // Indica que es contenido original
    isAccessibleForFree: true,
    
    // Idioma del artículo
    inLanguage: 'es-ES',
    
    // Keywords para Google News
    keywords: game ? `${game}, Grand Theft Auto, Rockstar Games, ${category || 'noticias'}` : 'Grand Theft Auto, Rockstar Games',
  }
}

/**
 * ALTERNATIVA: ArticleSchema genérico (para guías, tutoriales no-noticia)
 */
export function generateArticleSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = 'GTAVerso',
}: {
  title: string
  description: string
  image: string
  url: string
  publishedTime: string
  modifiedTime: string
  author?: string
}) {
  const normalizeDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };

  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImage = toAbsoluteUrl(normalizeImageUrl(image)); // ✅ Absoluta para schema

  const isPersonalAuthor = author && author !== 'GTAVerso' && author !== 'Equipo GTAVerso' && author !== 'GTA Verso';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: {
      '@type': 'ImageObject',
      url: fullImage,
      width: 1200,
      height: 630,
    },
    datePublished: normalizeDate(publishedTime),
    dateModified: normalizeDate(modifiedTime || publishedTime),
    author: isPersonalAuthor ? {
      '@type': 'Person',
      name: author,
      url: SITE_URL,
    } : {
      '@type': 'Organization',
      name: author || 'GTAVerso',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-header.png`,
        width: 300,
        height: 80,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'es-ES',
  }
}

/**
 * Schema de Organización para la página principal
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-header.png`,
    description: DEFAULT_DESCRIPTION,
    sameAs: [
      'https://twitter.com/GTA_Verso',
      'https://instagram.com/GTA_Verso',
      'https://tiktok.com/@gta.verso',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      url: `${SITE_URL}/contacto`,
    },
  }
}