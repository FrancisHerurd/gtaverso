import { Metadata } from "next"; // Añadido para tipar la metadata
import GameSubHeader from "@/components/GameSubHeader";
import { Play, Music } from "lucide-react";

// --- BLOQUE NOINDEX AÑADIDO ---
export const metadata: Metadata = {
  title: "Banda Sonora y Radios GTA VI - GTAVerso",
  description: "Lista completa de canciones, artistas y estaciones de radio confirmadas y rumoreadas para GTA 6.",
  robots: {
    index: false,
    follow: false,
  },
};
// ------------------------------

const tracks = [
  { artist: "Tom Petty", song: "Love Is A Long Road", radio: "Tráiler 1", verified: true },
  { artist: "Genesis", song: "That's All", radio: "Rumoreado", verified: false },
  { artist: "Anita Ward", song: "Ring My Bell", radio: "Rumoreado", verified: false },
];

export default function GTA6MusicPage() {
  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Banda Sonora y Radios" 
          gameTitle="GTA VI" 
          gameLink="/gta-6" 
          color="#FF00FF" 
        />

        <div className="rounded-2xl border border-white/10 bg-[#0a0b14] overflow-hidden">
          {/* Cabecera Tabla */}
          <div className="grid grid-cols-12 border-b border-white/10 bg-white/5 px-6 py-4 text-xs font-bold uppercase text-gray-400">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Título</div>
            <div className="col-span-4">Artista</div>
            <div className="col-span-2 text-right">Estado</div>
          </div>

          {/* Lista de Canciones */}
          <div className="divide-y divide-white/5">
            {tracks.map((track, idx) => (
              <div key={idx} className="group grid grid-cols-12 items-center px-6 py-4 transition-colors hover:bg-white/5">
                <div className="col-span-1 text-gray-500 group-hover:text-[#FF00FF]">
                  <Play className="h-4 w-4" />
                </div>
                <div className="col-span-5 font-medium text-white">{track.song}</div>
                <div className="col-span-4 text-gray-400">{track.artist}</div>
                <div className="col-span-2 text-right">
                  <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                    track.verified ? "bg-[#FF00FF]/20 text-[#FF00FF]" : "bg-gray-800 text-gray-400"
                  }`}>
                    {track.verified ? "Confirmado" : "Rumor"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}