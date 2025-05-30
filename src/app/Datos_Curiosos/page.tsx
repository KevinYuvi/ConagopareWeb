"use client";

import React, { useEffect, useState, useMemo } from 'react';
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
} from 'recharts';

interface Mensaje {
  texto: string;
  emocion: string;    // p.ej. "😄 Alegría"
}

interface PreguntaData {
  pregunta: number;
  mensajes: Mensaje[];
}

export default function DatosCuriososPage() {
  const [dataRaw, setDataRaw] = useState<PreguntaData[]>([]);
  const [selectedPregunta, setSelectedPregunta] = useState(1);

  const colors = ['#4caf50', '#f44336', '#ff9800', '#2196f3', '#9c27b0']; // verde, rojo, naranja, azul, morado

  useEffect(() => {
    fetch('/data/mensajes_con_emociones.json')
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
      const emoji = emocion.trim().split(' ')[0];
      counts[emoji] = (counts[emoji] || 0) + 1;
    });
    return Object.entries(counts).map(([emoji, count]) => ({ emoji, count }));
  }, [mensajes]);

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: 'auto' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 10, textAlign: 'center' }}>
        Datos Curiosos
      </h1>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 40, textAlign: 'center' }}>
        Los datos curiosos son fragmentos de información relevantes pero difíciles de clasificar dentro de las categorías principales del proyecto. A través de esta sección, buscamos resaltar esas voces únicas que aportan una perspectiva diferente sobre la realidad rural.
      </p>

      {/* Botones para seleccionar pregunta */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setSelectedPregunta(n)}
            style={{
              marginRight: 8,
              padding: '0.5rem 1rem',
              background: selectedPregunta === n ? '#0070f3' : '#eee',
              color: selectedPregunta === n ? '#fff' : '#000',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Pregunta {n}
          </button>
        ))}
      </div>

      {/* Gráfico */}
      <div style={{ width: '100%', height: 300, marginBottom: 50 }}>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="emoji"
              tick={{ fontSize: 24 }}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value: number) => [`${value}`, 'Veces']} />
            <Bar dataKey="count" fill="#82ca9d">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cuadros coloridos como en la imagen */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 300,
          marginTop: 20,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#f44336',
            color: 'white',
            padding: 20,
            width: 160,
            height: 120,
            top: 20,
            left: 20,
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Lorem ipsum dolor sit amet consectetur.
        </div>

        <div
          style={{
            position: 'absolute',
            backgroundColor: '#2196f3',
            color: 'white',
            padding: 20,
            width: 200,
            height: 160,
            top: 70,
            left: 130,
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Consectetur sit neque eu egestas nunc dolor tincidunt. Sed odio at diam nisi dui. Fermentum consectetur ornare purus fames nulla iaculis. In dapibus malesuada nullam.
        </div>

        <div
          style={{
            position: 'absolute',
            backgroundColor: '#ffeb3b',
            color: 'black',
            padding: 20,
            width: 180,
            height: 140,
            top: 30,
            right: 200,
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Algunas personas se negaron a grabar un video por temor a represalias, prefiriendo mantener su identidad en el anonimato.
        </div>

        <div
          style={{
            position: 'absolute',
            backgroundColor: '#ffeb3b',
            color: 'black',
            padding: 20,
            width: 160,
            height: 160,
            bottom: 20,
            left: 1,
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Consectetur sit neque eu egestas nunc dolor tincidunt. Sed odio at diam nisi dui. Fermentum consectetur ornare purus fames nulla iaculis. In dapibus malesuada nullam.
        </div>

        <div
          style={{
            position: 'absolute',
            backgroundColor: '#f44336',
            color: 'white',
            padding: 20,
            width: 160,
            height: 120,
            bottom: 20,
            right: 300,
            borderRadius: 8,
            fontSize: 14,
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Nec quis.
        </div>
      </div>
    </div>
  );
}
