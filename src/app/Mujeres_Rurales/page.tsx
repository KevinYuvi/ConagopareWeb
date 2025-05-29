"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import dynamic from "next/dynamic";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Registro {
  AÑO: number;
  REGIÓN: string;
  PROVINCIA: string;
  CANTÓN: string;
  PARROQUIA: string;
  CANTIDAD: number;
}

const MujeresRuralesPage = () => {
  const [data, setData] = useState<Registro[]>([]);
  const [region, setRegion] = useState("");
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [parroquia, setParroquia] = useState("");

  useEffect(() => {
    fetch("/Data/num_presidentas_parroquia.json")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

// Calcular filtros interdependientes
const regionesDisponibles = [...new Set(data
  .filter(d =>
    (!provincia || d.PROVINCIA === provincia) &&
    (!canton || d.CANTÓN === canton) &&
    (!parroquia || d.PARROQUIA === parroquia)
  )
  .map(d => d.REGIÓN))];

const provinciasDisponibles = [...new Set(data
  .filter(d =>
    (!region || d.REGIÓN === region) &&
    (!canton || d.CANTÓN === canton) &&
    (!parroquia || d.PARROQUIA === parroquia)
  )
  .map(d => d.PROVINCIA))];

const cantonesDisponibles = [...new Set(data
  .filter(d =>
    (!region || d.REGIÓN === region) &&
    (!provincia || d.PROVINCIA === provincia) &&
    (!parroquia || d.PARROQUIA === parroquia)
  )
  .map(d => d.CANTÓN))];

const parroquiasDisponibles = [...new Set(data
  .filter(d =>
    (!region || d.REGIÓN === region) &&
    (!provincia || d.PROVINCIA === provincia) &&
    (!canton || d.CANTÓN === canton)
  )
  .map(d => d.PARROQUIA))];




  const datosFiltrados = data.filter((d) =>
    (!region || d.REGIÓN === region) &&
    (!provincia || d.PROVINCIA === provincia) &&
    (!canton || d.CANTÓN === canton) &&
    (!parroquia || d.PARROQUIA === parroquia)
  );

  const agrupadoPorAnio = [2010, 2014, 2019, 2023].map((año) => ({
    año,
    cantidad: datosFiltrados
      .filter((d) => d.AÑO === año)
      .reduce((sum, d) => sum + d.CANTIDAD, 0),
  }));

  const chartData = {
    labels: agrupadoPorAnio.map((d) => d.año),
    datasets: [
      {
        label: "Mujeres Presidentas",
        data: agrupadoPorAnio.map((d) => d.cantidad),
        backgroundColor: ["#E8EB50", "#347FF7", "#FF4242", "#7EDEFF"],
      },
    ],
  };


  const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    datalabels: {
      anchor: "end",
      align: "end",
      color: "#777",
      font: {
        weight: "bold" as const,
      },
      formatter: (value: number) => `${value}`,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      min: 0,
      ticks: {
        stepSize: 50,
      },
    },
  },
};

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-center mb-4">Mujeres Presidentas</h1>
      <p className="text-center max-w-3xl mx-auto pr-10 pl-10 mb-6">
        El liderazgo femenino en las parroquias rurales refleja la fuerza, perseverancia y compromiso de las mujeres con el desarrollo de sus comunidades. Esta herramienta permite explorar cómo ha sido su representación política en Ecuador, mostrando cuántas mujeres han sido elegidas como presidentas de juntas parroquiales en los años 2010, 2014, 2019 y 2023, con filtros por región, provincia, cantón y parroquia.
      </p>

{/* Filtros */}
<div className="grid grid-cols-1 gap-5 pr-10 pl-10 mb-6">
  <div>
    <label htmlFor="region" className="block mb-2 font-medium">Seleccione una región:</label>
    <select
      id="region"
      onChange={(e) => setRegion(e.target.value)}
      className="border rounded p-2 w-3xs"
    >
      <option value="">Región</option>
      {regionesDisponibles.sort().map((r, i) => (
        <option key={`region-${i}`} value={r}>{r}</option>
      ))}
    </select>
  </div>

  <div>
    <label htmlFor="provincia" className=" block mb-2 font-medium">Seleccione una provincia:</label>
    <select
      id="provincia"
      onChange={(e) => setProvincia(e.target.value)}
      className="border rounded p-2 w-3xs"
    >
      <option value="">Provincia</option>
      {provinciasDisponibles.sort().map((p, i) => (
        <option key={`provincia-${i}`} value={p}>{p}</option>
      ))}
    </select>
  </div>

  <div>
    <label htmlFor="canton" className="block mb-2 font-medium">Seleccione un cantón:</label>
    <select
      id="canton"
      onChange={(e) => setCanton(e.target.value)}
      className="border rounded p-2 w-3xs"
    >
      <option value="">Cantón</option>
      {cantonesDisponibles.sort().map((c, i) => (
        <option key={`canton-${i}`} value={c}>{c}</option>
      ))}
    </select>
  </div>

  <div>
    <label htmlFor="parroquia" className="block mb-2 font-medium">Seleccione una parroquia:</label>
    <select
      id="parroquia"
      onChange={(e) => setParroquia(e.target.value)}
      className="border rounded p-2 w-3xs"
    >
      <option value="">Parroquia</option>
      {parroquiasDisponibles.sort().map((p, i) => (
        <option key={`parroquia-${i}`} value={p}>{p}</option>
      ))}
    </select>
  </div>
</div>

      {/* Gráfico */}
      <Bar options={chartOptions} data={chartData} className="mb-8 pr-10 pl-10 max-h-100" />

      <p className="text-center max-w-xl mx-auto text-base text-gray-600 mb-16">
        En 2023, con 182 presidentas, se logró el mayor avance en equidad de género.
      </p>

      {/* Video */}
      <h2 className="text-3xl font-heading font-bold mb-4 text-center">Warmis Power - CONAGOPARE #8M</h2>
      <div className="flex flex-col items-center justify-center mb-10">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/F4P4WPmjyNM?si=GPnzRWdYksxbszeG"
          title="Warmis Power"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className=" mb-10 mr-10 ml-10 rounded-lg"
        ></iframe>
        <p className="text-center text-base max-w-3xl mb-4">
          Una apología a la conmemoración del 8 de Marzo en Ecuador desde una perspectiva de la situación actual en materia de derechos, con énfasis en PARROQUIAS RURALES,  y los retos que enfrenta la política pública de género en el país.
        </p>
      </div>

      {/* Artículo */}
      <h2 className="text-3xl font-heading font-bold mb-4 text-center">
        Mujeres en presidencias de Gobiernos Parroquiales Rurales
      </h2>
      <p className="text-center text-base max-w-3xl mx-auto mb-4">
        Este artículo analiza la participación de las mujeres como presidentas en los Gobiernos Parroquiales Rurales del Ecuador desde 2009 hasta 2023. A través de un estudio de leyes, elecciones y cifras, muestra que aunque ha habido un crecimiento en la representación femenina, para el periodo actual (2023–2027) solo el 22% de las presidencias son ocupadas por mujeres, evidenciando que aún falta mucho por avanzar en equidad.
      </p>
      <div className="flex justify-center">
        <iframe
          src="/Docs/articulo_mujeres_presidentas.pdf"
          width="794"
          height="600"
          className="rounded-md border shadow"
        ></iframe>
      </div>
    </div>
  );
};

export default MujeresRuralesPage;