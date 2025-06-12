"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const blockHover = {
  scale: 1.05,
  boxShadow: "0 6px 28px rgba(52, 80, 68, 0.18)",
  transition: { duration: 0.25, type: "spring", stiffness: 220 },
};

const titleHover = {
  color: "#207364",
  transition: { duration: 0.2 },
};

interface Mensaje {
  texto: string;
  emocion: string;
}

interface PreguntaData {
  pregunta: number;
  mensajes: Mensaje[];
}

// ---- Contador animado tipado ----
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    if (!target || isNaN(target)) return;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [target]);

  return <>{count}+</>;
}

export default function MetodologiaPage() {
  const [dataRaw, setDataRaw] = useState<PreguntaData[]>([]);
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
        color: "var(--foreground)",
        background: "var(--background)",
        fontFamily: `Montserrat, var(--font-sans), "Baloo 2", sans-serif`,
      }}
    >
      {/* Título principal */}
      <motion.h1
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        variants={{
          ...fadeUpVariant,
          hover: titleHover,
        }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          fontWeight: "bold",
          fontSize: 28,
          marginBottom: 10,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        Metodología de Recolección y Análisis
      </motion.h1>

      {/* Descripción */}
      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          fontSize: 15,
          lineHeight: 1.7,
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
        whileHover="hover"
        variants={{
          ...fadeUpVariant,
          hover: titleHover,
        }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          fontWeight: "600",
          fontSize: 22,
          marginBottom: 15,
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        Proceso de Recolección de Datos
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true, amount: 0.3 }}
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
          { title: "Pregunta 1", text: "¿Por qué su gobierno parroquial es importante para su comunidad?" },
          { title: "Pregunta 2", text: "¿Enumere en orden de prioridad máximo 10 problemáticas que usted identifica en su parroquia?" },
          { title: "Pregunta 3", text: "¿Cual seria su mensaje para el Ecuador?" },
        ].map(({ title, text }, i) => (
          <motion.div
            key={title}
            initial="hidden"
            whileInView="visible"
            whileHover={blockHover}
            variants={fadeUpVariant}
            transition={{ delay: i * 0.12 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              backgroundColor: "#a6bbb5",
              borderRadius: 10,
              padding: 20,
              width: "100%",
              boxShadow: "0 2px 8px rgba(0,0,0,0.11)",
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
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
        whileHover="hover"
        variants={{
          ...fadeUpVariant,
          hover: titleHover,
        }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          fontWeight: "600",
          fontSize: 22,
          marginBottom: 15,
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        Análisis y Procesamiento de la Información
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true, amount: 0.3 }}
        style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 700, marginBottom: 60 }}
      >
        Para procesar los videos de manera eficiente, un software de transcripción automática, con el fin de convertir el contenido audiovisual en texto. Luego, se tabularon los datos y se analizaron las respuestas con el siguiente enfoque: Identificación de los problemas más frecuentes por parroquia, provincia y región. Clasificación y análisis de los mensajes dirigidos al Ecuador.
      </motion.p>

      {/* Resultados Obtenidos */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        variants={{
          ...fadeUpVariant,
          hover: titleHover,
        }}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          fontWeight: "600",
          fontSize: 22,
          marginBottom: 30,
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        Resultados Obtenidos
      </motion.h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true, amount: 0.3 }}
        style={{
          display: "flex",
          justifyContent: "space-around",
          maxWidth: 700,
          margin: "auto",
          gap: 30,
          flexWrap: "wrap",
        }}
      >
        {[
          {
            count: totalMensajes > 0 ? 1500 : 0,
            label: "Problemas Identificados",
            icon: "😃",
            percent: porcentajes.positivos,
            color: "#444",
          },
          {
            count: totalMensajes > 0 ? 140 : 0,
            label: "Mensajes al Ecuador",
            icon: "😐",
            percent: porcentajes.neutros,
            color: "#444",
          },
          {
            count: totalMensajes > 0 ? 15 : 0,
            label: "Datos Curiosos",
            icon: "🙁",
            percent: porcentajes.negativos,
            color: "#444",
          },
        ].map(({ count, label, icon, percent, color }, i) => (
          <motion.div
            key={label}
            initial="hidden"
            whileInView="visible"
            whileHover={blockHover}
            variants={fadeUpVariant}
            transition={{ delay: i * 0.13 }}
            viewport={{ once: true, amount: 0.3 }}
            style={{
              textAlign: "center",
              minWidth: 150,
              background: "#f6faf7",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              padding: "24px 12px 20px 12px",
              cursor: "pointer",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
          >
            <h3 style={{ fontWeight: "700", fontSize: 30, marginBottom: 5 }}>
              <AnimatePresence>
                {totalMensajes > 0 ? <Counter target={count} /> : "..."}
              </AnimatePresence>
            </h3>
            <p style={{ fontWeight: "600", marginBottom: 5 }}>{label}</p>
            <p style={{ fontSize: 28 }}>{icon}</p>
            <p style={{ fontWeight: "600", color }}>{percent}%</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
