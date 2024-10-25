import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../NovaSenha/NovaSenha.css'; 
import MainTitle from '../../components/Title/Title.jsx'; 
import MainInput from '../../components/Input/input.jsx'; 

function NovaSenha() {
  const [email, setEmail] = useState(''); 
  const [novaSenha, setNovaSenha] = useState(''); 
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmacaoSenha) {
      setErrorMessage('As senhas não coincidem!');
      return;
    }

    const payload = {
      email: email,
      password: novaSenha
    };

    try {
      const response = await fetch('https://back-end-retz.onrender.com/updatePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        navigate('/InsereDados');
      } else {
        const errorText = await response.text();
        setErrorMessage('Erro ao redefinir a senha: ' + errorText);
      }
    } catch (error) {
      setErrorMessage('Erro ao redefinir a senha: ' + error.message);
    }
  };

  React.useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className='MainBox3'>
      <MainTitle text={'Redefinir senha'} />
      <div className='EnviarNovaSenha'>
        <form onSubmit={handleSubmit}> 
          <MainInput 
            type={'email'} 
            text={'E-mail'} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <MainInput 
            type={'password'} 
            text={'Nova senha'} 
            value={novaSenha} 
            onChange={(e) => setNovaSenha(e.target.value)} 
          />
          <MainInput 
            type={'password'} 
            text={'Confirmação da senha'} 
            value={confirmacaoSenha} 
            onChange={(e) => setConfirmacaoSenha(e.target.value)} 
          />
        </form>
          <button 
            type="button" 
            className='botaoPrincipal' 
            onClick={handleSubmit}>
            Redefinir senha
          </button>
      </div>

      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default NovaSenha;
