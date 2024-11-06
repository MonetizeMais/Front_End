import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Quizz.css";
import QuizzScreen from '../../components/QuizzScreen/QuizzScreen';

function Quizz() {
  const [questionData, setQuestionData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const level = location.state ? location.state.level : null; 
  console.log("Level in Quizz:", level);

  useEffect(() => {
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
      nextRoute="/Finalizar"
      level={level}
    />
  );
}

export default Quizz;
