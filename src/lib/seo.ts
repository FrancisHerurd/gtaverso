// lib/seo.ts
import { Metadata } from 'next'

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
const SITE_URL = 'https://www.gtaverso.com'
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
          url: image,
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
      images: [image],
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
  }

  // Open Graph adicional para artículos
  if (type === 'article' && metadata.openGraph && typeof metadata.openGraph === 'object') {
    metadata.openGraph.article = {
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
    }
  }

  return metadata
}

// Generar JSON-LD para structured data
export function generateArticleSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author = 'Equipo GTAVerso',
}: {
  title: string
  description: string
  image: string
  url: string
  publishedTime: string
  modifiedTime: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    image: [image],
    datePublished: publishedTime,
    dateModified: modifiedTime,
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
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
      item: item.url,
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
  }
}