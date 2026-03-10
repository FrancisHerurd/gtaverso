import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/api';
import { generateNewsArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';
import YoastSEO from '@/components/YoastSEO';
import JuegoBadge from '@/components/JuegoBadge';
import { NewsBadges } from '@/components/NewsBadge';
import Breadcrumbs from '@/components/Breadcrumbs';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import ReadingTime from '@/components/ReadingTime';
import LatestNewsSidebar from '@/components/LatestNewsSidebar';

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

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post: any) => {
    const gameSlug = post.juegos?.nodes?.[0]?.slug || 'gta-6';
    const tipoSlug = post.tipos?.nodes?.[0]?.slug || 'noticias';
    return { game: gameSlug, tipo: tipoSlug, slug: post.slug };
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game, tipo, slug } = await params;

  // ✅ NUEVO: evita que [tipo]/[slug] capture /personajes/jason-duval
  if (tipo === 'personajes') {
    return { robots: { index: false, follow: false } };
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post no encontrado | GTAVerso',
      robots: { index: false, follow: false },
    };
  }

  const gameLabel = GAME_LABELS[game] || game.toUpperCase();
  const tipoLabel = TIPO_LABELS[tipo] || tipo;

  if (post.seo) {
    return {
      title: post.seo.title,
      description: post.seo.metaDesc,
      alternates: {
        canonical: post.seo.canonical || `https://gtaverso.com/juegos/${game}/${tipo}/${slug}`,
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
        url: `https://gtaverso.com/juegos/${game}/${tipo}/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seo.twitterTitle || post.seo.title,
        description: post.seo.twitterDescription || post.seo.metaDesc,
        images: post.seo.opengraphImage?.sourceUrl
          ? [post.seo.opengraphImage.sourceUrl]
          : [],
      },
      other: {
        news_keywords:
          post.tags?.nodes?.map((t: any) => t.name).join(', ') ||
          'GTA, Grand Theft Auto, Rockstar Games',
      },
    };
  }

  return {
    title: `${post.title} | ${gameLabel} ${TIPO_LABELS[tipo] || tipo} | GTAVerso`,
    description: post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160),
    alternates: {
      canonical: `https://gtaverso.com/juegos/${game}/${tipo}/${slug}`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { game, tipo, slug } = await params;

  // ✅ NUEVO: cede el control a personajes/[slug]/page.tsx
  if (tipo === 'personajes') notFound();

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const gameLabel = GAME_LABELS[game] || game.toUpperCase();
  const tipoLabel = TIPO_LABELS[tipo] || tipo;

  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Juegos', href: '/juegos' },
    { label: gameLabel, href: `/juegos/${game}` },
    { label: tipoLabel, href: `/juegos/${game}/${tipo}` },
    { label: post.title, href: `/juegos/${game}/${tipo}/${slug}` },
  ];

  const articleSchema = generateNewsArticleSchema({
    title: post.title,
    description: post.excerpt.replace(/<[^>]+>/g, '').substring(0, 200),
    image: post.featuredImage?.node?.sourceUrl || 'https://gtaverso.com/og-default.webp',
    url: `/juegos/${game}/${tipo}/${slug}`,
    publishedTime: post.date,
    modifiedTime: post.modified || post.date,
    author: post.author?.node?.name || 'GTA Verso',
    game: gameLabel,
    category: tipoLabel,
  });

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.label, url: b.href }))
  );

  return (
    <>
      <YoastSEO seo={post.seo} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-[#050508] pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">

            <div className="lg:col-span-8">
              <Breadcrumbs items={breadcrumbs} />

              {post.juegos && post.juegos.nodes.length > 0 && (
                <JuegoBadge juegos={post.juegos.nodes} className="mb-4 mt-6" />
              )}

              <NewsBadges tags={post.tags?.nodes} className="mb-4" />

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm mb-6">
                <time dateTime={new Date(post.date).toISOString()}>
                  {new Date(post.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span className="text-[#00FF41]">{tipoLabel}</span>
                <span>•</span>
                <span>{post.author?.node?.name || 'GTA Verso'}</span>
              </div>

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

              <ShareButtons
                url={`https://gtaverso.com/juegos/${game}/${tipo}/${slug}`}
                title={post.title}
                className="mb-8"
              />

              <div className="lg:hidden mt-8 mb-8">
                <TableOfContents content={post.content} />
              </div>

              <div
                id="article-content"
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:scroll-mt-24
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-[#00FF41] hover:prose-a:text-[#00cc34] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-gray-300 prose-ol:text-gray-300
                  prose-li:marker:text-[#00FF41]
                  prose-img:rounded-lg prose-img:my-8
                  prose-blockquote:border-l-4 prose-blockquote:border-[#00FF41]
                  prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <ShareButtons
                url={`https://gtaverso.com/juegos/${game}/${tipo}/${slug}`}
                title={post.title}
                className="mt-12 pt-8 border-t border-gray-800"
              />

              <div className="lg:hidden mt-12">
                <LatestNewsSidebar currentSlug={slug} limit={5} />
              </div>
            </div>

            <aside className="hidden lg:block lg:col-span-4 space-y-8">
              <TableOfContents content={post.content} />
              <LatestNewsSidebar currentSlug={slug} limit={5} />
            </aside>

          </div>
        </div>
      </article>
    </>
  );
}