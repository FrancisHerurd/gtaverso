// src/lib/utils.ts

/**
 * Convierte URLs de imágenes de WordPress a rutas del proxy local
 * Ejemplo: csm.gtaverso.com/wp-content/uploads/... → /wp-images/...
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return '/og-default.webp';
  
  // Si ya es una ruta relativa de gtaverso.com, retornar sin cambios
  if (url.startsWith('/wp-images/') || url.startsWith('/images/')) return url;
  
  // Convertir URLs de WordPress a ruta relativa del proxy
  if (url.includes('csm.gtaverso.com/wp-content/uploads')) {
    return url.replace(
      /https?:\/\/csm\.gtaverso\.com\/wp-content\/uploads/,
      '/wp-images'
    );
  }
  
  // Si ya es gtaverso.com, convertir a ruta relativa
  if (url.includes('gtaverso.com/wp-images')) {
    return url.replace(/https?:\/\/gtaverso\.com/, '');
  }
  
  // Si es ruta relativa, retornar tal cual
  if (url.startsWith('/')) {
    return url;
  }
  
  // Si es URL externa completa, retornar sin cambios
  return url;
}

/**
 * Convierte ruta relativa a URL absoluta (para schemas y metadatos)
 */
export function toAbsoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `https://gtaverso.com${path}`;
}

/**
 * Combina clases CSS (útil para Tailwind)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formatea fecha a formato español
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calcula tiempo de lectura (palabras / 200 palabras por minuto)
 */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);
  return readingTime;
}

/**
 * Extrae texto plano de HTML
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Trunca texto a longitud máxima
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}