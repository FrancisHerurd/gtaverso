"use client";

import GameHub from "@/components/GameHub";
import { Newspaper, Image as ImageIcon, Video, Music, Palette } from "lucide-react";
import { useEffect, useState } from "react";

// --- COMPONENTE CONTADOR INTEGRADO ---
function GTA6Countdown() {
  const targetDate = new Date("2026-11-19T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mb-8 rounded-2xl border border-[#FF00FF]/30 bg-[#FF00FF]/5 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-[#FF00FF]">
        CUENTA ATRÁS PARA EL LANZAMIENTO
      </h3>
      <div className="flex flex-wrap justify-center gap-4 text-center font-mono text-white sm:gap-8">
        {[
          { label: "DÍAS", value: timeLeft.days },
          { label: "HORAS", value: timeLeft.hours },
          { label: "MIN", value: timeLeft.minutes },
          { label: "SEG", value: timeLeft.seconds },
        ].map((item, idx) => (
          <div key={idx} className="flex min-w-17.5 flex-col items-center rounded-lg bg-black/40 p-3 shadow-lg ring-1 ring-white/10">
            <span className="text-3xl font-black text-white sm:text-4xl">{item.value}</span>
            <span className="text-[10px] font-bold text-gray-400">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-gray-400 font-medium">
        Llegada oficial el 19 de Noviembre de 2026 a PlayStation 5 y Xbox Series X|S
      </p>
    </div>
  );
}

export default function GTA6Page() {
  return (
    <GameHub
      title="Grand Theft Auto VI"
      color="#FF00FF"
      heroImage="/images/gta6-hero.jpg" // ⚠️ Pon tu imagen aquí
      
      // DESCRIPCIÓN: Contador PRIMERO, luego texto
      description={
        <div>
          {/* 1. CONTADOR ARRIBA */}
          <GTA6Countdown />

          {/* 2. TEXTO ABAJO */}
          <div className="space-y-4 text-center sm:text-justify">
            <p>
              Grand Theft Auto VI nos lleva de vuelta al estado de Leonida, hogar de las calles empapadas de neón de Vice City y más allá, en la evolución más grande e inmersiva de la serie Grand Theft Auto hasta la fecha.
            </p>
            <p>
              Protagonizada por Lucía, la primera protagonista femenina de la saga en 3D, y su compañero Jason, vivirás una historia de crimen, confianza y traición al estilo Bonnie & Clyde moderno en un mundo abierto sin precedentes.
            </p>
          </div>
        </div>
      }

      sections={[
        {
          title: "Noticias y Actualizaciones",
          description: "Últimas novedades oficiales de Rockstar, análisis de tráilers y filtraciones verificadas.",
          href: "/gta-6/noticias",
          icon: Newspaper,
          image: "/images/gta6-news.jpg",
        },
        {
          title: "Capturas de Pantalla",
          description: "Galería 4K de Leonida, los pantanos, Vice City Beach y los interiores detallados.",
          href: "/gta-6/capturas",
          icon: ImageIcon,
          image: "/images/gta6-screens.jpg",
        },
        {
          title: "Vídeos y Tráilers",
          description: "Tráiler 1, clips filtrados del desarrollo y análisis frame a frame.",
          href: "/gta-6/videos",
          icon: Video,
          image: "/images/gta6-videos.jpg",
        },
        {
          title: "Arte y Fondos",
          description: "Key art oficial, fan arts de la comunidad y wallpapers para móvil/PC.",
          href: "/gta-6/arte",
          icon: Palette,
          image: "/images/gta6-art.jpg",
        },
        {
          title: "Banda Sonora",
          description: "Canciones confirmadas (Tom Petty, etc.) y radios esperadas en Vice City.",
          href: "/gta-6/musica",
          icon: Music,
          image: "/images/gta6-music.jpg",
        },
      ]}

      gameInfo={{
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        releaseDate: "19 de noviembre de 2026",
        setting: "Actualidad (2025-2026)",
        location: "Estado de Leonida (Florida): Vice City, Port Gellhorn, Cayos.",
        platforms: ["PS5", "Xbox Series X|S"],
        multiplayer: "GTA Online 2 (Confirmado)",
      }}

      releaseTimeline={[
        { 
            date: "4 de diciembre de 2023", 
            platforms: [],
            notes: "Tráiler de Revelación Oficial (Récord Guinness)" 
        },
        { 
            date: "19 de noviembre de 2026", 
            platforms: [
                { name: "PS5", color: "blue" },
                { name: "Xbox Series X|S", color: "green" }
            ],
            notes: "Lanzamiento Oficial Consolas" 
        },
        { 
            date: "2027 (Estimado)", 
            platforms: [{ name: "PC", color: "dark" }],
            notes: "Lanzamiento en PC (Windows)" 
        },
      ]}
    />
  );
}