// app/noticias/page.tsx

import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/wp';
import type { WPPost } from '@/types/wordpress';
import NoticiasClient from './NoticiasClient';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Todas las Noticias de GTA · GTAVerso',
  description: 'Últimas noticias, actualizaciones y rumores de GTA 6, GTA 5, Vice City, San Andreas, GTA 4 y GTA 3.',
  alternates: { canonical: 'https://www.gtaverso.com/noticias' },
  openGraph: {
    title: 'Todas las Noticias · GTAVerso',
    description: 'Últimas noticias de todos los juegos de la saga GTA.',
    url: 'https://www.gtaverso.com/noticias',
    type: 'website',
  },
};

export default async function GlobalNoticiasPage() {
  // Usa la función getAllPosts de wp.ts
  const posts = await getAllPosts();

  // Filtrar solo posts de tipo "noticias" (si usas taxonomía Tipos)
  const noticias = posts.filter(
    (post) => post.tipos?.nodes?.some((tipo) => tipo.slug === 'noticias')
  );

  // Si no usas taxonomía Tipos, usa todos los posts
  const finalPosts = noticias.length > 0 ? noticias : posts;

  return (
    <NoticiasClient 
      initialPosts={finalPosts} 
      initialPageInfo={{ hasNextPage: false, endCursor: null }} 
    />
  );
}