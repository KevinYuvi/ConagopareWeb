import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src={logo} alt="Logo Identidad Rural" className="navbar-logo" />
        </div>

        <nav className="navbar-center">
          <ul className="navbar-menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/pagina1">Datos Rurales</Link></li>
            <li><Link to="/pagina2">Problemas</Link></li>
            <li><Link to="/pagina3">Voz Rural</Link></li>
            <li><Link to="/pagina4">Datos Curiosos</Link></li>
            <li><Link to="/pagina5">Metodología</Link></li>
            <li><Link to="/pagina6">Entrevistas</Link></li>
            <li><Link to="/pagina7">Difunde</Link></li>
            <li><Link to="/pagina8">Equipo</Link></li>
            <li><Link to="/pagina9">Mujeres Rurales</Link></li>
            <li><Link to="/pagina10">Taller de Periodismo</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
