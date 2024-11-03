import React, { useState } from 'react';
import Logo from '../../Assets/Mascote Teacher.png';
import Close from '../../Assets/Close.png';
import '../QuizzScreen/QuizzScreen.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function QuizzScreen({ questionText, options, correctAnswer, progress, nextRoute }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // To track if the answer is correct
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Check if the selected option is correct
    if (option === correctAnswer) {
      setIsCorrect(true); // Mark as correct
    } else {
      setIsCorrect(false); // Mark as incorrect
    }
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
        <img src={Close} className='Close_Quizz' alt="Close" />

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

        {/* Feedback section */}
        {isCorrect !== null && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <div className="correct-message">
                <div className="correct-icon">✔️</div>
                <p>Parabéns! Você acertou a resposta!</p>
              </div>
            ) : (
              <div className="incorrect-message">
                <div className="incorrect-icon">❌</div>
                <p>Que pena! Você errou a resposta!</p>
              </div>
            )}
          </div>
        )}

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
