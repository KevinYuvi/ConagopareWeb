"use client";

import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Carga segura desde cliente (sin SSR)
const MapaLeaflet = dynamic(() => import("./ParroquializacionLeaflet"), {
  ssr: false,
});

// Easing para conteo animado
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

// Hook para conteo suave
function useCountUp(target: number, duration: number = 1.5): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
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
  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  const countMensajes = useCountUp(isInView ? 3514 : 0);
  const countHoras = useCountUp(isInView ? 1200 : 0);
  const countEntrevistas = useCountUp(isInView ? 193 : 0);
  const countMinutos = useCountUp(isInView ? 579 : 0);

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setShowMap(true);
  }, []);

  return (
    <>
     {sections.map((section, index) => {
  if (section.type === "cta") {
  return (
    <motion.section
    key={index}
    className="relative w-full min-h-[500px] md:h-[80vh] overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    {/* Fondo */}
    <Image
      src="/images/inicio/periodismo3.png"
      alt="Fondo Periodismo"
      fill
      className="object-cover object-center"
      priority
    />

    {/* Logo */}
    <div className="absolute top-[0%] md:top-[-12%] right-[5%] w-[280px] md:w-[660px] z-10">
      <Image
        src="/images/inicio/periodismo1.webp"
        alt="Logo Periodismo"
        width={800}
        height={600}
        className="w-full h-auto object-contain drop-shadow-lg"
        priority
      />
    </div>

    {/* Botón */}
    <div className="absolute top-[75%] md:top-[85%] right-[5%] md:right-[7%] z-10">
      <a
        href="/Taller_Periodismo"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-[#43a047] to-[#66bb6a] hover:from-[#388e3c] hover:to-[#4caf50] text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553 2.276A1.5 1.5 0 0120 13.618v.764a1.5 1.5 0 01-.447 1.342L15 18M4 6h16M4 6v12"
          />
        </svg>
        Periodismo de Datos
      </a>
    </div>
  </motion.section>

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

      {/* Sección de estadísticas rurales con conteo suave */}
      <section ref={statsRef} className="bg-[#F5E5B8] py-16 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "💬", count: countMensajes, suffix: "+", label: "Mensajes enviados por WhatsApp" },
            { icon: "⏱️", count: countHoras, suffix: "+ horas", label: "Horas de trabajo comunitario" },
            { icon: "📝", count: countEntrevistas, suffix: "+", label: "Entrevistas transcritas" },
            { icon: "🎥", count: countMinutos, suffix: "+ min", label: "Minutos en video documental" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-[#FFF8E1] border border-[#E0C97F] rounded-2xl shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col items-center"
            >
              <div className="text-4xl md:text-5xl mb-4">{item.icon}</div>
              <p className="text-2xl font-bold text-[#3A4D39]">
                {item.count}
                {item.suffix}
              </p>
              <p className="text-sm text-[#5C452D] mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sección del mapa protegida */}
      {typeof window !== "undefined" && showMap && (
  <section className="bg-white py-20">
    <div className="max-w-screen-lg mx-auto px-4">
      <MapaLeaflet />
    </div>
  </section>
      )}
    </>
  );
}