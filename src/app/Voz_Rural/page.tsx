"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; // Importar las flechas

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

interface Word {
  palabra: string;
  frecuencia: number;
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const highlightVariant = {
  highlighted: {
    backgroundColor: "#fff9c4",
    transition: { duration: 1 },
  },
  normal: {
    backgroundColor: "transparent",
    transition: { duration: 1 },
  },
};

const hoverShadowVariant = {
  hover: {
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    transform: "translateY(-5px)",
    transition: { duration: 0.3 },
  },
  normal: {
    boxShadow: "none",
    transform: "translateY(0px)",
  },
};

export default function VozRuralPage() {
  const [data, setData] = useState<Mensaje[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [modoVisualizacion, setModoVisualizacion] = useState<"top" | "todos">("top");
  const [reacciones, setReacciones] = useState<{ [key: number]: { likes: number; dislikes: number } }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  const categoriasPrincipales = ["🏛️ Gobierno parroquial", "🇪🇨 Mensaje para el Ecuador"];
  const [subcategoriasPorCategoria, setSubcategoriasPorCategoria] = useState<{ [key: string]: string[] }>({});

  const seleccionarSubcategoria = (s: string) => {
    setSubcategoriaActiva((prev) => (prev === s ? null : s)); // Alternar la subcategoría
  };

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

  const rotacionAleatoria = () => {
    const grado = Math.floor(Math.random() * 61) - 30;
    return `rotate(${grado}deg)`;
  };

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const onScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setHighlightedSection(hash);
        setTimeout(() => setHighlightedSection(null), 2000);
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  useEffect(() => {
    fetch("/data/respuestas_clasificadas.json")
      .then((res) => res.json())
      .then((json) => {
        if (!json || !Array.isArray(json)) {
          console.error("Datos no válidos para respuestas:", json);
          return;
        }
        const datosConId: Mensaje[] = json.map((item: any, idx: number) => ({
          id: idx,
          Categoría: item.Categoría,
          Subcategoría: item.Subcategoría,
          Mensaje: item.Mensaje,
          Presidente: item.Presidente,
          Parroquia: item.Parroquia,
          Canton: item["Cantón"],
          Provincia: item.Provincia,
        }));
        setData(datosConId);

        const storedReacciones = localStorage.getItem("vozRuralReacciones");
        if (storedReacciones) {
          try {
            setReacciones(JSON.parse(storedReacciones));
          } catch {}
        } else {
          const inicial: { [key: number]: { likes: number; dislikes: number } } = {};
          datosConId.forEach((m) => {
            if (m.id !== undefined) inicial[m.id] = { likes: 0, dislikes: 0 };
          });
          setReacciones(inicial);
          localStorage.setItem("vozRuralReacciones", JSON.stringify(inicial));
        }

        const subsPorCat: { [key: string]: string[] } = {};
        categoriasPrincipales.forEach((cat) => {
          const todas = Array.isArray(datosConId)
            ? datosConId
                .filter((d) => d.Categoría === cat)
                .map((d) => (d.Subcategoría ? d.Subcategoría.trim() : ""))
                .filter((s) => s !== "")
            : [];

          const filtradas =
            todas.length > 0
              ? todas.filter((sub, index, arr) => sub !== "" && arr.indexOf(sub) !== index)
              : [];

          subsPorCat[cat] = Array.from(new Set(filtradas));
        });
        setSubcategoriasPorCategoria(subsPorCat);
      })
      .catch((error) => {
        console.error("Error cargando respuestas:", error);
      });
  }, []);

  const toggleCategoria = (cat: string) => {
    if (categoriaActiva === cat) {
      return;
    }
    setCategoriaActiva(cat);
    setSubcategoriaActiva(null); // Resetea la subcategoría cuando se cambia de categoría
  };

  let mensajesFiltrados = (data || []).filter(
    (d) =>
      d.Categoría === categoriaActiva &&
      (subcategoriaActiva ? d.Subcategoría === subcategoriaActiva : true)
  );

  if (modoVisualizacion === "top") {
    mensajesFiltrados = mensajesFiltrados
      .filter(Boolean)
      .slice()
      .sort((a, b) => (reacciones[b.id]?.likes || 0) - (reacciones[a.id]?.likes || 0))
      .slice(0, 3);
  } else if (modoVisualizacion === "todos") {
    mensajesFiltrados = mensajesFiltrados.filter(Boolean);
  }

  const mensajesAleatorios = (data || [])
    .filter(Boolean)
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const votar = (id: number, tipo: "like" | "dislike") => {
    setReacciones((prev) => {
      const votoActual = prev[id] || { likes: 0, dislikes: 0 };

      const storedUserVotes = JSON.parse(localStorage.getItem("vozRuralUserVotes") || "{}");
      const votoUsuario = storedUserVotes[id];

      if (votoUsuario === tipo) {
        alert(`Ya has votado ${tipo} en este mensaje.`);
        return prev;
      }

      let nuevosLikes = votoActual.likes;
      let nuevosDislikes = votoActual.dislikes;

      if (votoUsuario === "like" && tipo === "dislike") {
        nuevosLikes = Math.max(0, nuevosLikes - 1);
        nuevosDislikes = nuevosDislikes + 1;
      } else if (votoUsuario === "dislike" && tipo === "like") {
        nuevosDislikes = Math.max(0, nuevosDislikes - 1);
        nuevosLikes = nuevosLikes + 1;
      } else if (votoUsuario === undefined) {
        if (tipo === "like") nuevosLikes++;
        else nuevosDislikes++;
      }

      storedUserVotes[id] = tipo;
      localStorage.setItem("vozRuralUserVotes", JSON.stringify(storedUserVotes));

      const nuevasReacciones = {
        ...prev,
        [id]: { likes: nuevosLikes, dislikes: nuevosDislikes },
      };
      localStorage.setItem("vozRuralReacciones", JSON.stringify(nuevasReacciones));

      return nuevasReacciones;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="max-w-[1300px] mx-auto p-5"
      style={{ backgroundColor: "#fff", color: "#222", position: "relative", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Introducción y Nube de Palabras */}
      <motion.section
        id="voz-rural"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        className="text-center mb-10 max-w-[800px] mx-auto"
      >
        <motion.h1
          className="text-3xl font-heading font-bold mb-3"
          variants={fadeUpVariant}
        >
          Mensajes de las Parroquias
        </motion.h1>
        <motion.p
          className="text-gray-600 text-base mb-8"
          variants={fadeUpVariant}
        >
          Esta página visualiza la voz de las parroquias rurales del Ecuador mediante mensajes representativos...
        </motion.p>
        <motion.h2
          className="text-2xl font-semibold mb-4"
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
                  fontWeight: "600",
                  display: "inline-block",
                  cursor: "default",
                  transform: rotacion,
                  userSelect: "none",
                  transition: "transform 0.3s ease, color 0.3s ease",
                  zIndex: 1,
                }}
                title={`${palabra} (${frecuencia})`}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLSpanElement).style.color = "#FF4500";
                  (e.currentTarget as HTMLSpanElement).style.transform = "scale(1.3) rotate(0deg)";
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
      </motion.section>

      {/* Sección: ¿Por qué los Gobiernos Parroquiales son importantes? */}
      <motion.section
        id="importancia-gobierno"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={highlightVariant}
        animate={highlightedSection === "importancia-gobierno" ? "highlighted" : "normal"}
        className="mb-12 rounded-lg p-5"
      >
        <h2 className="text-3xl font-heading font-bold mb-5">
          ¿Por qué los Gobiernos Parroquiales son importantes?
        </h2>

        <div className={`flex justify-center gap-8 max-w-[1100px] mx-auto ${isMobile ? "flex-col" : "flex-row"} max-h-[650px] overflow-y-auto`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className={`bg-gray-100 p-5 rounded-lg ${isMobile ? "w-full" : "w-[700px]"}`}
          >
            {categoriasPrincipales.map((cat) => {
              if (cat !== "🏛️ Gobierno parroquial") return null;
              const abierto = categoriaActiva === cat;
              const subs = Array.isArray(subcategoriasPorCategoria[cat]) ? subcategoriasPorCategoria[cat] : [];
              return (
                <div
                  key={cat}
                  className="mb-5 border border-gray-300 rounded-lg bg-white cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => toggleCategoria(cat)}
                >
                  <button
                    className="w-full p-3 text-left text-gray-900 text-lg font-semibold bg-transparent border-none cursor-pointer"
                  >
                    {cat}
                  </button>

                  {abierto && (
                    <div className="px-5 pt-2 text-gray-700 text-sm">
                      {subs && subs.length > 0 ? (
                        subs.map((s) => {
                          const sel = subcategoriaActiva === s;
                          return (
                            <p
                              key={s}
                              onClick={() => seleccionarSubcategoria(s)}
                              className={`my-1 cursor-pointer ${sel ? "font-bold text-blue-600" : "font-normal text-gray-700"}`}
                            >
                              {s}
                            </p>
                          );
                        })
                      ) : (
                        <p>No hay subcategorías.</p>
                      )}

                      <button
                        onClick={() =>
                          setModoVisualizacion(modoVisualizacion === "top" ? "todos" : "top")
                        }
                        className="mb-4 mt-3 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      >
                        {modoVisualizacion === "top" ? "Ver todos los mensajes" : "Ver solo los mejores 3"}
                      </button>

                      {mensajesFiltrados && mensajesFiltrados.length > 0 ? (
                        <div className="mt-3 max-h-[350px] overflow-y-auto">
                          {mensajesFiltrados
                            .filter((m) => m.Categoría === "🏛️ Gobierno parroquial")
                            .map((m) => (
                              <div
                                key={m.id}
                                className="bg-white rounded-lg p-4 mb-3 shadow"
                              >
                                <p className="font-bold mb-2">📄 Mensaje:</p>
                                <p className="mb-3 whitespace-pre-wrap text-gray-800">{m.Mensaje}</p>
                                <p className="text-gray-600 text-sm mb-3 flex gap-2 items-center">
                                  👤 {m.Presidente.toLowerCase()} – {m.Canton.toLowerCase()} – {m.Provincia.toLowerCase()}
                                </p>
                                <div className="flex gap-4 text-lg">
                                  <button
                                    onClick={() => votar(m.id, "like")}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    👍 {reacciones[m.id]?.likes || 0}
                                  </button>
                                  <button
                                    onClick={() => votar(m.id, "dislike")}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    👎 {reacciones[m.id]?.dislikes || 0}
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 mt-2">No hay mensajes para mostrar.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className={`bg-gray-100 p-5 rounded-lg overflow-y-auto ${isMobile ? "w-full" : "w-[350px]"}`}
            style={{ maxHeight: isMobile ? "none" : 650 }}
          >
            <h3 className="text-2xl font-semibold mb-5 text-gray-900">🌟 Mensajes aleatorios</h3>
            {mensajesAleatorios
              .filter((m) => m.Categoría === "🏛️ Gobierno parroquial")
              .map((m) => (
                <div key={m.id} className="bg-white rounded-lg p-4 mb-5 italic shadow hover:shadow-lg">
                  <p className="mb-3 text-gray-800">
                    “{m.Mensaje.length > 250 ? m.Mensaje.slice(0, 250) + "..." : m.Mensaje}”
                  </p>
                  <p className="text-gray-600 text-sm">
                    👤 {m.Presidente.toLowerCase()} – {m.Canton.toLowerCase()} – {m.Provincia.toLowerCase()}
                  </p>
                </div>
              ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Sección: Mensaje de las parroquias rurales al Ecuador */}
      <motion.section
        id="mensaje-parroquias"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        animate={highlightedSection === "mensaje-parroquias" ? "highlighted" : "normal"}
        className="mb-12 rounded-lg p-5"
      >
        <h2 className="text-3xl font-heading font-bold mb-5">Mensaje de las parroquias rurales al Ecuador</h2>

        <div className={`flex justify-center gap-8 max-w-[1100px] mx-auto ${isMobile ? "flex-col" : "flex-row"} max-h-[650px] overflow-y-auto`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className={`bg-gray-100 p-5 rounded-lg ${isMobile ? "w-full" : "w-[700px]"}`}
          >
            {categoriasPrincipales.map((cat) => {
              if (cat !== "🇪🇨 Mensaje para el Ecuador") return null;
              const abierto = categoriaActiva === cat;
              const subs = Array.isArray(subcategoriasPorCategoria[cat]) ? subcategoriasPorCategoria[cat] : [];
              return (
                <div
                  key={cat}
                  className="mb-5 border border-gray-300 rounded-lg bg-white cursor-pointer transition-shadow hover:shadow-lg"
                  onClick={() => toggleCategoria(cat)}
                >
                  <button
                    className="w-full p-3 text-left text-gray-900 text-lg font-semibold bg-transparent border-none cursor-pointer"
                  >
                    {cat}
                  </button>

                  {abierto && (
                    <div className="px-5 pt-2 text-gray-700 text-sm">
                      {subs && subs.length > 0 ? (
                        subs.map((s) => {
                          const sel = subcategoriaActiva === s;
                          return (
                            <p
                              key={s}
                              onClick={() => seleccionarSubcategoria(s)}
                              className={`my-1 cursor-pointer ${sel ? "font-bold text-blue-600" : "font-normal text-gray-700"}`}
                            >
                              {s}
                            </p>
                          );
                        })
                      ) : (
                        <p>No hay subcategorías.</p>
                      )}

                      <button
                        onClick={() =>
                          setModoVisualizacion(modoVisualizacion === "top" ? "todos" : "top")
                        }
                        className="mb-4 mt-3 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                      >
                        {modoVisualizacion === "top" ? "Ver todos los mensajes" : "Ver solo los mejores 3"}
                      </button>

                      {mensajesFiltrados && mensajesFiltrados.length > 0 ? (
                        <div className="mt-3 max-h-[350px] overflow-y-auto">
                          {mensajesFiltrados
                            .filter((m) => m.Categoría === "🇪🇨 Mensaje para el Ecuador")
                            .map((m) => (
                              <div
                                key={m.id}
                                className="bg-white rounded-lg p-4 mb-3 shadow"
                              >
                                <p className="font-bold mb-2">📄 Mensaje:</p>
                                <p className="mb-3 whitespace-pre-wrap text-gray-800">{m.Mensaje}</p>
                                <p className="text-gray-600 text-sm mb-3 flex gap-2 items-center">
                                  👤 {m.Presidente.toLowerCase()} – {m.Canton.toLowerCase()} – {m.Provincia.toLowerCase()}
                                </p>
                                <div className="flex gap-4 text-lg">
                                  <button
                                    onClick={() => votar(m.id, "like")}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    👍 {reacciones[m.id]?.likes || 0}
                                  </button>
                                  <button
                                    onClick={() => votar(m.id, "dislike")}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
                                    👎 {reacciones[m.id]?.dislikes || 0}
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-gray-600 mt-2">No hay mensajes para mostrar.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className={`bg-gray-100 p-5 rounded-lg overflow-y-auto ${isMobile ? "w-full" : "w-[350px]"}`}
            style={{ maxHeight: isMobile ? "none" : 650 }}
          >
            <h3 className="text-2xl font-semibold mb-5 text-gray-900">🌟 Mensajes aleatorios</h3>
            {mensajesAleatorios
              .filter((m) => m.Categoría === "🇪🇨 Mensaje para el Ecuador")
              .map((m) => (
                <div key={m.id} className="bg-white rounded-lg p-4 mb-5 italic shadow hover:shadow-lg">
                  <p className="mb-3 text-gray-800">
                    “{m.Mensaje.length > 250 ? m.Mensaje.slice(0, 250) + "..." : m.Mensaje}”
                  </p>
                  <p className="text-gray-600 text-sm">
                    👤 {m.Presidente.toLowerCase()} – {m.Canton.toLowerCase()} – {m.Provincia.toLowerCase()}
                  </p>
                </div>
              ))}
          </motion.div>
        </div>
      </motion.section>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-600 text-white rounded-full w-12 h-12 text-xl shadow-lg select-none"
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>
  );
}
