import React from 'react';
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 
import MainInput from '../components/input.jsx'; 
import PrivacyTerms from '../components/privacyTerms.jsx'; 

function CadastroDadosScreen() {
    return (
      <div className='MainBox2'>
        <MainTitle text={'Cadastre seus dados'}/>
        <form action="">
            <MainInput type={'text'} text={'E-mail'}/>
            <MainInput type={'text'} text={'Nome de usuário'}/>
            <MainInput type={'password'} text={'Senha'}/>
            <MainInput type={'password'} text={'Confirmação de senha'}/>
            <MainInput type={'Date'} text={'nascimento'}/>
        </form>
            <MainButton text={'Cadastrar'} url={'/RedefinirSenha'}/>
            <div className='TermsAccept'>
                <input type="checkbox" name="" id="CheckBox" />
                <PrivacyTerms/>
            </div>
      </div>
    );
  }
  
  export default CadastroDadosScreen;
  