"use client";

import React, { useEffect, useState } from "react";

interface Mensaje {
  texto: string;
  emocion: string;    // p.ej. "😄 Alegría"
}

interface PreguntaData {
  pregunta: number;
  mensajes: Mensaje[];
}

export default function MetodologiaPage() {
  const [dataRaw, setDataRaw] = useState<PreguntaData[]>([]);

  // Estado para resultados calculados
  const [totalMensajes, setTotalMensajes] = useState(0);
  const [porcentajes, setPorcentajes] = useState({
    positivos: 0,
    neutros: 0,
    negativos: 0,
  });

  useEffect(() => {
    fetch("/data/mensajes_con_emociones.json")
      .then((res) => res.json())
      .then((json: PreguntaData[]) => {
        setDataRaw(json);

        // Procesar para calcular totales y porcentajes
        let positivos = 0,
          neutros = 0,
          negativos = 0,
          total = 0;

        json.forEach((pregunta) => {
          pregunta.mensajes.forEach((mensaje) => {
            total++;
            const emocion = mensaje.emocion.toLowerCase();

            if (emocion.includes("alegría") || emocion.includes("positivo") || emocion.includes("😄") || emocion.includes("😃")) {
              positivos++;
            } else if (emocion.includes("neutral") || emocion.includes("😐") || emocion.includes("neutro")) {
              neutros++;
            } else if (emocion.includes("negativo") || emocion.includes("triste") || emocion.includes("🙁") || emocion.includes("😞")) {
              negativos++;
            }
          });
        });

        setTotalMensajes(total);
        setPorcentajes({
          positivos: total ? Math.round((positivos / total) * 100) : 0,
          neutros: total ? Math.round((neutros / total) * 100) : 0,
          negativos: total ? Math.round((negativos / total) * 100) : 0,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div
      style={{
        maxWidth: 960,
        margin: "auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      {/* Título principal */}
      <h1 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 10, textAlign: "center" }}>
        Metodología de Recolección y Análisis
      </h1>
      {/* Descripción */}
      <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 700, margin: "auto", marginBottom: 50, textAlign: "center" }}>
        En esta sección se detalla el proceso de recolección, análisis y presentación de los datos que forman parte de este proyecto, cuyo objetivo es visibilizar las problemáticas y perspectivas de las parroquias rurales del Ecuador.
      </p>

      {/* Proceso de Recolección de Datos */}
      <h2 style={{ fontWeight: "600", fontSize: 22, marginBottom: 15 }}>
        Proceso de Recolección de Datos
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 700, marginBottom: 60 }}>
        La recopilación de información se llevó a cabo a través de entrevistas dirigidas a los representantes de los Gobiernos Autónomos Descentralizados Parroquiales (GAD). A cada representante se le solicitó responder tres preguntas clave: Las respuestas fueron entregadas en su mayoría en formato de video, grabados por los mismos representantes y enviados a CONAGOPARE. En algunos casos, las respuestas fueron entregadas por escrito. En total, se recibieron aproximadamente 160 videos con información valiosa sobre las realidades de cada parroquia.
      </p>

      {/* Bloques preguntas alineados a la derecha */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 20,
          maxWidth: 350,
          marginLeft: "auto",
          marginBottom: 80,
        }}
      >
        {/* Cada bloque */}
        <div
          style={{
            backgroundColor: "#a6bbb5",
            borderRadius: 10,
            padding: 20,
            width: "100%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <strong>Pregunta 1</strong>
          <p style={{ marginTop: 10, fontSize: 14 }}>
            ¿Cuáles son los 10 principales problemas de su parroquia?
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#a6bbb5",
            borderRadius: 10,
            padding: 20,
            width: "100%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <strong>Pregunta 2</strong>
          <p style={{ marginTop: 10, fontSize: 14 }}>
            ¿Por qué su parroquia es importante para sus habitantes?
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#a6bbb5",
            borderRadius: 10,
            padding: 20,
            width: "100%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <strong>Pregunta 3</strong>
          <p style={{ marginTop: 10, fontSize: 14 }}>
            ¿Qué mensaje desea transmitir al Ecuador?
          </p>
        </div>
      </div>

      {/* Análisis y Procesamiento */}
      <h2 style={{ fontWeight: "600", fontSize: 22, marginBottom: 15 }}>
        Análisis y Procesamiento de la Información
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 700, marginBottom: 60 }}>
        Para procesar los videos de manera eficiente, un software de transcripción automática, con el fin de convertir el contenido audiovisual en texto. Luego, se tabularon los datos y se analizaron las respuestas con el siguiente enfoque: Identificación de los problemas más frecuentes por parroquia, provincia y región. Clasificación y análisis de los mensajes dirigidos al Ecuador.
      </p>

      {/* Resultados Obtenidos */}
      <h2 style={{ fontWeight: "600", fontSize: 22, marginBottom: 30 }}>
        Resultados Obtenidos
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: 700,
          margin: "auto",
          gap: 30,
        }}
      >
        {/* Cada bloque resultado */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontWeight: "700", fontSize: 28, marginBottom: 5 }}>{totalMensajes > 0 ? "1500 +" : "..."}</h3>
          <p style={{ fontWeight: "600", marginBottom: 5 }}>Problemas Identificados</p>
          <p style={{ fontSize: 24 }}>😃</p>
          <p style={{ fontWeight: "600", color: "#444" }}>{porcentajes.positivos}% Positivos</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontWeight: "700", fontSize: 28, marginBottom: 5 }}>{totalMensajes > 0 ? "140 +" : "..."}</h3>
          <p style={{ fontWeight: "600", marginBottom: 5 }}>Mensajes al Ecuador</p>
          <p style={{ fontSize: 24 }}>😐</p>
          <p style={{ fontWeight: "600", color: "#444" }}>{porcentajes.neutros}% Neutros</p>
        </div>

        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontWeight: "700", fontSize: 28, marginBottom: 5 }}>{totalMensajes > 0 ? "15 +" : "..."}</h3>
          <p style={{ fontWeight: "600", marginBottom: 5 }}>Datos Curiosos</p>
          <p style={{ fontSize: 24 }}>🙁</p>
          <p style={{ fontWeight: "600", color: "#444" }}>{porcentajes.negativos}% Negativos</p>
        </div>
      </div>
    </div>
  );
}
