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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Registro {
  AÑO: number;
  REGIÓN: string;
  PROVINCIA: string;
  CANTÓN: string;
  PARROQUIA: string;
  CANTIDAD: number;
}

export default function MujeresRuralesPage() {
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

  const encontrarUbicacion = (campo: keyof Registro, valor: string): Registro | undefined =>
    data.find((d) => String(d[campo]).trim() === valor.trim());

  const handleParroquiaChange = (value: string) => {
    setParroquia(value);
    const match = encontrarUbicacion("PARROQUIA", value);
    if (match) {
      setCanton(match.CANTÓN.trim());
      setProvincia(match.PROVINCIA.trim());
      setRegion(match.REGIÓN.trim());
    }
  };

  const handleCantonChange = (value: string) => {
    setCanton(value);
    const match = encontrarUbicacion("CANTÓN", value);
    if (match) {
      setProvincia(match.PROVINCIA.trim());
      setRegion(match.REGIÓN.trim());
    }
  };

  const handleProvinciaChange = (value: string) => {
    setProvincia(value);
    const match = encontrarUbicacion("PROVINCIA", value);
    if (match) {
      setRegion(match.REGIÓN.trim());
    }
  };

  const limpiarFiltros = () => {
    setRegion("");
    setProvincia("");
    setCanton("");
    setParroquia("");
  };

  const valoresUnicos = (campo: keyof Registro): string[] => {
    return [...new Set(data.map((d) => String(d[campo]).trim()))].sort((a, b) => a.localeCompare(b));
  };

  const datosFiltrados = data.filter((d) => {
    return (!region || d.REGIÓN === region) &&
      (!provincia || (d.PROVINCIA.trim() === provincia && d.REGIÓN === region)) &&
      (!canton || (d.CANTÓN.trim() === canton && d.PROVINCIA.trim() === provincia)) &&
      (!parroquia || (d.PARROQUIA.trim() === parroquia && d.CANTÓN.trim() === canton));
  });

  const agrupadoPorAnio = [2010, 2014, 2019, 2023].map((año) => ({
    anio: año,
    cantidad: datosFiltrados
      .filter((d) => d.AÑO === año)
      .reduce((sum, d) => sum + d.CANTIDAD, 0),
  }));

  const chartData = {
    labels: agrupadoPorAnio.map((d) => d.anio),
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
        align: "top",
        color: "#444",
        font: { weight: "bold" },
        formatter: (value: number) => `${value}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-heading font-bold text-center mb-4">Mujeres Presidentas</h1>
      <p className="text-center max-w-3xl mx-auto pr-10 pl-10 mb-6">
        El liderazgo femenino en las parroquias rurales refleja la fuerza, perseverancia y compromiso de las mujeres con el desarrollo de sus comunidades...
      </p>

      <div className="px-6 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-heading font-bold text-center mb-6">Mujeres Presidentas por Año</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="p-2 border rounded">
            <option value="">Escoge una región</option>
            {valoresUnicos("REGIÓN").map((r) => <option key={r} value={r}>{r}</option>)}
          </select>

          <select value={provincia} onChange={(e) => handleProvinciaChange(e.target.value)} className="p-2 border rounded">
            <option value="">Escoge una provincia</option>
            {valoresUnicos("PROVINCIA").map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <select value={canton} onChange={(e) => handleCantonChange(e.target.value)} className="p-2 border rounded">
            <option value="">Escoge un cantón</option>
            {valoresUnicos("CANTÓN").map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={parroquia} onChange={(e) => handleParroquiaChange(e.target.value)} className="p-2 border rounded">
            <option value="">Escoge una parroquia</option>
            {valoresUnicos("PARROQUIA").map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="flex justify-center mb-10">
          <button
            onClick={limpiarFiltros}
            className=" w-[150px] text-center bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-900 shadow-lg shadow-blue-500/50 transition-colors"
          >
            Limpiar filtros
          </button>
        </div>

        <div className="h-96">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <p className="text-center max-w-xl mx-auto text-base text-gray-600 mb-18">
        En 2023, con 182 presidentas, se logró el mayor avance en equidad de género.
      </p>

      {/* Video */}
      <h2 className="text-3xl font-heading font-bold mb-4 text-center">Warmis Power - CONAGOPARE #8M</h2>
      <div className="flex flex-col items-center justify-center mb-10 px-4">
        <div className="relative w-full max-w-3xl" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/F4P4WPmjyNM?si=GPnzRWdYksxbszeG"
            title="Warmis Power"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-center text-base max-w-3xl mt-6">
          Una apología a la conmemoración del 8 de Marzo en Ecuador desde una perspectiva de la situación actual en materia de derechos, con énfasis en PARROQUIAS RURALES, y los retos que enfrenta la política pública de género en el país.
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
}
