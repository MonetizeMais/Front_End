import React, { useState } from 'react';
import '../Cadastro/Cadastro.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import InactiveButton from '../../components/InactiveButton/InactiveButton.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 
import PrivacyTerms from '../../components/PrivacyTerms/privacyTerms.jsx'; 

function CadastroDadosScreen() {
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleCheckboxChange = (event) => {
        setTermsAccepted(event.target.checked);
    };

    return (
      <div className='MainBox2'>
        <MainTitle text={'Cadastre seus dados'}/>
        <form action="">
            <MainInput type={'text'} text={'E-mail'}/>
            <MainInput type={'text'} text={'Nome de usuário'}/>
            <MainInput type={'password'} text={'Senha'}/>
            <MainInput type={'password'} text={'Confirmação de senha'}/>
            <MainInput type={'date'} text={'Nascimento'}/>
        </form>

        {termsAccepted ? (
          <MainButton text={'Cadastrar'} url={'/RedefinirSenha'}/>
        ) : (
          <InactiveButton text={'Cadastrar'} />
        )}

        <div className='TermsAccept'>
            <input 
              type="checkbox" 
              id="CheckBox" 
              checked={termsAccepted} 
              onChange={handleCheckboxChange} 
            />
            <PrivacyTerms />
        </div>
      </div>
    );
}

export default CadastroDadosScreen;
