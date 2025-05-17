import React, { useEffect } from 'react';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeccionImagen from './components/SeccionImagen';


import Navbar from './components/Navbar';
import HeroPortada from './components/HeroPortada';
import Parroquializacion from './components/Parroquializacion';
import Calificacion from './components/Calificacion';
import Footer from './components/Footer';

import Pagina1 from './components/Pagina1';
import Pagina2 from './components/Pagina2';
import Pagina3 from './components/Pagina3';
import Pagina4 from './components/Pagina4';
import Pagina5 from './components/Pagina5';
import Pagina6 from './components/Pagina6';
import Pagina7 from './components/Pagina7';
import Pagina8 from './components/Pagina8';
import Pagina9 from './components/Pagina9';
import Pagina10 from './components/Pagina10';

function Home() {
  return (
    <>
      <HeroPortada />
      <SeccionImagen id="objetivo" background="/assets/fondo1.jpg" title="Nuestro Objetivo"
        text="Buscamos inspirar el compromiso y la acción conjunta entre diversos sectores de la sociedad para mejorar las condiciones de vida de la gente rural." />
      <SeccionImagen id="datos" background="/assets/fondo2.jpg" title="Datos Rurales"
        text="La información se obtuvo de 182 entrevistas realizadas por WhatsApp a presidentes y presidentas de los gobiernos parroquiales de Ecuador. Con ayuda de IA y Python, analizamos sus datos." />
      <SeccionImagen id="porque" background="/assets/fondo3.jpg" title="¿Por qué lo hicimos?"
        text="En Ecuador, 824 gobiernos parroquiales rurales luchan por el bienestar de sus comunidades con recursos limitados. Esta plataforma busca visibilizar sus realidades." />
      <SeccionImagen id="accion" background="/assets/fondo4.jpg" title="Periodismo de datos y comunicación transmedia"
        text="Una herramienta de acción social, diseñada para fortalecer la voz de las parroquias rurales." />
      <Parroquializacion />
      <Calificacion />
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pagina1" element={<Pagina1 />} />
        <Route path="/pagina2" element={<Pagina2 />} />
        <Route path="/pagina3" element={<Pagina3 />} />
        <Route path="/pagina4" element={<Pagina4 />} />
        <Route path="/pagina5" element={<Pagina5 />} />
        <Route path="/pagina6" element={<Pagina6 />} />
        <Route path="/pagina7" element={<Pagina7 />} />
        <Route path="/pagina8" element={<Pagina8 />} />
        <Route path="/pagina9" element={<Pagina9 />} />
        <Route path="/pagina10" element={<Pagina10 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
