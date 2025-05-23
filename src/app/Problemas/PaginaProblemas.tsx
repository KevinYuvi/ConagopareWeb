"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import EcuadorSVG from './EcuadorSVG';

const regionesMap = {
  Sierra: ["Carchi", "Imbabura", "Pichincha", "Cotopaxi", "Tungurahua", "Chimborazo", "Bolívar", "Cañar", "Azuay", "Loja"],
  Costa: ["Esmeraldas", "Manabí", "Guayas", "Santa Elena", "El Oro", "Los Ríos"],
  Amazonía: ["Sucumbíos", "Napo", "Orellana", "Pastaza", "Morona Santiago", "Zamora Chinchipe"],
  Insular: ["Galápagos"]
};

const PaginaProblemas = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("Sierra");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("Azuay");

  useEffect(() => {
    fetch('/archivo_resumen.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        setDatos(json);
      });
  }, []);

  const generarTop3PorProvincia = () => {
    const agrupado: Record<string, Record<string, number>> = {};

    datos.forEach(({ Provincia, Categoria }: any) => {
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

  const generarGrafico = (filtroFn: (row: any) => boolean, titulo: string) => {
    const conteo: Record<string, number> = {};
    datos.filter(filtroFn).forEach((row: any) => {
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
      <section style={{ marginTop: '3rem' }}>
        <h3>{titulo}</h3>
        <Bar data={data} options={options} />
      </section>
    );
  };

  const todasProvincias = [...new Set(datos.map(d => d.Provincia))].sort();
  const dataTooltip = generarTop3PorProvincia();

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Problemas Rurales en el Ecuador</h1>

      <section style={{ marginBottom: '3rem' }}>
        <EcuadorSVG data={dataTooltip} />
      </section>

      {generarGrafico(() => true, "Problemas a Nivel Nacional")}

      <section style={{ marginTop: '3rem' }}>
        <h1>🔍 Problemas por Región</h1>
        <select
          onChange={(e) => setRegionSeleccionada(e.target.value)}
          value={regionSeleccionada}
          style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
        >
          {Object.keys(regionesMap).map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        {generarGrafico(
          (row: any) => regionesMap[regionSeleccionada]?.includes(row.Provincia),
          `Problemas en la región ${regionSeleccionada}`
        )}
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h1>📍 Problemas por Provincia</h1>
        <select
          onChange={(e) => setProvinciaSeleccionada(e.target.value)}
          value={provinciaSeleccionada}
          style={{ padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
        >
          {todasProvincias.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {generarGrafico(
          (row: any) => row.Provincia === provinciaSeleccionada,
          `Problemas en la provincia ${provinciaSeleccionada}`
        )}
      </section>

      <p style={{ textAlign: 'center', marginTop: '2rem', fontStyle: 'italic' }}>
        Fuente: archivo_resumen.xlsx cargado dinámicamente.
      </p>
    </div>
  );
};

export default PaginaProblemas;
