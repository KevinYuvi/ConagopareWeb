"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";

// Carga segura desde cliente (sin SSR)
const MapaLeaflet = dynamic(() => import("./ParroquializacionLeaflet"), {
  ssr: false,
});

// Hook para animar conteo
function useCountUp(target: number, duration: number = 1.5): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

const sections = [
  {
    title: "Identidad Rural",
    textBefore: "Identidad Rural es una iniciativa del ",
    highlightedText: "CONAGOPARE",
    textAfter:
      " que amplifica las voces de las parroquias rurales del Ecuador, visibilizando sus realidades y desafíos desde la perspectiva de sus propios actores.",
    link: "https://www.conagopare.gob.ec/",
    image: "/images/inicio/inicio2.jpeg",
  },
  {
    title: "Nuestro Objetivo",
    text: "Buscamos inspirar el compromiso y la acción conjunta entre diversos sectores de la sociedad para mejorar las condiciones de vida de la gente rural.",
    image: "/images/inicio/inicio3.jpeg",
  },
  {
    title: "Datos Rurales",
    text: "La información se obtuvo de 193 entrevistas realizadas por WhatsApp a presidentes y presidentas de los gobiernos parroquiales de Ecuador. Con ayuda de inteligencia artificial, transcribimos sus respuestas y, usando Python, analizamos los datos para visibilizar sus desafíos y oportunidades.",
    image: "/images/inicio/inicio4.jpeg",
  },
  {
    title: "¿Por qué lo hicimos?",
    text: "En Ecuador, 824 Gobiernos Parroquiales Rurales luchan por el bienestar de sus comunidades con recursos limitados y grandes desafíos. Esta plataforma busca visibilizar sus realidades y conectar a más actores para cerrar las brechas con la ruralidad.",
    image: "/images/inicio/inicio5.jpeg",
  },
  {
    type: "cta",
  },
];

export default function Sections() {
  const countMensajes = useCountUp(3514);
  const countHoras = useCountUp(1200);
  const countEntrevistas = useCountUp(193);
  const countMinutos = useCountUp(579);

  return (
    <>
      {sections.map((section, index) => {
        if (section.type === "cta") {
          return (
            <section key={index} className="flex flex-col md:flex-row w-full min-h-[600px] m-0 p-0">
              <div className="w-full md:w-1/2 h-[300px] md:h-auto relative">
                <Image
                  src="/images/inicio/periodismo1.png"
                  alt="Periodismo de Datos"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="w-full md:w-1/2 bg-[#F3E5AB] relative flex items-center justify-center px-6 py-10 md:px-20 md:py-20 text-[#2E2E2E]">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#8D6E6333_1px,_transparent_1px)] [background-size:18px_18px] opacity-20"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-xl"
                >
                  <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-extrabold text-[#33691E] leading-snug mb-3">
                    “Periodismo de datos
                  </h2>
                  <span className="bg-[#D67D3E] text-white text-[clamp(1rem,2vw,1.3rem)] font-semibold py-2 px-5 rounded-md mb-3 shadow-md inline-block">
                    y comunicación transmedia
                  </span>
                  <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-extrabold text-[#33691E] leading-snug mb-6">
                    para la acción social”
                  </h2>
                  <a
                    href="/Taller_Periodismo"
                    className="bg-[#4CAF50] hover:bg-[#388E3C] text-white font-bold py-3 px-6 rounded shadow-md hover:shadow-lg transition duration-300 text-lg"
                  >
                    Taller de Periodismo
                  </a>
                </motion.div>
              </div>
            </section>
          );
        }

        return (
          <motion.section
            key={index}
            role="region"
            aria-labelledby={`section-title-${index}`}
            className="relative overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {section.image && (
              <Image
                src={section.image}
                alt={`Imagen de fondo para ${section.title}`}
                fill
                className={`object-cover brightness-50 ${index === 0 ? "object-[center_10%]" : ""}`}
                priority={index === 0}
              />
            )}
            <div className="relative z-10 max-w-3xl px-6">
              <motion.h2
                id={`section-title-${index}`}
                className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-wide"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                whileHover={{
                  scale: 1.05,
                  textShadow: "0px 0px 10px rgba(255,255,255,0.8)",
                }}
              >
                {section.title}
              </motion.h2>
              <motion.p
                className="mt-4 text-lg md:text-xl text-gray-300"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {section.textBefore}
                {section.highlightedText && section.link ? (
                  <a
                    href={section.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-bold underline"
                  >
                    {section.highlightedText}
                  </a>
                ) : (
                  section.highlightedText
                )}
                {section.textAfter}
                {!section.textBefore && !section.textAfter && section.text}
              </motion.p>
            </div>
          </motion.section>
        );
      })}
    {/* Sección de estadísticas rurales */}
      <section className="bg-[#F5E5B8] py-16 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{
            icon: "💬",
            count: "3,514+",
            label: "Mensajes enviados por WhatsApp",
          }, {
            icon: "⏱️",
            count: "1.200+ horas",
            label: "Horas de trabajo comunitario",
          }, {
            icon: "📝",
            count: "193+",
            label: "Entrevistas transcritas",
          }, {
            icon: "🎥",
            count: "579+ min",
            label: "Minutos en video documental",
          }].map((item, index) => (
            <div
              key={index}
              className="bg-[#FFF8E1] border border-[#E0C97F] rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
              <p className="text-2xl font-bold text-[#3A4D39]">{item.count}</p>
              <p className="text-sm text-[#5C452D] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección para el mapa */}
      <section className="bg-white py-20">
        <div className="max-w-screen-lg mx-auto px-4">
          <MapaLeaflet />
        </div>
      </section>
    </>
  );
}
