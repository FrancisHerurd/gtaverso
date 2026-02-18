import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Tipos de datos
interface GameSection {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  image: string; // Se mantiene por si acaso, aunque en la imagen que pasaste parece que no usan imagen de fondo, sino color solido. 
                 // Pero dejaremos la opción de imagen con overlay muy oscuro para que se vea premium.
}

interface GameInfo {
  developer: string;
  publisher: string;
  releaseDate: string;
  setting: string;
  location: string;
  platforms: string[];
  multiplayer?: string;
}

interface ReleaseEvent {
  date: string;
  platforms: { name: string; color: string }[];
  notes?: string;
}

interface GameHubProps {
  title: string;
  description: React.ReactNode;
  heroImage: string;
  color: string; // Color de acento (ej: Naranja San Andreas)
  sections: GameSection[];
  gameInfo: GameInfo;
  releaseTimeline: ReleaseEvent[];
}

const PlatformBadge = ({ name, color }: { name: string; color: string }) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-[#004481] text-white", 
    green: "bg-[#107C10] text-white", 
    dark: "bg-[#1A1A1A] text-white", 
    red: "bg-[#E60012] text-white", 
    gray: "bg-[#555555] text-white", 
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded mr-2 mb-1 ${colorClasses[color] || "bg-gray-700"}`}>
      {name}
    </span>
  );
};

export default function GameHub({
  title,
  description,
  heroImage,
  color,
  sections,
  gameInfo,
  releaseTimeline,
}: GameHubProps) {
  return (
    <div className="min-h-screen bg-[#050508] text-gray-200 pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        {/* 1. HEADER + IMAGEN (Estilo Previo Mantenido) */}
        <div className="mb-8 text-center">
            <nav className="mb-6 flex justify-center items-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                <ChevronRight className="h-4 w-4" />
                <span style={{ color: color }} className="font-bold">{title}</span>
            </nav>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">{title}</h1>
        </div>
        
        <div className="relative mb-12 w-full overflow-hidden rounded-2xl border border-white/5 shadow-2xl bg-[#0a0a0f]">
             <div className="aspect-16/7 w-full relative">
                 <Image src={heroImage} alt={`${title} Cover`} fill className="object-cover opacity-90" priority />
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-full" style={{ backgroundColor: color }} />
        </div>

        <div className="mx-auto max-w-4xl mb-20">
            <p className="text-lg leading-relaxed text-white font-medium md:text-xl whitespace-pre-line">
              {description}
            </p>
        </div>

        {/* 2. GRID DE TARJETAS (ESTILO EXACTO IMAGEN "asasssas.jpg" CON MEJORA DE GRADIENTE) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-24">
          {sections.map((section) => (
            <Link 
                key={section.title} 
                href={section.href}
                className="group flex flex-col overflow-hidden rounded-xl bg-[#0a0b14] border border-[#1a1b26] transition-all hover:border-[#2a2b36] hover:bg-[#0f101a]"
            >
                                {/* Parte Superior: Imagen Oscura + Icono */}
                <div className="relative h-48 w-full bg-[#050508]">
                    {/* Imagen de fondo (SIN OPACIDAD, 100% COLOR) */}
                    <Image 
                        src={section.image} 
                        alt="" 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    
                    {/* Gradiente SOLO en la parte inferior para que el texto no corte brusco */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0e0f1a] to-transparent opacity-90" />
                    
                    {/* Icono Flotante (Naranja/Acento) */}
                    <div className="absolute bottom-4 left-4 z-10 drop-shadow-md">
                         <section.icon 
                            className="h-8 w-8 text-white" 
                            style={{ color: color }} 
                         />
                    </div>
                </div>

                {/* Parte Inferior: Texto */}
                <div className="flex-1 border-t border-[#1a1b26] bg-[#0e0f1a] p-6 group-hover:bg-[#131420] transition-colors">
                    <h3 className="mb-2 text-xl font-bold text-white">
                        {section.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                        {section.description}
                    </p>
                </div>
            </Link>
          ))}
        </div>

        {/* 3. INFO LANZAMIENTO (NUEVO BLOQUE ESTILO GTABASE) */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 pt-12 border-t border-white/5">
            
            {/* Columna Izquierda */}
            <div className="lg:col-span-1 space-y-8">
                <div>
                   <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                       <span className="w-1 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                       Ficha Técnica
                   </h3>
                   <div className="bg-[#0a0b14] rounded-xl border border-[#1a1b26] p-6 space-y-5">
                       <div>
                           <dt className="text-xs font-bold text-gray-500 uppercase mb-1">Desarrollador</dt>
                           <dd className="text-white font-medium">{gameInfo.developer}</dd>
                       </div>
                       <div>
                           <dt className="text-xs font-bold text-gray-500 uppercase mb-1">Editor</dt>
                           <dd className="text-white font-medium">{gameInfo.publisher}</dd>
                       </div>
                       <div>
                           <dt className="text-xs font-bold text-gray-500 uppercase mb-1">Ambientación</dt>
                           <dd className="text-white font-medium">{gameInfo.setting}</dd>
                       </div>
                       <div>
                           <dt className="text-xs font-bold text-gray-500 uppercase mb-1">Ubicación</dt>
                           <dd className="text-white font-medium leading-snug">{gameInfo.location}</dd>
                       </div>
                   </div>
                </div>
            </div>

            {/* Columna Derecha (Timeline) */}
            <div className="lg:col-span-2">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 rounded-full" style={{ backgroundColor: color }}></span>
                    Historial de Lanzamientos
                </h3>
                <div className="bg-[#0a0b14] rounded-xl border border-[#1a1b26] p-8">
                    <div className="space-y-6">
                        {releaseTimeline.map((event, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                                <div className="w-40 shrink-0 pt-0.5">
                                    <span className="text-sm font-semibold text-gray-300 block">{event.date}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap gap-y-2 mb-1">
                                        {event.platforms.map((p, i) => (
                                            <PlatformBadge key={i} name={p.name} color={p.color} />
                                        ))}
                                    </div>
                                    {event.notes && (
                                        <p className="text-xs italic text-gray-500 mt-1">{event.notes}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}