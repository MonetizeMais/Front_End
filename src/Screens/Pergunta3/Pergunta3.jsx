import React, { useState } from 'react';
import logo from '../../Assets/Mascote 2.png';
import '../Pergunta3/Pergunta3.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function Pergunta3() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(75);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    setFade(true);
    setProgress(100);
    setTimeout(() => {
      navigate('/Pergunta3'); 
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
            <span>Você quer aprender <br></br>educação financeira <br></br> para...</span>
          </div>
        </div>
        <div className="options">
          <OptionButton
            text="Avançar o conhecimento"
            onClick={() => handleOptionClick('Avançar o conhecimento')}
            isSelected={selectedOption === 'Avançar o conhecimento'}
          />
          <OptionButton
            text="Usar bem o tempo"
            onClick={() => handleOptionClick('Usar bem o tempo')}
            isSelected={selectedOption === 'Usar bem o tempo'}
          />
          <OptionButton
            text="Diversão"
            onClick={() => handleOptionClick('Diversão')}
            isSelected={selectedOption === 'Diversão'}
          />
          <OptionButton
            text="Investir o dinheiro"
            onClick={() => handleOptionClick('Investir o dinheiro')}
            isSelected={selectedOption === 'Investir o dinheiro'}
          />
          <OptionButton
            text="Outros"
            onClick={() => handleOptionClick('Outros')}
            isSelected={selectedOption === 'Outros'}
          />
        </div>
      </div>

      <InactiveButton 
        text="Continuar"
        url={'/Pergunta4'} 
        isActive={!!selectedOption}
        onClick={handleContinue}
      />
    </div>
  );
}

export default Pergunta3;
