'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-4 right-4 z-[100] md:bottom-8 md:left-8 md:right-8 max-w-2xl mx-auto"
        >
          <div className="bg-gray-900/95 border border-[var(--gta-green)]/30 rounded-2xl p-6 shadow-2xl shadow-[var(--gta-green)]/10 backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* Icono + texto */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="bg-[var(--gta-green)]/10 p-2 rounded-xl">
                  <Cookie className="h-6 w-6 text-[var(--gta-green)] flex-shrink-0" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-lg leading-tight">
                    🍪 Cookies GTAVerso
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Usamos cookies para mejorar tu experiencia, análisis y anuncios. 
                    <a 
                      href="/privacidad" 
                      className="text-[var(--gta-green)] hover:underline font-medium ml-1"
                    >
                      Más info
                    </a>
                  </p>
                </div>
              </div>

              {/* ✅ BOTONES NATIVOS (sin shadcn) */}
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={handleReject}
                  className="flex-1 lg:flex-none h-11 px-4 text-gray-200 border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-[var(--gta-green)]/50 hover:text-white text-sm font-medium transition-all duration-200"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 lg:flex-none h-11 px-6 bg-[var(--gta-green)] hover:bg-[var(--gta-green)]/90 text-black font-bold text-sm rounded-xl shadow-lg shadow-[var(--gta-green)]/20 transition-all duration-200"
                >
                  ¡Aceptar!
                </button>
                <button
                  onClick={handleReject}
                  className="lg:hidden -ml-2 h-9 w-9 p-0 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}