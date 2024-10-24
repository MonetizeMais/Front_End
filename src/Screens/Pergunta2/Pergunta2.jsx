import React from 'react';
import QuestionScreen from '../../components/QuestionScreen/QuestionScreen';

function Pergunta2() {
  return (
    <QuestionScreen
      questionText="Quanto você entende de educação financeira?"
      options={['Não sei nada sobre educação financeira', 'Conheço algumas termos sobre', 'Consigo ter uma conversa simples sobre', 'Consigo falar sobre temas variados', 'Consigo falar sobre a maioria dos temas em detalhes']}
      progress={50}
      nextRoute='/Pergunta3'
    />
  );
}

export default Pergunta2;
