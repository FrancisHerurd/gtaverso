import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Noticias de GTA 5 - GTAVerso",
  description: "Últimas noticias, actualizaciones y novedades de Grand Theft Auto V y GTA Online.",
  alternates: {
    canonical: "https://gtaverso.com/juegos/gta-5/noticias",
  },
};

export default async function GTA5NewsPage() {
  const allPosts = await getAllPosts();
  
  // Filtrado real: solo posts que pertenezcan a GTA 5 y sean del tipo noticias
  const posts = allPosts.filter(
    (post) => post.game === "gta-5" && post.type === "noticias"
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Noticias y Actualizaciones" 
          gameTitle="GTA V" 
          gameLink="/juegos/gta-5" 
          color="#00FF41" 
        />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              Todavía no hay noticias publicadas para GTA 5.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}