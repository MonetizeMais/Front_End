import React from 'react';
import '../../../src/App.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 
import MainDescription from '../../components/Description/description.jsx'; 

function RedefinirSenha() {
    return (
      <div className='MainBox3'>
        <MainTitle text={'Redefinir senha'}/>
        <MainDescription text={'Digite o  e-mail utilizado na hora do cadastro.Enviaremos um código de verificação.'}/>
        <div className='EnviarCadastro'>
        <form action="">
            <MainInput type={'text'} text={'E-mail usado no cadastro '}/>
        </form>
        <MainButton text={'Enviar código'} url={'ValidaCodigo'}/>

        </div>
      </div>
    );
  }
  
  export default RedefinirSenha;
  