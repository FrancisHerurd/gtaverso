import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { Post } from "@/lib/posts"

interface PostCardProps {
  post: Post
}

function toPublicSrc(p: string) {
  return p.startsWith("/") ? p : `/${p}`
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), "d 'de' MMM 'de' yyyy", {
    locale: es,
  })

  const href = `/${post.game}/${post.type}/${post.slug}`
  const coverSrc = post.cover ? toPublicSrc(post.cover) : "/images/default-cover.jpg"

  return (
    <Link href={href} className="card group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={coverSrc}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <time className="text-sm text-dark-700">{formattedDate}</time>
        <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-primary transition">
          {post.title}
        </h3>
        <p className="text-dark-700 line-clamp-3">{post.description}</p>
      </div>
    </Link>
  )
}