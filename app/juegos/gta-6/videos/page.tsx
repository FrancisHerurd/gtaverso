import { Metadata } from "next"; // Añadido para tipar la metadata
import GameSubHeader from "@/components/GameSubHeader";
import Image from "next/image";
// Eliminado el import de Link porque no se usaba en este archivo (usas una etiqueta <a> nativa)
import { Play } from "lucide-react";

// --- BLOQUE NOINDEX AÑADIDO ---
export const metadata: Metadata = {
  title: "Vídeos y Tráilers GTA VI - GTAVerso",
  description: "Tráilers oficiales, análisis y gameplays de Grand Theft Auto 6.",
  robots: {
    index: false,
    follow: false,
  },
};
// ------------------------------

const videos = [
  {
    title: "Tráiler Oficial 1",
    thumbnail: "/images/gta6-hero.jpg", // Asegúrate de tener esta imagen
    duration: "1:31",
    date: "5 dic 2023",
    url: "https://www.youtube.com/watch?v=QdBZY2fkU-0", // URL Real
    type: "Oficial",
  },
  {
    title: "Análisis Frame a Frame: Tráiler 1",
    thumbnail: "/images/gta6-screens.jpg", // Placeholder
    duration: "14:20",
    date: "6 dic 2023",
    url: "#",
    type: "Análisis",
  },
  // Añade más vídeos aquí...
];

export default function GTA6VideosPage() {
  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Vídeos y Tráilers" 
          gameTitle="GTA VI" 
          gameLink="/juegos/gta-6" 
          color="#FF00FF" 
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, idx) => (
            <a 
              key={idx} 
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl bg-[#0a0b14] border border-[#1a1b26] transition-all hover:border-[#FF00FF]/50 hover:shadow-[0_0_20px_rgba(255,0,255,0.1)]"
            >
              {/* Miniatura con botón Play */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
                
                {/* Botón Play Centrado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF00FF]/90 text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 fill-current" />
                  </div>
                </div>

                {/* Duración */}
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-bold text-white">
                  {video.duration}
                </div>
              </div>

              {/* Info del Vídeo */}
              <div className="p-4">
                <span className={`mb-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  video.type === "Oficial" ? "bg-[#FF00FF]/20 text-[#FF00FF]" : "bg-gray-800 text-gray-400"
                }`}>
                  {video.type}
                </span>
                <h3 className="mb-1 text-lg font-bold text-white group-hover:text-[#FF00FF] transition-colors line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500">{video.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}