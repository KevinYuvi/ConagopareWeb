"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


const ID_IMPORTANCIA = "importancia";
const ID_MENSAJE = "mensaje";
const ID_VOZ_RURAL = "voz-rural";

// 🧭 Mapeo entre nombres y slugs de categorías
const MAPEO_CATEGORIAS: Record<string, string> = {
  "¿Por qué su gobierno parroquial es importante para su comunidad?": ID_IMPORTANCIA,
  "¿Cual sería su mensaje para el Ecuador?": ID_MENSAJE,
};

interface Word {
  palabra: string;
  frecuencia: number;
}

interface Mensaje {
  id: number;
  Categoría: string;
  Subcategoría: string;
  Mensaje: string;
  Presidente: string;
  Parroquia: string;
  Canton: string;
  Provincia: string;
}

interface Reacciones {
  [key: number]: { likes: number; dislikes: number };
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DATA_URL = "/data/respuestas_clasificadas.json";
const ALEATORIOS_CANT = 2;
const ALEATORIOS_MS = 25000;

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/¿/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function VozRuralPage() {
  const pathname = usePathname();

  const palabrasRelevantes: Word[] = [
    { palabra: "gobierno", frecuencia: 60 },
    { palabra: "parroquial", frecuencia: 40 },
    { palabra: "ecuador", frecuencia: 30 },
    { palabra: "comunidad", frecuencia: 25 },
    { palabra: "desarrollo", frecuencia: 20 },
    { palabra: "gestión", frecuencia: 35 },
    { palabra: "importante", frecuencia: 28 },
    { palabra: "participación", frecuencia: 22 },
    { palabra: "servicios", frecuencia: 18 },
    { palabra: "recursos", frecuencia: 15 },
    { palabra: "proyecto", frecuencia: 40 },
    { palabra: "local", frecuencia: 39 },
    { palabra: "trabajo", frecuencia: 38 },
    { palabra: "beneficio", frecuencia: 37 },
  ];

  const mapFrecuenciaATamaño = (freq: number) => {
    const minFont = 14;
    const maxFont = 70;
    const minFreq = Math.min(...palabrasRelevantes.map((p) => p.frecuencia));
    const maxFreq = Math.max(...palabrasRelevantes.map((p) => p.frecuencia));
    if (maxFreq === minFreq) return (minFont + maxFont) / 2;
    return ((freq - minFreq) / (maxFreq - minFreq)) * (maxFont - minFont) + minFont;
  };

  const colores = ["#b34700", "#cc6600", "#ff9900", "#cc3300", "#996633", "#804000", "#e67300"];
  const colorAleatorio = () => colores[Math.floor(Math.random() * colores.length)];
  const rotacionAleatoria = () => `rotate(${Math.floor(Math.random() * 61) - 30}deg)`;

  const [data, setData] = useState<Mensaje[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [modoVisualizacion, setModoVisualizacion] = useState<"top" | "todos">("top");
  const [reacciones, setReacciones] = useState<Reacciones>({});
  const [aleatorios, setAleatorios] = useState<Mensaje[]>([]);
  const aleatorioIndex = useRef(0);
  const [userVotes, setUserVotes] = useState<{ [key: number]: "like" | "dislike" | undefined }>({});

  // ADAPTADO: Hash scroll y expansión automática de categoría (como Datos Curiosos)
  useEffect(() => {
    function expandAndScrollFromHash() {
      const hash = window.location.hash.replace("#", "");
      let cat = null;
      if (hash === "importancia") {
        cat = "¿Por qué su gobierno parroquial es importante para su comunidad?";
      }
      if (hash === "mensaje") {
        cat = "¿Cual sería su mensaje para el Ecuador?";
      }
      if (cat) {
        setCategoriaActiva(cat);
        setSubcategoriaActiva(null); // Opcional: colapsa cualquier subcategoría
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    }
    window.addEventListener("hashchange", expandAndScrollFromHash);
    expandAndScrollFromHash(); // Al cargar
    return () => window.removeEventListener("hashchange", expandAndScrollFromHash);
  }, []);

  // Cargar datos y votos iniciales
  useEffect(() => {
    fetch(DATA_URL)
      .then(res => res.json())
      .then(json => {
        const datosConId: Mensaje[] = json.map((item: any, idx: number) => ({
          ...item,
          id: idx,
        }));
        setData(datosConId);

        let almacen = localStorage.getItem("vozRuralReacciones");
        let nuevasReacciones: Reacciones = {};
        if (almacen) {
          try {
            nuevasReacciones = JSON.parse(almacen);
          } catch {}
        }
        datosConId.forEach(m => {
          if (nuevasReacciones[m.id] === undefined) {
            nuevasReacciones[m.id] = { likes: 0, dislikes: 0 };
          }
        });
        setReacciones(nuevasReacciones);
        localStorage.setItem("vozRuralReacciones", JSON.stringify(nuevasReacciones));

        setAleatorios(escogeAleatorios(datosConId, 0));

        const votes: any = JSON.parse(localStorage.getItem("vozRuralUserVotes") || "{}");
        setUserVotes(votes);
      });
   }, []);
  useEffect(() => {
    if (data.length === 0) return;
    const interval = setInterval(() => {
      aleatorioIndex.current = (aleatorioIndex.current + 1) % data.length;
      setAleatorios(escogeAleatorios(data, aleatorioIndex.current));
    }, ALEATORIOS_MS);
    return () => clearInterval(interval);
  }, [data]);

  function escogeAleatorios(arreglo: Mensaje[], offset: number) {
    if (arreglo.length <= ALEATORIOS_CANT) return [...arreglo];
    let res = [];
    for (let i = 0; i < ALEATORIOS_CANT; i++) {
      res.push(arreglo[(offset + i) % arreglo.length]);
    }
    return res;
  }

  const categorias = Array.from(new Set(data.map(d => d.Categoría).filter(Boolean)));
  const subcategoriasPorCategoria: { [key: string]: string[] } = {};
  categorias.forEach(cat => {
    subcategoriasPorCategoria[cat] = Array.from(new Set(
      data.filter(d => d.Categoría === cat).map(d => d.Subcategoría).filter(Boolean)
    ));
  });

  let mensajesFiltrados = data.filter(
    d => d.Categoría === categoriaActiva && d.Subcategoría === subcategoriaActiva
  );
  if (modoVisualizacion === "top") {
    mensajesFiltrados = mensajesFiltrados
      .slice()
      .sort((a, b) => (reacciones[b.id]?.likes || 0) - (reacciones[a.id]?.likes || 0))
      .slice(0, 3);
  }

  const votar = (id: number, tipo: "like" | "dislike") => {
    let userVotesLocal: any = JSON.parse(localStorage.getItem("vozRuralUserVotes") || "{}");
    if (userVotesLocal[id]) return;

    let nuevo = { ...reacciones };
    if (!nuevo[id]) nuevo[id] = { likes: 0, dislikes: 0 };
    if (tipo === "like") nuevo[id].likes += 1;
    else nuevo[id].dislikes += 1;

    userVotesLocal[id] = tipo;
    setReacciones(nuevo);
    setUserVotes(userVotes => ({ ...userVotes, [id]: tipo }));
    localStorage.setItem("vozRuralReacciones", JSON.stringify(nuevo));
    localStorage.setItem("vozRuralUserVotes", JSON.stringify(userVotesLocal));
  };

  return (
    <div className="max-w-[1300px] mx-auto p-5" style={{
      backgroundColor: "#fff",
      color: "#222",
      position: "relative",
      fontFamily: "'Baloo 2', var(--font-sans), sans-serif"
      }}
    >
      {/* Introducción y Nube de Palabras */}
      <motion.section
       id="voz-rural"
       initial="hidden"
       whileInView="visible"
       viewport={{ once: true, amount: 0.3 }}
       variants={fadeUpVariant}
       className="text-center mb-10 max-w-[800px] mx-auto scroll-mt-28" 
        ></motion.section>
     <motion.h1
       className="text-4xl font-heading mb-3 text-center"
       variants={fadeUpVariant}
       style={{ letterSpacing: ".02em" }}
       >
        Mensajes de las Parroquias
      </motion.h1>
       <motion.p
          className="text-gray-700 text-lg mb-8 text-center"
          variants={fadeUpVariant}
          style={{ fontFamily: "var(--font-sans)" }}
          >
        Esta página visualiza la voz de las parroquias rurales del Ecuador mediante mensajes representativos y curiosidades extraidas de entrevistas con sus representantes. Podrás explorar los mensajes más recurrentes , testimonios aleatorios y datos destacados, organizados por provincia y GAD, para conoces mejor la realidad rural del país.
      </motion.p>
        <motion.h2
        className="text-2xl font-semibold mb-4 font-heading text-center"
        variants={fadeUpVariant}
        >
         Nube de Palabras
      </motion.h2>


        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 max-w-[900px] mx-auto">
          {palabrasRelevantes.map(({ palabra, frecuencia }) => {
            const fontSize = mapFrecuenciaATamaño(frecuencia);
            const color = colorAleatorio();
            const rotacion = rotacionAleatoria();
            return (
              <span
                key={palabra}
                style={{
                  fontSize,
                  color,
                  fontWeight: 700,
                  display: "inline-block",
                  cursor: "default",
                  transform: rotacion,
                  userSelect: "none",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  zIndex: 1,
                  fontFamily: "'Baloo 2', var(--font-sans), sans-serif"
                }}
                title={`${palabra} (${frecuencia})`}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "#FF8300";
                  (e.currentTarget as HTMLSpanElement).style.transform = "scale(1.15) rotate(0deg)";
                  (e.currentTarget as HTMLSpanElement).style.zIndex = "10";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = color;
                  (e.currentTarget as HTMLSpanElement).style.transform = rotacion;
                  (e.currentTarget as HTMLSpanElement).style.zIndex = "1";
                }}
              >
                {palabra}
              </span>
            );
          })}
        </div>
      

      {/* Layout principal: mensajes y columna aleatoria */}
      <div className="flex gap-8 items-start">
        <div className="flex-1">
          {/* Secciones de Categoría */}
          {categorias.map(cat => (
            <section
              key={cat}
              id={
                cat === "¿Por qué su gobierno parroquial es importante para su comunidad?"
                  ? "importancia"
                  : cat === "¿Cual sería su mensaje para el Ecuador?"
                  ? "mensaje"
                  : undefined
              }
              className="mb-8 rounded-xl bg-white shadow-md p-4"
            >
              <h2
                onClick={() => {
                  setCategoriaActiva(cat === categoriaActiva ? null : cat);
                  setSubcategoriaActiva(null);
                }}
                className={`cursor-pointer text-2xl font-heading mb-2 flex items-center gap-2 hover:text-orange-600 transition`}
              >
                {cat}
                {categoriaActiva === cat ? "▼" : "►"}
              </h2>

              {categoriaActiva === cat && (
                <div>
                  {/* SUBCATEGORÍAS */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {subcategoriasPorCategoria[cat].map(sub => (
                      <button
                        key={sub}
                        onClick={() => setSubcategoriaActiva(sub === subcategoriaActiva ? null : sub)}
                        className={`px-3 py-1 rounded-full border transition font-semibold
                          ${sub === subcategoriaActiva ? "bg-orange-500 text-white border-orange-500" : "bg-gray-100 hover:bg-orange-100 border-gray-300"}
                        `}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  {/* MENSAJES */}
                  {subcategoriaActiva && (
                    <div className="mb-2">
                      <button
                        className="mb-4 mt-2 px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
                        onClick={() =>
                          setModoVisualizacion(modoVisualizacion === "top" ? "todos" : "top")
                        }
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {modoVisualizacion === "top" ? "Ver todos los mensajes" : "Ver solo el Top 3"}
                      </button>
                      <div className="grid gap-5">
                        {mensajesFiltrados.length > 0 ? (
                          mensajesFiltrados.map(m => (
                            <motion.div
                              key={m.id}
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="rounded-lg p-4 bg-white border border-orange-100 shadow hover:shadow-lg transition"
                              style={{ fontFamily: "var(--font-sans)" }}
                            >
                              <div className="mb-2 text-gray-900 font-semibold italic">{m.Mensaje}</div>
                              <div className="text-sm text-gray-700 flex flex-wrap gap-3 mb-2">
                                <span>👤 <b>{m.Presidente}</b></span>
                                <span>🏞️ {m.Parroquia}</span>
                                <span>🏙️ {m.Canton}</span>
                                <span>🌎 {m.Provincia}</span>
                              </div>
                              <div className="flex gap-6 items-center mt-2">
                                <button
                                  className={`flex items-center gap-1 transition
                                    ${userVotes[m.id] === "like" ? "text-green-800 font-bold" : "text-green-600 hover:text-green-800"}
                                    ${userVotes[m.id] ? "opacity-70 cursor-not-allowed" : ""}
                                  `}
                                  onClick={() => votar(m.id, "like")}
                                  disabled={!!userVotes[m.id]}
                                >
                                  <FaThumbsUp /> {reacciones[m.id]?.likes || 0}
                                </button>
                                <button
                                  className={`flex items-center gap-1 transition
                                    ${userVotes[m.id] === "dislike" ? "text-red-800 font-bold" : "text-red-600 hover:text-red-800"}
                                    ${userVotes[m.id] ? "opacity-70 cursor-not-allowed" : ""}
                                  `}
                                  onClick={() => votar(m.id, "dislike")}
                                  disabled={!!userVotes[m.id]}
                                >
                                  <FaThumbsDown /> {reacciones[m.id]?.dislikes || 0}
                                </button>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-center">No hay mensajes para esta subcategoría.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Columna derecha: Mensajes aleatorios */}
        <aside className="w-[350px] bg-white shadow-md rounded-xl p-4">
          <h3 className="text-2xl font-heading mb-5 text-gray-900">
            🌟 Mensajes aleatorios
          </h3>
          {data.length === 0 && (
            <div className="text-center text-gray-500">Cargando...</div>
          )}
          <AnimatePresence>
            {aleatorios.map(m => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="bg-white rounded-lg p-4 mb-5 shadow hover:shadow-lg transition"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <div className="mb-2 text-gray-900 font-semibold italic">{m.Mensaje}</div>
                <div className="text-sm text-gray-700 flex flex-wrap gap-3 mb-2">
                  <span>👤 <b>{m.Presidente}</b></span>
                  <span>🏞️ {m.Parroquia}</span>
                  <span>🏙️ {m.Canton}</span>
                  <span>🌎 {m.Provincia}</span>
                </div>
                <div className="flex gap-6 items-center mt-2">
                  <button
                    className={`flex items-center gap-1 transition
                      ${userVotes[m.id] === "like" ? "text-green-800 font-bold" : "text-green-600 hover:text-green-800"}
                      ${userVotes[m.id] ? "opacity-70 cursor-not-allowed" : ""}
                    `}
                    onClick={() => votar(m.id, "like")}
                    disabled={!!userVotes[m.id]}
                  >
                    <FaThumbsUp /> {reacciones[m.id]?.likes || 0}
                  </button>
                  <button
                    className={`flex items-center gap-1 transition
                      ${userVotes[m.id] === "dislike" ? "text-red-800 font-bold" : "text-red-600 hover:text-red-800"}
                      ${userVotes[m.id] ? "opacity-70 cursor-not-allowed" : ""}
                    `}
                    onClick={() => votar(m.id, "dislike")}
                    disabled={!!userVotes[m.id]}
                  >
                    <FaThumbsDown /> {reacciones[m.id]?.dislikes || 0}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </aside>
      </div>
    </div>
  );
}
