import React, { useState } from 'react';
import logo from '../../Assets/Mascote 2.png';
import '../Pergunta4/Pergunta4.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function Pergunta4() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(100);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    setFade(true);
    setProgress(100);
    setTimeout(() => {
      navigate('/Pergunta4'); 
    }, 600);
  };

  return (
    <div className={`container ${fade ? 'fade' : ''}`}>
      <div className="question-header">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="content">
        <div className="question-section">
          <img className="LogoPrincipal" src={logo} alt="Logo do Porco" />
          <div className="question-box">
            <span>Quanto você entende de<br />educação financeira?</span>
          </div>
        </div>
        <div className="options">
          <OptionButton
            text="Não sei nada sobre educação financeira"
            onClick={() => handleOptionClick('Não sei nada sobre educação financeira')}
            isSelected={selectedOption === 'Não sei nada sobre educação financeira'}
          />
          <OptionButton
            text="Conheço algumas termos sobre"
            onClick={() => handleOptionClick('Conheço algumas termos sobre')}
            isSelected={selectedOption === 'Conheço algumas termos sobre'}
          />
          <OptionButton
            text="Consigo ter uma conversa simples sobre"
            onClick={() => handleOptionClick('Consigo ter uma conversa simples sobre')}
            isSelected={selectedOption === 'Consigo ter uma conversa simples sobre'}
          />
          <OptionButton
            text="Consigo falar sobre temas variados"
            onClick={() => handleOptionClick('Consigo falar sobre temas variados')}
            isSelected={selectedOption === 'Consigo falar sobre temas variados'}
          />
          <OptionButton
            text="Consigo falar sobre a maioria dos temas em detalhes"
            onClick={() => handleOptionClick('Consigo falar sobre a maioria dos temas em detalhes')}
            isSelected={selectedOption === 'Consigo falar sobre a maioria dos temas em detalhes'}
          />
        </div>
      </div>

      <InactiveButton 
        text="Continuar"
        url={'/Finalizar'} 
        isActive={!!selectedOption}
        onClick={handleContinue}
      />
    </div>
  );
}

export default Pergunta4;
