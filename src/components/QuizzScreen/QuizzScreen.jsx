import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../Assets/Mascote Teacher.png';
import Close from '../../Assets/Close.png';
import '../QuizzScreen/QuizzScreen.css';
import OptionButton from '../../components/OptionButton/OptionButton.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import Check from "../../Assets/check.png";
import X from "../../Assets/x.png";

function QuizzScreen({ questionText, options, correctAnswer, handleAnswer, nextRoute }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [fade, setFade] = useState(false);
  const [userStats, setUserStats] = useState({ vida: 0, coin: 0, progresso: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const levelAtual = location.state ? location.state.level : null; // Obtém o nível esperado do usuário

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');

      if (userEmail) {
        try {
          const response = await axios.get(`http://localhost:8080/findUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { vida, coin, progresso } = response.data;
            setUserStats({ vida, coin, progresso });
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
      const correct = selectedOption === correctAnswer;
      setIsCorrect(correct);
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);

    const email = localStorage.getItem('userEmail');

    if(!email) {
      return false;
    }

    if (isCorrect) {
      const userProgressVerification = userStats.progresso + 0.5;
      const userProgressVerification2 = userStats.progresso - 0.5;


      if ((userProgressVerification === levelAtual) || (userProgressVerification2 === levelAtual)) {
        const newProgress = userStats.progresso + 0.5;
      
          axios.put(`http://localhost:8080/updateProgresso/${email}/${newProgress}`, {
            coin: userStats.coin + 5
          })
            .then(response => {
              console.log('Progresso atualizado:', response.data);
              setUserStats((prevStats) => ({
                ...prevStats,
                progresso: newProgress,
              }));
              localStorage.setItem('userProgresso', newProgress);
              navigate(nextRoute);
            })
            .catch(error => {
              console.error('Erro ao atualizar progresso:', error);
            });

        // Chama o handler para processar a resposta correta
        handleAnswer(newProgress);
      }
    } else {
      const vida = userStats.vida - 1;
      axios.put(`http://localhost:8080/updateLife/${email}/${vida}`)
        .then(response => {
          console.log('Progresso atualizado:', response.data);
          setUserStats((prevStats) => ({
            ...prevStats,
            vida
          }));
          localStorage.setItem('userVida', vida);
          navigate(nextRoute);
        })
        .catch(error => {
          console.error('Erro ao atualizar progresso:', error);
        });
    }
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
            <img width={100} src={isCorrect ? Check : X} alt="" />
            <p className='title'>{isCorrect ? 'Resposta certa!' : 'Resposta errada!'}</p>
            <p>{isCorrect ? 'Parabéns! 🎉 Cada acerto te deixa mais perto de dominar o mundo dos investimentos!' : 'Não foi dessa vez, mas é errando que se aprende. Continue firme!'}</p>
            <button onClick={handlePopupClose}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizzScreen;