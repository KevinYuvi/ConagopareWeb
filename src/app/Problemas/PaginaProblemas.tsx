"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import EcuadorSVG from './EcuadorSVG';
import { motion, AnimatePresence } from 'framer-motion';

const regionesMap: Record<string, string[]> = {
  Sierra: ["Carchi", "Imbabura", "Pichincha", "Cotopaxi", "Tungurahua", "Chimborazo", "Bolívar", "Cañar", "Azuay", "Loja"],
  Costa: ["Esmeraldas", "Manabí", "Guayas", "Santa Elena", "El Oro", "Los Ríos","Santo Domingo de los Tsáchilas"],
  Amazonía: ["Sucumbíos", "Napo", "Orellana", "Pastaza", "Morona Santiago", "Zamora Chinchipe"],
  Insular: ["Galápagos"]
};

type DatoResumen = {
  Provincia: string;
  Categoria: string;
};

type DatoFrase = {
  Provincia: string;
  Canton?: string;
  Parroquia?: string;
  Presidente?: string;
  Frase2?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const PaginaProblemas = () => {
  const [resumen, setResumen] = useState<DatoResumen[]>([]);
  const [frases, setFrases] = useState<DatoFrase[]>([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("Sierra");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("Azuay");
  const [fraseActual, setFraseActual] = useState<DatoFrase | null>(null);
  const [showFrase, setShowFrase] = useState(true);

  useEffect(() => {
    fetch('/archivo_resumen.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<DatoResumen>(sheet);
        setResumen(json);
      });

    fetch('/frases_categorizadas.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<DatoFrase>(sheet);
        setFrases(json);
      });
  }, []);

  useEffect(() => {
    cambiarFraseAleatoria();
  }, [provinciaSeleccionada, frases]);

  const cambiarFraseAleatoria = () => {
    const candidatas = frases.filter(f => f.Provincia?.trim().toLowerCase() === provinciaSeleccionada.trim().toLowerCase());
    if (candidatas.length > 0) {
      setShowFrase(false);
      setTimeout(() => {
        const aleatoria = candidatas[Math.floor(Math.random() * candidatas.length)];
        setFraseActual(aleatoria);
        setShowFrase(true);
      }, 200);
    } else {
      setFraseActual(null);
    }
  };

  const generarTop3PorProvincia = () => {
    const agrupado: Record<string, Record<string, number>> = {};
    resumen.forEach(({ Provincia, Categoria }) => {
      if (!agrupado[Provincia]) agrupado[Provincia] = {};
      agrupado[Provincia][Categoria] = (agrupado[Provincia][Categoria] || 0) + 1;
    });

    const resultado: Record<string, string[]> = {};
    Object.entries(agrupado).forEach(([provincia, categorias]) => {
      const top3 = Object.entries(categorias)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([cat]) => cat);
      resultado[provincia] = top3;
    });

    return resultado;
  };

  const generarGrafico = (
    filtroFn: (row: DatoResumen) => boolean,
    titulo: string,
    index: number
  ) => {
    const conteo: Record<string, number> = {};
    resumen.filter(filtroFn).forEach((row) => {
      const categoria = row.Categoria;
      if (categoria) {
        conteo[categoria] = (conteo[categoria] || 0) + 1;
      }
    });

    const topCategorias = Object.entries(conteo)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const data = {
      labels: topCategorias.map(item => item[0]),
      datasets: [{
        label: 'Total de menciones',
        data: topCategorias.map(item => item[1]),
        backgroundColor: ['#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f', '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ab'],
        borderRadius: 5,
      }]
    };

    const options = {
      indexAxis: 'y' as const,
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: {
        x: { ticks: { color: '#444' }, grid: { display: false } },
        y: { ticks: { color: '#444' }, grid: { display: false } }
      }
    };

    return (
      <motion.div className="bg-white p-6 rounded-lg shadow-md" custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
        <h3 className="text-xl font-semibold mb-4">{titulo}</h3>
        <Bar data={data} options={options} />
      </motion.div>
    );
  };

  const provinciasFiltradas = regionesMap[regionSeleccionada] || [];
  const dataTooltip = generarTop3PorProvincia();

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Problemas Rurales en el Ecuador</h1>

<div className="mapa-wrapper">
  <div className="mapa-container">
    <EcuadorSVG data={dataTooltip} />
  </div>
</div>


      {generarGrafico(() => true, "Problemas a Nivel Nacional", 0)}<br></br>

      <AnimatePresence mode="wait">
        {showFrase && fraseActual && (
          <motion.div
            key={fraseActual.Frase2}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-blue-50 p-6 rounded shadow text-center mb-10"
          >
            <p className="text-gray-700 text-sm uppercase tracking-wide font-bold">Autoridad Parroquial</p>
            <p className="text-2xl font-semibold text-gray-900">{fraseActual.Presidente}</p>
            <div className="border-l-4 border-blue-400 pl-4 mt-4 max-w-3xl mx-auto text-left">
              <p className="text-xl text-gray-700 italic leading-relaxed">“{fraseActual.Frase2}”</p>
            </div>
            <button onClick={cambiarFraseAleatoria} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded shadow transition">
              Cambiar frase aleatoria
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">🔍 Problemas por Región</h2>
          <select
            onChange={(e) => {
              setRegionSeleccionada(e.target.value);
              const primeraProvincia = regionesMap[e.target.value][0];
              setProvinciaSeleccionada(primeraProvincia);
            }}
            value={regionSeleccionada}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          >
            {Object.keys(regionesMap).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {generarGrafico(
            (row) => regionesMap[regionSeleccionada]?.includes(row.Provincia),
            `Problemas en la región ${regionSeleccionada}`,
            1
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">📍 Problemas por Provincia</h2>
          <select
            onChange={(e) => setProvinciaSeleccionada(e.target.value)}
            value={provinciaSeleccionada}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          >
            {provinciasFiltradas.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {generarGrafico(
            (row) => row.Provincia === provinciaSeleccionada,
            `Problemas en la provincia ${provinciaSeleccionada}`,
            2
          )}
        </div>
      </div>

      <p className="text-center mt-8 italic text-sm text-gray-600">
        Fuente: archivo_resumen.xlsx y frases_categorizadas.xlsx cargados dinámicamente.
      </p>
    </div>
  );
};

export default PaginaProblemas;
