import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface GameSubHeaderProps {
  title: string;
  gameTitle: string;
  gameLink: string;
  color: string;
}

export default function GameSubHeader({ title, gameTitle, gameLink, color }: GameSubHeaderProps) {
  return (
    <div className="mb-12 border-b border-white/10 pb-8">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={gameLink} className="hover:text-white transition-colors">{gameTitle}</Link>
        <ChevronRight className="h-4 w-4" />
        <span style={{ color: color }} className="font-bold">{title}</span>
      </nav>

      {/* Título */}
      <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
    </div>
  );
}