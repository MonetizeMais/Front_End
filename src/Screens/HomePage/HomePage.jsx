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
  const [userProgress, setUserProgress] = useState(1); 
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProgress = async () => {
      const userEmail = localStorage.getItem('userEmail');

      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/findUserByEmail/${userEmail}`);
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
    { level: 1 },
    { level: 2 },
    { level: 3 },
    { level: 4 },
    { level: 5 },
    { level: 6 },
    { level: 7 },
    { level: 8 },
    { level: 9 },
    { level: 10 },
    { level: 11 },
    { level: 12 }
  ];

  const handleStepClick = async (level) => {
    setSelectedLevel(level);
    if (userProgress < level) {
      setErrorMessage(`Progresso insuficiente! Complete o nível ${userProgress} antes de acessar o nível ${level}.`);
      return;
    }

    try {
      const response = await axios.get(`https://back-end-retz.onrender.com/getConteudo/${level}`);
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
