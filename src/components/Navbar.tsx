"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // o puedes usar íconos propios

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  const links = [
    ["Inicio", "/"],
    ["Datos Rurales", "/Datos_Rurales"],
    ["Problemas", "/Problemas"],
    ["Voz Rural", "/Voz_Rural"],
    ["Datos Curiosos", "/Datos_Curiosos"],
    ["Metodología", "/Metodologia"],
    ["Entrevistas", "/Entrevistas"],
    ["Difunde", "/Difunde"],
    ["Equipo", "/Equipo"],
    ["Mujeres Rurales", "/Mujeres_Rurales"],
    ["Taller de Periodismo", "/Taller_Periodismo"],
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md border-b border-white/20">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image
            src="/images/inicio/logo.webp"
            alt="Logo"
            width={45}
            height={45}
            className="rounded-md cursor-pointer"
            priority
          />
        </Link>

        {/* Botón Hamburguesa (solo en móviles) */}
        <button onClick={toggleMenu} className="md:hidden text-gray-800">
          {menuAbierto ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú en pantallas grandes */}
        <ul className="hidden md:flex flex-wrap gap-4 md:gap-6 text-sm font-semibold text-gray-900">
          {links.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-blue-500 transition-colors duration-200">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Menú desplegable en móvil */}
      {menuAbierto && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 text-sm font-semibold text-gray-900">
            {links.map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-2 hover:text-blue-500 transition-colors duration-200"
                  onClick={() => setMenuAbierto(false)} // Cerrar al hacer clic
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
