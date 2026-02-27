'use client';

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

export default function SEO({
  title,
  description,
  type = 'website',
  image = '/images/og-default.webp', // Tu imagen por defecto
  url,
  publishedTime,
  modifiedTime,
  author = 'GTAVerso',
  tags
}: SEOProps) {
  useEffect(() => {
    // Título de la página
    document.title = `${title} | GTAVerso - Noticias GTA`;

    // Meta tags básicos
    updateMetaTag('description', description);
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    
    // Imágenes para redes
    updateMetaTag('og:image', image);
    updateMetaTag('og:image:alt', title);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);

    // URL canónica
    if (url) {
      updateMetaTag('og:url', url);
      updateMetaTag('twitter:url', url);
    }

    // Para artículos/noticias
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime);
      if (author) updateMetaTag('article:author', author);
      if (tags) {
        tags.forEach(tag => addMetaTag('article:tag', tag));
      }
    }
  }, [title, description, type, image, url, publishedTime, modifiedTime, author, tags]);

  return null;
}

// Funciones helper (iguales pero mejoradas)
function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[property="${name}"]`) || 
                document.querySelector(`meta[name="${name}"]`);
  
  if (element) {
    element.setAttribute('content', content);
  } else {
    const meta = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('article:')) {
      meta.setAttribute('property', name);
    } else {
      meta.setAttribute('name', name);
    }
    meta.content = content;
    document.head.appendChild(meta);
  }
}

function addMetaTag(property: string, content: string) {
  const meta = document.createElement('meta');
  meta.setAttribute('property', property);
  meta.content = content;
  document.head.appendChild(meta);
}