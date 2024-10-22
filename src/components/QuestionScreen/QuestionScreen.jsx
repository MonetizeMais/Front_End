import React, { useState } from 'react';
import logo from '../../Assets/Mascote 2.png';
import '../QuestionScreen/QuestionScreen.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function QuestionScreen({ questionText, options, progress, nextRoute }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    setFade(true);
    setTimeout(() => {
      navigate(nextRoute);
    }, 600);
  };

  return (
    <div className={`Screen ${fade ? 'fade-out' : ''}`}>
      <div className="question-header_Pergunta1">
        <div className="progress-bar_Pergunta1">
          <div className="progress_Pergunta1" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="question-section">
        <img className="LogoPrincipal" src={logo} alt="Logo" />
        <div className="question-box">
          <span>{questionText}</span>
        </div>
      </div>

      <div className='form'>
        <div className='questions'>
          {options.map((option) => (
            <OptionButton
              key={option}
              text={option}
              onClick={() => handleOptionClick(option)}
              isSelected={selectedOption === option}
            />
          ))}
        </div>
        <InactiveButton 
        
          text="Continuar"
          url={nextRoute} 
          isActive={!!selectedOption}
          onClick={handleContinue}
        />
      </div>
    </div>
  );
}

export default QuestionScreen;
