"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import EcuadorSVG from './EcuadorSVG';

type Region = 'Sierra' | 'Costa' | 'Amazonía' | 'Insular';

interface FilaExcel {
  Provincia: string;
  Categoria: string;
}

const regionesMap: Record<Region, string[]> = {
  Sierra: ["Carchi", "Imbabura", "Pichincha", "Cotopaxi", "Tungurahua", "Chimborazo", "Bolívar", "Cañar", "Azuay", "Loja"],
  Costa: ["Esmeraldas", "Manabí", "Guayas", "Santa Elena", "El Oro", "Los Ríos"],
  Amazonía: ["Sucumbíos", "Napo", "Orellana", "Pastaza", "Morona Santiago", "Zamora Chinchipe"],
  Insular: ["Galápagos"]
};

const PaginaProblemas: React.FC = () => {
  const [datos, setDatos] = useState<FilaExcel[]>([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState<Region>("Sierra");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>("Azuay");

  useEffect(() => {
    fetch('/archivo_resumen.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<FilaExcel>(sheet, { defval: "" });
        setDatos(json);
      });
  }, []);

  const generarTop3PorProvincia = (): Record<string, string[]> => {
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

  const generarGrafico = (filtroFn: (row: FilaExcel) => boolean, titulo: string) => {
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
        x: {
          ticks: { color: '#444' },
          grid: { display: false }
        },
        y: {
          ticks: { color: '#444' },
          grid: { display: false }
        }
      }
    };

    return (
      <section className="mt-12">
        <h3 className="text-xl font-semibold mb-4">{titulo}</h3>
        <Bar data={data} options={options} />
      </section>
    );
  };

  const todasProvincias = [...new Set(datos.map(d => d.Provincia))].sort();
  const dataTooltip = generarTop3PorProvincia();

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">Problemas Rurales en el Ecuador</h1>

      <section className="mb-12">
        <EcuadorSVG data={dataTooltip} />
      </section>

      {generarGrafico(() => true, "📊 Problemas a Nivel Nacional")}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">🔍 Problemas por Región</h2>
        <select
          onChange={(e) => setRegionSeleccionada(e.target.value as Region)}
          value={regionSeleccionada}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        >
          {Object.keys(regionesMap).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {generarGrafico(
          (row) => regionesMap[regionSeleccionada]?.includes(row.Provincia),
          `Problemas en la región ${regionSeleccionada}`
        )}
      </section>

      <section className="mt-12">
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
          `Problemas en la provincia ${provinciaSeleccionada}`
        )}
      </section>

      <p className="text-center mt-12 italic text-sm text-gray-600">
        Fuente: archivo_resumen.xlsx cargado dinámicamente.
      </p>
    </div>
  );
};

export default PaginaProblemas;
