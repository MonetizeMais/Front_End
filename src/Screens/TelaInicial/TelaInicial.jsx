import React from 'react';
import logo from '../../Assets/LogoPorco.png'; 
import '../TelaInicial/TelaInicial.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 

function TelaInicial() {
  return (
    <div className='TelaInicial'>
      <div className='box1'>
        <img className='LogoPrincipal' src={logo} alt="Logo do Porco" />
        <div>
          <MainTitle text={'monetize+'}/>
          <h2>Dinheiro divertido, futuro seguro.</h2>
        </div>
      </div>
      <div className='box2'>
        <MainButton text={'começar'} url={'/CadastreDados'}/>
        <a href='/InsereDados'>já tenho uma conta</a>
      </div>
    </div>
  );
}

export default TelaInicial;
