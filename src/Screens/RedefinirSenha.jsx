import React from 'react';
import '.././App.css'; 
import MainButton from '../components/button.jsx'; 
import MainTitle from '../components/Title.jsx'; 
import MainInput from '../components/input.jsx'; 
import MainDescription from '../components/description.jsx'; 

function RedefinirSenha() {
    return (
      <div className='MainBox3'>
        <MainTitle text={'Redefinir senha'}/>
        <MainDescription text={'Digite o  e-mail utilizado na hora do cadastro.Enviaremos um código de verificação.'}/>
        <div className='EnviarCadastro'>
        <form action="">
            <MainInput type={'text'} text={'E-mail usado no cadastro '}/>
        </form>
        <MainButton text={'Enviar código'}/>

        </div>
      </div>
    );
  }
  
  export default RedefinirSenha;
  