"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
  featured?: boolean;
};

function toPublicSrc(p?: string) {
  if (!p) return "/images/default-cover.jpg";
  return p.startsWith("/") ? p : `/${p}`;
}

function postHref(post: Post) {
  return `/${post.game}/${post.type}/${post.slug}`;
}

function formattedDate(date: string) {
  return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: es });
}

function CategoryBadge({ post }: { post: Post }) {
  const text = `${post.game.toUpperCase()} · ${post.type.toUpperCase()}`;
  return (
    <span className="inline-flex items-center rounded-full bg-[#00FF41] px-3 py-1 text-xs font-bold uppercase tracking-wide text-black">
      {text}
    </span>
  );
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const href = postHref(post);
  const coverSrc = toPublicSrc(post.cover);

  if (featured) {
    return (
      <Link
        href={href}
        className="group relative block h-full overflow-hidden rounded-xl bg-gray-900 transition-transform hover:scale-[1.02]"
      >
        {/* Imagen */}
        <div className="relative h-64 overflow-hidden md:h-96">
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1216px"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Badge categoría */}
          <div className="absolute left-4 top-4">
            <CategoryBadge post={post} />
          </div>
        </div>

        {/* Contenido superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mb-3 flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readingTime ?? "5 min"}
            </span>
            <span>•</span>
            <span>{formattedDate(post.date)}</span>
          </div>

          <h2 className="mb-3 line-clamp-2 text-2xl font-bold text-white transition-colors group-hover:text-[#00FF41] md:text-3xl">
            {post.title}
          </h2>

          <p className="mb-4 line-clamp-2 text-gray-300">
            {post.description}
          </p>

          <div className="flex items-center gap-2 font-semibold text-[#00FF41]">
            Leer más
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  // Variante normal (grid)
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-gray-900 transition-all hover:ring-2 hover:ring-[#00FF41]"
    >
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={coverSrc}
          alt={post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 400px"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3">
          <CategoryBadge post={post} />
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime ?? "5 min"}
          </span>
          <span>•</span>
          <span>{formattedDate(post.date)}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-[#00FF41]">
          {post.title}
        </h3>

        <p className="mb-4 flex-1 text-sm text-gray-400 line-clamp-3">
          {post.description}
        </p>

        <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-[#00FF41]">
          Leer más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}