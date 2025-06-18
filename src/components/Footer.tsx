"use client";
import Link from "next/link";
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2d3036] text-white px-6 py-10">
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
  {/* Logo y mensaje */}
  <div className="flex flex-col items-start space-y-2 md:col-span-3">
    <Image
      src="/images/inicio/Logo2.webp"
      alt="Logo"
      width={150}
      height={45}
      className="rounded-md cursor-pointer mr-10"
    />
    <p>Hecho con <span className="text-red-500">❤️</span> en Ecuador</p>
    <p className="text-gray-300">Este sitio es de acceso libre y educativo</p>
  </div>
  <div>
    <h2 className="text-lg font-semibold mb-2 border-b border-white pb-1">Recursos Rurales</h2>
    <ul className="space-y-2 text-gray-200">
      <li><Link href="/Datos_Rurales" className="hover:text-teal-300">Datos Rurales</Link></li>
      <li><Link href="/Datos_Curiosos" className="hover:text-teal-300">Datos Curiosos</Link></li>
      <li><Link href="/Problemas" className="hover:text-teal-300">Problemas</Link></li>
      <li><Link href="/Voz_Rural" className="hover:text-teal-300">Voz Rural</Link></li>
      <li><Link href="/Entrevistas" className="hover:text-teal-300">Entrevistas</Link></li>
    </ul>
  </div>
  <div>
    <h2 className="text-lg font-semibold mb-2 border-b border-white pb-1">Redes Sociales</h2>
    <ul className="space-y-2 text-gray-200">
            <li className="flex items-center gap-2">
              <a href="https://x.com/ConagopareN" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-teal-300">
                <BsTwitterX /> <span>X</span>
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
              <a href="https://www.instagram.com/conagopare.ec" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pink-500">
                <FaInstagram /> <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
