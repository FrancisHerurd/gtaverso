import { BrowserRouter, Routes, Route } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { ScrollToTop } from './components/ScrollToTopButton';
import { HomePage } from './pages/HomePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CategoryPage } from './pages/CategoryPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { SitemapPage } from './pages/SitemapPage';
import { Toaster } from './components/ui/sonner';
import { useEffect } from 'react';

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <main className="flex-1">
          <ScrollToTopOnMount />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articulo/:slug" element={<ArticleDetailPage />} />
            <Route path="/categoria/:slug" element={<CategoryPage />} />
            <Route path="/buscar" element={<SearchResultsPage />} />
            <Route path="/mapa-del-sitio" element={<SitemapPage />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-black to-gray-950">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                    <p className="text-xl text-gray-400 mb-6">Página no encontrada</p>
                    <a
                      href="/"
                      className="inline-block px-6 py-3 bg-[#00FF41] text-black font-semibold rounded-lg hover:bg-[#00FF41]/90 transition-colors"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
        <CookieConsent />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#111',
              color: '#fff',
              border: '1px solid rgba(0, 255, 65, 0.2)',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;