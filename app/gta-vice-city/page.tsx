"use client";

import GameHub from "@/components/GameHub";
import { Newspaper, BookOpen, Gamepad2, Video, Package } from "lucide-react";

export default function ViceCityPage() {
  return (
    <GameHub
      title="Grand Theft Auto: Vice City"
      color="#00E5FF" // Cian Vice City (Estilo 80s)
      heroImage="/images/vice-city-hero.webp" // ⚠️ Pon tu imagen aquí (Tommy Vercetti)
      
      description={`Bienvenido a los años 80. De la década de los cardados imposibles, los excesos y los trajes color pastel llega la historia de un hombre que asciende a lo más alto del escalafón criminal.

Tras cumplir una larga condena en Liberty City, Tommy Vercetti es enviado a Vice City por su antiguo jefe, Sonny Forelli. Sin embargo, nada más llegar, todo sale mal: pierde el dinero, la mercancía y casi la vida.

Ahora Tommy debe recuperar lo que es suyo, enfrentándose a bandas de motociclistas, mafiosos cubanos y políticos corruptos en una ciudad tropical rebosante de neones, lujos y peligros.`}

      sections={[
        {
          title: "Noticias y Actualizaciones",
          description: "Novedades sobre la Definitive Edition, parches y mods gráficos.",
          href: "/gta-vice-city/noticias",
          icon: Newspaper,
          image: "/images/vc-news.webp",
        },
        {
          title: "Guías de Misiones",
          description: "Cómo completar el 100%, paquetes ocultos, saltos únicos y propiedades.",
          href: "/gta-vice-city/guias",
          icon: BookOpen,
          image: "/images/vc-guides.webp",
        },
        {
          title: "Códigos de Trucos",
          description: "PANZER, ASPIRINE y todas las claves para PC, PlayStation y Xbox.",
          href: "/gta-vice-city/trucos",
          icon: Gamepad2,
          image: "/images/vc-cheats.webp",
        },
        {
          title: "Medios y Galería",
          description: "Tráilers originales, capturas de pantalla y la inolvidable banda sonora.",
          href: "/gta-vice-city/media",
          icon: Video,
          image: "/images/vc-media.webp",
        },
      ]}

      gameInfo={{
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        releaseDate: "27 de octubre de 2002",
        setting: "1986",
        location: "Vice City (Basada en Miami, Florida)",
        platforms: ["PS2", "PC", "Xbox", "Móvil", "Consolas Modernas"],
        multiplayer: "No (Solo Mods en PC como Vice City Multiplayer)",
      }}

      releaseTimeline={[
        { 
            date: "27 de octubre de 2002", 
            platforms: [{ name: "PS2", color: "blue" }],
            notes: "Lanzamiento Original" 
        },
        { 
            date: "12 de mayo de 2003", 
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
            date: "6 de diciembre de 2012", 
            platforms: [{ name: "iOS", color: "gray" }],
            notes: "10th Anniversary Edition (HD)" 
        },
        { 
            date: "12 de diciembre de 2012", 
            platforms: [{ name: "Android", color: "green" }],
            notes: "10th Anniversary Edition (HD)" 
        },
        { 
            date: "30 de enero de 2013", 
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