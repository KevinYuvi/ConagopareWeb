"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const provincias = [
  "Azuay", "Bolivar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi",
  "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja",
  "Los Rios", "Manabi", "Morona Santiago", "Napo", "Orellana",
  "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
  "Sucumbios", "Tungurahua", "Zamora Chinchipe"
];

const EcuadorSVG = ({ data }) => {
  const [svgContent, setSvgContent] = useState('');
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  useEffect(() => {
    fetch('/ecuador_provincias.svg')
      .then(res => res.text())
      .then(setSvgContent);
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const container = document.getElementById('mapa-ecuador');
    if (!container) return;

    container.innerHTML = svgContent;

    provincias.forEach((provincia) => {
      const element = document.getElementById(provincia);
      if (element) {
        element.style.cursor = 'pointer';

        // Inicial: color base
        element.style.fill = "#077f01";
        element.style.transition = "fill 0.3s";

        element.addEventListener('mouseenter', (e) => {
          element.style.fill = "#FF6B6B"; // rojo suave al pasar
          handleMouseEnter(e, provincia);
        });

        element.addEventListener('mouseleave', () => {
          element.style.fill = "#077f01"; // vuelve al color original
          handleMouseLeave();
        });
      }
    });

    return () => {
      provincias.forEach((provincia) => {
        const element = document.getElementById(provincia);
        if (element) {
          element.removeEventListener('mouseenter', (e) => handleMouseEnter(e, provincia));
          element.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [svgContent, data]);

  const handleMouseEnter = (e, provincia) => {
    const problemas = data[provincia] || ["(sin datos)", "-", "-"];
    const content = `<strong>${provincia}</strong><br/>
      1. ${problemas[0]}<br/>
      2. ${problemas[1]}<br/>
      3. ${problemas[2]}`;
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      content,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleMouseMove = (e) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  };

  return (
    <motion.div
      className="mapa-container"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div id="mapa-ecuador" className="mapa-svg" />
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            left: tooltip.x + 10,
            top: tooltip.y + 10,
            position: 'fixed',
            display: 'block',
            zIndex: 1000
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </motion.div>
  );
};

export default EcuadorSVG;
