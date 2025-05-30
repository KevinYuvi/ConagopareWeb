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

export default function VozRuralPage() {
  const [data, setData] = useState<Mensaje[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [subcategoriaActiva, setSubcategoriaActiva] = useState<string | null>(null);
  const [modoVisualizacion, setModoVisualizacion] = useState<"top" | "todos">("top");
  const [reacciones, setReacciones] = useState<{ [key: number]: { likes: number; dislikes: number } }>({});

  const categoriasPrincipales = ["🏛️ Gobierno parroquial", "🇪🇨 Mensaje para el Ecuador"];
  const [subcategoriasPorCategoria, setSubcategoriasPorCategoria] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    fetch("/data/respuestas_clasificadas.json")
      .then((res) => res.json())
      .then((json) => {
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
        datosConId.forEach((m) => (inicial[m.id] = { likes: 0, dislikes: 0 }));
        setReacciones(inicial);

        const subsPorCat: { [key: string]: string[] } = {};
        categoriasPrincipales.forEach((cat) => {
          const todas = datosConId
            .filter((d) => d.Categoría === cat)
            .map((d) => d.Subcategoría)
            .filter((s) => s && s.trim() !== "");
          const filtradas = todas.filter((sub) => todas.filter((x) => x === sub).length > 1);
          subsPorCat[cat] = Array.from(new Set(filtradas));
        });
        setSubcategoriasPorCategoria(subsPorCat);
      });
  }, []);

  const toggleCategoria = (cat: string) => {
    setCategoriaActiva((prev) => (prev === cat ? null : cat));
    setSubcategoriaActiva(null);
  };
  const seleccionarSubcategoria = (s: string) => setSubcategoriaActiva((prev) => (prev === s ? null : s));

  let mensajesFiltrados = data.filter(
    (d) =>
      d.Categoría === categoriaActiva &&
      (subcategoriaActiva ? d.Subcategoría === subcategoriaActiva : true)
  );
  if (modoVisualizacion === "top") {
    mensajesFiltrados = mensajesFiltrados
      .slice()
      .sort((a, b) => (reacciones[b.id]?.likes || 0) - (reacciones[a.id]?.likes || 0))
      .slice(0, 3);
  }

  const mensajesAleatorios = data.slice().sort(() => Math.random() - 0.5).slice(0, 3);

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
      {/* Sección superior centrada */}
      <section
        style={{
          textAlign: "center",
          marginBottom: 40,
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 12 }}>Mensajes de las Parroquias</h1>
        <p style={{ color: "#555", fontSize: 16, marginBottom: 30 }}>
          Esta página visualiza la voz de las parroquias rurales del Ecuador mediante mensajes representativos...
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 15 }}>Mensajes Principales</h2>
        <img
          src="/images/wordcloud-example.png"
          alt="Nube de palabras"
          style={{
            width: "100%",
            maxHeight: 250,
            objectFit: "contain",
            borderRadius: 8,
            display: "block",
            margin: "auto",
          }}
        />
      </section>

      {/* Contenedor principal centrado y con scroll */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 30,
          maxHeight: 650,
          overflow: "hidden",
          margin: "0 auto",
          maxWidth: 1100,
        }}
      >
        {/* Panel Izquierdo */}
        <div
          style={{
            flex: "0 0 700px",
            backgroundColor: "#f7f7f7",
            padding: 20,
            overflowY: "auto",
            borderRadius: 8,
          }}
        >
          <h3 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#222" }}>
            📋 Análisis de Respuestas
          </h3>
          {categoriasPrincipales.map((cat) => {
            const abierto = categoriaActiva === cat;
            const subs = subcategoriasPorCategoria[cat] || [];
            return (
              <div
                key={cat}
                style={{
                  marginBottom: 20,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  backgroundColor: "#fff",
                }}
              >
                <button
                  onClick={() => toggleCategoria(cat)}
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
                    {subs.length === 0 ? (
                      <p>No hay subcategorías.</p>
                    ) : (
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

                    {mensajesFiltrados.length > 0 && (
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
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Panel Derecho */}
        <div
          style={{
            flex: "0 0 350px",
            backgroundColor: "#f7f7f7",
            padding: 20,
            overflowY: "auto",
            borderRadius: 8,
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 20, color: "#222" }}>
            🌟 Mensajes aleatorios
          </h3>
          {mensajesAleatorios.map((m) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
