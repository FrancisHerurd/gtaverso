import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Uso | GTAVerso",
  description: "Condiciones de uso del sitio web GTAVerso.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-(--gta-green) sm:text-5xl">
          Términos de Uso
        </h1>
        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
          <p>
            Al acceder a GTAVerso, aceptas usar el sitio solo para fines legales y personales.
            Todo el contenido original es propiedad de GTAVerso. Las marcas de terceros (Rockstar Games) pertenecen a sus dueños.
          </p>
          <p>
            No nos hacemos responsables del uso indebido de la información o de los comentarios vertidos por terceros.
          </p>
        </div>
      </div>
    </div>
  );
}