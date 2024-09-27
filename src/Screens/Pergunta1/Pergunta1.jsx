import React from 'react';
import logo from '../../Assets/LogoPorco.png'; 
import '../Pergunta1/Pergunta1.css';
import MainButton from '../../components/Button/button.jsx';
import OptionButton from '../../components/OptionButton/OptionButton.jsx'; 

function Pergunta1() {
  const handleOptionClick = (option) => {
    console.log(`Você selecionou: ${option}`);
  };

  return (
    <div className="container">
      <div className="question-header">
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>

      <div className="content">
        <img className="LogoPrincipal" src={logo} alt="Logo do Porco" />
        <div className="question-box">
          <span>Como você conheceu o Monetize+?</span>
        </div>
        <div className="options">
          <OptionButton text="Tiktok" onClick={() => handleOptionClick('Tiktok')} />
          <OptionButton text="Escola" onClick={() => handleOptionClick('Escola')} />
          <OptionButton text="Play Store ou App Store" onClick={() => handleOptionClick('Play Store ou App Store')} />
          <OptionButton text="Notícia" onClick={() => handleOptionClick('Notícia')} />
          <OptionButton text="Busca do Google" onClick={() => handleOptionClick('Busca do Google')} />
          <OptionButton text="Outros" onClick={() => handleOptionClick('Outros')} />
        </div>
      </div>

      <MainButton text="Continuar" url="/Perguntas" />
    </div>
  );
}

export default Pergunta1;
