import { Metadata } from "next"; // Importación añadida para tipar la metadata
import GameSubHeader from "@/components/GameSubHeader";
import Image from "next/image";

// --- BLOQUE NOINDEX AÑADIDO ---
export const metadata: Metadata = {
  title: "Capturas de Pantalla Oficiales GTA VI - GTAVerso",
  description: "Galería de imágenes y capturas de pantalla oficiales de GTA 6 en alta calidad.",
  robots: {
    index: false,
    follow: false,
  },
};
// ------------------------------

// Mock de imágenes (Reemplaza con tus rutas reales en /public/images/)
const screenshots = [
  { src: "/images/gta6-hero.jpg", alt: "Lucía y Jason" },
  { src: "/images/gta6-screens.jpg", alt: "Vice City Beach" },
  // Añade más imágenes aquí...
  { src: "/images/gta6-hero.jpg", alt: "Coche deportivo" },
  { src: "/images/gta6-screens.jpg", alt: "Club nocturno" },
];

export default function GTA6ScreenshotsPage() {
  return (
    <div className="min-h-screen bg-[#050508] pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        <GameSubHeader 
          title="Capturas de Pantalla Oficiales" 
          gameTitle="GTA VI" 
          gameLink="/gta-6" 
          color="#FF00FF" 
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {screenshots.map((img, idx) => (
            <div key={idx} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-gray-900">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}