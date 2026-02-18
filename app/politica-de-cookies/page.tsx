import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | GTAVerso",
  description: "Uso de cookies en GTAVerso.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-(--gta-green) sm:text-5xl">
          Política de Cookies
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            GTAVerso utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico y mostrar publicidad personalizada.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">¿Qué es una cookie?</h2>
          <p>
            Una cookie es un pequeño archivo de texto que se almacena en tu navegador cuando visitas casi cualquier página web. Su utilidad es que la web sea capaz de recordar tu visita cuando vuelvas a navegar por esa página.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">Cookies que utilizamos</h2>
          <ul className="list-disc pl-6 space-y-2 marker:text-(--gta-green)">
            <li><strong>Técnicas (Necesarias):</strong> Permiten el funcionamiento básico de la web (ej: recordar si has aceptado las cookies).</li>
            <li><strong>De Análisis (Google Analytics):</strong> Nos ayudan a entender cómo los usuarios interactúan con la web, recopilando información de forma anónima.</li>
            <li><strong>Publicitarias (Google AdSense):</strong> Se utilizan para rastrear a los visitantes en las páginas web. La intención es mostrar anuncios relevantes y atractivos para el usuario individual.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-white">Control de cookies</h2>
          <p>
            Puedes restringir, bloquear o borrar las cookies de GTAVerso o cualquier otra página web utilizando tu navegador. En cada navegador la operativa es diferente:
          </p>
          <ul className="list-disc pl-6 space-y-2 marker:text-(--gta-green)">
            <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="nofollow" className="text-(--gta-green) hover:underline">Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/borrar-cookies-que-los-sitios-web-han-guardado" target="_blank" rel="nofollow" className="text-(--gta-green) hover:underline">Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="nofollow" className="text-(--gta-green) hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="nofollow" className="text-(--gta-green) hover:underline">Microsoft Edge</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}