// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

// Menú principal de la web
const NAV_GAMES = [
  { slug: "noticias", label: "Noticias" },
  { slug: "gta-6", label: "GTA 6" },
  { slug: "gta-5", label: "GTA 5" },
  { slug: "gta-4", label: "GTA 4" },
  { slug: "gta-san-andreas", label: "San Andreas" },
  { slug: "gta-vice-city", label: "Vice City" },
  { slug: "gta-3", label: "GTA 3" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  // Evita que "Noticias" se marque activo cuando estás en GTA 6 Noticias, por ejemplo.
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/buscar?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#00FF41]/20 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* FILA PRINCIPAL: LOGO Y NAVEGACIÓN */}
        <div className="flex h-16 items-center justify-between">
          
          {/* LOGO NEÓN GTAVERSO */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF41] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-2xl font-black text-[#00FF41] tracking-tighter uppercase">
                GTA<span className="text-white">VERSO</span>
              </span>
            </div>
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/"
              className={`text-sm uppercase font-semibold tracking-wide transition-colors ${
                isActive(pathname, "/")
                  ? "text-[#00FF41]"
                  : "text-gray-300 hover:text-[#00FF41]"
              }`}
            >
              Inicio
            </Link>
            
            {NAV_GAMES.map((game) => {
              // Si es "noticias", va a /noticias. Si es un juego, va a /juegos/[slug]
              const href = game.slug === "noticias" ? "/noticias" : `/juegos/${game.slug}`;
              const active = isActive(pathname, href);
              
              return (
                <Link
                  key={game.slug}
                  href={href}
                  className={`text-sm uppercase font-semibold tracking-wide transition-colors ${
                    active
                      ? "text-[#00FF41]"
                      : "text-gray-300 hover:text-[#00FF41]"
                  }`}
                >
                  {game.label}
                </Link>
              );
            })}
          </nav>

          {/* BOTONES DERECHA (BUSCAR Y MENÚ HAMBURGUESA) */}
          <div className="flex items-center space-x-2">
            
            {/* Botón Lupa */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Menú Hamburguesa (Solo Móvil) */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] md:hidden transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* BARRA DE BÚSQUEDA DESPLEGABLE */}
        {searchOpen && (
          <div className="border-t border-[#00FF41]/20 py-3 animate-in fade-in slide-in-from-top-2">
            <form onSubmit={handleSearch} className="relative mx-auto max-w-lg">
              <input
                type="search"
                placeholder="Buscar noticias, guías, trucos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-[#00FF41]/30 bg-gray-900/80 pr-10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#00FF41] focus:ring-1 focus:ring-[#00FF41]/50 transition-all"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-8 w-8 items-center justify-center rounded-full text-[#00FF41] hover:bg-[#00FF41]/10 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {mobileMenuOpen && (
        <div className="bg-black/98 border-t border-[#00FF41]/20 md:hidden animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-sm font-semibold tracking-wide text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] uppercase transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            {NAV_GAMES.map((game) => {
              const href = game.slug === "noticias" ? "/noticias" : `/juegos/${game.slug}`;
              return (
                <Link
                  key={game.slug}
                  href={href}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold tracking-wide text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] uppercase transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {game.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}