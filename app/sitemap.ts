// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.gtaverso.com';

  // 1. Rutas estáticas principales de la web
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // Prioridad máxima para la portada
    },
    {
      url: `${baseUrl}/juegos/gta-6/noticias`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/juegos/gta-5/noticias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Puedes añadir aquí la portada de guías, trucos, etc.
  ];

   // 2. Rutas dinámicas (Tus artículos MDX)
  const posts = await getAllPosts(); // <-- Añadido el await
  
  const dynamicRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({ // <-- Añadido : any
    // Construimos la URL igual que en tu código SILO: /juegos/[juego]/[tipo]/[slug]
    url: `${baseUrl}/juegos/${post.game}/${post.type}/${post.slug}`,
    // Si tu MDX no tiene fecha, usamos la de hoy como fallback
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7, // Los artículos individuales tienen menos prioridad que las portadas
  }));

  // 3. Juntamos todo
  return [...staticRoutes, ...dynamicRoutes];
}