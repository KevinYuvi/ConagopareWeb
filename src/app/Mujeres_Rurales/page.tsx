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
  NOMBRE: string;
}

export default function MujeresRuralesPage() {
  const [data, setData] = useState<Registro[]>([]);
  const [region, setRegion] = useState("");
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [parroquia, setParroquia] = useState("");
  const [datosFiltrados, setDatosFiltrados] = useState<Registro[]>([]);

  useEffect(() => {
    fetch("/Data/nom_presidentas_parroquia.json")
      .then((res) => res.json())
      .then((jsonData) => {
        setData(jsonData);
        setDatosFiltrados(jsonData); // Inicializa el gráfico con todos los datos
      })
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
    setDatosFiltrados(data); // Mostrar todos los datos al limpiar filtros
  };

  const consultarDatos = () => {
    const filtrado = data.filter((d) => {
      return (!region || d.REGIÓN === region) &&
        (!provincia || (d.PROVINCIA.trim() === provincia && d.REGIÓN === region)) &&
        (!canton || (d.CANTÓN.trim() === canton && d.PROVINCIA.trim() === provincia)) &&
        (!parroquia || (d.PARROQUIA.trim() === parroquia && d.CANTÓN.trim() === canton));
    });
    setDatosFiltrados(filtrado);
  };

  const valoresUnicos = (campo: keyof Registro): string[] => {
    return [...new Set(data.map((d) => String(d[campo]).trim()))].sort((a, b) => a.localeCompare(b));
  };

  const provinciasFiltradas = region
    ? valoresUnicos("PROVINCIA").filter((p) => encontrarUbicacion("PROVINCIA", p)?.REGIÓN === region)
    : valoresUnicos("PROVINCIA");

  const cantonesFiltrados = provincia
    ? valoresUnicos("CANTÓN").filter((c) => encontrarUbicacion("CANTÓN", c)?.PROVINCIA === provincia)
    : valoresUnicos("CANTÓN");

  const parroquiasFiltradas = canton
    ? valoresUnicos("PARROQUIA").filter((p) => encontrarUbicacion("PARROQUIA", p)?.CANTÓN === canton)
    : valoresUnicos("PARROQUIA");

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
        backgroundColor: ["#fbd93a", "#224e99", "#d02e28", "#3bb2e7"],
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
        ticks: { stepSize:20 },
      },
    },
  };

  const [paginaActual, setPaginaActual] = useState(1);
  const resultadosPorPagina = 10;
  const totalPaginas = Math.ceil(datosFiltrados.length / resultadosPorPagina);
  const datosPaginados = datosFiltrados.slice(
    (paginaActual - 1) * resultadosPorPagina,
    paginaActual * resultadosPorPagina
  );

  const irPrimeraPagina = () => setPaginaActual(1);
  const irUltimaPagina = () => setPaginaActual(totalPaginas);
  const irPaginaAnterior = () => setPaginaActual((prev) => Math.max(prev - 1, 1));
  const irPaginaSiguiente = () => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas));

  return (
    <div className="w-full max-w-6xl p-6 mx-auto ">
      <h1 className="text-3xl font-heading text-center mb-6">
        Mujeres Presidentas
      </h1>
      <p className="text-center max-w-3xl mx-auto px-8 mb-10">
        El liderazgo femenino en las parroquias rurales refleja la fuerza, perseverancia y compromiso de las mujeres con el desarrollo de sus comunidades.
      </p>

      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-between gap-6">
        <h1 className="text-3xl font-heading text-center">
          Mujeres Presidentas por Año
        </h1>
        <p className="text-center max-w-3xl mx-auto">
          En 2023, con 182 presidentas, se logró el mayor avance en equidad de género.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<select
  value={region}
  onChange={(e) => {
    const value = e.target.value;
    if (value === "NACIONAL") {
      limpiarFiltros();
    } else {
      setRegion(value);
    }
  }}
  className="px-4 py-2 bg-white shadow-xl rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
>
  <option value="">Escoge una región</option>
  <option value="NACIONAL">NACIONAL</option>
  {valoresUnicos("REGIÓN").map((r) => (
    <option key={r} value={r}>{r}</option>
  ))}
</select>

          <select value={provincia} onChange={(e) => handleProvinciaChange(e.target.value)} className="px-4 py-2 bg-white shadow-xl rounded-xl outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Escoge una provincia</option>
            {provinciasFiltradas.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          <select value={canton} onChange={(e) => handleCantonChange(e.target.value)} className="px-4 py-2 bg-white shadow-xl rounded-xl outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Escoge un cantón</option>
            {cantonesFiltrados.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <select value={parroquia} onChange={(e) => handleParroquiaChange(e.target.value)} className="px-4 py-2 bg-white shadow-xl rounded-xl outline-none focus:ring-2 focus:ring-blue-400">
            <option value="">Escoge una parroquia</option>
            {parroquiasFiltradas.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="flex justify-center gap-2 ">
          <button
            onClick={consultarDatos}
            className="cursor-pointer transition-all bg-[#224e99] text-white px-6 py-2 rounded-lg border-[#11336d] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] m-2">
            Consultar
          </button>
          <button
            onClick={limpiarFiltros}
            className="cursor-pointer transition-all bg-[#d02e28] text-white px-6 py-2 rounded-lg border-[#a31611] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90  active:translate-y-[2px] m-2">
            Limpiar filtros
          </button>
        </div>

        <div className="w-full max-w-2xl h-[400px] mx-auto p-5 mb-10">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <h2 className="text-3xl font-bold text-center">
          Listado de Mujeres Presidentas
        </h2>
        <div className="w-full overflow-x-auto rounded-lg shadow-2xl">

          <table className="min-w-full text-sm text-center border-collapse">
            <thead>
              <tr className="bg-[#224e99] text-white">
                <th className="px-3 py-2 w-20">AÑO</th>
                <th className="px-3 py-2 w-32">REGIÓN</th>
                <th className="px-3 py-2 w-40">PROVINCIA</th>
                <th className="px-3 py-2 w-40">CANTÓN</th>
                <th className="px-3 py-2 w-40">PARROQUIA</th>
                <th className="px-3 py-2 w-56">NOMBRE</th>
              </tr>
            </thead>
            <tbody>
              {datosPaginados.map((item, index) => (
                <tr key={index} className=" even:bg-gray-200 hover:bg-gray-300 transition">
                  <td className="px-3 py-2">{item.AÑO}</td>
                  <td className="px-3 py-2">{item.REGIÓN}</td>
                  <td className="px-3 py-2">{item.PROVINCIA}</td>
                  <td className="px-3 py-2">{item.CANTÓN}</td>
                  <td className="px-3 py-2">{item.PARROQUIA}</td>
                  <td className="px-3 py-2 text-left">{item.NOMBRE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex flex-wrap justify-center items-center gap-3 p-2">
          <button
            onClick={irPrimeraPagina}
            disabled={paginaActual === 1}
            className="cursor-pointer transition-all bg-[#d02e28] text-white px-6 py-2 text-sm rounded-lg border-[#a31611]  border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90  active:translate-y-[2px] disabled:opacity-50">
            « Inicio
          </button>

          <button
            onClick={irPaginaAnterior}
            disabled={paginaActual === 1}
            className="cursor-pointer transition-all bg-[#224e99] text-white px-4 py-2 text-sm rounded-lg border-[#11336d] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:opacity-50">
            ‹ Anterior
          </button>

          <span className="px-4 py-1 font-semibold text-sm text-center w-full sm:w-auto">
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            onClick={irPaginaSiguiente}
            disabled={paginaActual === totalPaginas}
            className="cursor-pointer transition-all bg-[#224e99] text-white px-4 py-2 text-sm rounded-lg border-[#11336d] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:opacity-50">
            Siguiente ›
          </button>

          <button
            onClick={irUltimaPagina}
            disabled={paginaActual === totalPaginas}
            className="cursor-pointer transition-all bg-[#d02e28] text-white px-6 py-2 text-sm rounded-lg border-[#a31611]  border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90  active:translate-y-[2px] disabled:opacity-50">
            Final »
          </button>
        </div>
        <div className="flex justify-center mb-10">
          <a
            href="/Data/datos_mujeres_presidentas.xlsx"
            download
            className="cursor-pointer transition-all bg-[#253e7c] text-white px-4 py-2 text-sm rounded-lg border-[#132655] border-b-[4px] hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] disabled:opacity-50">
            Descarga estos datos
          </a>
        </div>


      </div>

      <h2 className="text-3xl font-heading text-center mb-6">
        Warmis Power - CONAGOPARE #8M
      </h2>
      <div className="flex flex-col items-center justify-center px-4 gap-6">
        <div className="relative w-full max-w-3xl" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/F4P4WPmjyNM?si=GPnzRWdYksxbszeG"
            title="Warmis Power"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-center max-w-3xl mb-10">
          Una apología a la conmemoración del 8 de Marzo en Ecuador desde una perspectiva de la situación actual en materia de derechos, con énfasis en PARROQUIAS RURALES, y los retos que enfrenta la política pública de género en el país.
        </p>
      </div>

      <h2 className="text-3xl font-heading text-center mb-6">
        Mujeres en presidencias de Gobiernos Parroquiales Rurales
      </h2>
      <p className="text-center max-w-3xl mx-auto mb-6">
        Este artículo analiza la participación de las mujeres como presidentas en los Gobiernos Parroquiales Rurales del Ecuador desde 2009 hasta 2023.
      </p>
      <div className="flex justify-center mb-6">
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