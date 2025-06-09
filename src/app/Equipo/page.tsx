"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaLinkedin } from "react-icons/fa6";

export default function EquipoPage() {
  const equipo = [
    {
      nombre: "Sebastián Tamayo Villarroel",
      rol: `CEO Identidad Rural - Director Nacional de Comunicación CONAGOPARE
📍 Comunicador social, abogado y maestrante en Marketing Digital y Big Data.
🧭 Mentor de Identidad Rural, lidera la estrategia conceptual, política y metodológica del proyecto, articulando equipos interdisciplinarios. 
🧠 Sus líneas de estudio y acción incluyen participación ciudadana digital, comunicación transmedia, género y periodismo de datos.
"Creímos que escuchar al territorio con herramientas del presente era posible. Y lo hicimos."`,
      image: "Sebastian.webp",
      linkedin: "",
    },
    {
      nombre: "Jonathan Tiaguaro Benalcazar",
      rol: ` 📍 Ingeniero en Producción de Televisión y Multimedia. Máster en Gestión del Diseño.
 🎨 Creador del concepto gráfico y visual del proyecto, fusiona estética, narrativa y territorio para construir una identidad coherente y poderosa.
 🧠 Su enfoque combina diseño estratégico, comunicación visual y sensibilidad rural.
 "Transformar la voz del territorio en imagen fue un acto de respeto y creación colectiva."`,
      image: "Jonathan.webp",
      linkedin: "",
    },
    {
      nombre: "Cristhian Méndez Villegas",
      rol: `Estratega digital de Identidad Rural
📍 Tecnólogo en Diseño Gráfico.
📲 Aporta como Social Media Strategist, liderando la planificación y ejecución de la campaña digital del proyecto.
🧠 Su trabajo conecta la voz del territorio con audiencias amplias, mediante contenidos visuales potentes, mensajes claros y una narrativa coherente con la ruralidad contemporánea.
"Hicimos de cada publicación un puente entre el sentir rural y lo que se escucha en la red."
`,
      image: "Cristhian.webp",
      linkedin: "",
    },
    {
      nombre: "Duvard Esteban Cisneros",
      rol: `Desarrollador web - UI/UX en Identidad Rural
📍 Estudiante de Ingeniería en Sistemas de Información, Universidad Central del Ecuador.
🧭 Contribuyó al diseño y desarrollo de la plataforma web, definiendo su estructura, experiencia de usuario e interfaces en Figma y React.
🖥️ Su trabajo permite que los datos y voces del territorio sean accesibles a todo público a través de una interfaz intuitiva y coherente.
"El acceso a la información es el primer paso para transformar la realidad." — Kofi Annan`,
      image: "Duvard.webp",
      linkedin: "https://www.linkedin.com",
    },
    {
      nombre: "Marlon Tituaña",
      rol: "Apoyo logístico y comunicación institucional.",
      image: "Marlon.webp",
      linkedin: "https://www.linkedin.com",
    },
    {
      nombre: "Ariel Inguillay",
      rol: "Apoyo logístico y comunicación institucional.",
      image: "Ariel.webp",
      linkedin: "https://www.linkedin.com",
    },
    {
      nombre: "Kevin Yuvi",
      rol: "Soy  Estudiante de Ingeniería en Sistemas. Me enfoco en el desarrollo web y en construir soluciones que combinen funcionalidad, claridad y propósito.",
      image: "Kevin.webp",
      linkedin: "https://www.linkedin.com/in/kevin-yuvi-657b63334",
    },
  ];

  const images = [
    { src: "1.logo.webp", title: "Conacopare Nacional" },
    { src: "2.logo.webp", title: "Universidad Central del Ecuador" },
    { src: "3.logo", title: "logo 3" },
    { src: "4.logo", title: "logo 4" },
  ];

  return (
    <div className="px-6 md:px-20 pt-10">
      {/* Título y texto principal */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-heading font-bold mb-4">Nuestro Equipo</h2>
        <p className="text-gray-700 text-lg">
          En CONAGOPARE, estamos comprometidos con visibilizar las realidades
          rurales y promover el desarrollo de sus comunidades. A través de la
          investigación, el periodismo de datos y la comunicación transmedia,
          trabajamos para dar voz a quienes más lo necesitan y generar un
          impacto positivo y sostenible.
        </p>
      </div>

      {/* Swiper de integrantes */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        loop={false}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
        className="mb-24"
      >
        {equipo.map((persona, index) => (
          <SwiperSlide key={index}>
  <div className="bg-white shadow-lg rounded-lg flex flex-col justify-between text-center border border-gray-200 hover:scale-105 transition-transform duration-300 h-full overflow-hidden">

    {/* Imagen en forma de header */}
    <div className="relative w-full h-48 mb-4">
      <Image
        src={`/images/equipo/${persona.image}`}
        alt={`Foto de ${persona.nombre}`}
        fill
        className="object-cover"
      />
    </div>

    <div className="px-6 pb-6 flex flex-col flex-grow justify-between">
      <h3 className="text-lg font-semibold mb-2">{persona.nombre}</h3>
      <p className="text-sm text-gray-700 whitespace-pre-line flex-grow">{persona.rol}</p>

      {persona.linkedin && (
        <div className="flex justify-center gap-3 mt-4 text-xl text-gray-600">
          <a
            href={persona.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="hover:text-blue-700" />
          </a>
        </div>
      )}
    </div>
  </div>
</SwiperSlide>
        ))}
      </Swiper>

      {/* Sección de Apoyos */}
      <section className="mt-24 text-center">
        <h2 className="text-2xl font-heading font-bold mb-2">
          Organizaciones y Apoyos
        </h2>
        <p className="text-gray-600 mb-6">
          Gracias al apoyo de diversas organizaciones, este proyecto es
          posible.
        </p>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
        >
          {images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
<div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200 mb-6">
  <Image
    src={`/images/logos/${imgSrc.src}`}
    alt={imgSrc.title}
    fill
    className="object-contain p-4"
  />
</div>

            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
