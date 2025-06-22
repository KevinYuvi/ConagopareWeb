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
      rol: "🏅 CEO Identidad Rural",
      descripcion: `⭐ Director Nacional de Comunicación CONAGOPARE. Comunicador social, abogado y maestrante en Marketing Digital y Big Data.
      🧠 Mentor de Identidad Rural, lidera la estrategia conceptual, política y metodológica del proyecto, articulando equipos interdisciplinarios.
      ✨ Sus líneas de estudio y acción incluyen participación ciudadana digital, comunicación transmedia, género y periodismo de datos.

      💬 "Creímos que escuchar al territorio con herramientas del presente era posible. Y lo hicimos."`,
      imagen: "Sebastian.webp",
      redSocial: "",
    },
    {
      nombre: "Jonathan Tiaguaro Benalcazar",
      rol: "🎨 Director de Diseño",
      descripcion: `⭐ Ingeniero en Producción de Televisión y Multimedia. Máster en Gestión del Diseño.
      🧠 Creador del concepto gráfico y visual del proyecto, fusiona estética, narrativa y territorio para construir una identidad coherente y poderosa.
      ✨ Su enfoque combina diseño estratégico, comunicación visual y sensibilidad rural.
      
      💬 "Transformar la voz del territorio en imagen fue un acto de respeto y creación colectiva."`,
      imagen: "Jonathan.webp",
      redSocial: "",
    },
    {
      nombre: "Cristhian Méndez Villegas",
      rol: "🗣️ Estratega Digital",
      descripcion: `⭐ Tecnólogo en Diseño Gráfico. Social Media Strategist, liderando la planificación y ejecución de la campaña digital del proyecto.
      🧠 Su trabajo conecta la voz del territorio con audiencias amplias, mediante contenidos visuales potentes, mensajes claros y una narrativa coherente con la ruralidad contemporánea.
      
      💬 "Hicimos de cada publicación un puente entre el sentir rural y lo que se escucha en la red."`,
      imagen: "Cristhian.webp",
      redSocial: "",
    },
    {
      nombre: "Duvard Esteban Cisneros",
      rol: "🛠️ Desarrollador Web",
      descripcion: `⭐ Estudiante de Ingeniería en Sistemas de Información, Universidad Central del Ecuador. Contribuidor al diseño y desarrollo de la plataforma web, definiendo su estructura, experiencia de usuario e interfaces en Figma y React.
      🧠 Su trabajo permite que los datos y voces del territorio sean accesibles a todo público a través de una interfaz intuitiva y coherente.
      
      💬 "El acceso a la información es el primer paso para transformar la realidad." — Kofi Annan`,
      imagen: "Duvard.webp",
      redSocial: "https://www.linkedin.com/in/duvard-cisneros-9a073323b",
    },
    {
      nombre: "Marlon Tituaña",
      rol: "🛠️ Desarrollador Web",
      descripcion: `🎓 Estudiante de Ingeniería en Sistemas de Información en la Universidad Central del Ecuador. Participó en el desarrollo integral de la plataforma web, implementando funcionalidades clave tanto en el frontend como en el backend.
      🧩 Su trabajo contribuyó a que los mensajes y testimonios del territorio sean transmitidos de forma clara y comprensible. 
      
      💬 "El software es una gran combinación entre arte e ingeniería." — Bill Gates`,

      imagen: "Marlon.webp",
      redSocial: "https://www.linkedin.com/in/marlon-castillo-1770a5370",
    },
    {
      nombre: "Ariel Inguillay",
      rol: "🛠️ Desarrollador Web",
      descripcion: `💻 Estudiante de Ingeniería en Sistemas de Información en la Universidad Central del Ecuador. Desarrolló desde cero las páginas “Difunde” y “Entrevistas” de Identidad Rural, integrando diseño y funcionalidad en frontend y backend.

🌍 Su aporte permitió visibilizar las voces rurales mediante soluciones accesibles y significativas.

✨ "La tecnología es mejor cuando conecta a las personas." — Matt Mullenweg`,
      imagen: "Ariel.webp",
      redSocial: "https://www.linkedin.com/in/ariel-inguillay-531063198",
    },
    {
      nombre: "Kevin Yuvi",
      rol: "🛠️ Desarrollador Web",
      descripcion: `⭐ Estudiante de Ingeniería en Sistemas de Información, Universidad Central del Ecuador. Especializado en análisis y visualización de datos mediante Power BI, con enfoque en datos abiertos.
      🧠 Su trabajo facilita la toma de decisiones y promueve la transparencia, convirtiendo grandes volúmenes de datos abiertos en conocimiento útil para la ciudadanía,
      💬 "La información es el petróleo del siglo XXI, y el análisis de datos es el motor de combustión." — Peter Sondergaard`,
      imagen: "Kevin.webp",
      redSocial: "https://www.linkedin.com/in/kevin-yuvi-657b63334",
    },
  ];


  const images = [
    { src: "1.logo.webp", title: "Conagopare Nacional" },
    { src: "2.logo.webp", title: "Universidad Central del Ecuador" },
    { src: "3.logo.webp", title: "logo 3" },
  ];

  return (
    <div className="p-6 md:px-20">
      {/* Título y texto principal */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-heading mb-4">Nuestro Equipo</h2>
        <p>
          En CONAGOPARE, estamos comprometidos con visibilizar las realidades
          rurales y promover el desarrollo de sus comunidades. A través de la
          investigación, el periodismo de datos y la comunicación transmedia,
          trabajamos para dar voz a quienes más lo necesitan y generar un
          impacto positivo y sostenible.
        </p>
      </div>

      {/* Swiper de integrantes */}
      <Swiper
        spaceBetween={25}
        slidesPerView={1}
        navigation={true}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
      >
        {equipo.map((persona, index) => (
          <SwiperSlide key={index} className="p-5">
            <div className="rounded-lg flex flex-col justify-between text-center hover:scale-105 transition-transform duration-300 gap-5">

              {/* Imagen en forma de header */}
              <div className="relative w-full aspect-square">
                <Image
                  src={`/images/equipo/${persona.imagen}`}
                  alt={`Foto de ${persona.nombre}`}
                  fill
                  className="object-cover rounded-4xl"
                />
              </div>

              <div className="relative bg-gradient-to-br from-blue-700/5 to-blue-800/10 backdrop-blur-md rounded-3xl p-6 flex flex-col flex-grow justify-between gap-5">
                <h3 className="text-xl font-semibold">{persona.nombre}</h3>
                <p className="flex-grow">{persona.rol}</p>
                <p className="whitespace-pre-line  text-left flex-grow">
                  {persona.descripcion}
                </p>
                {persona.redSocial && (
                  <div className="flex justify-center text-3xl">
                    <a
                      href={persona.redSocial}
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
      <section className="text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">
          Organizaciones y Apoyos
        </h2>
        <p>
          Gracias al apoyo de diversas organizaciones, este proyecto es
          posible.
        </p>

        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Autoplay]}
          className="my-6 mx-auto max-w-6xl"
        >
          {images.map((imgSrc, index) => (
            <SwiperSlide key={index}>
              <div className="relative aspect-[16/9] h-40 flex items-center justify-center hover:scale-105 transition-transform duration-300 ">
                <Image
                  src={`/images/logos/${imgSrc.src}`}
                  alt={imgSrc.title}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
