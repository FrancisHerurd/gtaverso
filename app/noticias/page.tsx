import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryHeader from "@/components/CategoryHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noticias de GTA 6 y Rockstar | GTAVerso",
  description: "Todas las novedades, filtraciones y anuncios oficiales sobre Grand Theft Auto VI y la saga GTA.",
};

export default async function NoticiasPage() {
  const allPosts = await getAllPosts();
  
  // FILTRO: Aquí puedes filtrar por tag si tienes propiedad 'category' o 'tags' en tus MDX
  // Por ahora mostramos todos, o filtramos si el slug o título contiene pistas.
  // Ejemplo real: const posts = allPosts.filter(p => p.meta.category === 'Noticias');
  const posts = allPosts; 

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera estilo Figma */}
        <CategoryHeader title="Noticias" count={posts.length} />

        {/* Grid de Artículos */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-500">No hay noticias disponibles por el momento.</p>
          </div>
        )}
      </div>
    </div>
  );
}