import React from 'react';
import QuestionScreen from '../../components/QuestionScreen/QuestionScreen';

function Pergunta4() {
  return (
    <QuestionScreen
      questionText="Como você prefere aprender novos assuntos?"
      options={['Vídeos', 'Jogos', 'Leitura', 'Exercícios práticos', 'Outros']}
      progress={50}
      nextRoute='/Finalizar'
    />
  );
}

export default Pergunta4;
