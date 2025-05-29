"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // íconos bonitos

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/Datos_Rurales", label: "Datos Rurales" },
    { href: "/Problemas", label: "Problemas" },
    { href: "/Voz_Rural", label: "Voz Rural" },
    { href: "/Datos_Curiosos", label: "Datos Curiosos" },
    { href: "/Metodologia", label: "Metodología" },
    { href: "/Entrevistas", label: "Entrevistas" },
    { href: "/Difunde", label: "Difunde" },
    { href: "/Equipo", label: "Equipo" },
    { href: "/Mujeres_Rurales", label: "Mujeres Rurales" },
    { href: "/Taller_Periodismo", label: "Taller de Periodismo" },
  ];

  return (
<nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 shadow-md z-50">
  {/* Contenedor visible solo en pantallas grandes */}
  <div className="hidden xl:flex container mx-auto items-center justify-center p-4">
    <Link href="/">
      <Image
        src="/ICONO IDENTIDAD RURAL@2x.webp"
        alt="Logo"
        width={45}
        height={45}
        className="rounded-md cursor-pointer mr-10"
      />
    </Link>

    <ul className="flex space-x-6 text-sm font-semibold">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="hover:text-blue-900">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>

  {/* Botón flotante SIEMPRE visible en móviles */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="xl:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
  >
    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
  </button>

  {/* Menú móvil desplegable */}
  {isOpen && (
    <ul className="xl:hidden min-h-screen mt-20 flex flex-col items-center backdrop-blur-md shadow-md space-y-4 py-4 text-sm font-semibold">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:text-blue-900"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )}
</nav>
  );
}