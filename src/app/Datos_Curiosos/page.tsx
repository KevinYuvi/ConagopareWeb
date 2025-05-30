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
  const [isMobile, setIsMobile] = useState(false);

  // Colores para el gráfico
  const colors = ['#4caf50', '#f44336', '#ff9800', '#2196f3', '#9c27b0'];

  // Leyendas por pregunta
  const leyendasPorPregunta: Record<number, { color: string; label: string }[]> = {
    1: [
      { color: '#4caf50', label: '😐 Neutralidad' },
      { color: '#f44336', label: '😊 Alegría / Optimismo' },
      { color: '#ff9800', label: '😢 Tristeza / Preocupación' },
      { color: '#2196f3', label: '😡 Enojo / Frustración' },
    ],
    2: [
      { color: '#4caf50', label: '😐 Neutralidad / Indiferencia' },
      { color: '#f44336', label: '😢 Tristeza / Preocupación' },
      { color: '#ff9800', label: '😊 Alegría / Optimismo' },
      { color: '#2196f3', label: '😡 Enojo / Frustración' },
      { color: '#9c27b0', label: '😱 Asombro' },
    ],
    3: [
      { color: '#4caf50', label: '😐 Neutralidad' },
      { color: '#f44336', label: '😢 Tristeza / Preocupación' },
      { color: '#ff9800', label: '😯 Sorpresa / Preocupación' },
      { color: '#2196f3', label: '😱 Asombro' },
    ],
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 700);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const leyendaActual = leyendasPorPregunta[selectedPregunta] ?? [];

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: 'auto' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: 26, marginBottom: 10, textAlign: 'center' }}>
        Datos Curiosos
      </h1>
      <p style={{ fontSize: 14, color: '#555', marginBottom: 40, textAlign: 'center' }}>
        Los datos curiosos son fragmentos de información relevantes pero difíciles de clasificar dentro de las categorías principales del proyecto. A través de esta sección, buscamos resaltar esas voces únicas que aportan una perspectiva diferente sobre la realidad rural.
      </p>

      {/* Botones */}
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
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              if (selectedPregunta !== n) {
                target.style.backgroundColor = '#005bb5';
                target.style.color = '#fff';
              }
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              if (selectedPregunta !== n) {
                target.style.backgroundColor = '#eee';
                target.style.color = '#000';
              }
            }}
            onFocus={(e) => {
              const target = e.currentTarget;
              target.style.boxShadow = '0 0 8px #0070f3';
            }}
            onBlur={(e) => {
              const target = e.currentTarget;
              target.style.boxShadow = 'none';
            }}
          >
            Pregunta {n}
          </button>
        ))}
      </div>

      {/* Contenedor gráfico + leyenda */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 30,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {/* Gráfico */}
        <div style={{ flex: '1 1 400px', minWidth: 280, height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
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

        {/* Leyenda */}
        <div
          style={{
            flex: '0 0 240px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            justifyContent: 'center',
            userSelect: 'none',
            minWidth: 200,
          }}
        >
          {leyendaActual.map(({ color, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 12px',
                borderRadius: 20,
                backgroundColor: '#f0f0f0',
                fontSize: 14,
                transition: 'transform 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.05)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: color,
                  borderRadius: '50%',
                  border: '1px solid #ccc',
                }}
              />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cuadros coloridos debajo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 300,
          marginTop: 40,
          marginBottom: 60,
        }}
      >
        {[
          {
            color: '#f44336',
            text: 'Lorem ipsum dolor sit amet consectetur.',
            style: { top: 20, left: 20, width: 160, height: 120, color: 'white' },
          },
          {
            color: '#2196f3',
            text: 'Lorem ipsum dolor sit amet consectetur. Consectetur sit neque eu egestas nunc dolor tincidunt. Sed odio at diam nisi dui. Fermentum consectetur ornare purus fames nulla iaculis. In dapibus malesuada nullam.',
            style: { top: 70, left: 130, width: 200, height: 160, color: 'white' },
          },
          {
            color: '#ffeb3b',
            text: 'Algunas personas se negaron a grabar un video por temor a represalias, prefiriendo mantener su identidad en el anonimato.',
            style: { top: 30, right: 200, width: 180, height: 140, color: 'black' },
          },
          {
            color: '#ffeb3b',
            text: 'Lorem ipsum dolor sit amet consectetur. Consectetur sit neque eu egestas nunc dolor tincidunt. Sed odio at diam nisi dui. Fermentum consectetur ornare purus fames nulla iaculis. In dapibus malesuada nullam.',
            style: { bottom: 20, left: 1, width: 160, height: 160, color: 'black' },
          },
          {
            color: '#f44336',
            text: 'Lorem ipsum dolor sit amet consectetur. Nec quis.',
            style: { bottom: 20, right: 300, width: 160, height: 120, color: 'white' },
          },
        ].map(({ color, text, style }, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              backgroundColor: color,
              padding: 20,
              borderRadius: 8,
              fontSize: 14,
              cursor: 'default',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: 'none',
              ...style,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1.05)';
              el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = 'scale(1)';
              el.style.boxShadow = 'none';
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
