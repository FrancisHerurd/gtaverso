// app/juegos/[game]/page.tsx
import GameHub from '@/components/GameHub';
import { Newspaper } from 'lucide-react';
import { notFound } from 'next/navigation';

const gameDataDictionary: Record<string, any> = {
  'gta-6': {
    title: 'Grand Theft Auto VI',
    assetPrefix: 'gta6',
    color: '#FF00FF',
    heroImage: '/images/gta6-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Grand Theft Auto VI nos lleva de vuelta al estado de Leonida, hogar de las calles empapadas de neón de Vice City.</p>
        <p>Protagonizada por Lucia y Jason, vivirás una historia de crimen y confianza en el mundo abierto más inmersivo hasta la fecha.</p>
      </div>
    ),
    gameInfo: {
      developer: 'Rockstar North',
      publisher: 'Rockstar Games',
      releaseDate: 'Otoño 2025',
      platforms: 'PS5, Xbox Series X|S',
    },
    releaseTimeline: [
      { date: '4 Dic 2023', platforms: [], notes: 'Tráiler 1 Oficial' },
      { date: 'Otoño 2025', platforms: [{ name: 'PS5', color: 'blue' }, { name: 'Xbox Series X|S', color: 'green' }], notes: 'Lanzamiento Previsto' }
    ]
  },
  'gta-5': {
    title: 'Grand Theft Auto V',
    assetPrefix: 'gta5',
    color: '#569446',
    heroImage: '/images/gta5-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor del mundo criminal.</p>
      </div>
    ),
    gameInfo: {
      developer: 'Rockstar North',
      releaseDate: '17 Sept 2013',
      platforms: 'PS3, PS4, PS5, Xbox, PC',
    },
    releaseTimeline: [
      { date: '17 Sept 2013', platforms: [{ name: 'PS3', color: 'blue' }, { name: 'Xbox 360', color: 'green' }], notes: 'Lanzamiento Original' },
      { date: '14 Abr 2015', platforms: [{ name: 'PC', color: 'dark' }], notes: 'Lanzamiento en PC' },
      { date: '15 Mar 2022', platforms: [{ name: 'PS5', color: 'blue' }, { name: 'Xbox Series X|S', color: 'green' }], notes: 'Versión Next-Gen' }
    ]
  },
  'gta-4': {
    title: 'Grand Theft Auto IV',
    assetPrefix: 'gta4',
    color: '#FBBF24',
    heroImage: '/images/gta4-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Niko Bellic llega a Liberty City para escapar de su pasado, pero descubre que el sueño americano es solo una pesadilla de codicia.</p>
      </div>
    ),
    gameInfo: { developer: 'Rockstar North', releaseDate: '29 Abr 2008', platforms: 'PS3, Xbox 360, PC' },
    releaseTimeline: [
      { date: '29 Abr 2008', platforms: [{ name: 'PS3', color: 'blue' }, { name: 'Xbox 360', color: 'green' }], notes: 'Lanzamiento Original' },
      { date: '2 Dic 2008', platforms: [{ name: 'PC', color: 'dark' }], notes: 'Lanzamiento en PC' }
    ]
  },
  'gta-san-andreas': {
    title: 'GTA: San Andreas',
    assetPrefix: 'sa',
    color: '#FFA500',
    heroImage: '/images/sa-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Hace cinco años, Carl Johnson escapó de la presión de Los Santos. Ahora vuelve a casa para encontrar a su familia destrozada.</p>
      </div>
    ),
    gameInfo: { developer: 'Rockstar North', releaseDate: '26 Oct 2004', platforms: 'PS2, Xbox, PC, Móvil' },
    releaseTimeline: [
      { date: '26 Oct 2004', platforms: [{ name: 'PS2', color: 'blue' }], notes: 'Lanzamiento Original' },
      { date: '11 Nov 2021', platforms: [{ name: 'Consolas Modernas', color: 'dark' }], notes: 'The Definitive Edition' }
    ]
  },
  'gta-vice-city': {
    title: 'GTA: Vice City',
    assetPrefix: 'vc',
    color: '#00E5FF',
    heroImage: '/images/vc-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Bienvenido a los años 80. La historia del ascenso de Tommy Vercetti a la cima del mundo criminal con pelos cardados y trajes pastel.</p>
      </div>
    ),
    gameInfo: { developer: 'Rockstar North', releaseDate: '29 Oct 2002', platforms: 'PS2, Xbox, PC, Móvil' },
    releaseTimeline: [
      { date: '29 Oct 2002', platforms: [{ name: 'PS2', color: 'blue' }], notes: 'Lanzamiento Original' },
      { date: '11 Nov 2021', platforms: [{ name: 'Consolas Modernas', color: 'dark' }], notes: 'The Definitive Edition' }
    ]
  },
  'gta-3': {
    title: 'Grand Theft Auto III',
    assetPrefix: 'gta3',
    color: '#E5E7EB',
    heroImage: '/images/gta3-hero.webp',
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Todo empieza en Liberty City. El juego que definió el género de mundo abierto y nos enseñó que el crimen paga.</p>
      </div>
    ),
    gameInfo: { developer: 'DMA Design', releaseDate: '22 Oct 2001', platforms: 'PS2, Xbox, PC, Móvil' },
    releaseTimeline: [
      { date: '22 Oct 2001', platforms: [{ name: 'PS2', color: 'blue' }], notes: 'Lanzamiento Original' },
      { date: '11 Nov 2021', platforms: [{ name: 'Consolas Modernas', color: 'dark' }], notes: 'The Definitive Edition' }
    ]
  },
};

export function generateStaticParams() {
  return Object.keys(gameDataDictionary).map((gameSlug) => ({
    game: gameSlug,
  }));
}

export default async function GamePage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const gameData = gameDataDictionary[game];

  if (!gameData) return notFound();

  const prefix = gameData.assetPrefix;

  // Solo mostramos la sección de Noticias para todos los juegos
  const sections = [
    {
      title: 'Noticias',
      description: `Últimas novedades de ${gameData.title}.`,
      href: `/juegos/${game}/noticias`,
      icon: Newspaper,
      image: `/images/${prefix}-news.webp`,
    },
  ];

  return (
    <GameHub
      title={gameData.title}
      color={gameData.color}
      heroImage={gameData.heroImage}
      description={gameData.description}
      sections={sections}
      gameInfo={gameData.gameInfo}
      releaseTimeline={gameData.releaseTimeline || []}
    />
  );
}