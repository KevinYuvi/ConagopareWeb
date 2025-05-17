import React from 'react';
import logo from '../assets/logo.png';
import { FaXTwitter, FaTiktok, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <img src={logo} alt="Identidad Rural" className="footer-logo" />
        <p>Hecho con ❤️ en Ecuador</p>
        <p>Este sitio es de acceso libre y educativo</p>
      </div>

      <div className="footer-column">
        <h4>Mapa del Sitio</h4>
        <ul>
          <li>Equipo</li>
          <li>Metodología</li>
          <li>Entrevistas</li>
          <li>Difunde</li>
          <li>Recursos</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Redes Sociales</h4>
        <ul className="social-icons">
          <li><FaXTwitter /> X</li>
          <li><FaTiktok /> TikTok</li>
          <li><FaYoutube /> Youtube</li>
          <li><FaFacebook /> Facebook</li>
          <li><FaInstagram /> Instagram</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
