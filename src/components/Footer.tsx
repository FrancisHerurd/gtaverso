// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      // Aquí luego puedes integrar tu sistema real de toasts
      alert("Por favor, introduce un email válido");
      return;
    }

    setIsSubmitting(true);

    // Simulación de suscripción (luego se sustituirá por backend real)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setEmail("");
    alert("¡Suscripción registrada! (demo)");
  };

  return (
    <footer className="bg-black border-t border-[#00FF41]/20">
      {/* Newsletter */}
      <div className="border-b border-[#00FF41]/20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="mx-auto max-w-[var(--container)] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="mb-2 text-2xl font-bold text-white">
                ¿No quieres perderte nada?
              </h3>
              <p className="text-sm text-gray-400">
                Suscríbete y recibe las últimas noticias y guías de GTA en tu correo.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full gap-2 md:w-auto"
            >
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#00FF41]/30 bg-gray-900/50 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none focus:border-[#00FF41] md:w-80"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-[#00FF41] px-6 text-sm font-semibold text-black transition hover:bg-[#00FF41]/90 disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Suscribir"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="mx-auto max-w-[var(--container)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Sobre nosotros */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Sobre GTAVerso
            </h4>
            <p className="text-sm leading-relaxed text-gray-400">
              Portal independiente dedicado a noticias, guías, análisis y trucos
              de la saga Grand Theft Auto. Enfoque en GTA 6, GTA 5 y clásicos de la saga.
            </p>
          </div>

          {/* Juegos / secciones rápidas */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Juegos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/gta-6"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 6
                </Link>
              </li>
              <li>
                <Link
                  href="/gta-5"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 5
                </Link>
              </li>
              <li>
                <Link
                  href="/gta-san-andreas"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA San Andreas
                </Link>
              </li>
              <li>
                <Link
                  href="/gta-vice-city"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA Vice City
                </Link>
              </li>
              <li>
                <Link
                  href="/gta-3"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 3
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/mapa-del-sitio"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Mapa del sitio
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-de-uso"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social (sin YouTube ni Facebook) */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Síguenos
            </h4>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@gtaverso.com"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-[#00FF41]/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-500 md:flex-row md:text-left">
            <p>© {currentYear} GTAVerso. Todos los derechos reservados. GTAVerso es un proyecto fan no oficial y no está afiliado,
              patrocinado ni respaldado por Rockstar Games.</p>
                 
            
                  </div>
        </div>
      </div>
    </footer>
  );
}