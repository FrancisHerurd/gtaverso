"use client";

import GameHub from "@/components/GameHub";
import { Newspaper, BookOpen, Gamepad2, Video, Package, Users } from "lucide-react";

export default function GTA5Page() {
  return (
    <GameHub
      title="Grand Theft Auto V"
      color="#569446" // Verde GTA 5
      heroImage="/images/gta5-hero.jpg" // ⚠️ Pon tu imagen aquí (Michael, Trevor, Franklin)
      
      description={`Los Santos: una extensa y soleada metrópolis llena de gurús de autoayuda, aspirantes a estrellas y famosos en decadencia, en su día la envidia del mundo occidental, ahora lucha por mantenerse a flote en una época de incertidumbre económica y "reality shows" baratos.

En medio de la confusión, tres criminales muy diferentes barajan sus probabilidades de éxito y supervivencia: Franklin, un estafador callejero en busca de oportunidades y dinero serio; Michael, un exconvicto profesional cuyo retiro no es tan rosado como él esperaba; y Trevor, un maníaco violento motivado por la posibilidad de un subidón barato y el próximo gran golpe.

Sin opciones, la tripulación lo arriesga todo en una serie de atracos audaces y peligrosos que podrían solucionarles la vida.`}

      sections={[
        {
          title: "Últimas Noticias",
          description: "Actualizaciones semanales de GTA Online, nuevos DLCs y eventos.",
          href: "/gta-5/noticias",
          icon: Newspaper,
          image: "/images/gta5-news.jpg",
        },
        {
          title: "Guías GTA 5 (Historia)",
          description: "Cómo conseguir el 100%, coleccionables, misterios y finales.",
          href: "/gta-5/guias",
          icon: BookOpen,
          image: "/images/gta5-guides.jpg",
        },
        {
          title: "Guías GTA Online",
          description: "Mejores negocios, golpes (Heists), coches más rápidos y cómo ganar dinero.",
          href: "/gta-5/online",
          icon: Users, // Icono de multijugador
          image: "/images/gta5-online.jpg",
        },
        {
          title: "Códigos de Trucos",
          description: "Invencibilidad, armas, paracaídas y todos los números de teléfono.",
          href: "/gta-5/trucos",
          icon: Gamepad2,
          image: "/images/gta5-cheats.jpg",
        },
        {
          title: "Medios y Galería",
          description: "Tráilers oficiales, capturas de pantalla 4K y arte conceptual.",
          href: "/gta-5/media",
          icon: Video,
          image: "/images/gta5-media.jpg",
        },
        {
          title: "Ediciones y Versiones",
          description: "Diferencias entre PS3, PS4, PC y la versión Expandida y Mejorada (E&E).",
          href: "/gta-5/ediciones",
          icon: Package,
          image: "/images/gta5-editions.jpg",
        },
      ]}

      gameInfo={{
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        releaseDate: "17 de septiembre de 2013",
        setting: "2013 (Prólogo en 2004)",
        location: "Estado de San Andreas (California): Los Santos (Los Ángeles) y Condado de Blaine.",
        platforms: ["PS3", "Xbox 360", "PS4", "Xbox One", "PC", "PS5", "Xbox Series X|S"],
        multiplayer: "30 jugadores (16 en PS3/360)",
      }}

      releaseTimeline={[
        { 
            date: "17 de septiembre de 2013", 
            platforms: [
                { name: "PS3", color: "blue" },
                { name: "Xbox 360", color: "green" }
            ],
            notes: "Lanzamiento Original" 
        },
        { 
            date: "18 de noviembre de 2014", 
            platforms: [
                { name: "PS4", color: "blue" },
                { name: "Xbox One", color: "green" }
            ],
            notes: "Versión Mejorada (1ª Persona)" 
        },
        { 
            date: "15 de abril de 2015", 
            platforms: [{ name: "PC", color: "dark" }],
            notes: "Lanzamiento en Windows (4K, 60FPS)" 
        },
        { 
            date: "15 de marzo de 2022", 
            platforms: [
                { name: "PS5", color: "blue" },
                { name: "Xbox Series X|S", color: "green" }
            ],
            notes: "Expanded & Enhanced (Ray Tracing, HDR)" 
        },
        { 
            date: "4 de marzo de 2025", 
            platforms: [{ name: "PC", color: "dark" }],
            notes: "Actualización E&E (Funciones PS5/XBX en PC)" 
        },
      ]}
    />
  );
}