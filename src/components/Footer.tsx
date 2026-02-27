// src/components/Footer.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Instagram, Mail } from "lucide-react";

// Icono X (Twitter) personalizado
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Icono TikTok personalizado
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

// Icono RSS personalizado
const RSSIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      alert("Por favor, introduce un email válido");
      return;
    }

    setIsSubmitting(true);
    // Simulación
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setEmail("");
    alert("¡Suscripción registrada! (demo)");
  };

  return (
    <footer className="bg-black border-t border-[#00FF41]/20">
      {/* Newsletter */}
      <div className="border-b border-[#00FF41]/20 bg-linear-to-r from-black via-gray-900 to-black">
        <div className="mx-auto max-w-(--container) px-4 py-10 sm:px-6 lg:px-8">
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
      <div className="mx-auto max-w-(--container) px-4 py-12 sm:px-6 lg:px-8">
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

          {/* Juegos */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Juegos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/noticias"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Noticias
                </Link>
              </li>
              <li>
                <Link
                  href="/juegos/gta-6"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 6
                </Link>
              </li>
              <li>
                <Link
                  href="/juegos/gta-5"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 5
                </Link>
              </li>
              <li>
                <Link
                  href="/juegos/gta-4"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 4
                </Link>
              </li>
              <li>
                <Link
                  href="/juegos/gta-san-andreas"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA San Andreas
                </Link>
              </li>
              <li>
                <Link
                  href="/juegos/gta-vice-city"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA Vice City
                </Link>
              </li>
              <li>
                <Link
                  href="/juegos/gta-3"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  GTA 3
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces Legales */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/aviso-legal"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-de-uso"
                  className="text-gray-400 transition-colors hover:text-[#00FF41]"
                >
                  Términos de Uso
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

          {/* Redes Sociales */}
          <div>
            <h4 className="mb-4 font-bold uppercase tracking-wide text-[#00FF41]">
              Síguenos
            </h4>
            <div className="flex gap-3">
              {/* X (Twitter) */}
              <a
                href="https://twitter.com/GTA_Verso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="X (Twitter)"
              >
                <XIcon className="h-5 w-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/GTA_Verso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@gta.verso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="TikTok"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>

              {/* RSS Feed */}
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-gray-400 transition-colors hover:bg-[#00FF41]/10 hover:text-[#00FF41]"
                aria-label="RSS Feed"
              >
                <RSSIcon className="h-5 w-5" />
              </a>

              {/* Email */}
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

        {/* Copyright */}
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