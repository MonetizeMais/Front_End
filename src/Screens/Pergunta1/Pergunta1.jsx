import React, { useState } from 'react';
import logo from '../../Assets/Mascote 2.png';
import '../Pergunta1/Pergunta1.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function Pergunta1() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(25);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    setFade(true);
    setProgress(50);
    setTimeout(() => {
      navigate('/Pergunta2');
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
            <span>Como você conheceu<br />o Monetize+?</span>
          </div>
        </div>
        <div className="options">
          <OptionButton
            text="Tiktok"
            onClick={() => handleOptionClick('Tiktok')}
            isSelected={selectedOption === 'Tiktok'}
          />
          <OptionButton
            text="Escola"
            onClick={() => handleOptionClick('Escola')}
            isSelected={selectedOption === 'Escola'}
          />
          <OptionButton
            text="Play Store ou App Store"
            onClick={() => handleOptionClick('Play Store ou App Store')}
            isSelected={selectedOption === 'Play Store ou App Store'}
          />
          <OptionButton
            text="Notícia"
            onClick={() => handleOptionClick('Notícia')}
            isSelected={selectedOption === 'Notícia'}
          />
          <OptionButton
            text="Busca do Google"
            onClick={() => handleOptionClick('Busca do Google')}
            isSelected={selectedOption === 'Busca do Google'}
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
        url={'/Pergunta2'}
        isActive={!!selectedOption}
        onClick={handleContinue}
      />
    </div>
  );
}

export default Pergunta1;
