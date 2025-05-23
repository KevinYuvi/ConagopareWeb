"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md border-b border-white/20">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={45} 
            height={45} 
            className="rounded-md cursor-pointer"
            priority
          />
        </Link>

        <ul className="flex flex-wrap gap-4 md:gap-6 text-sm font-semibold text-gray-900">
          {[
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
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-blue-500 transition-colors duration-200">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
