"use client";
import Link from "next/link";
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#2F4F4F] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo y mensaje */}
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-yellow-300 text-2xl font-bold tracking-wide">
            IDENTIDAD <span className="text-white">RURAL</span>
          </h1>
          <p>Hecho con <span className="text-red-500">❤️</span> en Ecuador</p>
          <p className="text-gray-300">Este sitio es de acceso libre y educativo</p>
        </div>

        {/* Mapa del sitio */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Mapa del Sitio</h2>
          <ul className="space-y-1 text-gray-200">
            <li><Link href="/Equipo" className="hover:text-yellow-300">Equipo</Link></li>
            <li><Link href="/Metodologia" className="hover:text-yellow-300">Metodología</Link></li>
            <li><Link href="/Entrevistas" className="hover:text-yellow-300">Entrevistas</Link></li>
            <li><Link href="/Difunde" className="hover:text-yellow-300">Difunde</Link></li>
            <li><Link href="/Recursos" className="hover:text-yellow-300">Recursos</Link></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Redes Sociales</h2>
          <ul className="space-y-2 text-gray-200">
            <li className="flex items-center gap-2">
              <a href="https://x.com/ConagopareN" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black">
                <BsTwitterX/> <span>X</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://www.tiktok.com/@conagoparenacional" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-400">
                <FaTiktok /> <span>TikTok</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://www.youtube.com/channel/UCh2Zn02T84_-Of1Tp6pD3ag" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-500">
                <FaYoutube /> <span>Youtube</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://www.facebook.com/CONAGOPARE/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-500">
                <FaFacebook /> <span>Facebook</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://www.instagram.com/conagopare.ec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-500">
                <FaInstagram /> <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}