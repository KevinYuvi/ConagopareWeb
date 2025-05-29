"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[100vh] -mt-16 flex flex-col justify-center items-center text-center text-white overflow-hidden">


      <img
        src="/images/inicio/inicio1.jpeg"
        alt="Paisaje Rural"
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] brightness-75"
      />

      <div className="relative z-10">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          src="images/inicio/Logo2.webp" 
          alt="Logo Identidad Rural"
          className="h-32 md:h-40 lg:h-48 mx-auto"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-4 text-lg"
        >
          {/* Puedes poner aquí un subtítulo o dejarlo vacío */}
        </motion.p>
      </div>
    </section>
  );
}
