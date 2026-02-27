// src/components/YoastSEO.tsx

import Head from 'next/head';
import { YoastSEO as YoastSEOType } from '@/types/wordpress';

interface Props {
  seo?: YoastSEOType;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

/**
 * Componente para renderizar metadatos SEO de Yoast
 * Prioriza fullHead (structured data incluido), con fallback manual
 */
export default function YoastSEO({ 
  seo, 
  fallbackTitle = 'GTAVerso', 
  fallbackDescription = 'Noticias y guías de GTA'
}: Props) {
  // Si existe fullHead de Yoast, úsalo (incluye JSON-LD, canonical, etc.)
  if (seo?.fullHead) {
    return (
      <Head>
        <div dangerouslySetInnerHTML={{ __html: seo.fullHead }} />
      </Head>
    );
  }

  // Fallback manual si no hay fullHead
  const title = seo?.title || fallbackTitle;
  const description = seo?.metaDesc || fallbackDescription;
  const ogTitle = seo?.opengraphTitle || title;
  const ogDescription = seo?.opengraphDescription || description;
  const ogImage = seo?.opengraphImage?.sourceUrl;

  return (
    <Head>
      {/* Meta tags básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Canonical */}
      {seo?.canonical && <link rel="canonical" href={seo.canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:type" content="article" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo?.twitterTitle || ogTitle} />
      <meta name="twitter:description" content={seo?.twitterDescription || ogDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Head>
  );
}