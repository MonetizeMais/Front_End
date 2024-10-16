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
            <span>Como você prefere aprender novos assuntos?<br /></span>
          </div>
        </div>
        <div className="options">
          <OptionButton
            text="Vídeos"
            onClick={() => handleOptionClick('Vídeos')}
            isSelected={selectedOption === 'Vídeos'}
          />
          <OptionButton
            text="Jogos"
            onClick={() => handleOptionClick('Jogos')}
            isSelected={selectedOption === 'Jogos'}
          />
          <OptionButton
            text="Leitura"
            onClick={() => handleOptionClick('Leitura')}
            isSelected={selectedOption === 'Leitura'}
          />
          <OptionButton
            text="Exercícios práticos"
            onClick={() => handleOptionClick('Exercícios práticos')}
            isSelected={selectedOption === 'Exercícios práticos'}
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
        url={'/Finalizar'} 
        isActive={!!selectedOption}
        onClick={handleContinue}
      />
    </div>
  );
}

export default Pergunta4;
