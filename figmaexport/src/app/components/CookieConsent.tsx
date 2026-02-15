import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookie_consent');
    if (!hasConsented) {
      // Show after a small delay
      setTimeout(() => {
        setShowConsent(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowConsent(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'false');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="bg-gray-900 border border-[#00FF41]/20 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon and text */}
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="h-6 w-6 text-[#00FF41] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Usamos cookies
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación 
                      y analizar el tráfico del sitio. Al continuar navegando, aceptas su uso.{' '}
                      <a href="#" className="text-[#00FF41] hover:underline">
                        Más información
                      </a>
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    className="flex-1 md:flex-none border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Rechazar
                  </Button>
                  <Button
                    onClick={handleAccept}
                    className="flex-1 md:flex-none bg-[#00FF41] text-black hover:bg-[#00FF41]/90 font-semibold"
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReject}
                    className="text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
