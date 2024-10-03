import React from 'react';
import logo from '../../Assets/LogoPorco.png'; 
import '../Finalizar/Finalizar.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import Typical from 'react-typical'

function Finalizar() {
  return (
    <div className='Finalizar'>
         <div className='box2'>

        <div className='Dialog'>
            <Typical
                loop={Infinity}
                steps={
                    ['Agora você está pronto para começar!', 400]
                }
            />
        </div>

        <img className='LogoPrincipal' src={logo} alt="Logo do Porco" />
        <MainButton text={'Continuar'} url={'/HomePage'}/>
         </div>
    </div>
  );
}

export default Finalizar; 