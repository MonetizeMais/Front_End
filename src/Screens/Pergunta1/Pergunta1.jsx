import React from 'react';
import QuestionScreen from '../../components/QuestionScreen/QuestionScreen';

function Pergunta1() {
  return (
    <QuestionScreen
      questionText="Como você conheceu o Monetize+?"
      options={['Tiktok', 'Escola', 'Play Store ou App Store', 'Notícia', 'Busca do Google', 'Outros']}
      progress={0}
      nextRoute='/Pergunta2'
    />
  );
}

export default Pergunta1;
