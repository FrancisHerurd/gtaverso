import { getFeaturedArticles, articles } from '../data/articles-data';
import { ArticleCard } from '../components/ArticleCard';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { SEO, WebsiteStructuredData } from '../components/SEO';
import { TrendingUp, Flame } from 'lucide-react';

export function HomePage() {
  const featuredArticles = getFeaturedArticles();
  const latestArticles = articles.slice(0, 6);

  return (
    <>
      <SEO
        title="Inicio"
        description="Las mejores noticias, guías y análisis sobre GTA V, GTA Online y GTA 6. Mantente al día con las últimas actualizaciones, trucos y secretos."
        type="website"
      />
      <WebsiteStructuredData />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950">
        {/* Hero Section - Featured Article */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <Flame className="h-6 w-6 text-[#00FF41]" />
              <h2 className="text-2xl font-bold text-white">Destacados</h2>
            </div>
            
            {featuredArticles.length > 0 && (
              <div className="mb-8">
                <ArticleCard article={featuredArticles[0]} featured />
              </div>
            )}

            {/* Featured Grid */}
            {featuredArticles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {featuredArticles.slice(1).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Latest Articles */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-[#00FF41]" />
              <h2 className="text-2xl font-bold text-white">Últimas Noticias</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

        {/* AdSense Placeholder */}
        <section className="relative py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AdSensePlaceholder format="auto" />
          </div>
        </section>
      </div>
    </>
  );
}