// src/components/Breadcrumbs.tsx
import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6 text-sm text-dark-700">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {isLast ? (
                <span className="font-semibold text-dark">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-primary transition">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}