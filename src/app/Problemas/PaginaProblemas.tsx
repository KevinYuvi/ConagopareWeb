"use client";

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import * as XLSX from 'xlsx';
import EcuadorSVG from './EcuadorSVG';
import { motion } from 'framer-motion';

const regionesMap: Record<string, string[]> = {
  Sierra: ["Carchi", "Imbabura", "Pichincha", "Cotopaxi", "Tungurahua", "Chimborazo", "Bolívar", "Cañar", "Azuay", "Loja"],
  Costa: ["Esmeraldas", "Manabí", "Guayas", "Santa Elena", "El Oro", "Los Ríos", "Santo Domingo de los Tsáchilas"],
  Amazonía: ["Sucumbíos", "Napo", "Orellana", "Pastaza", "Morona Santiago", "Zamora Chinchipe"],
  Insular: ["Galápagos"]
};

// Mezcla un array de forma aleatoria
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type DatoResumen = {
  Provincia: string;
  Categoria: string;
};

type DatoFrase = {
  Provincia: string;
  Cantón?: string;
  Parroquia?: string;
  Presidente?: string;
  Frase2?: string;
  Categoria?: string;
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
  const [frasesFiltradas, setFrasesFiltradas] = useState<DatoFrase[]>([]);
  const [frasesOrdenadas, setFrasesOrdenadas] = useState<DatoFrase[]>([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState("Sierra");
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState("Azuay");
  const [provinciasOrdenadas, setProvinciasOrdenadas] = useState<string[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [index, setIndex] = useState(0);

  // Cargar datos de los archivos Excel
  useEffect(() => {
    // Archivo de resumen
    fetch('/archivo_resumen.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json<DatoResumen>(sheet);
        setResumen(json);
      });

    // Archivo de frases (con categorización)
    fetch('/frases_categorizadas.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json<any>(sheet);

        // Normaliza la columna “Categoría” (con tilde) a “Categoria” sin tilde
        const parsed: DatoFrase[] = raw.map((f: any) => ({
          Provincia: f.Provincia,
          Cantón: f.Cantón,
          Parroquia: f.Parroquia,
          Presidente: f.Presidente,
          Frase2: f.Frase2,
          Categoria: f.Categoria || f["Categoría"] || null,
        }));

        setFrases(parsed);
      });
  }, []);

  // Cuando cambia la región, baraja sus provincias
  useEffect(() => {
    const lista = regionesMap[regionSeleccionada] || [];
    setProvinciasOrdenadas(shuffleArray(lista));
  }, [regionSeleccionada]);

  // Filtra por categoría y luego baraja las frases resultantes
  useEffect(() => {
    const filtradas = frases.filter(f =>
      !categoriaSeleccionada || f.Categoria === categoriaSeleccionada
    );
    setFrasesFiltradas(filtradas);
  }, [categoriaSeleccionada, frases]);

  // Cada vez que cambien las frases filtradas, mézclalas
  useEffect(() => {
    setFrasesOrdenadas(shuffleArray(frasesFiltradas));
    setIndex(0);
  }, [frasesFiltradas]);

  const frasesVisibles = frasesOrdenadas.slice(index, index + 2);

  const handleNext = () => {
    if (index + 2 < frasesOrdenadas.length) {
      setIndex(index + 2);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 2);
    }
  };

  // Genera el top 3 de problemáticas por provincia (para tooltip del mapa)
  const generarTop3PorProvincia = () => {
    const agrupado: Record<string, Record<string, number>> = {};
    resumen.forEach(({ Provincia, Categoria }) => {
      if (!agrupado[Provincia]) agrupado[Provincia] = {};
      agrupado[Provincia][Categoria] = (agrupado[Provincia][Categoria] || 0) + 1;
    });

    const resultado: Record<string, string[]> = {};
    Object.entries(agrupado).forEach(([prov, cats]) => {
      const top3 = Object.entries(cats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([cat]) => cat);
      resultado[prov] = top3;
    });

    return resultado;
  };

  // Genera un gráfico de barras a partir de un filtro de DatoResumen
  const generarGrafico = (
    filtroFn: (row: DatoResumen) => boolean,
    titulo: string,
    idx: number
  ) => {
    const conteo: Record<string, number> = {};
    resumen.filter(filtroFn).forEach((row) => {
      const cat = row.Categoria;
      if (cat) {
        conteo[cat] = (conteo[cat] || 0) + 1;
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
          '#4e79a7', '#f28e2b', '#e15759', '#76b7b2',
          '#59a14f', '#edc948', '#b07aa1', '#ff9da7',
          '#9c755f', '#bab0ab'
        ],
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
      <motion.div
        key={idx}
        className="bg-white p-6 rounded-lg shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        custom={idx}
      >
        <h3 className="text-xl font-semibold mb-4">{titulo}</h3>
        <Bar data={data} options={options} />
      </motion.div>
    );
  };

  const dataTooltip = generarTop3PorProvincia();
  const categoriasUnicas = [...new Set(frases.map(f => f.Categoria).filter(Boolean))];

  return (
    <div className="px-4 py-7 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Problemas Rurales en el Ecuador</h1>

      {/* Mapa SVG interactiv o */}
      <div className="mapa-wrapper mb-10">
        <div className="mapa-container">
          <EcuadorSVG data={dataTooltip} />
        </div>
      </div>

      {/* Gráfico nacional */}
      {generarGrafico(() => true, "Problemas a Nivel Nacional", 0)}<br />

      {/* 🔽 Gráficos por región y provincia (provincias barajadas) */}
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
            {provinciasOrdenadas.map((p) => (
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
          <br></br>
      {/* 🔽 Filtro por Problemática y carrusel de frases */}
      <div className="mb-10">
        <label className="block mb-2 text-base font-semibold text-gray-700">
          Filtrar frases por problemática:
        </label>
        <select
          onChange={(e) => setCategoriaSeleccionada(e.target.value || null)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-6 text-base"
        >
          <option value="">Todas las problemáticas</option>
          {categoriasUnicas.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="grid md:grid-cols-2 gap-6">
          {frasesVisibles.length === 0 ? (
            <div className="text-center text-gray-500 col-span-full">
              No hay frases para esta problemática.
            </div>
          ) : (
            frasesVisibles.map((frase, i) => (
              <motion.div
                key={`${frase.Frase2}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white/50 backdrop-blur-md border border-blue-100 shadow-xl hover:shadow-blue-200 transition-all duration-300 rounded-2xl p-6"
              >
                <p className="text-lg font-semibold text-gray-600 uppercase tracking-wider mb-2 text-center">
                  PRONUNCIAMIENTO PARROQUIAL
                </p>
                <div className="text-lg text-gray-700 mb-3 grid grid-cols-2 gap-y-2">
                  <span>🗺️ <span className="font-semibold text-gray-800">Provincia:</span> {frase.Provincia}</span>
                  <span>🏙️ <span className="font-semibold text-gray-800">Cantón:</span> {frase.Cantón || '-'}</span>
                  <span>📍 <span className="font-semibold text-gray-800">Parroquia:</span> {frase.Parroquia || '-'}</span>
                  <span>👤 <span className="font-semibold text-gray-800">Presidente:</span> {frase.Presidente || '-'}</span>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-lg text-gray-800 italic leading-relaxed">
                    “{frase.Frase2}”
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={handlePrev} className="cursor-pointer transition-all bg-[#d02e28] text-white px-6 py-2 rounded-lg border-[#a31611] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] m-2">
            Anterior
          </button>
          <button onClick={handleNext} className="cursor-pointer transition-all bg-[#224e99] text-white px-6 py-2 rounded-lg border-[#11336d] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] m-2">

            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginaProblemas;
