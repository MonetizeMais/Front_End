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
  const [userStats, setUserStats] = useState({ vida: 0, coin: 0, progresso: 0, pontos: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const levelAtual = location.state ? location.state.level : null; 

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');

      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/findUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { vida, coin, progresso, pontos } = response.data;
            setUserStats({ vida, coin, progresso, pontos });
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
    navigate('/HomePage');
    if (isCorrect) {
      const userProgressVerification = userStats.progresso + 0.5;
      const userProgressVerification2 = userStats.progresso - 0.5;

      if ((userProgressVerification === levelAtual) || (userProgressVerification2 === levelAtual)) {
        const newProgress = userStats.progresso + 0.5;
        const newPontos = userStats.pontos + 15;
      
        axios.put(`https://back-end-retz.onrender.com/updateProgresso/${email}/${newProgress}`, {
          coin: userStats.coin + 5
        })
          .then(response => {
            console.log('Progresso atualizado:', response.data);
            setUserStats((prevStats) => ({
              ...prevStats,
              progresso: newProgress,
              pontos: newPontos
            }));
            axios.put(`https://back-end-retz.onrender.com/updatePontos/${email}/${newPontos}`);
            localStorage.setItem('userProgresso', newProgress);
            navigate(nextRoute);
          })
          .catch(error => {
            console.error('Erro ao atualizar progresso:', error);
          });

        handleAnswer(newProgress);
      }
    } else {
      const vida = userStats.vida - 1;
      const newPontos = userStats.pontos - 5;
      axios.put(`https://back-end-retz.onrender.com/updateLife/${email}/${vida}`)
        .then(response => {
          console.log('Progresso atualizado:', response.data);
          setUserStats((prevStats) => ({
            ...prevStats,
            vida,
            pontos: newPontos
          }));
          axios.put(`https://back-end-retz.onrender.com/updatePontos/${email}/${newPontos}`);
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
          <li><span className="icon-star"></span> <span>{userStats.pontos}</span></li>
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
            <button className='botaoPrincipal' onClick={handlePopupClose}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizzScreen;