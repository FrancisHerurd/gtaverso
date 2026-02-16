import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.svg" alt="GTAVerso" width={40} height={40} />
            <span className="text-2xl font-bold text-primary">GTAVerso</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8 font-medium">
            <li><Link href="/gta-6" className="hover:text-primary transition">GTA 6</Link></li>
            <li><Link href="/gta-5" className="hover:text-primary transition">GTA 5</Link></li>
            <li><Link href="/gta-san-andreas" className="hover:text-primary transition">San Andreas</Link></li>
            <li><Link href="/gta-vice-city" className="hover:text-primary transition">Vice City</Link></li>
            <li><Link href="/gta-3" className="hover:text-primary transition">GTA 3</Link></li>
          </ul>

          <button className="md:hidden" aria-label="Abrir menú">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}