import React, { useState, useEffect } from 'react';
import styles from './MapaProblemas.module.css';

interface EcuadorSVGProps {
  data: {
    [provincia: string]: string[];
  };
}

interface Tooltip {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

const provincias = [
  "Azuay", "Bolivar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi",
  "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja",
  "Los Rios", "Manabi", "Morona Santiago", "Napo", "Orellana",
  "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
  "Sucumbios", "Tungurahua", "Zamora Chinchipe"
];

const EcuadorSVG: React.FC<EcuadorSVGProps> = ({ data }) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [tooltip, setTooltip] = useState<Tooltip>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
  });

  useEffect(() => {
    fetch('/ecuador_provincias.svg')
      .then((res) => res.text())
      .then(setSvgContent);
  }, []);

  useEffect(() => {
    if (!svgContent) return;

    const container = document.getElementById('mapa-ecuador');
    if (!container) return;
    container.innerHTML = svgContent;

    provincias.forEach((provincia: string) => {
      const element = document.getElementById(provincia);
      if (element) {
        element.style.cursor = 'pointer';
        element.addEventListener('mouseenter', (e: MouseEvent) =>
          handleMouseEnter(e, provincia)
        );
        element.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    return () => {
      provincias.forEach((provincia: string) => {
        const element = document.getElementById(provincia);
        if (element) {
          element.removeEventListener('mouseenter', (e: MouseEvent) =>
            handleMouseEnter(e, provincia)
          );
          element.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [svgContent, data]);

  const handleMouseEnter = (e: MouseEvent, provincia: string) => {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tooltip.visible) {
      setTooltip((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    }
  };

  return (
    <div className="mapa-container" onMouseMove={handleMouseMove}>
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
    </div>
  );
};

export default EcuadorSVG;
