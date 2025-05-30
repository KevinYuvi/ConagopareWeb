"use client";

import { useState, useMemo, useEffect, FormEvent } from "react";
import { videosMock, Video } from "@/data/videosMock";

const VIDEOS_POR_PAGINA = 6;

export default function Entrevistas() {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [pagina, setPagina] = useState(1);
  const [filtrar, setFiltrar] = useState(false);
  const [videosAleatorios, setVideosAleatorios] = useState<Video[]>([]);

  const cantonesDisponibles = useMemo(() => {
    return [...new Set(videosMock.filter(v => v.provincia === provincia).map(v => v.canton))];
  }, [provincia]);

  const parroquiasDisponibles = useMemo(() => {
    return [...new Set(videosMock.filter(v => v.provincia === provincia && v.canton === canton).map(v => v.parroquia))];
  }, [provincia, canton]);

  useEffect(() => {
    const copia = [...videosMock];
    const aleatorios = copia.sort(() => 0.5 - Math.random()).slice(0, VIDEOS_POR_PAGINA);
    setVideosAleatorios(aleatorios);
  }, []);

  const resultadosFiltrados = useMemo(() => {
    if (!filtrar) return videosAleatorios;

    return videosMock.filter((v) => {
      const coincideProvincia = !provincia || v.provincia === provincia;
      const coincideCanton = !canton || v.canton === canton;
      const coincideParroquia = !parroquia || v.parroquia === parroquia;
      return coincideProvincia && coincideCanton && coincideParroquia;
    });
  }, [filtrar, provincia, canton, parroquia, videosAleatorios]);

  const totalPaginas = Math.ceil(resultadosFiltrados.length / VIDEOS_POR_PAGINA);

  const videosPagina = useMemo(() => {
    const inicio = (pagina - 1) * VIDEOS_POR_PAGINA;
    return resultadosFiltrados.slice(inicio, inicio + VIDEOS_POR_PAGINA);
  }, [pagina, resultadosFiltrados]);

  const aplicarFiltros = () => {
    setFiltrar(true);
    setPagina(1);
  };

  const quitarSelecciones = () => {
    setProvincia("");
    setCanton("");
    setParroquia("");
    setFiltrar(false);
    setPagina(1);
  };

  const manejarEnvio = (e: FormEvent) => {
    e.preventDefault();
    aplicarFiltros();
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Entrevistas con Líderes Rurales
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        Historias de quienes trabajan por el desarrollo de sus comunidades
      </p>

      {/* Formulario de filtros */}
      <form onSubmit={manejarEnvio} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <select className="border px-2 py-1 rounded" value={provincia} onChange={(e) => setProvincia(e.target.value)}>
          <option value="">Provincia</option>
          {[...new Set(videosMock.map(v => v.provincia))].map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select className="border px-2 py-1 rounded" value={canton} onChange={(e) => setCanton(e.target.value)} disabled={!provincia}>
          <option value="">Cantón</option>
          {cantonesDisponibles.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select className="border px-2 py-1 rounded" value={parroquia} onChange={(e) => setParroquia(e.target.value)} disabled={!canton}>
          <option value="">Parroquia</option>
          {parroquiasDisponibles.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Buscar
        </button>

        <button
          type="button"
          onClick={quitarSelecciones}
          className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
        >
          Quitar Selecciones
        </button>
      </form>

      {/* Resultados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {videosPagina.map((video) => (
          <div key={video.id} className="bg-white rounded shadow overflow-hidden">
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.titulo || "Video"}
              allowFullScreen
            ></iframe>
            <div className="p-3 text-sm text-gray-700">
              <strong>{video.titulo}</strong><br />
              {video.provincia} - {video.canton} - {video.parroquia}
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {resultadosFiltrados.length > 0 && (
        <div className="flex justify-center items-center gap-4">
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPagina((p) => Math.max(p - 1, 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span className="text-gray-800">Página {pagina} de {totalPaginas}</span>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPagina((p) => Math.min(p + 1, totalPaginas))}
            disabled={pagina === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}
