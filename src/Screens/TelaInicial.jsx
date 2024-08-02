import React from 'react';
import logo from '.././Assets/LogoPorco.png'; 
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 

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
        <MainButton text={'começar'}/>
        <p>já tenho uma conta</p>
      </div>
    </div>
  );
}

export default TelaInicial;
