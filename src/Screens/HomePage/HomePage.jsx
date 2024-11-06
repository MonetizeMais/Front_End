import React, { useState } from 'react';
import './HomePage.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';
import Step from '../../components/Step/Step';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function HomePage() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const navigate = useNavigate();

  const steps = [
    { label: 'Básico 1', level: 1, progress: 20 },
    { label: 'Expressões', level: 2, progress: 50 },
    { label: 'Animais', level: 3, progress: 30 },
    { label: 'Animais', level: 4, progress: 70 },
    { label: 'Animais', level: 5, progress: 80 },
    { label: 'Animais', level: 6, progress: 100 },
    { label: 'Animais', level: 7, progress: 10 },
    { label: 'Animais', level: 8, progress: 20 },
    { label: 'Animais', level: 9, progress: 50 },
    { label: 'Animais', level: 10, progress: 60 },
    { label: 'Animais', level: 11, progress: 20 },
    { label: 'Animais', level: 12, progress: 70 },
    { label: 'Animais', level: 13, progress: 90 },
    { label: 'Animais', level: 14, progress: 30 },
    { label: 'Animais', level: 15, progress: 50 },
    { label: 'Animais', level: 16, progress: 10 },
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
    
    console.log("Selected Level:", level); 

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
                progress={step.progress}  
                onClick={() => handleStepClick(step.level)}
              />
            ))}
          </div>
        ))}
      </div>
      
      <MenuBar />
    </div>
  );
}

export default HomePage;
