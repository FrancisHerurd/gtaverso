"use client";

import { useState } from "react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  // ESTADO DEL FORMULARIO
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // ⚠️ REEMPLAZA ESTA URL POR LA TUYA DE FORMSPREE
      const response = await fetch("https://formspree.io/f/xwvnqqoj", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset(); // Limpia el formulario
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

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
          
          {/* Columna Izquierda: Información */}
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

          {/* Columna Derecha: Formulario */}
          <div className="rounded-3xl border border-white/10 bg-gray-900/50 p-8 shadow-2xl backdrop-blur-md">
            
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--gta-green)/20 text-(--gta-green)">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">¡Mensaje enviado!</h3>
                <p className="mt-2 text-gray-400">Gracias por contactarnos. Te responderemos pronto.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-medium text-(--gta-green) hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Tu Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="tu@email.com"
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-(--gta-green) focus:outline-none focus:ring-1 focus:ring-(--gta-green) transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Mensaje
                  </label>
                  <textarea
                    required
                    name="message"
                    id="message"
                    rows={5}
                    placeholder="Cuéntanos..."
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder-gray-500 focus:border-(--gta-green) focus:outline-none focus:ring-1 focus:ring-(--gta-green) transition-all resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">Hubo un error al enviar. Inténtalo de nuevo o escribe directamente al email.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--gta-green) px-8 py-4 font-bold text-black transition-transform hover:scale-[1.02] hover:bg-[#00cc34] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}