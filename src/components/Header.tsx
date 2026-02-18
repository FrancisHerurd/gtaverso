// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

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
      {/* Top bar con logo y acciones */}
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF41] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-2xl font-bold text-[#00FF41] tracking-tighter">
                GTA<span className="text-white">VERSO</span>
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/"
              className={`text-sm uppercase tracking-wide transition-colors ${
                isActive(pathname, "/")
                  ? "text-[#00FF41]"
                  : "text-gray-300 hover:text-[#00FF41]"
              }`}
            >
              Inicio
            </Link>
            {NAV_GAMES.map((game) => {
              const href = `/${game.slug}`;
              const active = isActive(pathname, href);
              return (
                <Link
                  key={game.slug}
                  href={href}
                  className={`text-sm uppercase tracking-wide transition-colors ${
                    active
                      ? "text-[#00FF41]"
                      : "text-gray-300 hover:text-[#00FF41]"
                  }`}
                >
                  {game.label}
                </Link>
              );
            })}
            {/* AQUÍ ANTES ESTABA "MAPA DEL SITIO" HARDCODEADO - ELIMINADO */}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search button */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] md:hidden"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#00FF41]/20 py-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Buscar noticias, guías, trucos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#00FF41]/30 bg-gray-900/50 pr-10 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#00FF41]"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full text-[#00FF41] hover:bg-[#00FF41]/10"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="bg-black/98 border-t border-[#00FF41]/20 md:hidden">
          <nav className="space-y-2 px-4 py-4">
            <Link
              href="/"
              className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            {NAV_GAMES.map((game) => (
              <Link
                key={game.slug}
                href={`/${game.slug}`}
                className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41] transition-colors uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {game.label}
              </Link>
            ))}
            {/* AQUÍ ANTES ESTABA "MAPA DEL SITIO" HARDCODEADO - ELIMINADO */}
          </nav>
        </div>
      )}
    </header>
  );
}