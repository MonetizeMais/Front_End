import React from 'react';
import QuestionScreen from '../../components/QuestionScreen/QuestionScreen';

function Pergunta3() {
  return (
    <QuestionScreen
      questionText="Você quer aprender educação financeira para..."
      options={['Aprender coisas novas', 'Guardar meu dinheiro', 'Passar o tempo', 'Diversão', 'Outros']}
      progress={50}
      nextRoute='/Pergunta4'
    />
  );
}

export default Pergunta3;
