import { Link } from 'react-router';
import { Facebook, Twitter, Youtube, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { categories } from '../data/articles-data';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, introduce un email válido');
      return;
    }

    setIsSubmitting(true);

    // Simulación de suscripción (preparado para backend)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Guardar en localStorage como demo
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      toast.success('¡Suscripción exitosa! Revisa tu email para confirmar.');
      setEmail('');
    } else {
      toast.info('Este email ya está suscrito.');
    }

    setIsSubmitting(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-[#00FF41]/20">
      {/* Newsletter section */}
      <div className="border-b border-[#00FF41]/20 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿No te pierdas nada?
              </h3>
              <p className="text-gray-400">
                Suscríbete al newsletter y recibe las últimas noticias de GTA
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:w-80 bg-gray-900/50 border-[#00FF41]/30 text-white placeholder:text-gray-500 focus:border-[#00FF41]"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#00FF41] text-black hover:bg-[#00FF41]/90 font-semibold px-6"
              >
                {isSubmitting ? 'Enviando...' : 'Suscribir'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-[#00FF41] font-bold mb-4 uppercase tracking-wide">
              Sobre Nosotros
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu fuente definitiva de noticias, guías y análisis sobre GTA V, GTA Online y GTA 6. 
              Actualizaciones diarias con contenido de calidad.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#00FF41] font-bold mb-4 uppercase tracking-wide">
              Categorías
            </h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/categoria/${category.slug}`}
                    className="text-gray-400 hover:text-[#00FF41] text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#00FF41] font-bold mb-4 uppercase tracking-wide">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/mapa-del-sitio"
                  className="text-gray-400 hover:text-[#00FF41] text-sm transition-colors"
                >
                  Mapa del Sitio
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF41] text-sm transition-colors"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF41] text-sm transition-colors"
                >
                  Términos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#00FF41] text-sm transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[#00FF41] font-bold mb-4 uppercase tracking-wide">
              Síguenos
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-[#00FF41]/10 flex items-center justify-center text-gray-400 hover:text-[#00FF41] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-[#00FF41]/10 flex items-center justify-center text-gray-400 hover:text-[#00FF41] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-[#00FF41]/10 flex items-center justify-center text-gray-400 hover:text-[#00FF41] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-[#00FF41]/10 flex items-center justify-center text-gray-400 hover:text-[#00FF41] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:contacto@gtanews.com"
                className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-[#00FF41]/10 flex items-center justify-center text-gray-400 hover:text-[#00FF41] transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#00FF41]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} GTA News. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-sm">
              Grand Theft Auto y GTA son marcas registradas de{' '}
              <a
                href="https://www.rockstargames.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00FF41] hover:underline"
              >
                Rockstar Games
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
