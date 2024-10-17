import React, { useState } from 'react';
import logo from '../../Assets/Mascote Teacher.png';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function Quizz() {
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
    <div>
      <header>
        {/* <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div> */}
      </header>

      <div className="content">
        <div className="question-section">
          <img className="LogoPrincipal" src={logo} alt="Logo do Porco" />
          <div className="question-box">
            <p>Vamos falar sobre educação financeira?</p>
          </div>
        </div>
        <div className="options">
          <OptionButton
            text="Alternativa 1"
            onClick={() => handleOptionClick('Alternativa 1')}
            isSelected={selectedOption === 'Alternativa 1'}
          />
          <OptionButton
            text="Alternativa 2"
            onClick={() => handleOptionClick('Alternativa 2')}
            isSelected={selectedOption === 'Alternativa 2'}
          />
          <OptionButton
            text="Alternativa 3"
            onClick={() => handleOptionClick('Alternativa 3')}
            isSelected={selectedOption === 'Alternativa 3'}
          />
          <OptionButton
            text="Alternativa 4"
            onClick={() => handleOptionClick('Alternativa 4')}
            isSelected={selectedOption === 'Alternativa 4'}
          />
          <OptionButton
            text="Alternativa 5"
            onClick={() => handleOptionClick('Alternativa 5')}
            isSelected={selectedOption === 'Alternativa 5'}
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

export default Quizz;
