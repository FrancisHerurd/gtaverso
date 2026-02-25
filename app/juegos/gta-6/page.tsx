// app/juegos/gta-6/page.tsx
import type { Metadata } from 'next'
import { Newspaper, Image as ImageIcon, Video, Music, Palette } from 'lucide-react'
import { notFound } from 'next/navigation'
import GameHub from '@/components/GameHub'
import LatestNewsSection from '@/components/LatestNewsSection/LatestNewsSection'
import { getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'GTA 6 - GTAVerso',
  description: 'Noticias, guías y todo sobre Grand Theft Auto VI.',
  alternates: {
    canonical: 'https://gtaverso.com/juegos/gta-6',
  },
}

export default async function GTA6Page() {
  const allPosts = await getAllPosts()

  const noticias = allPosts
    .filter((p) => p.game === 'gta-6' && p.type === 'noticias')
    .slice(0, 5)

  const gameData = {
    title: 'Grand Theft Auto VI',
    color: '#00FF41',
    heroImage: '/images/gta6-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Grand Theft Auto VI nos lleva de vuelta al estado de Leonida, hogar de las calles bañadas en neón de Vice City y sus alrededores, en la evolución más grande y envolvente de la serie GTA hasta la fecha.</p>
        <p>Protagonizada por Lucía y Jason, vivirás una historia de crimen, confianza y traición en un mundo abierto dinámico que evoluciona con el tiempo.</p>
      </div>
    ),
    gameInfo: {
      developer: 'Rockstar North',
      publisher: 'Rockstar Games',
      releaseDate: '19 de noviembre de 2026',
      setting: 'Actualidad (2025-2026)',
      location: 'Estado de Leonida (Florida)',
      platforms: ['PS5', 'Xbox Series X|S'],
      multiplayer: 'GTA Online 2 (Confirmado)',
    },
    releaseTimeline: [
      {
        date: '4 de diciembre de 2023',
        platforms: [],
        notes: 'Tráiler de Revelación Oficial',
      },
      {
        date: '19 de noviembre de 2026',
        platforms: [
          { name: 'PS5', color: 'blue' },
          { name: 'Xbox Series X|S', color: 'green' }
        ],
        notes: 'Lanzamiento Mundial',
      },
    ],
    sections: [
      {
        title: 'Noticias y Actualizaciones',
        description: 'Últimas novedades, parches y filtraciones sobre Grand Theft Auto VI.',
        href: '/juegos/gta-6/noticias',
        icon: Newspaper,
        image: '/images/game-news.webp',
      },
      {
        title: 'Guías y Trucos',
        description: 'Supera todas las misiones, consigue dinero infinito y descubre secretos.',
        href: '/juegos/gta-6/guias',
        icon: ImageIcon,
        image: '/images/game-guides.webp',
      },
      {
        title: 'Vídeos',
        description: 'Tráilers oficiales y gameplay.',
        href: '/juegos/gta-6/videos',
        icon: Video,
        image: '/images/game-videos.webp',
      },
    ],
  }

  return (
    <>
      <div className="bg-[#050508] pt-12">
        <div className="mx-auto max-w-[--container] px-4 sm:px-6 lg:px-8">
          {noticias.length > 0 && (
            <LatestNewsSection
              posts={noticias}
              game="gta-6"
              gameLabel="GTA 6"
              accentColor={gameData.color}
            />
          )}
        </div>
      </div>

      <GameHub
        title={gameData.title}
        color={gameData.color}
        heroImage={gameData.heroImage}
        description={gameData.description}
        sections={gameData.sections}
        gameInfo={gameData.gameInfo}
        releaseTimeline={gameData.releaseTimeline}
      />
    </>
  )
}