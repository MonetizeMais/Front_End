import React from 'react';
import logo from '.././Assets/LogoPorco.png'; 
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import Typical from 'react-typical'

function Comecar() {
  return (
    <div className='Comecar'>
         <div className='box2'>

        <div className='Dialog2'>
            <Typical
                loop={Infinity}
                steps={
                    ['Responda algumas perguntas rápidas para que possamos começar o aprendizado!', 400]
                }
            />
        </div>

        <img className='LogoPrincipal' src={logo} alt="Logo do Porco" />
        <MainButton text={'Continuar'} url={'/InsereDados'}/>
         </div>
    </div>
  );
}

export default Comecar;
