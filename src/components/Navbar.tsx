"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type LinkItem = {
  href: string;
  label: string;
};

type LinkWithSubmenu = {
  href: string;
  label: string;
  submenu: LinkItem[];
};

type NavLink = LinkItem | LinkWithSubmenu;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [vozRuralOpen, setVozRuralOpen] = useState(false); // Estado para el submenu Voz Rural
  const [datosCuriososOpen, setDatosCuriososOpen] = useState(false); // Estado para el submenu Datos Curiosos

  // Referencias para detectar clicks fuera de los submenus
  const vozRuralRef = useRef<HTMLUListElement>(null);
  const datosCuriososRef = useRef<HTMLUListElement>(null);

  // Función para cerrar submenu si haces click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        vozRuralRef.current &&
        !vozRuralRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('button[data-submenu-button="vozRural"]')
      ) {
        setVozRuralOpen(false);
      }
      if (
        datosCuriososRef.current &&
        !datosCuriososRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('button[data-submenu-button="datosCuriosos"]')
      ) {
        setDatosCuriososOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const links: NavLink[] = [
    { href: "/", label: "Inicio" },
    { href: "/Problemas", label: "Problemas" },
    {
      href: "/Voz_Rural",
      label: "Voz Rural",
      submenu: [
        { href: "/Voz_Rural#importancia-gobierno", label: "¿Por qué los Gobiernos Parroquiales son importantes?" },
        { href: "/Voz_Rural#mensaje-parroquias", label: "Mensaje de las parroquias rurales al Ecuador" },
      ],
    },
    { href: "/Entrevistas", label: "Entrevistas" },
    {
      href: "/Datos_Curiosos",
      label: "Datos Curiosos",
      submenu: [
        { href: "#emociones", label: "Emociones de las y los entrevistados" },
        { href: "#anecdotas", label: "Anécdotas Random" },
      ],
    },
    { href: "/Mujeres_Rurales", label: "Mujeres Rurales" },
    { href: "/Datos_Rurales", label: "Datos Rurales" },
    { href: "/Difunde", label: "Difunde" },
    { href: "/Equipo", label: "Equipo" },
    { href: "/Metodologia", label: "Metodología" },
    { href: "/Taller_Periodismo", label: "Taller de Periodismo" },
  ];

  const submenuVariants = {
    hidden: { opacity: 0, y: -10, pointerEvents: "none" as const },
    visible: { opacity: 1, y: 0, pointerEvents: "auto" as const, transition: { duration: 0.25 } },
  };

  return (
    <nav className="w-full z-50 font-heading">
      {/* Navbar desktop */}
      <div className="hidden xl:flex container mx-auto items-center justify-center p-4 bg-white/30 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-40">
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
          {links.map((link) => {
            if ("submenu" in link) {
              const isVozRural = link.label === "Voz Rural";
              const isDatosCuriosos = link.label === "Datos Curiosos";
              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (isVozRural) setVozRuralOpen(true);
                    if (isDatosCuriosos) setDatosCuriososOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (isVozRural) setVozRuralOpen(false);
                    if (isDatosCuriosos) setDatosCuriososOpen(false);
                  }}
                >
                  <button
                    data-submenu-button={isVozRural ? "vozRural" : isDatosCuriosos ? "datosCuriosos" : undefined}
                    className="hover:text-cyan-600 flex items-center gap-1 focus:outline-none"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isVozRural ? vozRuralOpen : isDatosCuriosos ? datosCuriososOpen : false}
                    onClick={() => {
                      if (isVozRural) setVozRuralOpen((prev) => !prev);
                      if (isDatosCuriosos) setDatosCuriososOpen((prev) => !prev);
                    }}
                  >
                    <Link href={link.href} className="cursor-pointer">
                      {link.label}
                    </Link>
                    <svg
                      className="w-3 h-3 mt-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {(isVozRural && vozRuralOpen) || (isDatosCuriosos && datosCuriososOpen) ? (
                      <motion.ul
                        ref={isVozRural ? vozRuralRef : datosCuriososRef}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={submenuVariants}
                        className="absolute top-full left-0 mt-1 w-max bg-white border border-gray-300 rounded shadow-lg z-50"
                      >
                        {link.submenu.map((sublink) => (
                          <li key={sublink.href}>
                            <Link
                              href={sublink.href}
                              className="block px-4 py-2 whitespace-nowrap hover:bg-cyan-100"
                              onClick={() => {
                                if (isVozRural) setVozRuralOpen(false);
                                if (isDatosCuriosos) setDatosCuriososOpen(false);
                              }}
                            >
                              {sublink.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            }
            return (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-600">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Botón móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menú móvil */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-40 backdrop-blur-md bg-white/30 flex flex-col items-center justify-center space-y-6 text-sm font-semibold">
          {links.map((link) => {
            if ("submenu" in link) {
              return (
                <div key={link.label} className="flex flex-col items-center">
                  {/* Para móvil, los submenus hacen scroll suave */}
                  <Link
                    href={link.href}
                    className="font-semibold hover:text-blue-900"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.submenu.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      className="hover:text-blue-900"
                      onClick={() => setIsOpen(false)}
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-900"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
