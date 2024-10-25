// Personalizacao.js
import React from 'react';
import './Perfil.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import logo from '../../Assets/Mascote 2.png';
import relogio from '../../Assets/relogio (3) 1.png';
import cadeado from '../../Assets/cadeado 1.png';
import config from '../../Assets/configuracoes (2) 1.png';
import logout from '../../Assets/sair-do-usuario (1) 1.png';
import PerfilOption from '../../components/PerfilOption/PerfilOption';

function Personalizacao() {
  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Profile</h1>
      <div className="perfil-code">
        <img src={logo} alt="Avatar do usuário" className="perfil-avatar" />
        <div className="perfil-info">
          <p className="perfil-usuario">Robi</p>
          <p className="perfil-handle">8967452743</p>
          <p className="perfil-email">robi123@gmail.com</p>
        </div>
      </div>

      <div className="perfil-options">
        <PerfilOption icon={relogio} label="Order History" />
        <PerfilOption icon={cadeado} label="Privacy Policy" />
        <PerfilOption icon={config} label="Settings" />
        <PerfilOption icon={logout} label="Log out" />
      </div>

      <MenuBar />
    </div>
  );
}

export default Personalizacao;
