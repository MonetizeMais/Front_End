import React from 'react';
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 
import MainInput from '../components/input.jsx'; 
import MainDescription from '../components/description.jsx'; 

function NovaSenha() {
    return (
      <div className='MainBox3'>
        <MainTitle text={'Redefinir senha'}/>
        <div className='EnviarNovaSenha'>
        <form action="">
            <MainInput type={'text'} text={'Nova senha'}/>
            <MainInput type={'text'} text={'Confirmação da senha'}/>
        </form>
        <MainButton text={'Redefinir Senha'}/>

        </div>
      </div>
    );
  }
  
  export default NovaSenha;
  