import React from 'react';
import portada from '../assets/hero.jpg';

const HeroPortada = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${portada})` }}>
      <div className="language-selector">
        <span role="img" aria-label="us">🇺🇸</span> English |
        <span role="img" aria-label="es"> 🇪🇸</span> Español |
        <span role="img" aria-label="fr"> 🇫🇷</span> Français
      </div>
      <img src="/logo.png" alt="Identidad Rural" className="logo-central" />
    </div>
  );
};

export default HeroPortada;
