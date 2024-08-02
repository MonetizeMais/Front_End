import React from 'react';
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 
import MainInput from '../components/input.jsx'; 

function InsereDadosScreen() {
    return (
      <div className='MainBox'>
        <MainTitle text={'Insira seus dados'}/>
        <form action="">
            <MainInput type={'text'} text={'E-mail ou nome de usuário'}/>
            <MainInput type={'password'}text={'Senha'}/>
        </form>
            <MainButton text={'Entrar'}/>
            <a href="#">Esqueci a senha</a>
            <p>Ao entrar no Monetize+, você concorda com nossos <a href="#">Termos</a> e <a href="#">Política de Privacidade</a>.</p>
      </div>
    );
  }
  
  export default InsereDadosScreen;
  