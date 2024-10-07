import React from 'react';
import './Perfil.css'; 
import MenuBar from '../../components/MenuBar/MenuBar';
import logo from '../../Assets/Mascote 2.png';

function Personalizacao() {
  return (
    <div>
      <header className="perfil-header">
        <div className="perfil-code">
          <img 
            src={logo} 
            alt="Avatar do usuário" 
            className="perfil-avatar"
          />
          <div className="perfil-info">
            <p className="perfil-usuario">usuário</p>
            <p className="perfil-handle">@usuario</p>
          </div>
        </div>
        <button className="perfil-settings">
          <i className="icon-settings" />
        </button>
      </header>

      <div className="perfil-container">
        <div className="conteudo">
          <div className="perfil-seguidores">
            <div className="seguidores-info">
              <p>0</p>
              <p>Seguidores</p>
            </div>
            <div className="seguindo-info">
              <p>0</p>
              <p>Seguindo</p>
            </div>
          </div>

          <button className="btn-adicionar-amigos">ADICIONAR AMIGOS</button>

          <div className="perfil-completar">
            <p>Complete o seu perfil</p>
            <p>Continue personalizando o seu perfil</p>
            <button className="btn-comecar">COMEÇAR</button>
          </div>
        </div>
        
        <MenuBar />
      </div>
    </div>
  );
}

export default Personalizacao;
