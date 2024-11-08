import React, { useState, useEffect } from 'react';
import './HomePage.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';
import Step from '../../components/Step/Step';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/Popup/Popup';
import LeftPath from "../../Assets/left-path.png";
import RightPath from "../../Assets/right-path.png";

function HomePage() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userProgress, setUserProgress] = useState(1); // Progresso inicial
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProgress = async () => {
      const userEmail = localStorage.getItem('userEmail');

      if (userEmail) {
        try {
          const response = await axios.get(`http://localhost:8080/findUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { progresso } = response.data;
            setUserProgress(progresso);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserProgress();
  }, []);

  const steps = [
    { label: 'Básico 1', level: 1 },
    { label: 'Expressões', level: 2 },
    { label: 'Animais', level: 3 },
    { label: 'Animais', level: 4 },
    { label: 'Animais', level: 5 },
    { label: 'Animais', level: 6 },
    { label: 'Animais', level: 7 },
    { label: 'Animais', level: 8 },
    { label: 'Animais', level: 9 },
    { label: 'Animais', level: 10 },
    { label: 'Animais', level: 11 },
    { label: 'Animais', level: 12 },
    { label: 'Animais', level: 13 },
    { label: 'Animais', level: 14 },
    { label: 'Animais', level: 15 },
    { label: 'Animais', level: 16 },
  ];

  const handleStepClick = async (level) => {
    setSelectedLevel(level);
    if (userProgress < level) {
      setErrorMessage(`Progresso insuficiente! Complete o nível ${userProgress} antes de acessar o nível ${level}.`);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/getConteudo/${level}`);
      const conteudo = response.data;

      navigate('/Conteudo', { state: { conteudo, level } });
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div className="homepage">
      <ScoreBar />

      <div className="scroll-container">
        {steps.map((step, index) => (
          <div key={index} className='step-card'>
            <Step
              index={index}
              progress={userProgress}
              {...step}
              isSelected={selectedLevel === step.level}
              onClick={() => handleStepClick(step.level)}
            />
            {index !== steps.length - 1 && (
              <img style={{ width: "20%", opacity: userProgress - step.level > 0 ? 1 : 0.55 }} src={index % 2 !== 0 ? LeftPath : RightPath} />
            )}
          </div>
        ))}
      </div>

      {errorMessage && (
        <Popup
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}

      <MenuBar />
    </div>
  );
}

export default HomePage;
