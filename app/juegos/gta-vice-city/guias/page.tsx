import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts"; 
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Guías de GTA Vice City - GTAVerso",
  description: "Cómo conseguir el 100%, paquetes ocultos, saltos únicos y propiedades en Vice City.",
  robots: { index: false, follow: false },
};

export default async function GTAVCGuidesPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post: Post) => post.game === "gta-vice-city" && post.type === "guias"
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <GameSubHeader 
          title="Guías de Misiones" 
          gameTitle="GTA Vice City" 
          gameLink="/juegos/gta-vice-city" 
          color="#00E5FF" 
        />
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="py-12 text-center border border-white/10 rounded-xl bg-white/5 mt-8">
            <p className="text-lg text-gray-400 font-medium">Todavía no hay guías publicadas para GTA Vice City.</p>
          </div>
        )}
      </div>
    </div>
  );
}