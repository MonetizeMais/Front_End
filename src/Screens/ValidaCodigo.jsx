import React from 'react';
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 
import InputCode from '../components/inputCode.jsx'; 
import MainDescription from '../components/description.jsx'; 

function ValidaCodigo() {
    return (
      <div className='MainBox4'>
        <MainTitle text={'Redefinir senha'}/>
        <MainDescription text={'Digite o código de verificação enviado para o seu e-mail.'}/>
        <div className='EnviarCode'>
        <form action="">
            <InputCode type={'number'} />
            <InputCode type={'number'} />
            <InputCode type={'number'} />
            <InputCode type={'number'} />
            <InputCode type={'number'} />
        </form>
        <MainButton text={'Enviar'} url={'/NovaSenha'}/>

        </div>
      </div>
    );
  }
  
  export default ValidaCodigo;
  