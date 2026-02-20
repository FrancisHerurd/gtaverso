import GameHub from "@/components/GameHub";
import { BookOpen, Gamepad2, Hash, Newspaper, Video } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GTA San Andreas: Trucos, Guías y Descargas | GTAVerso",
  description: "Todo sobre Grand Theft Auto: San Andreas. Trucos para PC/PS2/Xbox, mapas, mods y guías de misiones.",
};

export default function SanAndreasPage() {
  return (
    <GameHub
      title="Grand Theft Auto: San Andreas"
      
      // 1. DESCRIPCIÓN
      description={`Principios de los 90. La Costa Oeste hierve. Tras cinco años de exilio en Liberty City, Carl "CJ" Johnson regresa a Los Santos solo para encontrar su hogar en cenizas.

Su madre ha sido asesinada, los Families de Grove Street han perdido su poder y el barrio se desmorona bajo el peso del crack y la corrupción policial.

Incriminado por un crimen que no cometió nada más pisar el asfalto, CJ emprenderá una odisea brutal a través de todo el estado de San Andreas —desde los guetos de Los Santos hasta los casinos de Las Venturas— en una misión desesperada: limpiar su nombre, vengar a su familia y recuperar el control de las calles, cueste lo que cueste.`}
      
      heroImage="/images/sa-hero.webp"
      color="#FFA500" // Naranja
      
      // 2. SECCIONES (Tus tarjetas actuales)
      sections={[
        {
          title: "Noticias y Actualizaciones",
          description: "Novedades sobre la Definitive Edition, parches y mods destacados.",
          href: "/gta-san-andreas/noticias",
          icon: Newspaper,
          image: "/images/sa-news.webp",
        },
        {
          title: "Guías de Misiones",
          description: "Cómo completar el 100%, grafitis, ostras, herraduras y saltos únicos.",
          href: "/gta-san-andreas/guias",
          icon: BookOpen,
          image: "/images/sa-guides.webp",
        },
        {
          title: "Códigos de Trucos",
          description: "HESOYAM, AEZAKMI y todos los claves para PC, PlayStation y Xbox.",
          href: "/gta-san-andreas/trucos",
          icon: Hash,
          image: "/images/sa-cheats.webp",
        },
        {
          title: "Bse de datos",
          description: "Base de datos completa de coches, aviones, jetpack y arsenal.",
          href: "/gta-san-andreas/base-de-datos",
          icon: Gamepad2,
          image: "/images/sa-database.webp",
        },
        {
          title: "Galería Multimedia",
          description: "Screenshots originales, artworks y trailers oficiales.",
          href: "/gta-san-andreas/media",
          icon: Video,
          image: "/images/sa-media.webp",
        },
      ]}

      // 3. NUEVO: FICHA TÉCNICA (OBLIGATORIO AHORA)
      gameInfo={{
        developer: "Rockstar North",
        publisher: "Rockstar Games",
        releaseDate: "26 de octubre de 2004",
        setting: "1992",
        location: "Estado de San Andreas (Los Santos, San Fierro, Las Venturas)",
        platforms: ["PS2", "PC", "Xbox", "Móvil"],
        multiplayer: "Cooperativo local (PS2/Xbox)",
      }}

      // 4. CRONOLOGÍA COMPLETA (Actualizado con imagen)
      releaseTimeline={[
        { 
            date: "26 de octubre de 2004", 
            platforms: [{ name: "PlayStation 2", color: "blue" }] 
        },
        { 
            date: "7 de junio de 2005", 
            platforms: [
                { name: "PC", color: "dark" },
                { name: "Xbox", color: "green" }
            ] 
        },
        { 
            date: "12 de noviembre de 2010", 
            platforms: [{ name: "Mac OS", color: "gray" }] 
        },
        { 
            date: "11 de diciembre de 2012", 
            platforms: [{ name: "PlayStation 3", color: "blue" }],
            notes: "Clásico de PS2 mejorado (PSN)" 
        },
        { 
            date: "12 de diciembre de 2013", 
            platforms: [{ name: "iOS", color: "gray" }],
            notes: "Remasterización móvil (HD)" 
        },
        { 
            date: "19 de diciembre de 2013", 
            platforms: [{ name: "Android", color: "green" }],
            notes: "Remasterización móvil (HD)" 
        },
        { 
            date: "26 de octubre de 2014", 
            platforms: [{ name: "Xbox 360", color: "green" }],
            notes: "Port móvil (HD Remaster)" 
        },
        { 
            date: "1 de diciembre de 2015", 
            platforms: [{ name: "PlayStation 3", color: "blue" }],
            notes: "Port móvil (HD Remaster en disco/digital)" 
        },
        { 
            date: "5 de diciembre de 2015", 
            platforms: [{ name: "PlayStation 4", color: "blue" }],
            notes: "Clásico de PS2 emulado (1080p, Trofeos)" 
        },
        { 
            date: "7 de junio de 2018", 
            platforms: [{ name: "Xbox One", color: "green" }],
            notes: "Retrocompatibilidad (Versión Xbox 360)" 
        },
        { 
            date: "11 de noviembre de 2021", 
            platforms: [
                { name: "PC", color: "dark" },
                { name: "PS5", color: "blue" },
                { name: "Xbox Series X|S", color: "green" },
                { name: "PS4", color: "blue" },
                { name: "Xbox One", color: "green" },
                { name: "Switch", color: "red" }
            ],
            notes: "GTA: The Trilogy – The Definitive Edition" 
        },
        { 
            date: "14 de diciembre de 2023", 
            platforms: [
                { name: "Android", color: "green" },
                { name: "iOS", color: "gray" }
            ],
            notes: "GTA: The Trilogy – The Definitive Edition (Netflix Games)" 
        },
      ]}
    />
  );
}