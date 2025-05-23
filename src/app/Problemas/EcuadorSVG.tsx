"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const provincias = [
  "Azuay", "Bolivar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi",
  "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja",
  "Los Rios", "Manabi", "Morona Santiago", "Napo", "Orellana",
  "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
  "Sucumbios", "Tungurahua", "Zamora Chinchipe"
];

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  content: string;
};

type EcuadorSVGProps = {
  data: Record<string, string[]>;
};

const EcuadorSVG = ({ data }: EcuadorSVGProps) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [tooltip, setTooltip] = useState<TooltipState>({
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

  const handleMouseEnter = useCallback((e: MouseEvent, provincia: string) => {
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
  }, [data]);

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  };

  useEffect(() => {
    if (!svgContent) return;

    const container = document.getElementById('mapa-ecuador');
    if (!container) return;

    container.innerHTML = svgContent;

    provincias.forEach((provincia) => {
      const element = document.getElementById(provincia);
      if (element instanceof SVGElement) {
        element.style.cursor = 'pointer';
        element.style.fill = "#077f01";
        element.style.transition = "fill 0.3s";

        const enterHandler = (e: MouseEvent) => {
          element.style.fill = "#FF6B6B";
          handleMouseEnter(e, provincia);
        };

        const leaveHandler = () => {
          element.style.fill = "#077f01";
          handleMouseLeave();
        };

        const touchStartHandler = (e: TouchEvent) => {
          handleMouseEnter(e as unknown as MouseEvent, provincia);
        };

        const touchEndHandler = () => {
          handleMouseLeave();
        };

        element.addEventListener('mouseenter', enterHandler);
        element.addEventListener('mouseleave', leaveHandler);
        element.addEventListener('touchstart', touchStartHandler);
        element.addEventListener('touchend', touchEndHandler);

        (element as any)._enterHandler = enterHandler;
        (element as any)._leaveHandler = leaveHandler;
        (element as any)._touchStartHandler = touchStartHandler;
        (element as any)._touchEndHandler = touchEndHandler;
      }
    });

    return () => {
      provincias.forEach((provincia) => {
        const element = document.getElementById(provincia);
        if (element instanceof SVGElement) {
          const el = element as any;
          if (el._enterHandler) element.removeEventListener('mouseenter', el._enterHandler);
          if (el._leaveHandler) element.removeEventListener('mouseleave', el._leaveHandler);
          if (el._touchStartHandler) element.removeEventListener('touchstart', el._touchStartHandler);
          if (el._touchEndHandler) element.removeEventListener('touchend', el._touchEndHandler);
        }
      });
    };
  }, [svgContent, handleMouseEnter]);

  return (
    <motion.div
      className="mapa-container w-full"
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
            zIndex: 1000,
          }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </motion.div>
  );
};

export default EcuadorSVG;
