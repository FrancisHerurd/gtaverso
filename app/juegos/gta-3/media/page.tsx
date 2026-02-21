import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts"; 
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Medios y Galería GTA 3 - GTAVerso",
  description: "Arte conceptual original, tráilers de 2001 y banda sonora.",
  robots: { index: false, follow: false },
};

export default async function GTA3MediaPage() {
  const allPosts = await getAllPosts();
  // Filtramos por type "medios" para mantener consistencia con GTA 5
  const posts = allPosts.filter(
    (post: Post) => post.game === "gta-3" && post.type === "medios" 
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <GameSubHeader 
          title="Medios y Galería" 
          gameTitle="GTA III" 
          gameLink="/juegos/gta-3" 
          color="#E5E7EB" 
        />
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="py-12 text-center border border-white/10 rounded-xl bg-white/5 mt-8">
            <p className="text-lg text-gray-400 font-medium">Todavía no hay galerías publicadas para GTA 3.</p>
          </div>
        )}
      </div>
    </div>
  );
}