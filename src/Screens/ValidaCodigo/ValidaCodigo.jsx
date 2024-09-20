import React from 'react';
import '../ValidaCodigo/ValidaCodigo.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import InputCode from '../../components/InputCode/inputCode.jsx'; 
import MainDescription from '../../components/Description/description.jsx'; 

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
  