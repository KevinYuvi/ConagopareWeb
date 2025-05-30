"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaXmark } from "react-icons/fa6";


// Definir el tipo para los elementos
type Elemento = {
    tipo: "imagen" | "video" | "texto" | "vaner";
    src: string;
    color: string;
  };

// Definir los elementos con imágenes y videos predefinidos
const elementos: Elemento[] = [
  { tipo: "imagen", src: "images/difunde/difunde1.webp", color: "bg-gray-700" },
  { tipo: "imagen", src: "images/difunde/difunde2.webp", color: "bg-green-600" },
  { tipo: "video", src: "images/difunde/difunde5.mp4", color: "bg-green-400" },
  { tipo: "texto", src: "/assets/difusion/texto1.png", color: "bg-gray-400" },
  { tipo: "texto", src: "/assets/difusion/texto2.png", color: "bg-blue-300" },
  { tipo: "imagen", src: "images/difunde/difunde4.webp", color: "bg-red-400" },
  { tipo: "imagen", src: "images/difunde/difunde3.webp", color: "bg-blue-400" },
  { tipo: "vaner", src: "/assets/difusion/vaner1.png", color: "bg-yellow-400" },
  { tipo: "video", src: "/assets/difusion/video2.mp4", color: "bg-blue-500" },
];

export default function Difunde() {
    // Tipamos el estado correctamente
    const [selectedItem, setSelectedItem] = useState<Elemento | null>(null);
  
    return (
      <div className="bg-gray-100 text-gray-900 py-26 px-6">
        <h2 className="text-center text-3xl font-bold mb-4">Material de Difusión</h2>
        <p className="text-center text-gray-600 mb-8">Explora, comparte y sé parte del cambio.</p>
  
        {/* Grid de elementos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {elementos.map((item, index) => (
            <motion.div
              key={index}
              className={`relative ${item.color} p-6 text-white text-lg font-semibold flex items-center justify-center rounded-lg shadow-lg cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedItem(item)}
            >
              {/* Mostrar imagen o video */}
              {item.tipo === "video" ? (
                <video src={item.src} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <img src={item.src} alt={item.tipo} className="w-full h-full object-cover rounded-lg" />
              )}
  
              {/* Ícono de descarga */}
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
                {/* Botón de cerrar */}
                <button
                  className="absolute top-2 right-2 text-gray-800 hover:text-red-500"
                  onClick={() => setSelectedItem(null)}
                >
                  <FaXmark size={24} />

                </button>
  
                {/* Contenido (imagen o video) */}
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