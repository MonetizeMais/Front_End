import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../Assets/Mascote Teacher.png';
import Close from '../../Assets/Close.png';
import '../QuizzScreen/QuizzScreen.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import { useNavigate } from 'react-router-dom';

function QuizzScreen({ questionText, options, correctAnswer, handleAnswer, nextRoute }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState(false);
  const [userStats, setUserStats] = useState({ vida: 0, coin: 0, progresso: 0 });
  const [showPopup, setShowPopup] = useState(false); // Estado para controlar o popup
  const [isCorrect, setIsCorrect] = useState(null); // Estado para saber se a resposta está certa ou errada
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      
      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/findUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { vida, coin, progresso } = response.data;
            setUserStats({ vida, coin, progresso }); // Armazena o valor de progresso aqui
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

  const handleContinueClick = () => {
    if (selectedOption) {
      // Verifica se a resposta do usuário está correta
      const correct = selectedOption === correctAnswer;
      setIsCorrect(correct); // Atualiza o estado com a resposta correta/errada
      setShowPopup(true); // Exibe o popup
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    if (isCorrect) {
      const newProgress = userStats.progresso + 0.5; // Usando o valor de 'progresso' do usuário diretamente
      
      const email = localStorage.getItem('userEmail');
      if (email) {
        axios.put(`https://back-end-retz.onrender.com/updateProgresso/${email}/${newProgress}`)
          .then(response => {
            console.log('Progresso atualizado:', response.data);
          })
          .catch(error => {
            console.error('Erro ao atualizar progresso:', error);
          });
      }

      handleAnswer(newProgress);
    }
    navigate(nextRoute);
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

        <button
          className={`continuar ${selectedOption ? 'active' : 'inactive'}`}
          onClick={handleContinueClick}
          disabled={!selectedOption}
        >
          Continuar
        </button>
      </div>

      {showPopup && (
        <div className="popup-pergunta">
          <div className="popup-content-pergunta">
            <p>{isCorrect ? 'Resposta certa!' : 'Resposta errada!'}</p>
            <button onClick={handlePopupClose}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizzScreen;
