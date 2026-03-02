// src/components/TableOfContents.tsx
'use client';

import { useEffect, useState } from 'react';
import { ChevronDownIcon, ListBulletIcon } from '@heroicons/react/24/outline';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  // Extraer H2 y H3 del HTML
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const tocItems: TOCItem[] = [];
    headingElements.forEach((heading, index) => {
      const text = heading.textContent?.trim() || '';
      const id = `heading-${index}`;
      const level = parseInt(heading.tagName.substring(1));

      // Añadir ID al heading original si no existe
      heading.id = id;

      tocItems.push({ id, text, level });
    });

    setHeadings(tocItems);
  }, [content]);

  // Intersection Observer para highlighting activo
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 1.0,
      }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Scroll suave al hacer clic
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset para header fijo
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="sticky top-24 mb-8">
      <div className="bg-[#0a0b14] border border-[#00FF41]/20 rounded-lg overflow-hidden backdrop-blur-sm">
        {/* Header colapsable */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#00FF41]/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ListBulletIcon className="w-5 h-5 text-[#00FF41]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Tabla de Contenidos
            </h2>
          </div>
          <ChevronDownIcon
            className={`w-5 h-5 text-[#00FF41] transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Lista de headings */}
        <nav
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="px-5 pb-4 space-y-1">
            {headings.map(({ id, text, level }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`
                    w-full text-left py-2 px-3 rounded text-sm transition-all
                    hover:bg-[#00FF41]/10 hover:text-[#00FF41]
                    ${level === 3 ? 'pl-6' : ''}
                    ${
                      activeId === id
                        ? 'bg-[#00FF41]/10 text-[#00FF41] font-semibold border-l-2 border-[#00FF41]'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Indicador de progreso */}
        {isOpen && (
          <div className="px-5 pb-4 pt-2 border-t border-[#00FF41]/10">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="flex-1 bg-gray-800 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-[#00FF41] h-full transition-all duration-300"
                  style={{
                    width: `${((headings.findIndex((h) => h.id === activeId) + 1) / headings.length) * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono">
                {headings.findIndex((h) => h.id === activeId) + 1}/{headings.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}