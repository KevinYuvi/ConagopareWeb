"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";

type LinkItem = {
  href: string;
  label: string;
};

type LinkWithSubmenu = {
  href?: string;
  label: string;
  submenu: LinkItem[];
};

type NavLink = LinkItem | LinkWithSubmenu;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
const [submenuAbierto, setSubmenuAbierto] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

function closeAllSubmenus() {
  setSubmenuAbierto(null);
}


  const links: NavLink[] = [
    { href: "/", label: "Inicio" },
    { href: "/Problemas", label: "Problemas" },
    {
      label: "Voz Rural",
      submenu: [
        {
          href: "/Voz_Rural#voz-rural",
          label: "Mensajes de las Parroquias",
        },
        {
          href: "/Voz_Rural#importancia",
          label: "¿Por qué su gobierno parroquial es importante para su comunidad? / ¿Cual sería su mensaje para el Ecuador?",
        },
        /*{
          href: "/Voz_Rural#mensaje",
          label: "¿Cual sería su mensaje para el Ecuador?",
        },
        */
        {
          href: "/Datos_Curiosos#datos",
          label: "Datos Curiosos",
        },
      ],
    },
    { href: "/Entrevistas", label: "Entrevistas" },
    { href: "/Mujeres_Rurales", label: "Mujeres Rurales" },
    { href: "/Datos_Rurales", label: "Datos Rurales" },
    {
      label: "Difunde",
      submenu: [
        {
          href: "/Difunde#expo-fotos",
          label: "Exposición de fotos con IA generativa",
        },
        {
          href: "/Difunde#editorial",
          label: "Editorial",
        },
        {
          href: "/Difunde#recursos",
          label: "Otros recursos",
        },
      ],
    },
    {
      label: "Acerca de",
      submenu: [
        { href: "/Metodologia", label: "Metodología" },
        { href: "/Equipo", label: "Equipo" },
      ],
    },
    { href: "/Taller_Periodismo", label: "Periodismo de Datos" },
  ];

  return (
    <nav className="w-full z-50">
      <div className="hidden xl:flex mx-auto items-center justify-center p-2 bg-gradient-to-r from-white/80 via-white/60 to-white/80 backdrop-blur-xl shadow-lg fixed top-0 left-0 right-0 z-40">
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
              const isDifunde = link.label === "Difunde";
              const isDatosCuriosos = link.label === "Datos Curiosos";
const isOpen = submenuAbierto === link.label;

              return (
                <li
                  key={link.label}
                  className="relative group"
onMouseEnter={() => {
  if (closeTimeout.current) clearTimeout(closeTimeout.current);
  setSubmenuAbierto(link.label);
}}
onMouseLeave={() => {
  closeTimeout.current = setTimeout(() => {
    setSubmenuAbierto(null);
  }, 300);
}}
                >
                  <div>
                    <button
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      className="hover:text-[#3bb2e7] flex items-center gap-1"
                    >
                      {link.label}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {isOpen && (
                    <ul
                      className={`absolute top-full mt-2 z-50 rounded-xl shadow-lg border border-gray-200 bg-white
                        ${isDatosCuriosos ? 'left-1/2 -translate-x-1/2 min-w-[220px] max-w-[280px]' : 'left-0 min-w-[260px]'}
                      `}
                    >
                      {link.submenu.map((sublink, idx) => (
                        <li
                          key={sublink.href}
                          className={idx !== link.submenu.length - 1 ? "border-b border-gray-200" : ""}
                        >
                          <Link
                            href={sublink.href}
                            className={`block px-4 py-2 hover:bg-gray-200 transition duration-150 ${idx === 0 ? "rounded-t-md" : ""} ${idx === link.submenu.length - 1 ? "rounded-b-md" : ""}`}
                            onClick={() => closeAllSubmenus()}
                          >
                            {sublink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[#3bb2e7]">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-white flex flex-col items-center justify-center text-center space-y-4 text-lg ">
          {links.map((link) => {
            if ("submenu" in link) {
              const estaAbierto = submenuAbierto === link.label;

              return (
                <div key={link.label} className="w-full text-center">
                  <button
                    onClick={() =>
                      setSubmenuAbierto(estaAbierto ? null : link.label)
                    }
                    className="w-full py-2 hover:text-blue-800"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${estaAbierto ? "rotate-180" : "rotate-0"
                          }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  {estaAbierto && (
                    <div className="flex flex-col">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="py-2 text-black hover:text-blue-800"
                            onClick={() => {
    setIsOpen(false);
    setSubmenuAbierto(null);
  }}
                        >{sublink.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-blue-800"
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
