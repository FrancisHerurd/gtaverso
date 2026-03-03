// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";

// ✅ Poppins para menús (Header/Footer)
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

// ✅ Montserrat para encabezados (H1-H6)
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "GTAVerso",
    template: "%s | GTAVerso",
  },
  description: "Noticias, guías, trucos y leaks de GTA 6, GTA 5 Online y toda la saga GTA.",
  keywords: ["GTA 6", "GTA Online", "GTA 5", "noticias GTA", "guías GTA", "leaks GTA"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html 
      lang="es" 
      className={`dark ${poppins.variable} ${montserrat.variable}`} 
      suppressHydrationWarning
    >
      <head>
        {/* RSS Autodiscovery */}
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="GTAVerso RSS Feed" 
          href="https://gtaverso.com/feed.xml" 
        />
      </head>
      <body className="min-h-screen bg-gray-950 text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollTopButton />
        <CookieConsent />
        
        {/* Google Analytics */}
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}