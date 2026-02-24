import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import Breadcrumbs from "components/Breadcrumbs";
import {
  GAMES,
  TYPES,
  getAllPosts,
  getPostByGameTypeSlug,
  type Game,
  type PostType,
} from "libposts";

type PageProps = {
  params: Promise<{ game: string; type: string; slug: string }>;
};

function isAllowed<T extends readonly string[]>(
  value: string,
  allowed: T
): value is T[number] {
  return (allowed as readonly string[]).includes(value);
}

function publicSrc(path: string) {
  // Tus covers vienen como "images/..." (sin /). En rutas anidadas se rompería,
  // así que forzamos a "/images/..."
  return "/" + path.replace(/^\/+/, "");
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p: any) => ({ // Novedad: tipado any para evitar error TS
    game: p.game,
    type: p.type,
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { game, type, slug } = await params;

  if (!isAllowed(game, GAMES) || !isAllowed(type, TYPES)) return {};

  const post = await getPostByGameTypeSlug(game as Game, type as PostType, slug);
  if (!post) return {};

  const canonical = `https://gtaverso.com/${game}/${type}/${slug}`;
  const imageUrl = `https://gtaverso.com${publicSrc(post.cover)}`; // Novedad: URL absoluta para RRSS

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      images: [{ url: imageUrl }], // Novedad: Facebook necesita URL con https://
    },
    // Novedad: Objeto completo de Twitter para la Card grande
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { game, type, slug } = await params;

  if (!isAllowed(game, GAMES) || !isAllowed(type, TYPES)) notFound();

  const post = await getPostByGameTypeSlug(game as Game, type as PostType, slug);
  if (!post) notFound();

  const formattedDate = format(new Date(post.date), "d 'de' MMMM 'de' yyyy", {
    locale: es,
  });

  const absoluteCover = `https://gtaverso.com${publicSrc(post.cover)}`;
  const canonical = `https://gtaverso.com/${game}/${type}/${slug}`;

  // --- INICIO NOVEDAD SEO (JSON-LD Dinámico) ---
  
  // Determinamos el tipo de Schema exacto según tu sección
  let schemaType = "Article";
  if (type === "noticias") {
    schemaType = "NewsArticle"; // Vital para aparecer en Google Discover y Top Stories
  } else if (type === "guias" || type === "trucos") {
    schemaType = "TechArticle"; // Schema optimizado para guías de juegos
  }

  // Nombres bonitos para el schema del juego
  const gameNames: Record<string, string> = {
    "gta-5": "Grand Theft Auto V",
    "gta-6": "Grand Theft Auto VI",
    "gta-online": "Grand Theft Auto Online",
  };
  const exactGameName = gameNames[game] || "Grand Theft Auto";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType, // Magia: Cambia dinámicamente a NewsArticle o TechArticle
    headline: post.title,
    description: post.description,
    image: absoluteCover,
    datePublished: post.date,
    dateModified: post.date, // Puedes cambiarlo a la fecha de hoy si actualizas el artículo
    author: { 
      "@type": "Organization", 
      name: "GTAVerso",
      url: "https://gtaverso.com"
    },
    publisher: {
      "@type": "Organization",
      name: "GTAVerso",
      logo: {
        "@type": "ImageObject",
        url: "https://gtaverso.com/images/logo.svg", // Asegúrate de tener este logo cuadrado en public/images/
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical
    },
    // El toque SEO Experto: Enlazar el artículo con la entidad del videojuego real
    about: {
      "@type": "VideoGame",
      name: exactGameName,
      applicationCategory: "Game"
    }
  };
  // --- FIN NOVEDAD SEO ---

  return (
    <article className="container-custom py-8">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: game.toUpperCase(), href: `/${game}` },
          { label: type.toUpperCase(), href: `/${game}/${type}` },
          { label: post.title, href: `/${game}/${type}/${slug}` },
        ]}
      />

      {/* Novedad: relative añadido al div para que 'fill' funcione correctamente */}
      <div className="h-100 md:h-125 relative">
        <Image
          src={publicSrc(post.cover)}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px" // Novedad: Optimización para móvil/PC
        />
      </div>

      <header className="mb-8 mt-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-dark-700">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>·</span>
          <span className="uppercase">
            {game} / {type}
          </span>
        </div>
      </header>

      <div className="prose-custom">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}