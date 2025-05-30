"use client";

import React from "react";

export default function TallerPeriodismoPage() {
  return (
    <div className="px-4 py-16 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Taller de Periodismo de Datos
      </h1>
      <p className="text-gray-600 text-lg mb-16">
        Capacitamos a periodistas comunitarios para visibilizar las problemáticas
        de las parroquias rurales mediante el periodismo de datos.
      </p>

      <div className="grid gap-8 text-left max-w-3xl mx-auto">
        {/* Introducción */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">1. Introducción al Taller</h2>
          <p className="text-gray-700 mt-2">
            Este módulo presenta el objetivo general del taller, los públicos a quienes está dirigido y una guía rápida sobre cómo navegar los módulos y utilizar los recursos. Está diseñado para brindar una visión clara del valor del periodismo de datos en contextos rurales.
          </p>
        </section>

        {/* Módulo 1 */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">Módulo 1: Introducción al Periodismo de Datos</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Video: "¿Qué es el periodismo de datos?" (https://youtube.com/video1)</li>
            <li>Texto: Historia, principios y ejemplos locales del uso de datos en medios comunitarios.</li>
            <li>Descargable: PDF con glosario de términos clave y bibliografía introductoria.</li>
          </ul>
        </section>

        {/* Módulo 2 */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">Módulo 2: Búsqueda y verificación de datos abiertos</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Video: "Cómo encontrar y validar datos públicos en Ecuador" (https://youtube.com/video2)</li>
            <li>Texto: Repositorios confiables, fuentes oficiales y herramientas de verificación.</li>
            <li>Descargable: Guía paso a paso para explorar datos en el portal del INEC y CPCCS.</li>
          </ul>
        </section>

        {/* Módulo 3 */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">Módulo 3: Limpieza y análisis básico de datos</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Video: "Uso de Excel y herramientas gratuitas para limpiar datos" (https://youtube.com/video3)</li>
            <li>Texto: Cómo preparar datasets para visualización y análisis.</li>
            <li>Descargable: Dataset de prueba y plantilla en Excel con instrucciones.</li>
          </ul>
        </section>

        {/* Módulo 4 */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">Módulo 4: Visualización de datos y narrativas</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Video: "Herramientas gratuitas para crear gráficos" (https://youtube.com/video4)</li>
            <li>Texto: Cómo contar una historia con datos desde lo local.</li>
            <li>Descargable: Plantilla Canva y recursos visuales para comunicar hallazgos.</li>
          </ul>
        </section>

        {/* Módulo 5 */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">Módulo 5: Publicación y difusión comunitaria</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Video: "Cómo publicar reportajes en medios comunitarios y redes" (https://youtube.com/video5)</li>
            <li>Texto: Consejos para lograr impacto y participación.</li>
            <li>Descargable: Kit de difusión con ejemplos de notas y artes visuales.</li>
          </ul>
        </section>

        {/* Tarea Final */}
        <section className="border-l-4 border-red-500 pl-4">
          <h2 className="text-xl font-semibold text-red-600">Tarea Final</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Quiz de autoevaluación con preguntas clave de los 5 módulos.</li>
            <li>Espacio para cargar un reportaje final en PDF o DOCX que combine datos, análisis y narración local.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
