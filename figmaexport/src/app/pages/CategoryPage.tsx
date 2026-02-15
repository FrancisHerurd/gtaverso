import { useParams, Link } from 'react-router';
import { getArticlesByCategory, categories } from '../data/articles-data';
import { ArticleCard } from '../components/ArticleCard';
import { SEO } from '../components/SEO';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '../components/ui/breadcrumb';

export function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Categoría no encontrada</h1>
          <Link to="/" className="text-[#00FF41] hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const articles = getArticlesByCategory(category.id as any);

  return (
    <>
      <SEO
        title={category.name}
        description={`Todos los artículos de ${category.name} sobre GTA. Encuentra las mejores guías, noticias y análisis.`}
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
                  <BreadcrumbPage className="text-gray-500 capitalize">
                    {category.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-gray-400 text-lg">
              {articles.length} {articles.length === 1 ? 'artículo' : 'artículos'} en esta categoría
            </p>
          </div>

          {/* Articles Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">
                No hay artículos en esta categoría todavía.
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
