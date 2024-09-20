import React from 'react';
import '../NovaSenha/NovaSenha.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 

function NovaSenha() {
    return (
      <div className='MainBox3'>
        <MainTitle text={'Redefinir senha'}/>
        <div className='EnviarNovaSenha'>
        <form action="">
            <MainInput type={'text'} text={'Nova senha'}/>
            <MainInput type={'text'} text={'Confirmação da senha'}/>
        </form>
        <MainButton text={'Redefinir Senha'} url={'/Comecar'}/>

        </div>
      </div>
    );
  }
  
  export default NovaSenha;
  