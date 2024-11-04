import React, { useState } from 'react';
import Logo from '../../Assets/Mascote Teacher.png';
import Close from '../../Assets/Close.png';
import '../QuizzScreen/QuizzScreen.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function QuizzScreen({ questionText, options, progress, nextRoute }) {
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


      <div className="question-header_Quizz">

        <img src={Close} className='Close_Quizz' />

        <div className="progress-bar_Quizz">
          <div className="progress_Quizz" style={{ width: `${progress}%` }}></div>
        </div>

        <ul className="header-links-Quizz">
          <li><span className="icon-heart"></span> <span>5</span></li>
          <li><span className="icon-gem"></span> <span>20</span></li>
        </ul>
      </div>

      <div className="question-section">
        <img className="LogoPrincipal" src={Logo} alt="Logo" />
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

export default QuizzScreen;
