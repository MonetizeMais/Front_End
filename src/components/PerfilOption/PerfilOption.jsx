import React from 'react';
import PropTypes from 'prop-types';
import seta from '../../Assets/seta-direita 1.png';

function PerfilOption({ icon, label, onClick, url}) {
  
  return (
    <div className="perfil-option" onClick={onClick}>
      <img src={icon} alt={label} className="perfil-icon" />
      <p>{label}</p>
      <img src={seta} alt="Seta" className="perfil-seta"/>
    </div>
  );
}

PerfilOption.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default PerfilOption;
