"use client";


import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaLinkedin } from "react-icons/fa6";

export default function EquipoPage() {
  const equipo = [
    { nombre: "Duvard Cisneros", rol: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu velit ut sapien facilisis sollicitudin. Sed porttitor est non fermentum.", image: "avatar1.jpg" },
    { nombre: "Ariel Inguillay", rol: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu velit ut sapien facilisis sollicitudin. Sed porttitor est non fermentum.", image: "avatar1.jpg" },
    { nombre: "Marlon Tituaña", rol: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu velit ut sapien facilisis sollicitudin. Sed porttitor est non fermentum.", image: "avatar1.jpg" },
    { nombre: "Kevin Yuvi", rol: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu velit ut sapien facilisis sollicitudin. Sed porttitor est non fermentum.", image: "avatar1.jpg" },
  ];

  const images = [
  { src: '1.logo.webp', title: 'Conacopare Nacional' },
  { src: '2.logo.webp', title: 'Universidad Central del Ecuador' },
  { src: '3.logo', title: 'logo 3' },
  { src: '4.logo', title: 'logo 4' },
];


  return (
    <div className="px-6 md:px-20 pt-10">
      {/* Sección de Equipo */}
      <div className=" grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Cuadros de integrantes */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {equipo.map((persona, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg  p-6 flex flex-col items-center justify-between text-center "
            >
              <div className="w-24 h-24 border-4 border-blue-500 rounded-full overflow-hidden mb-4">
                <Image
                  src={`/images/equipo/${persona.image}`}
                  alt="Foto de perfil"
                  width={96}
                  height={96}
                />
              </div>
              <h3 className="text-lg font-semibold">{persona.nombre}</h3>
              <p className="text-sm  p-5 text-gray-600">{persona.rol}</p>
              <div className="flex gap-3 mt-4 text-xl text-gray-600">
                <FaLinkedin className="hover:text-blue-700"/>
              </div>
            </div>
          ))}
        </div>

        {/* Texto fijo a la derecha */}
        <div className="md:sticky md:top-28 h-fit md:col-span-2 pl-10 pr-10">
          <h2 className="text-2xl font-heading font-bold mb-4">Nuestro Equipo</h2>
          <p className="text-gray-700">
            En CONAGOPARE, estamos comprometidos con visibilizar las realidades rurales
            y promover el desarrollo de sus comunidades. A través de la investigación, el
            periodismo de datos y la comunicación transmedia, trabajamos para dar voz a
            quienes más lo necesitan y generar un impacto positivo y sostenible.
          </p>
        </div>
      </div>

      {/* Sección de Apoyos */}
      <section className="mt-24 text-center">
        <h2 className="text-2xl font-heading font-bold mb-2">Organizaciones y Apoyos</h2>
        <p className="text-gray-600 mb-6">
          Gracias al apoyo de diversas organizaciones, este proyecto es posible.
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
              <div className="relative bg-gray-200 aspect-[16/9]  h-40 rounded-md  mb-15">
                <Image
                  src={`/images/logos/${imgSrc.src}`} 
                  alt={imgSrc.title}
                  fill
                    className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}