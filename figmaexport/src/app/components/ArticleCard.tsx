import { Link } from 'react-router';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Article } from '../data/articles-data';
import { Badge } from './ui/badge';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (featured) {
    return (
      <Link
        to={`/articulo/${article.slug}`}
        className="group block relative overflow-hidden rounded-xl bg-gray-900 transition-transform hover:scale-[1.02] h-full"
      >
        {/* Image */}
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-[#00FF41] text-black hover:bg-[#00FF41]/90 uppercase tracking-wide">
              {article.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00FF41] transition-colors">
            {article.title}
          </h2>

          <p className="text-gray-300 mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 text-[#00FF41] font-semibold">
            Leer más
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/articulo/${article.slug}`}
      className="group block bg-gray-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-[#00FF41] transition-all h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-[#00FF41] text-black hover:bg-[#00FF41]/90 text-xs uppercase tracking-wide">
            {article.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime} min
          </span>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#00FF41] transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 text-[#00FF41] text-sm font-semibold mt-auto">
          Leer más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
