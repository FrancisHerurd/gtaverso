"use client";

import GameHub from "@/components/GameHub";
import { Newspaper, BookOpen, Gamepad2, Video, Map } from "lucide-react";

export default function GTA4Page() {
  return (
    <GameHub
      title="Grand Theft Auto IV"
      color="#FBBF24" // Ámbar/Dorado (Estilo Logo GTA IV)
      heroImage="/images/gta4-hero.jpg" // ⚠️ Niko Bellic
      
      description={`¿Qué significa el Sueño Americano hoy en día?

Para Niko Bellic, recién llegado de Europa en barco, es la esperanza de poder escapar de su pasado. Para su primo, Roman, es la visión de que juntos pueden encontrar fortuna en Liberty City, la puerta a la tierra de las oportunidades.

A medida que se endeudan y son arrastrados a un inframundo criminal por una serie de estafadores, ladrones y sociópatas, descubren que la realidad es muy diferente al sueño en una ciudad que adora el dinero y el estatus, y es el cielo para quienes los tienen y el infierno para quienes no.`}

      sections={[
        {
          title: "Noticias y Actualizaciones",
          description: "Parches de la Complete Edition, mods gráficos (iCEnhancer) y aniversario.",
          href: "/gta-4/noticias",
          icon: Newspaper,
          image: "/images/gta4-news.jpg",
        },
        {
          title: "Guías de Misiones",
          description: "Decisiones de historia (Venganza o Dinero), palomas ocultas y saltos únicos.",
          href: "/gta-4/guias",
          icon: BookOpen,
          image: "/images/gta4-guides.jpg",
        },
        {
          title: "Códigos de Trucos",
          description: "362-555-0100 (Salud y Armas), Annihilator y todos los números del móvil.",
          href: "/gta-4/trucos",
          icon: Gamepad2,
          image: "/images/gta4-cheats.jpg",
        },
        {
          title: "Mapas y Secretos",
          description: "Ubicaciones del corazón de la estatua, coches ocultos y easter eggs.",
          href: "/gta-4/mapa",
          icon: Map,
          image: "/images/gta4-map.jpg",
        },
        {
          title: "Episodes from Liberty City",
          description: "Guías de 'The Lost and Damned' y 'The Ballad of Gay Tony'.",
          href: "/gta-4/episodios",
          icon: Video, // O otro icono representativo
          image: "/images/gta4-dlc.jpg",
        },
      ]}

      gameInfo={{
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        releaseDate: "29 de abril de 2008",
        setting: "2008",
        location: "Liberty City (Basada en Nueva York y Nueva Jersey)",
        platforms: ["PS3", "Xbox 360", "PC", "Xbox One (Retro)", "Xbox Series (Retro)"],
        multiplayer: "32 jugadores (PC), 16 (Consolas)",
      }}

      releaseTimeline={[
        { 
            date: "29 de abril de 2008", 
            platforms: [
                { name: "PS3", color: "blue" },
                { name: "Xbox 360", color: "green" }
            ],
            notes: "Lanzamiento Original (Récord Guinness)" 
        },
        { 
            date: "2 de diciembre de 2008", 
            platforms: [{ name: "PC", color: "dark" }],
            notes: "Lanzamiento en Windows (Games for Windows Live)" 
        },
        { 
            date: "17 de febrero de 2009", 
            platforms: [{ name: "Xbox 360", color: "green" }],
            notes: "DLC: The Lost and Damned" 
        },
        { 
            date: "29 de octubre de 2009", 
            platforms: [{ name: "Xbox 360", color: "green" }],
            notes: "DLC: The Ballad of Gay Tony" 
        },
        { 
            date: "13 de abril de 2010", 
            platforms: [
                { name: "PS3", color: "blue" },
                { name: "PC", color: "dark" }
            ],
            notes: "Episodes from Liberty City (DLCs)" 
        },
        { 
            date: "9 de febrero de 2017", 
            platforms: [{ name: "Xbox One", color: "green" }],
            notes: "Retrocompatibilidad (Mejorado)" 
        },
        { 
            date: "19 de marzo de 2020", 
            platforms: [{ name: "PC", color: "dark" }],
            notes: "GTA IV: The Complete Edition (Steam/Launcher)" 
        },
      ]}
    />
  );
}