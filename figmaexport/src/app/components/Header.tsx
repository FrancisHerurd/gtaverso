import { Link } from 'react-router';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { categories } from '../data/articles-data';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/buscar?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#00FF41]/20">
      {/* Top bar con logo y acciones */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00FF41] blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <span className="relative text-2xl font-bold text-[#00FF41] tracking-tighter">
                GTA<span className="text-white">NEWS</span>
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="text-sm text-gray-300 hover:text-[#00FF41] transition-colors uppercase tracking-wide"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-300 hover:text-[#00FF41] hover:bg-[#00FF41]/10"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:text-[#00FF41] hover:bg-[#00FF41]/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-4 border-t border-[#00FF41]/20">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Buscar noticias, guías, trucos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900/50 border-[#00FF41]/30 text-white placeholder:text-gray-500 focus:border-[#00FF41] pr-10"
                autoFocus
              />
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-[#00FF41] hover:bg-[#00FF41]/10"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#00FF41]/20 bg-black/98">
          <nav className="px-4 py-4 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categoria/${category.slug}`}
                className="block py-3 px-4 text-gray-300 hover:text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg transition-colors uppercase tracking-wide"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/mapa-del-sitio"
              className="block py-3 px-4 text-gray-300 hover:text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Mapa del Sitio
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
