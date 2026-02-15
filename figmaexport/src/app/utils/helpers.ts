/**
 * Utility functions for optimization and performance
 */

/**
 * Lazy load images using Intersection Observer
 * Already implemented via HTML loading="lazy" attribute in components
 */

/**
 * Debounce function for search input optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: string = 'es-ES'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Calculate reading time based on word count
 */
export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate meta tags for social sharing
 */
export function generateMetaTags(data: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}) {
  return {
    title: `${data.title} | GTA News`,
    description: data.description,
    ogTitle: data.title,
    ogDescription: data.description,
    ogImage: data.image || '/default-og-image.jpg',
    ogUrl: data.url || 'https://gtanews.com',
    twitterCard: 'summary_large_image',
  };
}

/**
 * Instructions for adding Google AdSense
 * 
 * STEP 1: Add this script to your index.html <head>:
 * <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 *      crossorigin="anonymous"></script>
 * 
 * STEP 2: Replace placeholder AdSense divs in components with:
 * <ins className="adsbygoogle"
 *      style={{ display: 'block' }}
 *      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *      data-ad-slot="YYYYYYYYYY"
 *      data-ad-format="auto"
 *      data-full-width-responsive="true"></ins>
 * 
 * STEP 3: Initialize ads with:
 * useEffect(() => {
 *   try {
 *     ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
 *   } catch (e) {
 *     console.error('AdSense error:', e);
 *   }
 * }, []);
 * 
 * Current AdSense placeholders are in:
 * - /src/app/pages/HomePage.tsx
 * - /src/app/pages/ArticleDetailPage.tsx
 */

/**
 * Instructions for migrating to backend/database
 * 
 * NEWSLETTER:
 * 1. Create backend API endpoint for newsletter subscriptions
 * 2. Replace localStorage logic in Footer.tsx with API call
 * 3. Add email validation and confirmation flow
 * 4. Integrate with email service (Mailchimp, SendGrid, etc.)
 * 
 * ARTICLES:
 * 1. Create database schema for articles (PostgreSQL, MongoDB, etc.)
 * 2. Create API endpoints for CRUD operations
 * 3. Replace articles-data.ts imports with API calls
 * 4. Add admin panel for content management
 * 5. Implement caching strategy (Redis) for performance
 * 
 * COMMENTS (future feature):
 * 1. Add comments table/collection to database
 * 2. Create API for comment CRUD operations
 * 3. Implement moderation system
 * 4. Add authentication for users
 * 
 * ANALYTICS:
 * 1. Add Google Analytics 4 tracking code
 * 2. Implement custom events for user interactions
 * 3. Set up conversion tracking for newsletter signups
 */

export const SEO_CONFIG = {
  siteName: 'GTA News',
  siteUrl: 'https://gtanews.com',
  defaultTitle: 'GTA News - Noticias y Guías sobre GTA',
  defaultDescription: 'Las mejores noticias, guías y análisis sobre GTA V, GTA Online y GTA 6',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@gtanews',
  locale: 'es_ES',
  themeColor: '#00FF41',
};
