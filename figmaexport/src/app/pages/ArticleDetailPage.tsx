import { useParams, Link } from 'react-router';
import { getArticleBySlug } from '../data/articles-data';
import { SEO, ArticleStructuredData } from '../components/SEO';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { Clock, User, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';

export function ArticleDetailPage() {
  const { slug } = useParams();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Artículo no encontrado</h1>
          <Link to="/" className="text-[#00FF41] hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Enlace copiado al portapapeles');
      } catch (err) {
        toast.error('No se pudo copiar el enlace');
      }
    }
  };

  const articleUrl = `https://gtanews.com/articulo/${article.slug}`;

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        type="article"
        image={article.imageUrl}
        url={articleUrl}
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        author={article.author}
        tags={article.tags}
      />
      <ArticleStructuredData
        title={article.title}
        description={article.excerpt}
        image={article.imageUrl}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
        author={article.author}
        url={articleUrl}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950">
        <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00FF41] mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>

          {/* Category badge */}
          <Badge className="bg-[#00FF41] text-black hover:bg-[#00FF41]/90 uppercase tracking-wide mb-4">
            {article.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-400 mb-8 pb-8 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min de lectura</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="ml-auto text-gray-400 hover:text-[#00FF41] hover:bg-[#00FF41]/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
          </div>

          {/* Featured image */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <img
              src={article.imageUrl}
              alt={article.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt */}
          <div className="bg-gray-900 border-l-4 border-[#00FF41] p-6 mb-8 rounded-r-lg">
            <p className="text-lg text-gray-300 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-[#00FF41]
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-[#00FF41] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-300 prose-ul:my-4
              prose-li:my-2
              prose-img:rounded-lg
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
                Etiquetas
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-[#00FF41]/30 text-gray-300 hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* AdSense Placeholder */}
          <div className="mt-12">
            <AdSensePlaceholder format="auto" />
          </div>
        </article>
      </div>
    </>
  );
}