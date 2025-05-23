"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'
import { image } from 'framer-motion/client';

const data = [
  {
    title: 'Vialidad Rural',
    description: 'Visualiza el estado de las carreteras, cantidad de kilómetros por parroquia y cobertura vial en zonas rurales del país.',
    href: '/datos/vialidad-rural',
    image: '1.Vialidad.webp',
  },
  {
    title: 'Seguridad',
    description: 'Muestra estadísticas de homicidios intencionales, muertes por año, género y distribución por provincia.',
    href: '/datos/seguridad',
    image: '2.Seguridad.webp'
  },
  {
    title: 'Educación',
    description: 'Presenta datos sobre deserción escolar, segmentados por género, provincia y nivel educativo alcanzado.',
    href: '/datos/educacion',
    image: '3.Educación.webp',
  },
  {
    title: 'Egresos Hospitalarios',
    description: 'Registra salidas de hospitales con estado de salud, género y tipo de establecimiento de salud.',
    href: '/datos/egresos-hospitalarios',
    image: '4.Egresos-Hospitalarios.webp',
  },
  {
    title: 'Centros Médicos',
    description: 'Detalla la ubicación, tipo (público o privado) y cantidad de centros médicos por provincia y cantón.',
    href: '/datos/centros-medicos',
    image: '5.Centros-Médicos.webp',
  },
  {
    title: 'Servicios Básicos',
    description: 'Indica el acceso a servicios como agua potable, electricidad y saneamiento por parroquia y provincia.',
    href: '/datos/servicios-basicos',
    image: '6.Servicios-Básicos.webp',
  },
  {
    title: 'Desnutrición',
    description: 'Analiza la prevalencia de desnutrición infantil según género, área (urbana/rural), etnia y nivel socioeconómico.',
    href: '/datos/desnutricion',
    image: '7.Desnutrición.webp',
  },
  {
    title: 'Presupuesto',
    description: 'Muestra la asignación presupuestaria anual a GAD parroquiales, segmentada por provincia y año.',
    href: '/datos/presupuesto',
    image: '8.Presupuesto.webp',
  },
  {
    title: 'Internet y Conectividad',
    description: 'Expone el acceso a internet y telefonía por parroquia, proveedor, tipo de conexión y zona geográfica.',
    href: '/datos/internet-conectividad',
    image: '9.Internet-Conectividad.webp',
  },
  {
    title: 'Empleo',
    description: 'Ofrece indicadores de empleo y desempleo según género, etnia, nivel de estudios, quintil y provincia.',
    href: '/datos/empleo',
    image: '10.Empleo.webp',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function DatosRuralesPage() {
  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">Datos Rurales</h1>
      <p className="text-center text-lg max-w-3xl mx-auto mb-10">
        La sección "Datos Rurales" ofrece visualizaciones interactivas en Power BI que muestran información clave sobre las realidades de las parroquias rurales del Ecuador. A través de diez paneles temáticos, los usuarios pueden explorar datos oficiales sobre vialidad, salud, educación, seguridad, servicios básicos, conectividad, empleo y más, segmentados por provincia, cantón y parroquia.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {data.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="bg-gray-300 rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-between"
          >
            <div >
              <Image src={`/images/${item.image}`} alt={item.title} width={400} height={160} className="object-cover rounded-lg mb-4 mx-auto"/>
              <h2 className="text-xl font-semibold mb-2 text-center">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.description}</p>
            </div>
            <Link
              href={item.href}
              className=" w-[125px] text-center mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors"
            >
              Consultar
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
