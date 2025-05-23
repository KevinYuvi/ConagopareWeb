import type { Metadata } from "next";
import { Quicksand } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: "Identidad Rural",
  description: "Platform on rural issues in Ecuador",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={quicksand.className}>
      <body className="antialiased">
        <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
