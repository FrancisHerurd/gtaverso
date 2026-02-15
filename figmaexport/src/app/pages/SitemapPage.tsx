import { Link } from 'react-router';
import { categories, articles } from '../data/articles-data';
import { SEO } from '../components/SEO';
import { Map, FileText, Tag } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../components/ui/breadcrumb';

export function SitemapPage() {
  // Agrupar artículos por categoría
  const articlesByCategory = categories.map((category) => ({
    category,
    articles: articles.filter((article) => article.category === category.id)
  }));

  return (
    <>
      <SEO
        title="Mapa del Sitio"
        description="Explora todo el contenido de GTA News. Encuentra fácilmente noticias, guías, análisis y trucos sobre GTA."
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
                    Mapa del Sitio
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Map className="h-8 w-8 text-[#00FF41]" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Mapa del Sitio
              </h1>
            </div>
            <p className="text-gray-400 text-lg">
              Navega por todo el contenido de GTA News de forma organizada
            </p>
          </div>

          {/* Main Pages */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FileText className="h-6 w-6 text-[#00FF41]" />
              Páginas Principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/"
                className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 hover:ring-2 hover:ring-[#00FF41] transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-1">Inicio</h3>
                <p className="text-sm text-gray-400">
                  Página principal con artículos destacados
                </p>
              </Link>
              <Link
                to="/mapa-del-sitio"
                className="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 hover:ring-2 hover:ring-[#00FF41] transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-1">Mapa del Sitio</h3>
                <p className="text-sm text-gray-400">
                  Esta página - navegación completa del sitio
                </p>
              </Link>
            </div>
          </section>

          {/* Categories and Articles */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Tag className="h-6 w-6 text-[#00FF41]" />
              Categorías y Artículos
            </h2>
            
            <div className="space-y-8">
              {articlesByCategory.map(({ category, articles: categoryArticles }) => (
                <div key={category.id} className="bg-gray-900 rounded-xl p-6">
                  <Link
                    to={`/categoria/${category.slug}`}
                    className="inline-block mb-4 group"
                  >
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00FF41] transition-colors capitalize">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {categoryArticles.length} {categoryArticles.length === 1 ? 'artículo' : 'artículos'}
                    </p>
                  </Link>
                  
                  {categoryArticles.length > 0 ? (
                    <ul className="space-y-2 ml-4">
                      {categoryArticles.map((article) => (
                        <li key={article.id}>
                          <Link
                            to={`/articulo/${article.slug}`}
                            className="text-gray-300 hover:text-[#00FF41] transition-colors flex items-start gap-2"
                          >
                            <span className="text-[#00FF41] mt-1.5">•</span>
                            <span className="flex-1">{article.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 ml-4 text-sm">
                      No hay artículos en esta categoría todavía
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer Links */}
          <section className="mt-12 pt-8 border-t border-gray-800">
            <h2 className="text-xl font-bold text-white mb-4">
              Enlaces Adicionales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FF41] transition-colors"
              >
                Política de Privacidad
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FF41] transition-colors"
              >
                Términos de Uso
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FF41] transition-colors"
              >
                Contacto
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FF41] transition-colors"
              >
                Sobre Nosotros
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
