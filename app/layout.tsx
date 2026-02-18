import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTopButton from "@/components/ScrollTopButton";

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
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-950 text-white antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}