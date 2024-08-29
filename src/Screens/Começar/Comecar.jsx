import React from 'react';
import logo from '.././Assets/LogoPorco.png'; 
import '.././App.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import Typical from 'react-typical'

function Comecar() {
  return (
    <div className='Comecar'>
         <div className='box2'>

        <div className='Dialog'>
            <Typical
                loop={Infinity}
                steps={
                    ['Oie, @Usuario! Sou o Poupinho!', 400]
                }
            />
        </div>

        <img className='LogoPrincipal' src={logo} alt="Logo do Porco" />
        <MainButton text={'Continuar'} url={'/Perguntas'}/>
         </div>
    </div>
  );
}

export default Comecar;
