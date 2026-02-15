import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'motion/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40"
        >
          <Button
            onClick={scrollToTop}
            size="lg"
            className="h-12 w-12 rounded-full bg-[#00FF41] text-black hover:bg-[#00FF41]/90 shadow-lg hover:shadow-[#00FF41]/20 transition-all"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
