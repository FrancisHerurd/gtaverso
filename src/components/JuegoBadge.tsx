// src/components/JuegoBadge.tsx

import Link from 'next/link';
import { JuegoTaxonomy } from '@/types/wordpress';

interface Props {
  juegos: JuegoTaxonomy[];
  className?: string;
  showLink?: boolean; // Por si quieres badges sin enlace
}

/**
 * Muestra badges de taxonomía Juegos
 * Slugs esperados: gta-5, gta-6, san-andreas, vice-city, etc.
 */
export default function JuegoBadge({ 
  juegos, 
  className = '', 
  showLink = true 
}: Props) {
  if (!juegos || juegos.length === 0) return null;

  // Mapeo de colores por slug para visual consistency
  const getColorClass = (slug: string) => {
    const colorMap: Record<string, string> = {
      'gta-6': 'from-purple-500 to-pink-600',
      'gta-5': 'from-green-500 to-emerald-600',
      'gta-4': 'from-blue-500 to-indigo-600',
      'san-andreas': 'from-yellow-500 to-orange-600',
      'vice-city': 'from-pink-500 to-rose-600',
      'gta-3': 'from-gray-500 to-slate-600',
      'gta': 'from-orange-500 to-red-600',
    };
    
    return colorMap[slug] || 'from-orange-500 to-red-600';
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {juegos.map((juego) => {
        const badge = (
          <span
            className={`
              px-3 py-1 
              bg-gradient-to-r ${getColorClass(juego.slug)}
              text-white text-xs md:text-sm font-semibold 
              rounded-full 
              inline-block
              ${showLink ? 'hover:scale-105 hover:shadow-lg transition-all duration-200' : ''}
            `}
          >
            {juego.name}
          </span>
        );

        return showLink ? (
          <Link
            key={juego.slug}
            href={`/juegos/${juego.slug}`}
            className="inline-block"
          >
            {badge}
          </Link>
        ) : (
          <span key={juego.slug}>{badge}</span>
        );
      })}
    </div>
  );
}