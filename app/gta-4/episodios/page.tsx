import { Metadata } from "next";
import GameSubHeader from "@/components/GameSubHeader";
import { getAllPosts } from "@/lib/posts";
import type { Post } from "@/lib/posts"; 
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "DLCs y Episodios GTA 4 - GTAVerso",
  description: "Guías de The Lost and Damned y The Ballad of Gay Tony.",
  robots: { index: false, follow: false },
};

export default async function GTA4DLCPage() {
  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post: Post) => post.game === "gta-4" && post.type === "episodios" // <-- Tendrás que añadir "episodios" a lib/posts.ts
  ); 

  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <GameSubHeader title="DLC: Episodios de Liberty City" gameTitle="GTA IV" gameLink="/gta-4" color="#FBBF24" />
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: Post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="py-12 text-center border border-white/10 rounded-xl bg-white/5 mt-8">
            <p className="text-lg text-gray-400 font-medium">Todavía no hay información sobre DLCs para GTA 4.</p>
          </div>
        )}
      </div>
    </div>
  );
}