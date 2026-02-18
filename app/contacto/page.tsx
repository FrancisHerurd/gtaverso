import { Metadata } from "next";
import ContactForm from "@/components/ContactForm"; // ⚠️ Ver abajo
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | GTAVerso",
  description: "Contacta con el equipo de GTAVerso.",
  robots: "noindex, nofollow", // <--- AÑADIDO NOINDEX
};

// 1. Mantenemos la página como Server Component para poder usar metadata
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <div className="mx-auto max-w-(--container) px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Contacta con <span className="text-(--gta-green)">GTAVerso</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            ¿Tienes alguna noticia, filtración o sugerencia? Envíanos un mensaje directo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Columna Izquierda: Información Estática */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--gta-green)/10 text-(--gta-green)">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Email</p>
                    <a href="mailto:contacto@gtaverso.com" className="text-lg font-semibold text-white hover:text-(--gta-green) transition-colors">
                      contacto@gtaverso.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--gta-green)/10 text-(--gta-green)">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-400">Ubicación</p>
                    <p className="text-lg font-semibold text-white">Vice City (Digital)</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/30 p-6">
              <p className="text-sm text-gray-500">
                * Intentamos responder a todos los correos en menos de 48 horas. Por favor, no envíes spam.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo (Cliente) */}
          <div className="rounded-3xl border border-white/10 bg-gray-900/50 p-8 shadow-2xl backdrop-blur-md">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}