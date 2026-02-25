// app/juegos/[game]/mapa/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Map, ArrowLeft } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mapa y ubicaciones de GTA 6 - GTAVerso',
    description: 'Explora el estado de Leonida y todas las ubicaciones de Vice City.',
    alternates: { canonical: 'https://gtaverso.com/juegos/gta-6/mapa' },
  };
}

export default function MapaPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/juegos/gta-6" className="hover:text-white transition-colors">GTA 6</Link>
          <span>/</span>
          <span className="text-white">Mapa y ubicaciones</span>
        </nav>

        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF00FF]/20 text-[#FF00FF]">
            <Map className="h-10 w-10" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#FF00FF] sm:text-5xl">
            Mapa y ubicaciones
          </h1>
          <p className="text-lg text-gray-400">
            Explora el estado de Leonida y Vice City al completo.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-8 sm:p-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">🗺️ Mapa interactivo en desarrollo</h2>
          <p className="mb-6 text-gray-300">
            Pronto podrás explorar el mapa completo de GTA 6 con todas las ubicaciones confirmadas, puntos de interés y zonas jugables.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/juegos/gta-6" className="inline-flex items-center gap-2 rounded-lg bg-[#FF00FF] px-6 py-3 font-semibold text-black">
            <ArrowLeft className="h-5 w-5" />
            Volver a GTA 6
          </Link>
        </div>
      </div>
    </main>
  );
}