"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import EcuadorSVG from './EcuadorSVG';
import { motion } from 'framer-motion';

const regionesMap: Record<string, string[]> = {
  Sierra: ["Carchi", "Imbabura", "Pichincha", "Cotopaxi", "Tungurahua", "Chimborazo", "Bolívar", "Cañar", "Azuay", "Loja"],
  Costa: ["Esmeraldas", "Manabí", "Guayas", "Santa Elena", "El Oro", "Los Ríos"],
  Amazonía: ["Sucumbíos", "Napo", "Orellana", "Pastaza", "Morona Santiago", "Zamora Chinchipe"],
  Insular: ["Galápagos"]
};

type Dato = {
  Provincia: string;
  Categoria: string;
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
  const [datos, setDatos] = useState<Dato[]>([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("Sierra");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("Azuay");

  useEffect(() => {
    fetch('/archivo_resumen.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<Dato>(sheet);
        setDatos(json);
      });
  }, []);

  const generarTop3PorProvincia = () => {
    const agrupado: Record<string, Record<string, number>> = {};

    datos.forEach(({ Provincia, Categoria }) => {
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
    filtroFn: (row: Dato) => boolean,
    titulo: string,
    index: number
  ) => {
    const conteo: Record<string, number> = {};
    datos.filter(filtroFn).forEach((row) => {
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
        backgroundColor: [
          '#4e79a7', '#f28e2b', '#e15759', '#76b7b2', '#59a14f',
          '#edc948', '#b07aa1', '#ff9da7', '#9c755f', '#bab0ab'
        ],
        borderRadius: 5,
      }]
    };

    const options = {
      indexAxis: 'y' as const,
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: { ticks: { color: '#444' }, grid: { display: false } },
        y: { ticks: { color: '#444' }, grid: { display: false } }
      }
    };

    return (
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <h3 className="text-xl font-semibold mb-4">{titulo}</h3>
        <Bar data={data} options={options} />
      </motion.div>
    );
  };

  const todasProvincias = [...new Set(datos.map(d => d.Provincia))].sort();
  const dataTooltip = generarTop3PorProvincia();

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Problemas Rurales en el Ecuador</h1>

      <div className="mb-12 flex justify-center px-2">
        <div className="w-full max-w-[500px]">
          <EcuadorSVG data={dataTooltip} />
        </div>
      </div>


      {generarGrafico(() => true, "Problemas a Nivel Nacional", 0)}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">🔍 Problemas por Región</h2>
          <select
            onChange={(e) => setRegionSeleccionada(e.target.value)}
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
            {todasProvincias.map((p) => (
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
        Fuente: archivo_resumen.xlsx cargado dinámicamente.
      </p>
    </div>
  );
};

export default PaginaProblemas;
