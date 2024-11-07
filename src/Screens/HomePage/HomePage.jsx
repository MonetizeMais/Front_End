import React, { useState, useEffect } from 'react';
import './HomePage.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';
import Step from '../../components/Step/Step';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../components/Popup/Popup';

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

  const groupStepsByRows = (steps) => {
    const grouped = [];
    let currentGroup = [];
    let itemsInRow = 1;

    steps.forEach((step) => {
      currentGroup.push(step);

      if (currentGroup.length === itemsInRow) {
        grouped.push(currentGroup);
        currentGroup = [];
        itemsInRow = itemsInRow === 3 ? 1 : itemsInRow + 1; 
      }
    });

    if (currentGroup.length > 0) {
      grouped.push(currentGroup);
    }

    return grouped;
  };

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

  const groupedSteps = groupStepsByRows(steps);

  return (
    <div className="homepage">
      <ScoreBar />
      
      <div className="scroll-container">
        {groupedSteps.map((row, rowIndex) => (
          <div key={rowIndex} className="step-row">
            {row.map((step, index) => (
              <Step
                key={index}
                label={step.label}
                level={step.level}
                isSelected={selectedLevel === step.level}
                onClick={() => handleStepClick(step.level)}
              />
            ))}
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
