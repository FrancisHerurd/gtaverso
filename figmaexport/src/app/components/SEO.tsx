import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  type?: 'website' | 'article';
  image?: string;
  url?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export function SEO({
  title,
  description,
  type = 'website',
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  tags
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | GTA News - Noticias y Guías`;

    // Update or create meta tags
    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    
    if (image) {
      updateMetaTag('og:image', image);
      updateMetaTag('twitter:image', image);
    }
    
    if (url) {
      updateMetaTag('og:url', url);
    }
    
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // Article specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime);
      }
      if (author) {
        updateMetaTag('article:author', author);
      }
      if (tags) {
        tags.forEach(tag => {
          addMetaTag('article:tag', tag);
        });
      }
    }
  }, [title, description, type, image, url, publishedTime, modifiedTime, author, tags]);

  return null;
}

function updateMetaTag(property: string, content: string) {
  // Try property first (for og: tags)
  let element = document.querySelector(`meta[property="${property}"]`);
  
  // If not found, try name attribute
  if (!element) {
    element = document.querySelector(`meta[name="${property}"]`);
  }
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    const meta = document.createElement('meta');
    
    // Use property for og: and article: tags, name for others
    if (property.startsWith('og:') || property.startsWith('article:')) {
      meta.setAttribute('property', property);
    } else {
      meta.setAttribute('name', property);
    }
    
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
}

function addMetaTag(property: string, content: string) {
  const meta = document.createElement('meta');
  meta.setAttribute('property', property);
  meta.setAttribute('content', content);
  document.head.appendChild(meta);
}

// Componente para JSON-LD structured data
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  url
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "GTA News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gtanews.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Website structured data
export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GTA News",
    "url": "https://gtanews.com",
    "description": "Las mejores noticias, guías y análisis sobre GTA V, GTA Online y GTA 6",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gtanews.com/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
