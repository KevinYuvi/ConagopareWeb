"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-3">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={45} 
            height={45} 
            className="rounded-md cursor-pointer"
          />
        </Link>

        <ul className="flex space-x-8 text-sm font-semibold">
          <li><Link href="/" className="hover:text-blue-400">Inicio</Link></li>
          <li><Link href="/Datos_Rurales" className="hover:text-blue-400">Datos Rurales</Link></li>
          <li><Link href="/Problemas" className="hover:text-blue-400">Problemas</Link></li>
          <li><Link href="/Voz_Rural" className="hover:text-blue-400">Voz Rural</Link></li>
          <li><Link href="/Datos_Curiosos" className="hover:text-blue-400">Datos Curiosos</Link></li>
          <li><Link href="/Metodologia" className="hover:text-blue-400">Metodología</Link></li>
          <li><Link href="/Entrevistas" className="hover:text-blue-400">Entrevistas</Link></li>
          <li><Link href="/Difunde" className="hover:text-blue-400">Difunde</Link></li>
          <li><Link href="/Equipo" className="hover:text-blue-400">Equipo</Link></li>
          <li><Link href="/Mujeres_Rurales" className="hover:text-blue-400">Mujeres Rurales</Link></li>
          <li><Link href="/Taller_Periodismo" className="hover:text-blue-400">Taller de Periodismo</Link></li>
        </ul>
      </div>
    </nav>
  );
}
