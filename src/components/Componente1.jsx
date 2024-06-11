import React from 'react';
import PropTypes from 'prop-types';

const Componente1 = ({ valor, texto, color, icono, descripcion }) => {
  return (
    <>
      <div className={`small-box ${ color }`}>
        <div className="inner">
          <h3>{ valor }</h3>
          <p>{ texto }</p>
        </div>
        <div className="icon">
          <i className={ icono }></i>
        </div>
        <a href="#" className="small-box-footer">{ descripcion }</a>
      </div>
    </>
  )
}

export default Componente1;

Componente1.propTypes = {
  valor: PropTypes.string.isRequired, 
  texto: PropTypes.string, 
  color: PropTypes.string.isRequired, 
  icono: PropTypes.string, 
  descripcion: PropTypes.string,
}

Componente1.defaultProps = {
  valor: "0%",
  texto: "Nombre del atributo",
  color: "bg-olive",
  icono: "far fa-paper-plane",
  descripcion: "Sin descripción",
}