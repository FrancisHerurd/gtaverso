import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | GTAVerso",
  description: "Información legal y titularidad del sitio web GTAVerso.",
};

export default function LegalNoticePage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-(--gta-green) sm:text-5xl">
          Aviso Legal
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI), se exponen los siguientes datos:
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">1. Datos Identificativos</h2>
          <ul className="list-disc pl-6 space-y-2 marker:text-(--gta-green)">
            <li><strong>Titular del sitio web:</strong> Francisco Heredia</li>
            <li><strong>NIF/CIF:</strong> 54235902Q</li>
            <li><strong>Domicilio:</strong> C/ De las Flores, Edf. Los Jazmines, 2ºA - 29780, Nerja, Málaga</li>
            <li><strong>Correo electrónico de contacto:</strong> contacto@gtaverso.com</li>
            <li><strong>Actividad del sitio:</strong> Información, noticias y guías sobre videojuegos. Publicidad y marketing de afiliación.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-bold text-white">2. Propiedad Intelectual e Industrial</h2>
          <p>
            El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen al titular o a terceros colaboradores (como Rockstar Games) y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.
          </p>
          <p>
            Queda expresamente prohibida la reproducción, transformación, distribución y comunicación pública de la totalidad o parte de los contenidos de esta web con fines comerciales sin la autorización expresa del titular.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">3. Exención de Responsabilidad</h2>
          <p>
            El titular no se hace responsable de la legalidad de otros sitios web de terceros desde los que pueda accederse al portal. Tampoco responde por la legalidad de otros sitios web de terceros, que pudieran estar vinculados o enlazados desde este portal (ej: enlaces de afiliados o publicidad de AdSense).
          </p>
          <p>
            El titular se reserva el derecho a realizar cambios en el sitio web sin previo aviso, al objeto de mantener actualizada su información, añadiendo, modificando, corrigiendo o eliminando los contenidos publicados o el diseño del portal.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">4. Publicidad y Afiliación</h2>
          <p>
            Este sitio web puede alojar contenidos publicitarios o patrocinados. Los anunciantes y patrocinadores son los únicos responsables de asegurarse que el material remitido para su inclusión en el sitio web cumple con las leyes que en cada caso puedan ser de aplicación.
          </p>
          <p>
            GTAVerso participa en programas de afiliación de terceros, lo que significa que podemos recibir una comisión si realizas una compra a través de nuestros enlaces, sin coste adicional para ti.
          </p>

          <h2 className="mt-8 text-2xl font-bold text-white">5. Ley Aplicable y Jurisdicción</h2>
          <p>
            La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este aviso legal, así como cualquier cuestión relacionada con los servicios del presente portal, será la ley española.
          </p>
        </div>
      </div>
    </div>
  );
}