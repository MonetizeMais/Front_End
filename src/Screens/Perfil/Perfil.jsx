import React from 'react';
import './Perfil.css'; 
import MenuBar from '../../components/MenuBar/MenuBar';
import logo from '../../Assets/Mascote 2.png';
import Engrenagem from '../../Assets/Engrenagem.png';

function Personalizacao() {
  return (
    <div>
      <header className="perfil-header">
        <div className='box1'>
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
          <img
              src={Engrenagem}
              alt="Avatar do usuário"
              className="engrenagem"
            />
          </button>
        </div>
      </header>

      <div className="perfil-container">
        <div className="conteudo">
          <div className="perfil-seguidores">
            <div className="status-info">
              <p>0</p>
              <p>Seguidores</p>
            </div>
            <div className="status-info">
              <p>0</p>
              <p>Seguindo</p>
            </div>
          </div>

          <button className="btn-adicionar-amigos">ADICIONAR AMIGOS</button>

          <div className="perfil-completar">
          <div className="box2">
          <img 
            src={logo} 
            alt="Avatar do usuário" 
            className="perfil-image"
            />
            <div className='conteudo-popup'>
              <h3>Complete o seu perfil</h3>
              <p>Continue personalizando o seu perfil</p>
            </div>
          </div>  
            <button className="btn-comecar">COMEÇAR</button>
          </div>
        </div>
        
        <MenuBar />
      </div>
    </div>
  );
}

export default Personalizacao;
