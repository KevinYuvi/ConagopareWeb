"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type LinkItem = {
  href: string;
  label: string;
};

type LinkWithSubmenu = {
  label: string;
  submenu: LinkItem[];
};

type NavLink = LinkItem | LinkWithSubmenu;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [vozRuralOpen, setVozRuralOpen] = useState(false);
  const [difundeOpen, setDifundeOpen] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState<string | null>(null);

  let timeoutId: NodeJS.Timeout;

  const links: NavLink[] = [
    { href: "/", label: "Inicio" },
    { href: "/Problemas", label: "Problemas" },
    {
      label: "Voz Rural",
      submenu: [
        {
          href: "/Voz_Rural#importancia-gobierno",
          label: "¿Por qué los Gobiernos Parroquiales son importantes?",
        },
        {
          href: "/Voz_Rural#mensaje-parroquias",
          label: "Mensaje de las parroquias rurales al Ecuador",
        },
      ],
    },
    { href: "/Entrevistas", label: "Entrevistas" },
    { href: "/Datos_Curiosos", label: "Datos Curiosos" },
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
    { href: "/Equipo", label: "Equipo" },
    { href: "/Metodologia", label: "Metodología" },
    { href: "/Taller_Periodismo", label: "Taller de Periodismo" },
  ];

  return (
    <nav className="w-full z-50">
      {/* Navbar grande */}
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
              const isDifunde = link.label === "Difunde";

              return (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(timeoutId);
                    if (isVozRural) setVozRuralOpen(true);
                    if (isDifunde) setDifundeOpen(true);
                  }}
                  onMouseLeave={() => {
                    timeoutId = setTimeout(() => {
                      if (isVozRural) setVozRuralOpen(false);
                      if (isDifunde) setDifundeOpen(false);
                    }, 200);
                  }}
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded={isVozRural ? vozRuralOpen : difundeOpen}
                    className="hover:text-cyan-600 flex items-center gap-1"
                  >
                    {link.label}
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

                  {(isVozRural && vozRuralOpen) && (
                    <ul className="absolute top-full left-0 mt-2 min-w-[260px] bg-white rounded-xl shadow-lg border border-gray-200 z-50 transition-all duration-200 ease-in-out">
                      {link.submenu.map((sublink, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === link.submenu.length - 1;

                        return (
                          <li
                            key={sublink.href}
                            className={`${
                              idx !== link.submenu.length - 1
                                ? "border-b border-gray-200"
                                : ""
                            }`}
                          >
                            <Link
                              href={sublink.href}
                              className={`block px-4 py-2 whitespace-nowrap hover:bg-cyan-100 transition duration-150 ${
                                isFirst ? "rounded-t-md" : ""
                              } ${isLast ? "rounded-b-md" : ""}`}
                              onClick={() => setVozRuralOpen(false)}
                            >
                              {sublink.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  {(isDifunde && difundeOpen) && (
                    <ul className="absolute top-full left-0 mt-2 min-w-[260px] bg-white rounded-xl shadow-lg border border-gray-200 z-50 transition-all duration-200 ease-in-out">
                      {link.submenu.map((sublink, idx) => {
                        const isFirst = idx === 0;
                        const isLast = idx === link.submenu.length - 1;

                        return (
                          <li
                            key={sublink.href}
                            className={`${
                              idx !== link.submenu.length - 1
                                ? "border-b border-gray-200"
                                : ""
                            }`}
                          >
                            <Link
                              href={sublink.href}
                              className={`block px-4 py-2 whitespace-nowrap hover:bg-cyan-100 transition duration-150 ${
                                isFirst ? "rounded-t-md" : ""
                              } ${isLast ? "rounded-b-md" : ""}`}
                              onClick={() => setDifundeOpen(false)}
                            >
                              {sublink.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
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

      {/* Botón menú móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menú móvil con acordeón */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 z-40 backdrop-blur-md bg-white/30 flex flex-col items-center justify-center space-y-6 text-sm font-semibold px-4 py-6 overflow-y-auto">
          {links.map((link) => {
            if ("submenu" in link) {
              const estaAbierto = submenuAbierto === link.label;
              return (
                <div key={link.label} className="w-full text-center">
                  <button
                    onClick={() =>
                      setSubmenuAbierto(estaAbierto ? null : link.label)
                    }
                    className="w-full py-2 hover:text-blue-900 font-semibold"
                  >
                    {link.label} {estaAbierto ? "▲" : "▼"}
                  </button>
                  {estaAbierto && (
                    <div className="flex flex-col pl-4">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.href}
                          href={sublink.href}
                          className="py-1 hover:text-blue-800 text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          ↳ {sublink.label}
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
