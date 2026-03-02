// src/components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasConsented = localStorage.getItem('gtaverso_cookies');
      if (!hasConsented) {
        setTimeout(() => setShowConsent(true), 1500);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('gtaverso_cookies', 'accepted');
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('gtaverso_cookies', 'rejected');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <>
          {/* Overlay oscuro con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            onClick={handleReject}
          />

          {/* Modal centrado */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="relative w-full max-w-lg"
            >
              <div className="bg-gray-900/95 border border-[var(--gta-green)]/30 rounded-2xl p-6 shadow-2xl shadow-[var(--gta-green)]/20 backdrop-blur-xl">
                {/* Botón cerrar (esquina superior derecha) */}
                <button
                  onClick={handleReject}
                  className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Contenido */}
                <div className="space-y-4">
                  {/* Icono + Título */}
                  <div className="flex items-start gap-3">
                    <div className="bg-[var(--gta-green)]/10 p-3 rounded-xl">
                      <Cookie className="h-7 w-7 text-[var(--gta-green)] flex-shrink-0" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-white font-bold text-xl leading-tight mb-2">
                        🍪 Cookies GTAVerso
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Usamos cookies para mejorar tu experiencia, análisis y anuncios. 
                        <Link 
                          href="/politica-de-cookies" 
                          className="text-[var(--gta-green)] hover:underline font-medium ml-1"
                        >
                          Más información
                        </Link>
                      </p>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      onClick={handleReject}
                      className="flex-1 h-12 px-5 text-gray-200 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-[var(--gta-green)]/50 hover:text-white text-sm font-medium transition-all duration-200"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={handleAccept}
                      className="flex-1 h-12 px-6 bg-[var(--gta-green)] hover:bg-[var(--gta-green)]/90 text-black font-bold text-sm rounded-xl shadow-lg shadow-[var(--gta-green)]/30 transition-all duration-200"
                    >
                      ¡Aceptar cookies!
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}