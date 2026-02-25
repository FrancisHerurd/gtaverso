// app/juegos/[game]/ultimas-noticias/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Últimas noticias de GTA 6 - GTAVerso',
    description: 'Las noticias más recientes sobre Grand Theft Auto VI.',
    alternates: { canonical: 'https://gtaverso.com/juegos/gta-6/ultimas-noticias' },
  };
}

export default function UltimasNoticiasPage() {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/juegos/gta-6" className="hover:text-white transition-colors">GTA 6</Link>
          <span>/</span>
          <span className="text-white">Últimas noticias</span>
        </nav>

        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FF00FF]/20 text-[#FF00FF]">
            <Newspaper className="h-10 w-10" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#FF00FF] sm:text-5xl">
            Últimas noticias de GTA 6
          </h1>
          <p className="text-lg text-gray-400">
            Lo más reciente sobre Grand Theft Auto VI.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-8 sm:p-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">📰 Sección en desarrollo</h2>
          <p className="mb-6 text-gray-300">
            Estamos preparando un feed especial con las últimas noticias confirmadas de GTA 6.
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