// app/juegos/[game]/page.tsx
import GameHub from "@/components/GameHub";
import { Newspaper, Image as ImageIcon, Video, Music, Palette } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/api";

// --- DICCIONARIO DE DATOS POR JUEGO ---
const gameDataDictionary: Record<string, any> = {
  "gta-6": {
    title: "Grand Theft Auto VI",
    color: "#FF00FF",
    heroImage: "/images/gta6-hero.webp",
    imgPrefix: "gta6", // ← ESTO ES LO QUE ARREGLA LAS FOTOS
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Grand Theft Auto VI nos lleva de vuelta al estado de Leonida, hogar de las calles empapadas de neón de Vice City y más allá, en la evolución más grande e inmersiva de la serie Grand Theft Auto hasta la fecha.</p>
        <p>Protagonizada por Lucía y Jason, vivirás una historia de crimen, confianza y traición al estilo Bonnie & Clyde moderno en un mundo abierto sin precedentes.</p>
      </div>
    ),
    gameInfo: {
      developer: "Rockstar North",
      publisher: "Rockstar Games",
      releaseDate: "19 de noviembre de 2026",
      setting: "Actualidad (2025-2026)",
      location: "Estado de Leonida (Florida)",
      platforms: ["PS5", "Xbox Series X|S"],
      multiplayer: "GTA Online 2 (Confirmado)",
    },
    releaseTimeline: [
      { date: "4 de diciembre de 2023", platforms: [], notes: "Tráiler de Revelación Oficial" },
      { date: "19 de noviembre de 2026", platforms: [{ name: "PS5", color: "blue" }, { name: "Xbox Series X|S", color: "green" }], notes: "Lanzamiento Consolas" },
    ],
  },
  "gta-5": {
    title: "Grand Theft Auto V",
    color: "#00FF41",
    heroImage: "/images/gta5-hero.webp",
    imgPrefix: "gta5", // ← ESTO ES LO QUE ARREGLA LAS FOTOS
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Cuando un joven estafador callejero, un ladrón de bancos retirado y un psicópata aterrador se ven involucrados con lo peor de la mafia, el gobierno y la industria del entretenimiento, tendrán que llevar a cabo una serie de peligrosos atracos para sobrevivir.</p>
      </div>
    ),
    gameInfo: {
      developer: "Rockstar North",
      publisher: "Rockstar Games",
      releaseDate: "17 de septiembre de 2013",
      setting: "2013",
      location: "Los Santos y Blaine County",
      platforms: ["PS5", "PS4", "PS3", "Xbox Series X|S", "Xbox One", "Xbox 360", "PC"],
      multiplayer: "GTA Online",
    },
    releaseTimeline: [
      { date: "17 de septiembre de 2013", platforms: [], notes: "Lanzamiento Original (PS3/X360)" },
      { date: "14 de abril de 2015", platforms: [{ name: "PC", color: "dark" }], notes: "Lanzamiento en PC" },
    ],
  }
};

export async function generateStaticParams() {
  const data = await fetchAPI(`
    query TodosLosJuegos {
      juegos {
        nodes {
          slug
        }
      }
    }
  `);

  if (!data?.juegos?.nodes) return [];

  return data.juegos.nodes.map((juego: any) => ({
    game: juego.slug,
  }));
}

export default async function GamePage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const gameData = gameDataDictionary[game];

  if (!gameData) {
    notFound();
  }

  // Las secciones de debajo de la foto hero (Noticias, Guías, etc.)
  const sections = [
    {
      title: "Noticias y Actualizaciones",
      description: `Últimas novedades, parches y filtraciones sobre ${gameData.title}.`,
      href: `/juegos/${game}/noticias`,
      icon: Newspaper,
      image: `/images/${gameData.imgPrefix}-news.webp`, // ← AQUÍ USAMOS EL PREFIJO
    },
    {
      title: "Guías y Trucos",
      description: "Supera todas las misiones, consigue dinero infinito y descubre secretos.",
      href: `/juegos/${game}/guias`, 
      icon: ImageIcon, 
      image: `/images/${gameData.imgPrefix}-guides.webp`, // ← AQUÍ USAMOS EL PREFIJO
    },
    {
      title: "Vídeos",
      description: "Tráilers oficiales y gameplay.",
      href: `/juegos/${game}/videos`,
      icon: Video,
      image: `/images/${gameData.imgPrefix}-videos.webp`, // ← AQUÍ USAMOS EL PREFIJO
    }
  ];

  return (
    <GameHub
      title={gameData.title}
      color={gameData.color}
      heroImage={gameData.heroImage}
      description={gameData.description}
      sections={sections}
      gameInfo={gameData.gameInfo}
      releaseTimeline={gameData.releaseTimeline}
    />
  );
}