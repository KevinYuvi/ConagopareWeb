"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaXmark } from "react-icons/fa6";

// Tipo extendido con metadatos para la sección tipo noticia
type Elemento = {
  tipo: "imagen" | "video" | "texto" | "vaner";
  src: string;
  color: string;
  autor?: string;
  titulo?: string;
  descripcion?: string;
  fecha?: string;
};

// Elementos tipo noticia (los de arriba)
const noticias: Elemento[] = [
  {
    tipo: "imagen",
    src: "images/difunde/difunde1.webp",
    color: "bg-gray-700",
    autor: "Sebastian Tamayo",
    titulo: "Voces del Territorio: Narrativas Rurales en Movimiento",
    descripcion:
      "En esta sección recopilamos artículos, reflexiones, videos y expresiones gráficas que nacen desde las parroquias rurales del Ecuador. Son voces auténticas que narran sus realidades, luchas y esperanzas, construyendo un archivo vivo de memoria territorial. Aquí, la comunicación no es solo información: es resistencia, identidad y movimiento.",
    fecha: "MAY 28, 2025",
  },
  {
    tipo: "imagen",
    src: "images/difunde/difunde2.webp",
    color: "bg-green-600",
    autor: "Sebastian Tamayo",
    titulo: "Comunicando lo Nuestro: Historias desde las Parroquias ",
    descripcion:
      "En esta sección recopilamos artículos, reflexiones, videos y expresiones gráficas que nacen desde las parroquias rurales del Ecuador. Son voces auténticas que narran sus realidades, luchas y esperanzas, construyendo un archivo vivo de memoria territorial. Aquí, la comunicación no es solo información: es resistencia, identidad y movimiento.",
    fecha: "MAY 28, 2025",
  },
];

// Elementos multimedia (grilla de imágenes y videos original)
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
      {/* Encabezado principal */}
      <div className="max-w-5xl mx-auto text-center pt-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 leading-tight">
          Material de Difusión
        </h2>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Explora, comparte y sé parte del cambio desde las voces de las parroquias rurales del Ecuador.
        </p>
      </div>

      {/* Noticias tipo tarjeta */}
      <div className="space-y-6 max-w-5xl mx-auto mb-14">
        {noticias.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
            whileHover={{ scale: 1.01 }}
            onClick={() => setSelectedItem(item)}
          >
            {/* Imagen */}
            <div className="relative md:w-1/3 w-full">
              <img
                src={item.src}
                alt={item.titulo}
                className="w-full h-full object-contain bg-white"
              />
              {/* Ícono tipo cámara */}
              <div className="absolute bottom-2 left-2 bg-red-600 rounded p-1">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 5a2 2 0 012-2h1.172a2 2 0 011.414.586l.828.828H14a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm6 2a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              </div>
            </div>

            {/* Texto */}
            <div className="md:w-2/3 p-6 flex flex-col justify-center gap-2">
              <span className="text-xs font-bold uppercase text-white bg-red-600 px-2 py-1 rounded w-fit">
                {item.autor}
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 leading-snug hover:underline">
                {item.titulo}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{item.fecha}</span>
                <span>•</span>
                <span>Conagopare</span>
              </div>
              <p className="text-gray-700 text-sm">{item.descripcion}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Título intermedio + subtítulo */}
      <div className="text-center max-w-4xl mx-auto mt-12 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Descarga y Difunde: Comunicación para el Territorio
        </h2>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Material gráfico, videos y documentos para visibilizar las voces rurales.
          ¡Compártelo en tus redes, espacios comunitarios y medios locales!
        </p>
      </div>

      {/* Grilla de imágenes y videos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {elementos.map((item, index) => (
          <motion.div
            key={index}
            className={`relative ${item.color} p-6 text-white text-lg font-semibold flex items-center justify-center rounded-lg shadow-lg cursor-pointer`}
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

      {/* Modal emergente */}
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
