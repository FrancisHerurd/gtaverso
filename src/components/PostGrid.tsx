import PostCard from "@/components/PostCard";
import type { Post } from "@/lib/posts"; // Asegúrate de tener este tipo exportado o usa 'any' si prefieres

interface PostGridProps {
  posts: Post[];
  title?: string;
  className?: string;
  columns?: 2 | 3 | 4;
}

export default function PostGrid({
  posts,
  title,
  className = "",
  columns = 3,
}: PostGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className={`py-8 text-center text-white/70 ${className}`}>
        <p>No hay noticias disponibles.</p>
      </div>
    );
  }

  // Mapeo de clases de columnas para Tailwind 4
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={`relative ${className}`} aria-label={title || "Listado de noticias"}>
      {title && (
        <div className="mb-6 flex items-center gap-2">
          {/* Decoración Verde GTA */}
          <span 
            className="h-2 w-2 rounded-full bg-(--gta-green) shadow-[0_0_10px_var(--gta-green)]" 
            aria-hidden="true" 
          />
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {title}
          </h2>
        </div>
      )}

      <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]}`}>
        {posts.map((post) => (
          <PostCard 
            key={`${post.slug}-${post.date}`} 
            post={post} 
          />
        ))}
      </div>
    </section>
  );
}