// src/components/PostCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { WPPost } from "@/types/wordpress";

interface PostCardProps {
  post: WPPost;
  priority?: boolean;
}

const GAME_COLORS: Record<string, string> = {
  "gta-6": "#FF00FF",
  "gta-5": "#569446",
  "gta-4": "#FBBF24",
  "gta-online": "#FFA500",
  "san-andreas": "#FFA500",
  "vice-city": "#00E5FF",
  "gta-3": "#E5E7EB",
};

const GAME_LABELS: Record<string, string> = {
  "gta-6": "GTA 6",
  "gta-5": "GTA 5",
  "gta-4": "GTA 4",
  "gta-online": "GTA Online",
  "san-andreas": "GTA San Andreas",
  "vice-city": "GTA Vice City",
  "gta-3": "GTA 3",
};

export default function PostCard({ post, priority = false }: PostCardProps) {
  // Obtener slug del juego y tipo desde la taxonomía
  const gameSlug = post.juegos?.nodes?.[0]?.slug || post.game || "gta-6";
  const gameName = post.juegos?.nodes?.[0]?.name || GAME_LABELS[gameSlug] || "GTA";
  
  const typeSlug = post.tipos?.nodes?.[0]?.slug || post.type || "noticias";
  const typeName = post.tipos?.nodes?.[0]?.name || "Noticia";

  const gameColor = GAME_COLORS[gameSlug] || "#00FF41";

  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // ✅ URL SILO: /juegos/[game]/[tipo]/[slug]
  const postUrl = `/juegos/${gameSlug}/${typeSlug}/${post.slug}`;

  // Extraer texto de forma segura
  const description = ((post.excerpt || post.description) ?? "")
    .replace(/<[^>]+>/g, "")
    .trim();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/3 border border-white/8 transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-black/20">
      <Link href={postUrl} className="relative aspect-video w-full overflow-hidden">
        <Image
          src={post.featuredImage?.node?.sourceUrl || post.cover || "/images/default-cover.jpg"}
          alt={post.featuredImage?.node?.altText || post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute top-4 left-4">
          <span
            className="inline-block rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-lg"
            style={{ backgroundColor: gameColor }}
          >
            {gameName}
          </span>
        </div>

        <div className="absolute top-4 right-4">
          <span className="inline-block rounded-md bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {typeName}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link href={postUrl}>
          <h3 className="mb-3 text-xl font-bold leading-tight text-white transition-colors group-hover:text-gray-200 sm:text-2xl">
            {post.title}
          </h3>
        </Link>

        {description && (
          <p className="mb-4 flex-1 line-clamp-3 text-sm text-gray-400 sm:text-base">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-white/8 pt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          <Link
            href={postUrl}
            className="text-sm font-semibold transition-colors"
            style={{ color: gameColor }}
            aria-label={`Leer más sobre ${post.title}`}
          >
            Leer más →
          </Link>
        </div>
      </div>
    </article>
  );
}