import { useSearchParams, Link } from 'react-router';
import { searchArticles } from '../data/articles-data';
import { ArticleCard } from '../components/ArticleCard';
import { SEO } from '../components/SEO';
import { Search } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../components/ui/breadcrumb';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchArticles(query) : [];

  return (
    <>
      <SEO
        title={`Buscar: ${query}`}
        description={`Resultados de búsqueda para "${query}" en GTA News`}
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="text-gray-400 hover:text-[#00FF41]">
                      Inicio
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-500">
                    Buscar
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Search className="h-8 w-8 text-[#00FF41]" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Resultados de búsqueda
              </h1>
            </div>
            
            {query && (
              <p className="text-gray-400 text-lg">
                Buscando: <span className="text-[#00FF41] font-semibold">"{query}"</span>
                {' '}
                - {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              </p>
            )}
          </div>

          {/* Results */}
          {!query ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">
                Introduce un término de búsqueda para encontrar artículos
              </p>
              <Link
                to="/"
                className="text-[#00FF41] hover:underline"
              >
                Volver al inicio
              </Link>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">
                No se encontraron resultados para "{query}"
              </p>
              <p className="text-gray-500 mb-6">
                Intenta con otros términos de búsqueda o explora nuestras categorías
              </p>
              <Link
                to="/"
                className="text-[#00FF41] hover:underline"
              >
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
