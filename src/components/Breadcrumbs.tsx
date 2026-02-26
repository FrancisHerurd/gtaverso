// src/components/Breadcrumbs.tsx
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export type BreadcrumbItem = {
  label: string
  href?: string // Si no tiene href, es el item actual (no clicable)
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // Structured data para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://www.gtaverso.com',
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: `https://www.gtaverso.com${item.href}` }),
      })),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm ${className}`}>
        {/* Home siempre visible */}
        <Link
          href="/"
          className="flex items-center gap-1 text-white/50 transition-colors hover:text-white"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Inicio</span>
        </Link>

        {/* Items dinámicos */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-white/30" />
              
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-white/50 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-white' : 'text-white/50'}>
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </nav>
    </>
  )
}