"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

interface Mensaje {
  texto: string;
  emocion: string;
}

interface PreguntaData {
  pregunta: number;
  mensajes: Mensaje[];
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const subtitulosPorPregunta: Record<number, string> = {
  1: "¿Por qué su gobierno parroquial es importante para su comunidad?",
  2: "¿Enumere en orden de prioridad máximo 10 problemáticas que usted identifica en su parroquia?",
  3: "¿Cuál sería su mensaje para el Ecuador?",
};

export default function DatosCuriososPage() {
  const [dataRaw, setDataRaw] = useState<PreguntaData[]>([]);
  const [selectedPregunta, setSelectedPregunta] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const colors = ["#4caf50", "#f44336", "#ff9800", "#2196f3", "#9c27b0"];

  const leyendasPorPregunta: Record<number, { color: string; label: string }[]> = {
    1: [
      { color: "#4caf50", label: "😐 Neutralidad" },
      { color: "#f44336", label: "😊 Alegría / Optimismo" },
      { color: "#ff9800", label: "😢 Tristeza / Preocupación" },
      { color: "#2196f3", label: "😡 Enojo / Frustración" },
    ],
    2: [
      { color: "#4caf50", label: "😐 Neutralidad / Indiferencia" },
      { color: "#f44336", label: "😢 Tristeza / Preocupación" },
      { color: "#ff9800", label: "😊 Alegría / Optimismo" },
      { color: "#2196f3", label: "😡 Enojo / Frustración" },
      { color: "#9c27b0", label: "😱 Asombro" },
    ],
    3: [
      { color: "#4caf50", label: "😐 Neutralidad" },
      { color: "#f44336", label: "😢 Tristeza / Preocupación" },
      { color: "#ff9800", label: "😯 Sorpresa / Preocupación" },
      { color: "#2196f3", label: "😱 Asombro" },
    ],
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 700);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/data/mensajes_con_emociones.json")
      .then((res) => res.json())
      .then((json: PreguntaData[]) => setDataRaw(json))
      .catch(console.error);
  }, []);

  const mensajes = useMemo(() => {
    const pq = dataRaw.find((p) => p.pregunta === selectedPregunta);
    return pq?.mensajes ?? [];
  }, [dataRaw, selectedPregunta]);

  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};
    mensajes.forEach(({ emocion }) => {
      const emoji = emocion.trim().split(" ")[0];
      counts[emoji] = (counts[emoji] || 0) + 1;
    });
    return Object.entries(counts).map(([emoji, count]) => ({ emoji, count }));
  }, [mensajes]);

  const leyendaActual = leyendasPorPregunta[selectedPregunta] ?? [];

  const cuadros = [
    {
      color: "#f44336",
      text: "Hubo quien nos respondió con enojo: que no enviaría nada, que no tenía tiempo...",
      style: { top: 20, left: 160, width: 200, height: 180, color: "white" },
    },
    {
      color: "#2196f3",
      text: "Algunas autoridades prefirieron enviar un audio o texto...",
      style: { top: 200, left: 250, width: 230, height: 160, color: "white" },
    },
    {
      color: "#ffeb3b",
      text: "Dos presidentes nos respondieron con firmeza: No estamos para hacer su trabajo...",
      style: { top: 30, right: 200, width: 280, height: 270, color: "black" },
    },
    {
      color: "#ffeb3b",
      text: "Una autoridad parroquial nos dijo: 'Por ahora no les puedo ayudar...'",
      style: { bottom: 40, left: 40, width: 160, height: 240, color: "black" },
    },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: 900, margin: "auto" }}>
      <motion.h1
        initial="hidden"
        whileInView="visible"
        variants={fadeUpVariant}
        viewport={{ once: true }}
        style={{ fontWeight: "bold", fontSize: 26, marginBottom: 10, textAlign: "center" }}
      >
        Datos Curiosos
      </motion.h1>

      <motion.section id="emociones" className="scroll-mt-38">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
          style={{ fontWeight: "bold", fontSize: 22, marginBottom: 10, textAlign: "center" }}
        >
          Emociones de las y los entrevistados
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
          style={{ marginBottom: 20, textAlign: "center" }}
        >
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setSelectedPregunta(n)}
              style={{
                marginRight: 8,
                padding: "0.5rem 1rem",
                background: selectedPregunta === n ? "#0070f3" : "#eee",
                color: selectedPregunta === n ? "#fff" : "#000",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Pregunta {n}
            </button>
          ))}
        </motion.div>

        <motion.h3
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
          style={{ textAlign: "center", fontWeight: 700, fontSize: 18, marginBottom: 14, color: "#505050" }}
        >
          {subtitulosPorPregunta[selectedPregunta]}
        </motion.h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 30, flexWrap: "wrap", justifyContent: "center" }}
        >
          <div style={{ flex: "1 1 400px", minWidth: 280, height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="emoji" tick={{ fontSize: 24 }} interval={0} angle={-20} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value: number) => [`${value}`, "Veces"]} />
                <Bar dataKey="count" fill="#82ca9d">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                  <LabelList dataKey="count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ flex: "0 0 240px", display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", userSelect: "none", minWidth: 200 }}>
            {leyendaActual.map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", borderRadius: 20, backgroundColor: "#f0f0f0", fontSize: 14 }}>
                <div style={{ width: 22, height: 22, backgroundColor: color, borderRadius: "50%", border: "1px solid #ccc" }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

     <motion.section id="anecdotas" style={{ marginTop: "160px", scrollMarginTop: "100px" }}>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUpVariant}
          viewport={{ once: true }}
          style={{ fontWeight: "bold", fontSize: 22, marginBottom: 10, textAlign: "center" }}
        >
          Anécdotas Random
        </motion.h2>

        <div style={{ position: "relative", width: "100%", height: 300, marginTop: 40, marginBottom: 60 }}>
          {cuadros.map(({ color, text, style }, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -20, scale: 1.08, boxShadow: "0 12px 32px rgba(0,0,0,0.25)", zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariant}
              style={{ position: "absolute", backgroundColor: color, padding: 20, borderRadius: 8, fontSize: 14, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", zIndex: 1, ...style }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
