// app/sobre-nosotros/page.tsx

import { Metadata } from 'next';
import { generateSEO, generateOrganizationSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generateSEO({
  title: 'Sobre GTAVerso',
  description: 'Conoce al equipo detrás de GTAVerso, tu fuente especializada en noticias, guías y análisis de la saga Grand Theft Auto desde 2024.',
  url: '/sobre-nosotros',
  noindex: false, // ✅ IMPORTANTE: Indexable para Google News
});

export default function SobreNosotros() {
  // Schema de Organización para SEO
  const orgSchema = generateOrganizationSchema();

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-black text-white">
              Sobre <span className="text-[#00FF41]">GTAVerso</span>
            </h1>
            <p className="text-xl text-gray-400">
              Tu fuente especializada en la saga Grand Theft Auto
            </p>
          </div>

          {/* Contenido */}
          <article className="prose prose-invert prose-lg max-w-none">
            
            {/* Quiénes Somos */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                ¿Quiénes Somos?
              </h2>
              <p className="text-gray-300 leading-relaxed">
                GTAVerso es un portal independiente especializado en la saga <strong>Grand Theft Auto</strong>, 
                fundado en 2024 con el objetivo de ofrecer la cobertura más completa en español 
                sobre GTA 6, GTA 5, GTA Online y toda la franquicia de Rockstar Games.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Somos un equipo de jugadores apasionados y creadores de contenido con más de 10 años 
                de experiencia en la saga GTA y el periodismo de videojuegos, dedicados a proporcionar 
                información precisa, análisis profundos y guías útiles para la comunidad hispanohablante.
              </p>
            </section>

            {/* Nuestra Misión */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                Nuestra Misión
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Proporcionar a la comunidad hispanohablante de GTA:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong>Noticias actualizadas</strong>: Cobertura diaria de anuncios, filtraciones y novedades</li>
                <li><strong>Guías completas</strong>: Tutoriales paso a paso para misiones, coleccionables y logros</li>
                <li><strong>Análisis profundos</strong>: Opinión experta sobre mecánicas, historia y contenido</li>
                <li><strong>Trucos verificados</strong>: Códigos, glitches y secretos comprobados</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Todo con un enfoque en la <strong>precisión, originalidad y transparencia informativa</strong>.
              </p>
            </section>

            {/* Política Editorial */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                Política Editorial
              </h2>
              <div className="bg-gray-900/50 border border-[#00FF41]/20 rounded-lg p-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF41] text-xl">✓</span>
                    <span><strong>Contenido 100% original:</strong> Todas nuestras noticias y guías son escritas por nuestro equipo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF41] text-xl">✓</span>
                    <span><strong>Fuentes citadas:</strong> Siempre indicamos la procedencia de información de terceros</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF41] text-xl">✓</span>
                    <span><strong>Correcciones públicas:</strong> Actualizamos artículos cuando detectamos errores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF41] text-xl">✓</span>
                    <span><strong>Independencia editorial:</strong> No recibimos pagos por cobertura ni opiniones</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00FF41] text-xl">✓</span>
                    <span><strong>Transparencia:</strong> Identificamos claramente contenido patrocinado (si lo hay)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Equipo */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                Equipo Editorial
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Nuestro equipo está formado por:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li><strong>Redactores especializados</strong> en la saga GTA y Rockstar Games</li>
                <li><strong>Analistas de juego</strong> con experiencia en mecánicas y narrativa</li>
                <li><strong>Creadores de guías</strong> que verifican cada tutorial personalmente</li>
                <li><strong>Editores</strong> que revisan la calidad y precisión del contenido</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Todos compartimos una pasión genuina por Grand Theft Auto y el compromiso de 
                ofrecer el mejor contenido posible a la comunidad.
              </p>
            </section>

            {/* Afiliación */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                Afiliación y Transparencia
              </h2>
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed">
                  <strong>GTAVerso es un proyecto fan independiente</strong> y no está afiliado, 
                  patrocinado ni respaldado por Rockstar Games, Take-Two Interactive o cualquier 
                  otra empresa relacionada con la saga Grand Theft Auto.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Todos los derechos de marca, logos y contenido de los juegos pertenecen a sus 
                  respectivos propietarios. Utilizamos material con fines informativos y educativos 
                  bajo el principio de uso justo (fair use).
                </p>
              </div>
            </section>

            {/* Contacto */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                Contacto
              </h2>
              <p className="text-gray-300 leading-relaxed">
                ¿Tienes sugerencias, detectaste un error o quieres colaborar con nosotros?
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#00FF41] text-black font-bold rounded-lg hover:bg-[#00cc34] transition-colors"
                >
                  Formulario de Contacto
                </Link>
                <a
                  href="mailto:contacto@gtaverso.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  contacto@gtaverso.com
                </a>
              </div>
            </section>

            {/* Redes Sociales */}
            <section>
              <h2 className="text-3xl font-bold text-[#00FF41] mb-4">
                Síguenos en Redes Sociales
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Mantente al día con las últimas noticias y únete a nuestra comunidad:
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://twitter.com/GTA_Verso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-[#1DA1F2] transition-colors"
                >
                  Twitter/X
                </a>
                <a
                  href="https://instagram.com/GTA_Verso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-[#E4405F] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@gta.verso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  TikTok
                </a>
                <a
                  href="/feed.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-[#FFA500] transition-colors"
                >
                  RSS Feed
                </a>
              </div>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}