// src/components/PostGrid.tsx
import PostCard from "./PostCard";
import type { WPPost } from "@/types/wordpress";

interface PostGridProps {
  posts: WPPost[];
  columns?: 2 | 3 | 4;
}

export default function PostGrid({ posts, columns = 3 }: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-400">No hay contenido disponible.</p>
      </div>
    );
  }

  const gridClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} priority={index < 3} />
      ))}
    </div>
  );
}