// app/juegos/[game]/page.tsx
import GameHub from "@/components/GameHub";
import { Newspaper, Gamepad2, Video, Database, Music, Image as ImageIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchAPI } from "@/lib/api";

// --- DICCIONARIO DE DATOS POR JUEGO ---
const gameDataDictionary: Record<string, any> = {
  "gta-6": {
    title: "Grand Theft Auto VI",
    color: "#FF00FF",
    heroImage: "/images/gta6-hero.webp",
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
    // ❌ GTA 6 NO TIENE GUÍAS (AÚN)
    customSections: [
      { title: "Noticias y Rumores", description: "Últimas novedades, filtraciones y análisis de GTA 6.", href: "/juegos/gta-6/noticias", icon: Newspaper, image: "/images/gta6-news.webp" },
      { title: "Tráilers y Vídeos", description: "Análisis de tráilers oficiales e imágenes promocionales.", href: "/juegos/gta-6/videos", icon: Video, image: "/images/gta6-videos.webp" },
      { title: "Imágenes y Arte", description: "Capturas de pantalla, arte oficial y wallpapers.", href: "/juegos/gta-6/imagenes", icon: ImageIcon, image: "/images/gta6-screens.webp" }
    ]
  },
  "gta-5": {
    title: "Grand Theft Auto V",
    color: "#00FF41",
    heroImage: "/images/gta5-hero.webp",
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
    // ✅ GTA 5 SÍ TIENE GUÍAS
    customSections: [
      { title: "Noticias y Novedades", description: "Actualizaciones semanales y parches.", href: "/juegos/gta-5/noticias", icon: Newspaper, image: "/images/gta5-news.webp" },
      { title: "Guías y Misiones", description: "Guía completa del modo historia y secretos.", href: "/juegos/gta-5/guias", icon: Gamepad2, image: "/images/gta5-guides.webp" },
      { title: "Trucos (Cheats)", description: "Todos los códigos y números de teléfono.", href: "/juegos/gta-5/trucos", icon: Database, image: "/images/gta5-cheats.webp" }
    ]
  },
  "gta-4": {
    title: "Grand Theft Auto IV",
    color: "#00BFFF",
    heroImage: "/images/gta4-hero.webp",
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>¿Qué significa el sueño americano hoy en día? Para Niko Bellic, recién llegado en barco desde Europa, es la esperanza de que puede escapar de su pasado. Para su primo Roman, es la visión de que juntos pueden hacer fortuna en Liberty City.</p>
      </div>
    ),
    gameInfo: {
      developer: "Rockstar North",
      publisher: "Rockstar Games",
      releaseDate: "29 de abril de 2008",
      setting: "2008",
      location: "Liberty City",
      platforms: ["PS3", "Xbox 360", "PC"],
      multiplayer: "GTA IV Multiplayer",
    },
    releaseTimeline: [
      { date: "29 de abril de 2008", platforms: [{ name: "PS3", color: "blue" }, { name: "Xbox 360", color: "green" }], notes: "Lanzamiento Consolas" },
      { date: "2 de diciembre de 2008", platforms: [{ name: "PC", color: "dark" }], notes: "Lanzamiento en PC" },
    ],
    customSections: [
      { title: "Noticias de GTA 4", description: "Novedades y artículos retro.", href: "/juegos/gta-4/noticias", icon: Newspaper, image: "/images/gta4-news.webp" },
      { title: "Guías 100%", description: "Cómo superar las misiones de Niko Bellic.", href: "/juegos/gta-4/guias", icon: Gamepad2, image: "/images/gta4-guides.webp" },
      { title: "Trucos Móvil", description: "Todos los códigos del teléfono.", href: "/juegos/gta-4/trucos", icon: Database, image: "/images/gta4-cheats.webp" }
    ]
  },
  "gta-san-andreas": {
    title: "GTA: San Andreas",
    color: "#FF8C00",
    heroImage: "/images/sa-hero.webp",
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Hace cinco años, Carl Johnson escapó de las presiones de la vida en Los Santos, San Andreas, una ciudad destrozada por las pandillas, las drogas y la corrupción. Ahora, a principios de los 90, CJ tiene que volver a casa.</p>
      </div>
    ),
    gameInfo: {
      developer: "Rockstar North",
      publisher: "Rockstar Games",
      releaseDate: "26 de octubre de 2004",
      setting: "1992",
      location: "San Andreas",
      platforms: ["PS2", "Xbox", "PC", "Mobile"],
      multiplayer: "SA-MP",
    },
    releaseTimeline: [
      { date: "26 de octubre de 2004", platforms: [{ name: "PS2", color: "blue" }], notes: "Lanzamiento Original" },
    ],
    customSections: [
      { title: "Noticias Clásicas", description: "Curiosidades sobre el juego.", href: "/juegos/gta-san-andreas/noticias", icon: Newspaper, image: "/images/sa-news.webp" },
      { title: "Misiones y Guías", description: "Respeta el barrio y consigue el 100%.", href: "/juegos/gta-san-andreas/guias", icon: Gamepad2, image: "/images/sa-guides.webp" },
      { title: "Trucos", description: "Códigos legendarios como HESOYAM.", href: "/juegos/gta-san-andreas/trucos", icon: Database, image: "/images/sa-cheats.webp" }
    ]
  },
  "gta-vice-city": {
    title: "GTA: Vice City",
    color: "#FF1493",
    heroImage: "/images/vice-city-hero.webp",
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Bienvenido a la década de los 80. Tras pasar 15 años en prisión, Tommy Vercetti es enviado a Vice City por su antiguo jefe, Sonny Forelli.</p>
      </div>
    ),
    gameInfo: {
      developer: "Rockstar North",
      publisher: "Rockstar Games",
      releaseDate: "29 de octubre de 2002",
      setting: "1986",
      location: "Vice City",
      platforms: ["PS2", "Xbox", "PC", "Mobile"],
      multiplayer: "VC-MP",
    },
    releaseTimeline: [
      { date: "29 de octubre de 2002", platforms: [{ name: "PS2", color: "blue" }], notes: "Lanzamiento Original" },
    ],
    customSections: [
      { title: "Noticias Retro", description: "Artículos de Vice City.", href: "/juegos/gta-vice-city/noticias", icon: Newspaper, image: "/images/vc-news.webp" },
      { title: "Guías Completas", description: "Conviértete en el rey de la ciudad.", href: "/juegos/gta-vice-city/guias", icon: Gamepad2, image: "/images/vc-guides.webp" },
      { title: "Todos los Trucos", description: "Armas, salud y dinero.", href: "/juegos/gta-vice-city/trucos", icon: Database, image: "/images/vc-cheats.webp" }
    ]
  },
  "gta-3": {
    title: "Grand Theft Auto III",
    color: "#FFD700",
    heroImage: "/images/gta3-hero.webp",
    description: (
      <div className="space-y-4 text-center sm:text-justify">
        <p>Todo comienza en Liberty City. El crimen paga. La épica aventura criminal que cambió los juegos de mundo abierto para siempre.</p>
      </div>
    ),
    gameInfo: {
      developer: "Rockstar DMA",
      publisher: "Rockstar Games",
      releaseDate: "22 de octubre de 2001",
      setting: "2001",
      location: "Liberty City",
      platforms: ["PS2", "Xbox", "PC"],
      multiplayer: "No",
    },
    releaseTimeline: [
      { date: "22 de octubre de 2001", platforms: [{ name: "PS2", color: "blue" }], notes: "Lanzamiento Original" },
    ],
    customSections: [
      { title: "Noticias y Lore", description: "Historias sobre los inicios del 3D.", href: "/juegos/gta-3/noticias", icon: Newspaper, image: "/images/gta3-news.webp" },
      { title: "Guías Liberty City", description: "Supera todas las misiones de Claude.", href: "/juegos/gta-3/guias", icon: Gamepad2, image: "/images/gta3-guides.webp" },
      { title: "Trucos GTA 3", description: "Códigos de la vieja escuela.", href: "/juegos/gta-3/trucos", icon: Database, image: "/images/gta3-cheats.webp" }
    ]
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

  // Ahora sacamos las secciones directamente de la configuración única de cada juego.
  const sections = gameData.customSections;

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