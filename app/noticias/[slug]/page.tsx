// app/noticias/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/wp';
import YoastSEO from '@/components/YoastSEO';
import JuegoBadge from '@/components/JuegoBadge';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generar rutas estáticas
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Metadata dinámica con Yoast SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Noticia no encontrada | GTAVerso' };
  }

  // Si existe SEO de Yoast, úsalo
  if (post.seo) {
    return {
      title: post.seo.title,
      description: post.seo.metaDesc,
      alternates: {
        canonical: post.seo.canonical || `https://www.gtaverso.com/noticias/${slug}`,
      },
      openGraph: {
        title: post.seo.opengraphTitle || post.seo.title,
        description: post.seo.opengraphDescription || post.seo.metaDesc,
        images: post.seo.opengraphImage?.sourceUrl
          ? [{ url: post.seo.opengraphImage.sourceUrl }]
          : [],
        type: 'article',
        publishedTime: post.date,
        modifiedTime: post.modified,
        url: `https://www.gtaverso.com/noticias/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seo.twitterTitle || post.seo.title,
        description: post.seo.twitterDescription || post.seo.metaDesc,
        images: post.seo.opengraphImage?.sourceUrl
          ? [post.seo.opengraphImage.sourceUrl]
          : [],
      },
    };
  }

  // Fallback si no hay Yoast SEO
  return {
    title: `${post.title} | GTAVerso`,
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    alternates: {
      canonical: `https://www.gtaverso.com/noticias/${slug}`,
    },
  };
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Yoast SEO fullHead (solo para JSON-LD) */}
      <YoastSEO seo={post.seo} />

      <article className="min-h-screen bg-[#050508] pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* Badges de Juegos */}
          {post.juegos && post.juegos.nodes.length > 0 && (
            <JuegoBadge juegos={post.juegos.nodes} className="mb-4" />
          )}

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {/* Fecha */}
          <time className="text-gray-500 text-sm block mb-6">
            {new Date(post.date).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          {/* Imagen destacada */}
          {post.featuredImage && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Contenido */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white 
              prose-p:text-gray-300 
              prose-a:text-orange-500 
              prose-strong:text-white
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}