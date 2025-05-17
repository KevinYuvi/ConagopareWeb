import React, { useState, useEffect } from 'react';
import './MapaProblemas.css';

const EcuadorSVG = () => {
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    fetch('/ecuador_provincias.svg')
      .then((response) => response.text())
      .then((data) => setSvgContent(data));
  }, []);

  return (
    <div
      className="mapa-container"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default EcuadorSVG;
