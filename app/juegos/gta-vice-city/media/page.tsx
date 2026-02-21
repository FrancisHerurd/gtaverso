import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts"; 
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Medios y Galería GTA Vice City - GTAVerso",
  description: "Tráilers originales, capturas de pantalla y la inolvidable banda sonora de Vice City.",
  robots: { index: false, follow: false },
};

export default async function GTAVCMediaPage() {
  const allPosts = await getAllPosts();
  // Filtramos por "medios" en lugar de "media" porque así lo guardamos en TypeScript
  const posts = allPosts.filter(
    (post: Post) => post.game === "gta-vice-city" && post.type === "medios" 
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <GameSubHeader 
          title="Medios y Galería" 
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
            <p className="text-lg text-gray-400 font-medium">Todavía no hay galerías publicadas para GTA Vice City.</p>
          </div>
        )}
      </div>
    </div>
  );
}