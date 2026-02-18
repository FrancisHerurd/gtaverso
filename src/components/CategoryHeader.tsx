import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CategoryHeaderProps {
  title: string;
  count: number;
  parent?: { name: string; href: string };
}

export default function CategoryHeader({ title, count, parent = { name: "Inicio", href: "/" } }: CategoryHeaderProps) {
  return (
    <div className="mb-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
        <Link href={parent.href} className="hover:text-(--gta-green) transition-colors">
          {parent.name}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-white font-medium">{title}</span>
      </nav>

      {/* Title & Count */}
      <h1 className="text-5xl font-black tracking-tight text-white mb-4 sm:text-6xl">
        {title}
      </h1>
      <p className="text-lg text-gray-400">
        {count} {count === 1 ? "artículo" : "artículos"} en esta categoría
      </p>
    </div>
  );
}