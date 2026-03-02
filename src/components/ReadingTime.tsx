// src/components/ReadingTime.tsx
import { ClockIcon } from '@heroicons/react/24/outline';

interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number; // Velocidad promedio de lectura (por defecto 200 palabras/min)
  className?: string;
}

export default function ReadingTime({ 
  content, 
  wordsPerMinute = 200, 
  className = '' 
}: ReadingTimeProps) {
  // Limpiar HTML y contar palabras
  const cleanText = content
    .replace(/<[^>]*>/g, '') // Eliminar tags HTML
    .replace(/\s+/g, ' ')     // Normalizar espacios
    .trim();

  const wordCount = cleanText.split(' ').filter(word => word.length > 0).length;
  
  // Calcular tiempo de lectura (mínimo 1 minuto)
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <div className={`flex items-center gap-1.5 text-gray-500 text-sm ${className}`}>
      <ClockIcon className="w-4 h-4" />
      <span>{readingTime} min de lectura</span>
    </div>
  );
}