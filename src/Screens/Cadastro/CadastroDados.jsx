import React from 'react';
import '../Cadastro/Cadastro.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 
import PrivacyTerms from '../../components/PrivacyTerms/privacyTerms.jsx'; 

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
  