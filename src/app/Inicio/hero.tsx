"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[100vh] -mt-16 flex flex-col justify-center items-center text-center text-white overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="/images/inicio/inicio1.jpeg"
        alt="Paisaje Rural"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] brightness-75"
      />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Identidad Rural */}
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          src="/images/inicio/Logo2.webp"
          alt="Logo Identidad Rural"
          className="h-auto w-[250px] md:w-[320px] lg:w-[400px] mx-auto"
        />

        {/* Logo Conagopare debajo */}
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          src="/images/inicio/logo-conagopare.webp"
          alt="Logo Conagopare"
          className=" h-auto w-[180px] md:w-[220px] lg:w-[260px] "
        />
      </div>
    </section>
  );
}
