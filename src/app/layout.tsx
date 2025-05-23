import type { Metadata } from "next";
import { Quicksand, Athiti } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

const athiti = Athiti({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-athiti",
  weight: "700"
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
    <html lang="es" className={`${quicksand.variable} ${athiti.variable}`}>
      <body className="antialiased font-sans">
        <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
