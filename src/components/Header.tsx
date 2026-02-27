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

// Icono X (Twitter)
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Icono Instagram
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Icono TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

// Icono RSS
const RSSIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
  </svg>
);

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
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

          {/* BOTONES DERECHA */}
          <div className="flex items-center space-x-1">
            
            {/* Redes Sociales - Desktop */}
            <div className="hidden lg:flex items-center gap-1 mr-1">
              <a
                href="https://twitter.com/GTA_Verso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-colors"
                aria-label="Twitter/X"
                title="Twitter/X"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/GTA_Verso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-[#E4405F]/10 hover:text-[#E4405F] transition-colors"
                aria-label="Instagram"
                title="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://tiktok.com/@gta.verso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="TikTok"
                title="TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-[#FFA500]/10 hover:text-[#FFA500] transition-colors"
                aria-label="RSS Feed"
                title="RSS Feed"
              >
                <RSSIcon className="h-4 w-4" />
              </a>
            </div>
            
            {/* Botón Lupa */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Menú Hamburguesa (Solo Móvil) */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] lg:hidden transition-colors"
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
        <div className="bg-black/98 border-t border-[#00FF41]/20 lg:hidden animate-in fade-in slide-in-from-top-2">
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
            
            {/* Redes en móvil */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#00FF41]/20">
              <a
                href="https://twitter.com/GTA_Verso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FF41] text-sm"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com/GTA_Verso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FF41] text-sm"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@gta.verso"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00FF41] text-sm"
              >
                TikTok
              </a>
              <a
                href="/feed.xml"
                target="_blank"
                className="text-gray-400 hover:text-[#00FF41] text-sm"
              >
                RSS
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}