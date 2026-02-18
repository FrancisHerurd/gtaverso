import GameSubHeader from "@/components/GameSubHeader";
import Image from "next/image";
import { Download } from "lucide-react";

const artworks = [
  { src: "/images/gta6-hero.jpg", title: "Lucía y Jason (Key Art)", resolution: "4K" },
  { src: "/images/gta6-art.jpg", title: "Vice City Sunset", resolution: "4K" }, // Asegúrate de tener estas imágenes
  { src: "/images/gta6-screens.jpg", title: "Leonida Wilds", resolution: "1080p" },
];

export default function GTA6ArtPage() {
  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Arte y Fondos de Pantalla" 
          gameTitle="GTA VI" 
          gameLink="/gta-6" 
          color="#FF00FF" 
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((art, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0b14]">
              {/* Imagen */}
              <div className="aspect-video w-full relative">
                <Image
                  src={art.src}
                  alt={art.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Oscuro en Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100" />
                
                {/* Botón Descargar (Aparece en Hover) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <a 
                    href={art.src} 
                    download 
                    className="flex items-center gap-2 rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-[#FF00FF] hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    Descargar {art.resolution}
                  </a>
                </div>
              </div>

              {/* Título */}
              <div className="border-t border-white/5 bg-[#0e0f1a] p-4">
                <h3 className="text-sm font-bold text-white group-hover:text-[#FF00FF] transition-colors">
                  {art.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
            <p>* Todas las imágenes son propiedad de Rockstar Games.</p>
        </div>

      </div>
    </div>
  );
}