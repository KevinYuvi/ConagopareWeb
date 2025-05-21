import React from 'react';
import Link from 'next/link';
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
              <Link href="/problemas">Problemas</Link>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
