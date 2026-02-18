"use client";

import GameHub from "@/components/GameHub";
import { Newspaper, BookOpen, Gamepad2, Video } from "lucide-react";

export default function GTA3Page() {
  return (
    <GameHub
      title="Grand Theft Auto III"
      color="#E5E7EB" // Gris Metalizado Liberty City
      heroImage="/images/gta3-hero.jpg" // ⚠️ Claude Speed bajo la lluvia
      
      description={`Liberty City, EE. UU. El peor lugar de América.

Has sido traicionado y dado por muerto. Ahora vas a vengarte, a menos que la ciudad te atrape primero. Los jefes de la mafia necesitan un favor, policías corruptos necesitan ayuda y las bandas callejeras te quieren muerto. Tendrás que robar, asaltar y matar para mantenerte con vida.

Grand Theft Auto III puso el mundo oscuro e intrigante del crimen a tu alcance. Con un enorme y diverso mundo abierto, un elenco salvaje de personajes de todos los ámbitos de la vida y la libertad de explorar a voluntad.`}

      sections={[
        {
          title: "Noticias y Actualizaciones",
          description: "Parches de la Definitive Edition, mods clásicos y aniversario.",
          href: "/gta-3/noticias",
          icon: Newspaper,
          image: "/images/gta3-news.jpg",
        },
        {
          title: "Guías de Misiones",
          description: "Cómo completar el 100%, paquetes ocultos, saltos únicos y masacres.",
          href: "/gta-3/guias",
          icon: BookOpen,
          image: "/images/gta3-guides.jpg",
        },
        {
          title: "Códigos de Trucos",
          description: "GUNSGUNSGUNS, GESUNDHEIT y todas las claves para PC y Consolas.",
          href: "/gta-3/trucos",
          icon: Gamepad2,
          image: "/images/gta3-cheats.jpg",
        },
        {
          title: "Medios y Galería",
          description: "Arte conceptual original, tráilers de 2001 y banda sonora.",
          href: "/gta-3/media",
          icon: Video,
          image: "/images/gta3-media.jpg",
        },
      ]}

      gameInfo={{
        developer: "DMA Design (Rockstar North)",
        publisher: "Rockstar Games",
        releaseDate: "22 de octubre de 2001",
        setting: "2001",
        location: "Liberty City (Basada en Nueva York)",
        platforms: ["PS2", "PC", "Xbox", "Móvil", "Consolas Modernas"],
        multiplayer: "No (Solo Mods en PC como Liberty Unleashed)",
      }}

      releaseTimeline={[
        { 
            date: "22 de octubre de 2001", 
            platforms: [{ name: "PS2", color: "blue" }],
            notes: "Lanzamiento Original (Revolucionó el 3D)" 
        },
        { 
            date: "21 de mayo de 2002", 
            platforms: [{ name: "PC", color: "dark" }] 
        },
        { 
            date: "31 de octubre de 2003", 
            platforms: [{ name: "Xbox", color: "green" }] 
        },
        { 
            date: "12 de noviembre de 2010", 
            platforms: [{ name: "Mac OS", color: "gray" }] 
        },
        { 
            date: "15 de diciembre de 2011", 
            platforms: [
                { name: "iOS", color: "gray" },
                { name: "Android", color: "green" }
            ],
            notes: "10th Anniversary Edition (HD)" 
        },
        { 
            date: "25 de septiembre de 2012", 
            platforms: [{ name: "PS3", color: "blue" }],
            notes: "Clásico de PS2 (PSN)" 
        },
        { 
            date: "5 de diciembre de 2015", 
            platforms: [{ name: "PS4", color: "blue" }],
            notes: "Clásico de PS2 Emulado (1080p)" 
        },
        { 
            date: "11 de noviembre de 2021", 
            platforms: [
                { name: "PC", color: "dark" },
                { name: "PS5", color: "blue" },
                { name: "Xbox Series", color: "green" },
                { name: "PS4", color: "blue" },
                { name: "Xbox One", color: "green" },
                { name: "Switch", color: "red" }
            ],
            notes: "The Definitive Edition" 
        },
        { 
            date: "14 de diciembre de 2023", 
            platforms: [
                { name: "Android", color: "green" },
                { name: "iOS", color: "gray" }
            ],
            notes: "The Definitive Edition (Netflix)" 
        },
      ]}
    />
  );
}