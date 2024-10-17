import React from 'react';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import logoPoupinho from '../../Assets/Mascote 2.png'; 
import IconeChapeu from '../../Assets/Chapeu.png'; 


function TelaPersonalizacao() {
  return (
    <div className="personalizacao-container">
      <div className="poupinho-section">
        <img 
          src={logoPoupinho} 
          alt="Poupinho" 
          className="poupinho-avatar"
        />
        <button className="btn-estilizar">
          Estilizar o Poupinho!
        </button>
      </div>

      <div className="itens-personalizacao">
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="Chapéu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
        <div className="item-personalizacao">
          <img src={logoPoupinho} alt="IconeChapeu" />
        </div>
      </div>

      <MenuBar />
    </div>
  );
}

export default TelaPersonalizacao;
