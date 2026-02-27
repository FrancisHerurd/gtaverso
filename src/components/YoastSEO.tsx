// src/components/YoastSEO.tsx

import { WPYoastSEO } from '@/types/wordpress';

interface Props {
  seo?: WPYoastSEO;
  fallbackTitle?: string;
  fallbackDescription?: string;
}

/**
 * Componente para renderizar metadatos SEO de Yoast
 * 
 * NOTA: En Next.js 15 App Router, usa generateMetadata() en pages
 * Este componente solo renderiza fullHead si existe (para JSON-LD)
 */
export default function YoastSEO({ 
  seo, 
  fallbackTitle = 'GTAVerso', 
  fallbackDescription = 'Noticias y guías de GTA'
}: Props) {
  // Si existe fullHead de Yoast, úsalo (incluye JSON-LD structured data)
  if (seo?.fullHead) {
    return <div dangerouslySetInnerHTML={{ __html: seo.fullHead }} />;
  }

  // No renderizar nada más (generateMetadata() se encarga del SEO)
  return null;
}