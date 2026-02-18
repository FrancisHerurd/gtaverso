import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default async function GTA6NewsPage() {
  const allPosts = await getAllPosts();
  // TODO: Aquí deberías filtrar por tag/categoría real. 
  // Por ahora mostramos los 6 primeros como ejemplo.
  const posts = allPosts.slice(0, 6); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Noticias y Actualizaciones" 
          gameTitle="GTA VI" 
          gameLink="/gta-6" 
          color="#FF00FF" 
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}