import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | GTAVerso",
  description: "Política de privacidad y protección de datos de GTAVerso.",
  robots: "noindex, nofollow",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-(--gta-green) sm:text-5xl">
          Política de Privacidad
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            En <strong>GTAVerso</strong> nos comprometemos a proteger tu privacidad. Esta política detalla cómo tratamos los datos personales que recopilamos, en cumplimiento con el Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica de Protección de Datos (LOPDGDD).
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">1. Responsable del Tratamiento</h2>
          <ul className="list-disc pl-6 space-y-2 marker:text-(--gta-green)">
            <li><strong>Identidad:</strong> Francisco Heredia</li>
            <li><strong>Email:</strong> contacto@gtaverso.com</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-white">2. Datos que recopilamos y finalidad</h2>
          <p>Tratamos la información que nos facilitas con el fin de:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-(--gta-green)">
            <li><strong>Formulario de contacto:</strong> Atender tus consultas. Base legal: Consentimiento.</li>
            <li><strong>Newsletter:</strong> Enviarte noticias y novedades si te has suscrito. Base legal: Consentimiento.</li>
            <li><strong>Navegación (Cookies):</strong> Mejorar la web, analizar visitas (Google Analytics) y mostrar publicidad personalizada (Google AdSense). Base legal: Consentimiento e interés legítimo.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-white">3. Publicidad y Analítica (Cookies de Terceros)</h2>
          <p>
            Utilizamos servicios de terceros que pueden instalar cookies en tu navegador para recopilar datos anónimos:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-(--gta-green)">
            <li><strong>Google Analytics:</strong> Analiza cómo usas la web (visitas, tiempo, ubicación aproximada).</li>
            <li><strong>Google AdSense:</strong> Muestra anuncios personalizados basados en tu navegación anterior. Google utiliza cookies para servir anuncios en este sitio.</li>
          </ul>
          <p>
            Puedes inhabilitar la personalización de anuncios en la configuración de anuncios de Google o gestionar tus preferencias de cookies en nuestro banner de consentimiento.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">4. Conservación de datos</h2>
          <p>
            Los datos proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">5. Tus Derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar y suprimir tus datos, así como otros derechos detallados en el RGPD, enviando un email a contacto@gtaverso.com.
          </p>
        </div>
      </div>
    </div>
  );
}