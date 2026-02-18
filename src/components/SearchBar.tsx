"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar noticias, guías, trucos..."
          className="w-full rounded-full bg-transparent px-6 py-4 text-white placeholder:text-gray-400 focus:outline-none sm:text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 rounded-full bg-(--gta-green) px-6 font-bold text-black transition hover:bg-[#00cc34] hover:shadow-[0_0_15px_rgba(0,255,65,0.4)]"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}