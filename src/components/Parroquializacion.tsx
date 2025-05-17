import React from 'react';
const Parroquializacion = () => {
  return (
    <section className="parroquializacion">
      <h2>Parroquialización en Ecuador</h2>
      <form>
        <select><option>Seleccione una provincia</option></select>
        <select><option>Seleccione un cantón</option></select>
        <select><option>Seleccione una parroquia</option></select>
        <button type="submit">Consultar</button>
      </form>
      <p>Parroquia: El Rosario</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.9278344768487!2d-79.1983775!3d-0.4082746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902be1a54c97f947%3A0x3b6b229eb9d2db1e!2sEl%20Rosario!5e0!3m2!1ses-419!2sec!4v1700000000000"
        width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
        title="Mapa"
      />
      <p>Fecha de parroquialización: 01 de enero de 2010</p>
    </section>
  );
};

export default Parroquializacion;
