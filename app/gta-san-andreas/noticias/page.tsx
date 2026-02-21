import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts"; 
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Noticias de GTA San Andreas - GTAVerso",
  description: "Últimas noticias, mods destacados y parches de la Definitive Edition de GTA San Andreas.",
  alternates: {
    canonical: "https://gtaverso.com/gta-san-andreas/noticias",
  },
};

export default async function GTASANewsPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post: Post) => post.game === "gta-san-andreas" && post.type === "noticias"
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <GameSubHeader 
          title="Noticias y Actualizaciones" 
          gameTitle="GTA San Andreas" 
          gameLink="/gta-san-andreas" 
          color="#FFA500" 
        />
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="py-12 text-center border border-white/10 rounded-xl bg-white/5 mt-8">
            <p className="text-lg text-gray-400 font-medium">Todavía no hay noticias publicadas para GTA San Andreas.</p>
          </div>
        )}
      </div>
    </div>
  );
}