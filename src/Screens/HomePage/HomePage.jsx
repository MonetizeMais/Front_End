import React, { useState, useEffect } from 'react';
import './HomePage.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';
import Step from '../../components/Step/Step';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function HomePage() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userProgress, setUserProgress] = useState(1); // Progresso inicial
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProgress = async () => {
      const userEmail = localStorage.getItem('userEmail'); // Pegue o email do usuário do localStorage
      
      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/findUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { progresso } = response.data; // Pegue o progresso do usuário
            setUserProgress(progresso); // Atualize o estado com o valor do progresso
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserProgress(); // Chama a função para buscar o progresso ao carregar o componente
  }, []); // O useEffect será executado apenas uma vez, ao carregar o componente

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
    
    // Verificação do progresso do usuário
    if (userProgress < level) {
      setErrorMessage(`Progresso insuficiente! Complete o nível ${userProgress} antes de acessar o nível ${level}.`);
      setTimeout(() => setErrorMessage(''), 3000); // Limpa a mensagem de erro após 3 segundos
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

      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Exibe a mensagem de erro */}

      <MenuBar />
    </div>
  );
}

export default HomePage;
