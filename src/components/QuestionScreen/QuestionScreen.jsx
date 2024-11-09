import React, { useState, useEffect } from 'react';
import logo from '../../Assets/Mascote 2.png';
import '../QuestionScreen/QuestionScreen.css';
import '../../components/QuestionScreen/QuestionScreen.css';
import setaIcon from '../../Assets/arrow.png'; 
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

function QuestionScreen({ questionText, options, progress, nextRoute, previousRoute }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(
    parseInt(localStorage.getItem('progress') || 0)
  );
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const newProgress = currentProgress + progress;
    setCurrentProgress(newProgress);
    localStorage.setItem('progress', newProgress);
  },[location.pathname]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    setFade(true);
    setTimeout(() => {
      navigate(nextRoute);
    }, 600);
  };

  const handleBack = () => {
    const previousProgress = Math.max(currentProgress - progress, 0); 
    setCurrentProgress(previousProgress);
    localStorage.setItem('progress', previousProgress);
    setFade(true);
    
    setTimeout(() => {
      navigate(-1); 
    }, 600);
  };
  
  return (
    <div className={`Screen ${fade ? 'fade-out' : ''}`}>
      <div className="question-header_Pergunta1">
         <img className="seta-icon" src={setaIcon} alt="Seta" onClick={handleBack} />
        <div className="progress-bar_Pergunta1">
          <div
            className="progress_Pergunta1"
            style={{
              width: `${currentProgress}%`,
            }}
          ></div>
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
