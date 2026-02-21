import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts"; 
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Guías GTA Online - GTAVerso",
  description: "Mejores negocios, golpes (Heists), coches más rápidos y cómo ganar dinero.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function GTA5OnlineGuidesPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post: Post) => post.game === "gta-5" && post.type === "guias-online"
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Guías GTA Online" 
          gameTitle="GTA V" 
          gameLink="/gta-5" 
          color="#00FF41" 
        />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-white/10 rounded-xl bg-white/5 mt-8">
            <p className="text-lg text-gray-400 font-medium">
              Todavía no hay guías de GTA Online publicadas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}