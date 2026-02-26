// app/buscar/page.tsx
import type { Metadata } from 'next'
import { Suspense } from 'react'
import BuscarClient from './BuscarClient'

export const metadata: Metadata = {
  title: 'Buscar · GTAVerso',
  description: 'Busca noticias, guías y contenido sobre GTA.',
  robots: 'noindex, follow', // No indexar resultados de búsqueda
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<BuscarSkeleton />}>
      <BuscarClient />
    </Suspense>
  )
}

function BuscarSkeleton() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-20">
        <div className="mb-12 animate-pulse">
          <div className="h-12 w-64 bg-white/10 rounded mb-4" />
          <div className="h-6 w-96 bg-white/10 rounded" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-96 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  )
}