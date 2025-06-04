"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaXmark } from "react-icons/fa6";
import Image from "next/image"; 

type Elemento = {
  tipo: "imagen" | "video" | "texto" | "vaner";
  src: string;
  color: string;
  autor?: string;
  titulo?: string;
  descripcion?: string;
  fecha?: string;
};

const noticias: Elemento[] = [
  {
    tipo: "imagen",
    src: "images/difunde/difunde1.webp",
    color: "bg-gray-700",
    autor: "Sebastian Tamayo",
    titulo: "Voces del Territorio: Narrativas Rurales en Movimiento",
    descripcion:
      "Recopilamos artículos, reflexiones, videos y expresiones gráficas desde las parroquias rurales del Ecuador.",
    fecha: "MAY 28, 2025",
  },
  {
    tipo: "imagen",
    src: "images/difunde/difunde2.webp",
    color: "bg-green-600",
    autor: "Sebastian Tamayo",
    titulo: "Comunicando lo Nuestro: Historias desde las Parroquias",
    descripcion:
      "Son voces auténticas que narran sus realidades, luchas y esperanzas.",
    fecha: "MAY 28, 2025",
  },
];

const elementos: Elemento[] = [
  { tipo: "imagen", src: "images/difunde/difunde1.webp", color: "bg-gray-700" },
  { tipo: "imagen", src: "images/difunde/difunde2.webp", color: "bg-green-600" },
  { tipo: "video", src: "images/difunde/difunde5.mp4", color: "bg-green-400" },
  { tipo: "imagen", src: "images/difunde/difunde10.png", color: "bg-gray-400" },
  { tipo: "imagen", src: "images/difunde/difunde11.png", color: "bg-blue-300" },
  { tipo: "imagen", src: "images/difunde/difunde4.webp", color: "bg-red-400" },
  { tipo: "imagen", src: "images/difunde/difunde3.webp", color: "bg-blue-400" },
  { tipo: "imagen", src: "images/difunde/difunde12.png", color: "bg-yellow-400" },
  { tipo: "imagen", src: "images/difunde/difunde13.png", color: "bg-blue-500" },
];

export default function Difunde() {
  const [selectedItem, setSelectedItem] = useState<Elemento | null>(null);

  return (
    <div className="bg-gray-100 text-gray-900 px-6 pb-10">

      {/* SECCIÓN 1: EXPOSICIÓN DE FOTOS */}
      <section id="expo-fotos" className="scroll-mt-32 max-w-5xl mx-auto mb-20">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          Territorios con voz
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center mb-10 px-4">
          “Esta exposición marca un hito: por primera vez, la inteligencia artificial generativa interpreta las percepciones de liderazgos parroquiales, elevando su sentir en formatos visuales diversos y lúdicos. <br />
          Cada imagen nace de testimonios reales para que lo descargues y lo difundas en redes sociales o lo imprimas para ubicar en espacios comunitarios visibles. <br />
          Una invitación a escuchar, conectar y actuar”.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {elementos.map((item, index) => (
            <motion.div
              key={index}
              className={`relative ${item.color} p-6 rounded-lg shadow-lg cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedItem(item)}
            >
              {item.tipo === "video" ? (
                <video src={item.src} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <img src={item.src} alt={item.tipo} className="w-full h-full object-cover rounded-lg" />
              )}
              <FaDownload className="absolute top-2 right-2 text-white opacity-80" />
            </motion.div>
          ))}
        </div>
      </section>


{/* SECCIÓN 2: EDITORIAL */}
<section id="editorial" className="scroll-mt-32 max-w-6xl mx-auto mb-20 px-4">
  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
    Editorial
  </h3>

  <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center mb-10">
    En esta sección se recogen aportes ciudadanos que invitan a reflexionar y debatir sobre las problemáticas del sector rural ecuatoriano. Son textos que se inspiran en la ruralidad, con mirada crítica y compromiso ciudadano. <br />
    Aquí también se visibilizan los artículos desarrollados por quienes completan el curso de periodismo de datos, reconociendo su voz como parte activa del pensamiento y la acción colectiva. <br />
    Porque escribir también es una forma de participación ciudadana. <br />
    <strong>Identidad Rural: escuchar, conectar, actuar</strong>
  </p>

  <div className="grid md:grid-cols-2 gap-6">
    {/* Tarjeta 1 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative w-full h-56">
        <Image
          src="/images/difunde/noticia1.png"
          alt="Los Gobiernos Parroquiales"
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <a
          href="https://radiolacalle.com/los-gobiernos-parroquiales-entre-la-descentralizacion-y-la-supervivencia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-blue-800 leading-snug line-clamp-3 hover:underline block"
        >
          Los Gobiernos Parroquiales: entre la descentralización y la supervivencia
        </a>
        <p className="text-sm text-pink-600 mt-1">Gobiernos rurales</p>
        <p className="text-sm text-gray-500">04/06/2024</p>
      </div>
    </div>

    {/* Tarjeta 2 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 w-full max-w-sm mx-auto overflow-hidden">
      <div className="relative w-full h-56">
        <Image
          src="/images/difunde/noticia2.png"
          alt="El empleo en las parroquias rurales"
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <a
          href="https://al-dato.org/community/cG9zdDoxMzY="
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-blue-800 leading-snug line-clamp-3 hover:underline block"
        >
          El empleo en las parroquias rurales: una deuda estructural
        </a>
        <p className="text-sm text-pink-600 mt-1">Economía rural</p>
        <p className="text-sm text-gray-500">04/06/2024</p>
      </div>
    </div>
  </div>
</section>


      {/* SECCIÓN 3: OTROS RECURSOS */}
      <section id="recursos" className="scroll-mt-32 max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Otros recursos</h3>
        <p className="text-gray-600 mb-6">
          Aquí puedes agregar enlaces a PDFs, documentos, redes sociales, posters, etc.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/docs/guia-comunicacion.pdf"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Guía de comunicación (PDF)
          </a>
          <a
            href="/docs/poster.png"
            target="_blank"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Póster informativo
          </a>
        </div>
      </section>

      {/* MODAL EMERGENTE */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative bg-white p-4 rounded-lg shadow-xl max-w-3xl w-full"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-800 hover:text-red-500"
                onClick={() => setSelectedItem(null)}
              >
                <FaXmark size={24} />
              </button>
              {selectedItem.tipo === "video" ? (
                <video src={selectedItem.src} controls className="w-full rounded-lg" />
              ) : (
                <img src={selectedItem.src} alt="Preview" className="w-full rounded-lg" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
