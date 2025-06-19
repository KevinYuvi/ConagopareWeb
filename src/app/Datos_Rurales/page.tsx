"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'


const data = [
  {
    title: 'Vialidad',
    description: 'Visualiza el estado de las carreteras, cantidad de kilómetros por parroquia y cobertura vial en zonas rurales del país.',
    href: '/Datos/Vialidad',
    image: '1.Vialidad.webp',
  },
  {
    title: 'Seguridad',
    description: 'Muestra estadísticas de homicidios intencionales, muertes por año, género y distribución por provincia.',
    href: '/Datos/Seguridad',
    image: '2.Seguridad.webp'
  },
  {
    title: 'Educación',
    description: 'Presenta datos sobre deserción escolar, segmentados por género, provincia y nivel educativo alcanzado.',
    href: '/Datos/Educacion',
    image: '3.Educación.webp',
  },
  {
    title: 'Egresos Hospitalarios',
    description: 'Registra salidas de hospitales con estado de salud, género y tipo de establecimiento de salud.',
    href: '/Datos/Egresos_Hospitalarios',
    image: '4.Egresos-Hospitalarios.webp',
  },
  {
    title: 'Centros Médicos',
    description: 'Detalla la ubicación, tipo (público o privado) y cantidad de centros médicos por provincia y cantón.',
    href: '/Datos/Centros_Medicos',
    image: '5.Centros-Médicos.webp',
  },
  {
    title: 'Servicios Básicos',
    description: 'Indica el acceso a servicios como agua potable, electricidad y saneamiento por parroquia y provincia.',
    href: '/Datos/Servicios_Basicos',
    image: '6.Servicios-Básicos.webp',
  },
  {
    title: 'Desnutrición Crónica Infantil',
    description: 'Visita y consulta el SUUSEN, Sistema Unificado y Universal de Seguimiento Nominal, para conocer datos de tu territorio sobre DCI.',
    href: 'https://informacion.infancia.gob.ec/',
    image: '7.Desnutrición.webp',
  },
  {
    title: 'Presupuesto Parroquial 2025',
    description: 'Muestra la asignación presupuestaria anual a GAD parroquiales, segmentada por provincia y año.',
    href: '/Datos/Presupuesto',
    image: '8.Presupuesto.webp',
  },
  {
    title: 'Internet y Conectividad',
    description: 'Expone el acceso a internet y telefonía por parroquia, proveedor, tipo de conexión y zona geográfica.',
    href: '/Datos/Conectividad',
    image: '9.Internet-Conectividad.webp',
  },
  {
    title: 'Tasa de Empleo y Desempleo',
    description: 'Ofrece indicadores de empleo y desempleo según género, etnia, nivel de estudios, quintil y provincia.',
    href: '/Datos/Empleo',
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
    <div className="p-4 max-w-7xl mx-auto flex flex-col items-center justify-between gap-4">
      <h1 className="text-3xl font-heading text-center">Datos Rurales</h1>
      <p className="text-center max-w-4xl mx-auto px-4">
        La sección Datos Rurales presenta visualizaciones interactivas desarrolladas en Power BI, que permiten explorar información clave sobre las realidades de las parroquias rurales del Ecuador. A través de diez paneles temáticos, los usuarios pueden consultar datos oficiales sobre vialidad, salud, educación, seguridad, servicios básicos, conectividad, empleo, entre otros, con posibilidad de filtrarlos por provincia, cantón y parroquia.
      </p>
      <p className="text-center max-w-4xl mx-auto px-4">
        Los indicadores provienen de fuentes de datos abiertos y de la información recopilada por CONAGOPARE Nacional. Los temas abordados fueron seleccionados en función de las principales problemáticas identificadas en nuestra investigación de campo, con el objetivo de visibilizar las brechas y oportunidades del territorio rural.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-5 text-center">
        {data.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeUp}

            className="bg-gray-200 rounded-2xl p-8 flex flex-col items-center justify-between gap-6 hover:shadow-[0_0_10px_2px_rgba(43,100,255,0.3)] transition-shadow duration-300 "
          >
            <div className="flex flex-col items-center justify-between gap-6">
              <Image src={`/images/datos_rurales/${item.image}`} alt={item.title} width={400} height={160} className="object-cover rounded-2xl mx-auto" />
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-all bg-[#224e99] text-white px-4 py-2 text-sm rounded-lg border-[#11336d]  border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:opacity-50">


              Consultar
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
