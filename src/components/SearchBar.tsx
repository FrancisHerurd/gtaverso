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
    <form onSubmit={onSubmit}>
      <div className="relative">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar noticias, guías, trucos..."
          className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-4 text-white outline-none focus:border-[var(--gta-green)]"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--gta-green)] px-5 py-2 font-semibold text-black"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}