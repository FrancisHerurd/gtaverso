// src/components/SearchBar.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar noticias, guías, trucos..."
          className="w-full rounded-lg border border-white/20 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:border-[#00FF41] focus:outline-none focus:ring-2 focus:ring-[#00FF41]/20 transition-colors"
        />
      </div>
    </form>
  )
}