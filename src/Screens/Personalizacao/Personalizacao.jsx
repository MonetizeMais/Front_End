import React from 'react';
import './Personalizacao.css'; 
import MenuBar from '../../components/MenuBar/MenuBar';
import logo from '../../Assets/LogoPorco.png';


function Personalizacao() {
  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <div>
        <img 
          src= {logo} 
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
      <MenuBar/>
    </div>
  );
}

export default Personalizacao;
