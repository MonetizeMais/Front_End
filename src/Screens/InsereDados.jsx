import React from 'react';
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 
import MainInput from '../components/input.jsx'; 
import PrivacyTerms from '../components/privacyTerms.jsx'; 

function InsereDadosScreen() {
    return (
      <div className='MainBox'>
        <MainTitle text={'Insira seus dados'}/>
        <form action="">
            <MainInput type={'text'} text={'E-mail ou nome de usuário'}/>
            <MainInput type={'password'}text={'Senha'}/>
        </form>
            <MainButton text={'Entrar'} url={'/CadastreDados'}/>
            <a href="#">Esqueci a senha</a>
            <PrivacyTerms/>
      </div>
    );
  }
  
  export default InsereDadosScreen;
  