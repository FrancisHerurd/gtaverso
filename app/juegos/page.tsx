import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Todos los Juegos de GTA - La Saga Completa | GTAVerso",
  description: "Explora la saga completa de Grand Theft Auto. Noticias, guías, trucos y mapas de GTA 6, GTA V, San Andreas, Vice City, GTA IV y GTA III.",
  alternates: {
    canonical: "https://gtaverso.com/juegos",
  },
};

// Datos de la saga con sus colores temáticos y clases Tailwind explícitas para evitar problemas de purgado
const games = [
  {
    title: "Grand Theft Auto VI",
    slug: "gta-6",
    year: "2025",
    image: "/images/gta6-hero.jpg", // Asegúrate de que esta imagen exista
    description: "El regreso a Leonida y Vice City con Lucía y Jason. El juego más esperado de la década.",
    hoverColor: "hover:border-[#FF00FF] hover:shadow-[0_0_20px_rgba(255,0,255,0.15)]",
    textColor: "group-hover:text-[#FF00FF]",
  },
  {
    title: "Grand Theft Auto V",
    slug: "gta-5",
    year: "2013",
    image: "/images/default-cover.jpg", // Cambia a tu imagen de gta 5
    description: "Tres criminales muy diferentes lo arriesgan todo en una serie de atrevidos y peligrosos atracos en Los Santos.",
    hoverColor: "hover:border-[#00FF41] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)]",
    textColor: "group-hover:text-[#00FF41]",
  },
  {
    title: "Grand Theft Auto IV",
    slug: "gta-4",
    year: "2008",
    image: "/images/gta4-hero.webp",
    description: "El sueño americano de Niko Bellic se convierte en una pesadilla en las oscuras calles de Liberty City.",
    hoverColor: "hover:border-[#FBBF24] hover:shadow-[0_0_20px_rgba(251,191,36,0.15)]",
    textColor: "group-hover:text-[#FBBF24]",
  },
  {
    title: "GTA: San Andreas",
    slug: "gta-san-andreas",
    year: "2004",
    image: "/images/sa-hero.webp",
    description: "Carl Johnson regresa a casa para salvar a su familia y tomar el control de las calles del estado de San Andreas.",
    hoverColor: "hover:border-[#FFA500] hover:shadow-[0_0_20px_rgba(255,165,0,0.15)]",
    textColor: "group-hover:text-[#FFA500]",
  },
  {
    title: "GTA: Vice City",
    slug: "gta-vice-city",
    year: "2002",
    image: "/images/vice-city-hero.webp",
    description: "Traición, venganza y luces de neón. El ascenso de Tommy Vercetti en los gloriosos años 80.",
    hoverColor: "hover:border-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]",
    textColor: "group-hover:text-[#00E5FF]",
  },
  {
    title: "Grand Theft Auto III",
    slug: "gta-3",
    year: "2001",
    image: "/images/gta3-hero.webp",
    description: "El juego que revolucionó el mundo abierto en 3D. El crimen paga en Liberty City.",
    hoverColor: "hover:border-[#E5E7EB] hover:shadow-[0_0_20px_rgba(229,231,235,0.15)]",
    textColor: "group-hover:text-[#E5E7EB]",
  },
];

export default function GamesHubPage() {
  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            La Saga <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-100 to-gray-500">Grand Theft Auto</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Explora nuestra base de datos con noticias, guías completas, mapas y trucos de todos los juegos de la franquicia estrella de Rockstar Games.
          </p>
        </div>

        {/* Grid de Juegos */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/juegos/${game.slug}`}
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#0a0b14] border border-white/10 transition-all duration-500 ${game.hoverColor}`}
            >
              {/* Imagen Hero */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                <Image
                  src={game.image}
                  alt={`Portada de ${game.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0b14] via-[#0a0b14]/50 to-transparent" />
                
                {/* Etiqueta del Año */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10">
                  <Calendar className="h-3 w-3" />
                  {game.year}
                </div>
              </div>

              {/* Contenido Textual */}
              <div className="flex flex-1 flex-col p-6">
                <h2 className={`mb-3 text-2xl font-bold text-white transition-colors ${game.textColor}`}>
                  {game.title}
                </h2>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">
                  {game.description}
                </p>
                <div className={`mt-auto flex items-center gap-2 text-sm font-bold text-gray-300 transition-colors ${game.textColor}`}>
                  Ver sección completa 
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}