import React from 'react';
const SeccionImagen = ({ id, background, title, text }) => {
  return (
    <section id={id} className="seccion-imagen" style={{ backgroundImage: `url(${background})` }}>
      <div className="contenido">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </section>
  );
};

export default SeccionImagen;
