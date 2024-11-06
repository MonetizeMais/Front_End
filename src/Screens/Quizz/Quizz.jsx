import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Quizz.css";
import QuizzScreen from '../../components/QuizzScreen/QuizzScreen';

function Quizz() {
  const [questionData, setQuestionData] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  
  const level = location.state ? location.state.level : null;
  const email = location.state ? location.state.email : null; // Supondo que o email do usuário esteja disponível na `location.state`

  useEffect(() => {
    // Carregar o progresso do usuário do localStorage
    const storedProgress = localStorage.getItem('userProgress');
    if (storedProgress) {
      setUserProgress(parseFloat(storedProgress));
    }

    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`https://back-end-retz.onrender.com/getPergunta/${level}`);
        setQuestionData(response.data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };

    if (level) {
      fetchQuestion();
    }
  }, [level]);

  const handleAnswer = (selectedOption) => {
    const correctAnswer = questionData.resposta.find((res) => res.resposta === true)?.alternativa;

    if (selectedOption === correctAnswer) {
      if (userProgress < level) {
        const newProgress = userProgress + 0.5;
        setUserProgress(newProgress);
        localStorage.setItem('userProgress', newProgress.toString()); // Atualiza no localStorage

        if (email) {
          axios.put(`https://back-end-retz.onrender.com/updateProgresso/${email}/${newProgress}`)
            .then(response => {
              console.log(response.data); // Exibe a resposta da API no console
            })
            .catch(error => {
              console.error('Erro ao atualizar o progresso no banco de dados:', error);
            });
        }
      }
    }

    navigate("/Finalizar");
  };

  if (!questionData) {
    return <div>Carregando...</div>;
  }

  const options = questionData.resposta.map((res) => res.alternativa);
  const correctAnswer = questionData.resposta.find((res) => res.resposta === true)?.alternativa;

  return (
    <QuizzScreen
      questionText={questionData.pergunta}
      options={options}
      correctAnswer={correctAnswer}
      handleAnswer={handleAnswer}
      nextRoute="/Finalizar"
      level={level}
      userProgress={userProgress}  // Passando o progresso para o QuizzScreen
    />
  );
}

export default Quizz;
