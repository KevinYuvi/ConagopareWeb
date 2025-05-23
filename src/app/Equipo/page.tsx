"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaFacebook, FaXTwitter, FaInstagram } from "react-icons/fa6";

export default function EquipoPage() {
  const equipo = [
    { nombre: "Nombre Apellido", rol: "Coordinador General" },
    { nombre: "Nombre Apellido", rol: "Analista de Datos" },
    { nombre: "Nombre Apellido", rol: "Diseñador Gráfico" },
    { nombre: "Nombre Apellido", rol: "Investigador" },
  ];

  return (
    <div className="px-6 md:px-20 pt-28">
      {/* Sección de Equipo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Cuadros de integrantes */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {equipo.map((persona, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-6 flex flex-col items-center justify-between text-center"
            >
              <div className="w-24 h-24 border-4 border-blue-800 rounded-full overflow-hidden mb-4">
                <Image
                  src="/avatar-placeholder.png"
                  alt="Foto de perfil"
                  width={96}
                  height={96}
                />
              </div>
              <h3 className="text-lg font-semibold">{persona.nombre}</h3>
              <p className="text-sm text-gray-600">{persona.rol}</p>
              <div className="flex gap-3 mt-4 text-xl text-gray-600">
                <FaFacebook />
                <FaXTwitter />
                <FaInstagram />
              </div>
            </div>
          ))}
        </div>

        {/* Texto fijo a la derecha */}
        <div className="md:sticky md:top-28 h-fit">
          <h2 className="text-2xl font-bold mb-4">Nuestro Equipo</h2>
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
        <h2 className="text-2xl font-bold mb-2">Organizaciones y Apoyos</h2>
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
          {[1, 2, 3, 4].map((i) => (
            <SwiperSlide key={i}>
              <div className="bg-gray-200 h-40 flex items-center justify-center text-xl font-semibold rounded-md shadow-md">
                Logo {i}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
