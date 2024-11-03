import React, { useState } from 'react';
import "./Quizz.css"
import QuizzScreen from '../../components/QuizzScreen/QuizzScreen';


function Quizz() {
    return (
      <QuizzScreen
      questionText="Pergunta aqui"
      options={['Pergunta1', 'Pergunta2', 'Pergunta3', 'Pergunta4', 'Pergunta5']}
      correctAnswer={'Pergunta1'}
      progress={10}
      nextRoute='/Finalizar'
    />
    );
  }
  
  export default Quizz;
  