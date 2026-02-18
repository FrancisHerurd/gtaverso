// Tu EXACTO original + 2 líneas
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";
import CookieConsent from "@/components/CookieConsent/CookieConsent"; // ← SOLO ESTO

export const metadata: Metadata = {
  title: "GTAVerso",
  description: "Noticias, guías y trucos de GTA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollTopButton />
        <CookieConsent /> {/* ← SOLO ESTO */}
      </body>
    </html>
  );
}