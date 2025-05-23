"use client";

import { useState } from "react";

const videosMock = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  provincia: "Napo",
  canton: "Tena",
  parroquia: "Pano",
  thumbnail: "https://img.youtube.com/vi/VIDEO_ID/default.jpg", // reemplaza VIDEO_ID con el real
}));

export default function Entrevistas() {
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("");
  const [pagina, setPagina] = useState(1);

  const handleConsulta = () => {
    // Aquí va tu lógica para filtrar por provincia si conectas con la API
    console.log("Consultando entrevistas de", provinciaSeleccionada);
  };

  const handlePagina = (nuevaPagina: number) => {
    setPagina(nuevaPagina);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Entrevistas con Líderes Rurales
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Historias de quienes trabajan por el desarrollo de sus comunidades
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
        <label htmlFor="provincia" className="text-gray-700">
          Seleccione una provincia:
        </label>
        <select
          id="provincia"
          className="border rounded px-2 py-1"
          onChange={(e) => setProvinciaSeleccionada(e.target.value)}
        >
          <option>Provincia</option>
          <option value="Napo">Napo</option>
          <option value="Chimborazo">Chimborazo</option>
          {/* Agrega más provincias aquí */}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={handleConsulta}
        >
          Consultar
        </button>

      </div>

      <div className="text-left text-gray-800 mb-4">
        <strong>{videosMock.length} Videos</strong>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {videosMock.map((video) => (
          <div
            key={video.id}
            className="bg-gray-300 rounded overflow-hidden shadow"
          >
            <div className="aspect-video bg-gray-800 flex justify-center items-center">
              <img
                src="/images/youtube-play.png"
                alt="Video YouTube"
                className="h-12 w-16"
              />
            </div>
            <div className="p-2 text-sm text-gray-700 truncate">
              Provincia: {video.provincia} - Cantón: {video.canton} - Parroquia: {video.parroquia}
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4">
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={() => handlePagina(pagina - 1)}
          disabled={pagina === 1}
        >
          Anterior
        </button>
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{pagina}</span>
        <span>{pagina + 1}</span>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => handlePagina(pagina + 1)}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
