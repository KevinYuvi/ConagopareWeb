"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Mensaje {
  texto: string;
  emocion: string;    // p.ej. "😄 Alegría"
}

interface PreguntaData {
  pregunta: number;
  mensajes: Mensaje[];
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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

            if (
              emocion.includes("alegría") ||
              emocion.includes("positivo") ||
              emocion.includes("😄") ||
              emocion.includes("😃")
            ) {
              positivos++;
            } else if (
              emocion.includes("neutral") ||
              emocion.includes("😐") ||
              emocion.includes("neutro")
            ) {
              neutros++;
            } else if (
              emocion.includes("negativo") ||
              emocion.includes("triste") ||
              emocion.includes("🙁") ||
              emocion.includes("😞")
            ) {
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
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{ fontWeight: "bold", fontSize: 28, marginBottom: 10, textAlign: "center" }}
      >
        Metodología de Recolección y Análisis
      </motion.h1>

      {/* Descripción */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          maxWidth: 700,
          margin: "auto",
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        En esta sección se detalla el proceso de recolección, análisis y presentación de los datos que forman parte de este proyecto, cuyo objetivo es visibilizar las problemáticas y perspectivas de las parroquias rurales del Ecuador.
      </motion.p>

      {/* Proceso de Recolección de Datos */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{ fontWeight: "600", fontSize: 22, marginBottom: 15 }}
      >
        Proceso de Recolección de Datos
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 700, marginBottom: 60 }}
      >
        La recopilación de información se llevó a cabo a través de entrevistas dirigidas a los representantes de los Gobiernos Autónomos Descentralizados Parroquiales (GAD). A cada representante se le solicitó responder tres preguntas clave: Las respuestas fueron entregadas en su mayoría en formato de video, grabados por los mismos representantes y enviados a CONAGOPARE. En algunos casos, las respuestas fueron entregadas por escrito. En total, se recibieron aproximadamente 160 videos con información valiosa sobre las realidades de cada parroquia.
      </motion.p>

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
        {[ 
          { title: "Pregunta 1", text: "¿Cuáles son los 10 principales problemas de su parroquia?" },
          { title: "Pregunta 2", text: "¿Por qué su parroquia es importante para sus habitantes?" },
          { title: "Pregunta 3", text: "¿Qué mensaje desea transmitir al Ecuador?" },
        ].map(({ title, text }, i) => (
          <motion.div
            key={title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            transition={{ delay: i * 0.15 }}
            style={{
              backgroundColor: "#a6bbb5",
              borderRadius: 10,
              padding: 20,
              width: "100%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <strong>{title}</strong>
            <p style={{ marginTop: 10, fontSize: 14 }}>{text}</p>
          </motion.div>
        ))}
      </div>

      {/* Análisis y Procesamiento */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{ fontWeight: "600", fontSize: 22, marginBottom: 15 }}
      >
        Análisis y Procesamiento de la Información
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 700, marginBottom: 60 }}
      >
        Para procesar los videos de manera eficiente, un software de transcripción automática, con el fin de convertir el contenido audiovisual en texto. Luego, se tabularon los datos y se analizaron las respuestas con el siguiente enfoque: Identificación de los problemas más frecuentes por parroquia, provincia y región. Clasificación y análisis de los mensajes dirigidos al Ecuador.
      </motion.p>

      {/* Resultados Obtenidos */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{ fontWeight: "600", fontSize: 22, marginBottom: 30 }}
      >
        Resultados Obtenidos
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUpVariant}
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: 700,
          margin: "auto",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        {[{
          count: totalMensajes > 0 ? "1500 +" : "...",
          label: "Problemas Identificados",
          icon: "😃",
          percent: porcentajes.positivos,
          color: "#444"
        },{
          count: totalMensajes > 0 ? "140 +" : "...",
          label: "Mensajes al Ecuador",
          icon: "😐",
          percent: porcentajes.neutros,
          color: "#444"
        },{
          count: totalMensajes > 0 ? "15 +" : "...",
          label: "Datos Curiosos",
          icon: "🙁",
          percent: porcentajes.negativos,
          color: "#444"
        }].map(({ count, label, icon, percent, color }, i) => (
          <motion.div
            key={label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            transition={{ delay: i * 0.15 }}
            style={{ textAlign: "center", minWidth: 150 }}
          >
            <h3 style={{ fontWeight: "700", fontSize: 28, marginBottom: 5 }}>{count}</h3>
            <p style={{ fontWeight: "600", marginBottom: 5 }}>{label}</p>
            <p style={{ fontSize: 24 }}>{icon}</p>
            <p style={{ fontWeight: "600", color }}>{percent}%</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
