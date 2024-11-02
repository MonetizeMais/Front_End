import React from 'react';
import QuestionScreen from '../../components/QuestionScreen/QuestionScreen';

function Pergunta3() {
  return (
    <QuestionScreen
      questionText="Você quer aprender educação financeira para..."
      options={['Avançar o conhecimento', 'Usar bem o tempo', 'Diversão', 'Investir o dinheiro', 'Outros']}
      progress={30}
      nextRoute='/Pergunta4'
    />
  );
}

export default Pergunta3;
