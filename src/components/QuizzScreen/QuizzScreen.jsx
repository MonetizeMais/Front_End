import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../Assets/Mascote Teacher.png';
import Close from '../../Assets/Close.png';
import '../QuizzScreen/QuizzScreen.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx';
import { useNavigate } from 'react-router-dom';

function QuizzScreen({ questionText, options, progress, nextRoute }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState(false);
  const [userStats, setUserStats] = useState({ vida: 0, coin: 0 }); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      
      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/getUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { vida, coin } = response.data;
            setUserStats({ vida, coin });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleClose = () => {
    navigate('/HomePage');
  };  

  return (
    <div className={`Screen ${fade ? 'fade-out' : ''}`}>
      <div className="question-header_Quizz">
        <img 
          src={Close} 
          className='Close_Quizz' 
          onClick={handleClose}
          alt="Fechar"
        />

        <div className="progress-bar_Quizz">
          <div className="progress_Quizz" style={{ width: `${progress}%` }}></div>
        </div>

        <ul className="header-links-Quizz">
          <li><span className="icon-heart"></span> <span>{userStats.vida}</span></li>
          <li><span className="icon-gem"></span> <span>{userStats.coin}</span></li>
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
          isActive={!!selectedOption}
          url={"/Finalizar"}
        />
      </div>
    </div>
  );
}

export default QuizzScreen;
