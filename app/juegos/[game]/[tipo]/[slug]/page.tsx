// app/juegos/[game]/[tipo]/[slug]/page.tsx

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/api';
import YoastSEO from '@/components/YoastSEO';
import JuegoBadge from '@/components/JuegoBadge';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';

interface Props {
  params: Promise<{ game: string; tipo: string; slug: string }>;
}

const GAME_LABELS: Record<string, string> = {
  'gta-6': 'GTA 6',
  'gta-5': 'GTA 5',
  'gta-4': 'GTA 4',
  'san-andreas': 'GTA San Andreas',
  'vice-city': 'GTA Vice City',
  'gta-3': 'GTA 3',
};

const TIPO_LABELS: Record<string, string> = {
  'noticias': 'Noticias',
  'guias': 'Guías',
  'trucos': 'Trucos',
};

// Generar rutas estáticas
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map((post: any) => {
    const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
    const tipoSlug = post.tipos?.nodes?.[0]?.slug || 'noticias';
    
    return {
      game: gameSlug,
      tipo: tipoSlug,
      slug: post.slug,
    };
  });
}

// Metadata dinámica con Yoast SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, tipo, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post no encontrado | GTAVerso' };
  }

  const gameLabel = GAME_LABELS[game] || game.toUpperCase();
  const tipoLabel = TIPO_LABELS[tipo] || tipo;

  // Si existe SEO de Yoast, úsalo
  if (post.seo) {
    return {
      title: post.seo.title,
      description: post.seo.metaDesc,
      alternates: {
        canonical: post.seo.canonical || `https://www.gtaverso.com/juegos/${game}/${tipo}/${slug}`,
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
        url: `https://www.gtaverso.com/juegos/${game}/${tipo}/${slug}`,
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
    title: `${post.title} | ${gameLabel} ${tipoLabel} | GTAVerso`,
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    alternates: {
      canonical: `https://www.gtaverso.com/juegos/${game}/${tipo}/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { game, tipo, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const gameLabel = GAME_LABELS[game] || game.toUpperCase();
  const tipoLabel = TIPO_LABELS[tipo] || tipo;

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Juegos', href: '/juegos' },
    { label: gameLabel, href: `/juegos/${game}` },
    { label: tipoLabel, href: `/juegos/${game}/${tipo}` },
    { label: post.title, href: `/juegos/${game}/${tipo}/${slug}` },
  ];

  return (
    <>
      {/* Yoast SEO fullHead (solo para JSON-LD) */}
      <YoastSEO seo={post.seo} />

      <article className="min-h-screen bg-[#050508] pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4">
          <Breadcrumbs items={breadcrumbs} />

          {/* Badges de Juegos */}
          {post.juegos && post.juegos.nodes.length > 0 && (
            <JuegoBadge juegos={post.juegos.nodes} className="mb-4 mt-6" />
          )}

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
            <time>
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.author && (
              <>
                <span>•</span>
                <span>Por {post.author.node.name}</span>
              </>
            )}
          </div>

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

          {/* Botones de compartir */}
          <ShareButtons 
            url={`https://www.gtaverso.com/juegos/${game}/${tipo}/${slug}`}
            title={post.title}
          />

          {/* Contenido */}
          <div
            className="prose prose-invert prose-lg max-w-none mt-8
              prose-headings:text-white 
              prose-p:text-gray-300 
              prose-a:text-orange-500 
              prose-strong:text-white
              prose-img:rounded-lg
              prose-ul:text-gray-300
              prose-ol:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}