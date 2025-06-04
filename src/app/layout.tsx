import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google"; // ✅ Importar la fuente correcta
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

// ✅ Configurar la fuente con los pesos necesarios
const baloo2 = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-baloo2",
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Identidad Rural",
  description: "Plataforma de visibilidad rural del Ecuador",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={baloo2.variable}>
      <body className="antialiased font-sans">
        <Navbar />
        <main className="min-h-screen pt-20">{children}</main>
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
