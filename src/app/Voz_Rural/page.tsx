"use client";

import React, { useState, useEffect } from "react";

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

export default function VozRuralPage() {
  const [data, setData] = useState<Mensaje[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [modoVisualizacion, setModoVisualizacion] = useState<"top" | "todos">("top");
  const [reacciones, setReacciones] = useState<{ [key: number]: { likes: number; dislikes: number } }>({});
  const [isMobile, setIsMobile] = useState(false);

  const categoriasPrincipales = ["🏛️ Gobierno parroquial", "🇪🇨 Mensaje para el Ecuador"];
  const [subcategoriasPorCategoria, setSubcategoriasPorCategoria] = useState<{ [key: string]: string[] }>({});

  // Nube de palabras hardcodeada (puedes cargarla de un JSON)
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
    { palabra: "participación", frecuencia: 64 },
    { palabra: "proyecto", frecuencia: 40 },
    { palabra: "local", frecuencia: 39 },
    { palabra: "trabajo", frecuencia: 38 },
    { palabra: "beneficio", frecuencia: 37 },
    // añade más palabras si quieres
  ];

  // Escala frecuencia a tamaño de fuente
  const mapFrecuenciaATamaño = (freq: number) => {
    const minFont = 14;
    const maxFont = 70;
    const minFreq = Math.min(...palabrasRelevantes.map((p) => p.frecuencia));
    const maxFreq = Math.max(...palabrasRelevantes.map((p) => p.frecuencia));
    if (maxFreq === minFreq) return (minFont + maxFont) / 2;
    return ((freq - minFreq) / (maxFreq - minFreq)) * (maxFont - minFont) + minFont;
  };

  // Paleta de colores cálidos
  const colores = ["#b34700", "#cc6600", "#ff9900", "#cc3300", "#996633", "#804000", "#e67300"];
  const colorAleatorio = () => colores[Math.floor(Math.random() * colores.length)];

  // Rotación aleatoria entre -30 y 30 grados
  const rotacionAleatoria = () => {
    const grado = Math.floor(Math.random() * 61) - 30;
    return `rotate(${grado}deg)`;
  };

  // Detectar pantalla móvil para responsive
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
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

        const inicial: { [key: number]: { likes: number; dislikes: number } } = {};
        datosConId.forEach((m) => {
          if (m.id !== undefined) inicial[m.id] = { likes: 0, dislikes: 0 };
        });
        setReacciones(inicial);

        const subsPorCat: { [key: string]: string[] } = {};
        categoriasPrincipales.forEach((cat) => {
          const todas = Array.isArray(datosConId)
            ? datosConId
                .filter((d) => d.Categoría === cat)
                .map((d) => (d.Subcategoría ? d.Subcategoría.trim() : ""))
                .filter((s) => s !== "")
            : [];

          const filtradas = todas.length > 0
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
    setCategoriaActiva((prev) => (prev === cat ? null : cat));
    setSubcategoriaActiva(null);
  };
  const seleccionarSubcategoria = (s: string) => setSubcategoriaActiva((prev) => (prev === s ? null : s));

  let mensajesFiltrados = (data || []).filter(
    (d) => d.Categoría === categoriaActiva && (subcategoriaActiva ? d.Subcategoría === subcategoriaActiva : true)
  );

  if (modoVisualizacion === "top") {
    mensajesFiltrados = mensajesFiltrados
      .filter(Boolean)
      .slice()
      .sort((a, b) => (reacciones[b.id]?.likes || 0) - (reacciones[a.id]?.likes || 0))
      .slice(0, 3);
  }

  const mensajesAleatorios = (data || [])
    .filter(Boolean)
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const votar = (id: number, tipo: "like" | "dislike") => {
    setReacciones((prev) => {
      const cur = prev[id] || { likes: 0, dislikes: 0 };
      return {
        ...prev,
        [id]: {
          likes: tipo === "like" ? cur.likes + 1 : cur.likes,
          dislikes: tipo === "dislike" ? cur.dislikes + 1 : cur.dislikes,
        },
      };
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#222",
        maxWidth: 1300,
        margin: "auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <section
        style={{
          textAlign: "center",
          marginBottom: 40,
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 12 }}>
          Mensajes de las Parroquias
        </h1>
        <p style={{ color: "#555", fontSize: 16, marginBottom: 30 }}>
          Esta página visualiza la voz de las parroquias rurales del Ecuador mediante mensajes representativos...
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 15 }}>
          Nube de Palabras
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 20px",
            maxWidth: 900,
            margin: "auto",
          }}
        >
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
      </section>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          maxHeight: isMobile ? "none" : 650,
          overflow: isMobile ? "visible" : "hidden",
          margin: "0 auto",
          maxWidth: 1100,
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <div
          style={{
            flex: isMobile ? "1 1 auto" : "0 0 700px",
            width: isMobile ? "100%" : undefined,
            backgroundColor: "#f7f7f7",
            padding: 20,
            overflowY: "auto",
            borderRadius: 8,
          }}
        >
          <h3 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#222" }}>
            📋 Análisis de Respuestas
          </h3>
          {Array.isArray(categoriasPrincipales) && categoriasPrincipales.map((cat) => {
            const abierto = categoriaActiva === cat;
            const subs = Array.isArray(subcategoriasPorCategoria[cat]) ? subcategoriasPorCategoria[cat] : [];
            return (
              <div
                key={cat}
                style={{
                  marginBottom: 20,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 10px #0070f3";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
                onClick={() => toggleCategoria(cat)}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    color: "#222",
                    cursor: "pointer",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {cat}
                </button>

                {abierto && (
                  <div style={{ padding: "10px 20px 20px", color: "#555", fontSize: 14 }}>
                    {subs && subs.length > 0 ? (
                      subs.map((s) => {
                        const sel = subcategoriaActiva === s;
                        return (
                          <p
                            key={s}
                            onClick={() => seleccionarSubcategoria(s)}
                            style={{
                              margin: "6px 0",
                              cursor: "pointer",
                              fontWeight: sel ? "bold" : "normal",
                              color: sel ? "#0070f3" : "#555",
                            }}
                          >
                            {s}
                          </p>
                        );
                      })
                    ) : (
                      <p>No hay subcategorías.</p>
                    )}

                    {subs.length > 0 && (
                      <div style={{ marginTop: 20 }}>
                        <p style={{ marginBottom: 6, fontWeight: 600 }}>Modo de visualización</p>
                        <label style={{ marginRight: 12, cursor: "pointer", color: "#555" }}>
                          <input
                            type="radio"
                            checked={modoVisualizacion === "top"}
                            onChange={() => setModoVisualizacion("top")}
                            style={{ marginRight: 6 }}
                          />
                          Top votados
                        </label>
                        <label style={{ cursor: "pointer", color: "#555" }}>
                          <input
                            type="radio"
                            checked={modoVisualizacion === "todos"}
                            onChange={() => setModoVisualizacion("todos")}
                            style={{ marginRight: 6 }}
                          />
                          Todos
                        </label>
                      </div>
                    )}

                    {mensajesFiltrados && mensajesFiltrados.length > 0 ? (
                      <div
                        style={{
                          marginTop: 15,
                          maxHeight: "calc(650px - 300px)",
                          overflowY: "auto",
                        }}
                      >
                        {mensajesFiltrados.map((m) => (
                          <div
                            key={m.id}
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: 8,
                              padding: 15,
                              marginBottom: 12,
                              boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <p style={{ fontWeight: "bold", marginBottom: 8 }}>📄 Mensaje:</p>
                            <p style={{ marginBottom: 10, whiteSpace: "pre-wrap", color: "#333" }}>
                              {m.Mensaje}
                            </p>
                            <p
                              style={{
                                color: "#666",
                                fontSize: 14,
                                marginBottom: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                              }}
                            >
                              👤 {m.Presidente.toLowerCase()} – {m.Canton.toLowerCase()} – {m.Provincia.toLowerCase()}
                            </p>
                            <div style={{ display: "flex", gap: 10 }}>
                              <button
                                onClick={() => votar(m.id, "like")}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#0070f3",
                                  cursor: "pointer",
                                  fontSize: 18,
                                }}
                              >
                                👍 {reacciones[m.id]?.likes || 0}
                              </button>
                              <button
                                onClick={() => votar(m.id, "dislike")}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#999",
                                  cursor: "pointer",
                                  fontSize: 18,
                                }}
                              >
                                👎 {reacciones[m.id]?.dislikes || 0}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: "#666", marginTop: 10 }}>No hay mensajes para mostrar.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            flex: isMobile ? "1 1 auto" : "0 0 350px",
            width: isMobile ? "100%" : undefined,
            backgroundColor: "#f7f7f7",
            padding: 20,
            overflowY: "auto",
            borderRadius: 8,
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20, color: "#222" }}>
            🌟 Mensajes aleatorios
          </h3>
          {mensajesAleatorios && mensajesAleatorios.length > 0 ? (
            mensajesAleatorios.map((m) => (
              <div
                key={m.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 15,
                  marginBottom: 18,
                  fontStyle: "italic",
                  boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                }}
              >
                <p style={{ marginBottom: 12, color: "#333" }}>
                  “{m.Mensaje.length > 250 ? m.Mensaje.slice(0, 250) + "..." : m.Mensaje}”
                </p>
                <p style={{ color: "#666", fontSize: 14 }}>
                  👤 {m.Presidente.toLowerCase()} – {m.Canton.toLowerCase()} – {m.Provincia.toLowerCase()}
                </p>
              </div>
            ))
          ) : (
            <p style={{ color: "#666" }}>No hay mensajes aleatorios para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
}
