"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";

const buttonClasses = {
  green: "text-green-700 border-green-600 hover:bg-green-500/10",
  yellow: "text-yellow-700 border-yellow-600 hover:bg-yellow-500/10",
  blue: "text-blue-700 border-blue-600 hover:bg-blue-500/10",
  orange: "text-orange-700 border-orange-600 hover:bg-orange-500/10",
  red: "text-red-700 border-red-600 hover:bg-red-500/10",
};

const modulos = [
  {
    color: "green",
    number: 1,
    title: "Identidad, datos y territorio",
    desc:
      "¿Qué es la identidad rural? ¿Qué historias están siendo ignoradas en tu territorio? En este primer módulo te damos la bienvenida al periodismo de datos con enfoque comunitario. Aprenderás a usar herramientas como Google Sheets o Excel para comenzar a leer tu entorno con mirada analítica.",
    activities: [
      "Primer contacto con hojas de cálculo",
      "Identificación de indicadores",
      "Ejercicio con datos reales de Galápagos",
      "Redacción breve de hallazgos",
    ],
    extra: (
      <p className="mt-2 text-sm text-gray-600">
        Casos: {" "}
        <a
          href="https://tierraderesistentes.com"
          target="_blank"
          className="underline text-blue-600"
        >
          Tierra de Resistentes
        </a>
        , {" "}
        <a
          href="https://animalpolitico.com"
          target="_blank"
          className="underline text-blue-600"
        >
          El país de las dos mil fosas
        </a>
      </p>
    ),
    video: "https://www.youtube.com/embed/wT0PNgZgIXw",
    download: "/sources/módulo 1 - población rural Galápagos.xlsx",
  },
  {
    color: "yellow",
    number: 2,
    title: "Filtra, ordena y encuentra historias",
    desc:
      "Este módulo es clave para desarrollar tu mirada crítica. Conocerás cómo buscar, ordenar y filtrar datos para responder preguntas concretas sobre tu comunidad.",
    activities: [
      "Abrir CSV y corregir errores",
      "Filtros, orden y búsqueda",
      "Base nacional GAD parroquiales",
      "Limpieza de símbolos y codificaciones",
    ],
    extra: (
      <p className="mt-2 text-sm text-gray-600">
        Resultado: archivo limpio para análisis narrativo
      </p>
    ),
    video: "https://www.youtube.com/embed/LwsDfMAknQM",
    download:
      "/sources/módulo 2 - base de datos - presidentes gadpr por género 2023 - Hoja 1.csv",
  },
  {
    color: "blue",
    number: 3,
    title: "Datos abiertos y fórmulas que cuentan",
    desc:
      "Usa fuentes oficiales como el INEC para descargar datos y aplicar funciones básicas para responder preguntas locales.",
    activities: [
      "Filtrar por año/provincia",
      "Sumar estudiantes extranjeros",
      "Calcular estudiantes nacionales",
      "Porcentaje de docentes mujeres",
    ],
    extra: (
      <p className="mt-2 text-sm text-gray-600">
        Base de práctica: {" "}
        <a
          href="https://www.educacion.gob.ec"
          target="_blank"
          className="underline text-blue-600"
        >
          Registro del Ministerio de Educación
        </a>
      </p>
    ),
    video: "https://www.youtube.com/embed/MoJeesXe33k",
    download:
      "/sources/módulo 3 - registro-administrativo-historico_2009-2024-inicio.csv",
  },
  {
    color: "orange",
    number: 4,
    title: "Levanta tus datos y visualiza tu comunidad",
    desc:
      "Aprende a usar Google Forms y herramientas como Sheets o Datawrapper para recolectar, organizar y graficar tus propios datos.",
    activities: [
      "Formularios digitales",
      "Tabla por género y cantón",
      "Gráficos con Google Sheets",
      "Redacción basada en visualización",
    ],
    extra: (
      <p className="mt-2 text-sm text-gray-600">
        Difusión: infografías, WhatsApp, reels, carteleras
      </p>
    ),
    video: "https://www.youtube.com/embed/06Rp90yG-cw",
    download:
      "/sources/módulo 4 - base de datos - presidentes gadpr por género 2023 - Hoja 1.csv",
  },
  {
    color: "red",
    number: 5,
    title: "Historias con datos sobre desnutrición crónica infantil (DCI)",
    desc: (
      <span>
        Aplica todo lo aprendido para investigar sobre DCI usando el visor oficial {" "}
        <a
          href="https://informacion.infancia.gob.ec"
          target="_blank"
          className="underline text-blue-600"
        >
          informacion.infancia.gob.ec
        </a>{" "}
        y cuenta historias con datos reales.
      </span>
    ),
    activities: [
      "Análisis del Excel oficial de DCI",
      "Filtros por zona prioritaria",
      "Gráfico visual y redacción de historia",
    ],
    extra: (
      <p className="mt-2 text-sm text-gray-600">
        Tu historia puede ser difundida en medios aliados
      </p>
    ),
    video: "https://www.youtube.com/embed/q8NDE-t2AB4",
    download: "/sources/módulo 5 - DCI priorización territorial indicadores.xlsx",
  },
];

export default function TallerPeriodismoPage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="px-4 py-16 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
        Taller de Periodismo de Datos
      </h1>
      <p className="text-gray-600 text-lg text-center mb-16">
        Capacitamos a periodistas comunitarios para visibilizar las problemáticas
        de las parroquias rurales mediante el periodismo de datos.
      </p>

      <div className="grid gap-12">
        {modulos.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`border-l-8 border-${mod.color}-600 bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:shadow-2xl hover:scale-[1.015] hover:bg-${mod.color}-100/30`}
          >
            <div className="mb-4">
              <span className={`text-sm font-bold uppercase text-${mod.color}-600`}>
                Módulo {mod.number}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 leading-snug mt-1">
                {mod.title}
              </h2>
            </div>
            <p className="text-gray-700 mb-4">{mod.desc}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-800 mb-1">Actividades destacadas:</p>
                <ul className="text-gray-700 list-disc list-inside">
                  {mod.activities.map((act, j) => (
                    <li key={j}>{act}</li>
                  ))}
                </ul>
                {mod.extra}
                <div className="mt-4">
                  <a
                    href={mod.download}
                    download
                    className={`text-sm font-semibold bg-white px-5 py-2 rounded-lg border transition-all duration-300 ${buttonClasses[mod.color]}`}
                  >
                    Descargar Recurso
                  </a>
                </div>
              </div>
              <div>
                <iframe
                  className="w-full h-64 rounded-lg"
                  src={mod.video}
                  title={`Video ${mod.title}`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      

      {/* Evaluación final con botón mostrar/ocultar */}
      <div className="mt-20 text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          {showForm ? "Ocultar formulario" : "Evaluar el taller"}
        </button>

        {showForm && (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 mt-12">
              Evaluación final del taller
            </h2>
            <div className="w-full aspect-[4/3] max-w-3xl mx-auto">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScvKXAPZhNwaXX0kuyOToklYKzmIzZK8pceDu4yFjsWQiUE_g/viewform?embedded=true"
                width="100%"
                height="800"
                frameBorder="0"
                className="w-full rounded-xl border"
                allowFullScreen
                title="Formulario de evaluación"
              >
                Cargando…
              </iframe>
            </div>
          </>
        )}
      </div>


    </div>
  );
}
