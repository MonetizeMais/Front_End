import React, { useState } from 'react';
import './Configuracoes.css';
import logo from '../../Assets/Mascote 2.png';
import setaIcon from '../../Assets/arrow.png'; // Importando o ícone da seta
import MainButton from '../../components/Button/button';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação

function Configuracoes() {
  const navigate = useNavigate(); 
  const initialNome = "Nome do Usuário";
  const initialUsername = "username_exemplo";
  const initialEmail = "email@exemplo.com";

  const [nomeUsuario, setNomeUsuario] = useState(initialNome);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const handleNomeChange = (e) => {
    setNomeUsuario(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaAntigaChange = (e) => {
    setSenhaAntiga(e.target.value);
  };

  const handleNovaSenhaChange = (e) => {
    setNovaSenha(e.target.value);
  };

  const handleConfirmSenhaChange = (e) => {
    setConfirmSenha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados salvos:", { nomeUsuario, username, email, senhaAntiga, novaSenha });
  };

  const handleVoltar = () => {
    navigate('/perfil'); 
  };

  return (
    <div className='teste'>
      <button onClick={handleVoltar} className="voltar-btn">
        <img src={setaIcon} alt="Ícone de Voltar" className="seta-icon" />
      </button>
      <h1 className="configuracoes-title">Configurações</h1>
      <div className="configuracoes-code">
        <img src={logo} alt="Avatar do usuário" className="configuracoes-avatar" />
      </div>
      <form onSubmit={handleSubmit} className="configuracoes-container">
        <div className="configuracoes-dados">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nomeUsuario}
            onChange={handleNomeChange}
            className="configuracoes-input"
            placeholder="Digite seu nome"
          />
        </div>
        <div className="configuracoes-dados">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="configuracoes-input"
            placeholder="Digite seu username"
          />
        </div>
        <div className="configuracoes-dados">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="configuracoes-input"
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="configuracoes-dados">
          <label htmlFor="senhaAntiga">Senha Antiga:</label>
          <input
            type="password"
            id="senhaAntiga"
            value={senhaAntiga}
            onChange={handleSenhaAntigaChange}
            className="configuracoes-input"
          />
        </div>
        <div className="configuracoes-dados">
          <label htmlFor="novaSenha">Nova Senha:</label>
          <input
            type="password"
            id="novaSenha"
            value={novaSenha}
            onChange={handleNovaSenhaChange}
            className="configuracoes-input"
          />
        </div>
        <div className="configuracoes-dados">
          <label htmlFor="confirmSenha">Confirmar Nova Senha:</label>
          <input
            type="password"
            id="confirmSenha"
            value={confirmSenha}
            onChange={handleConfirmSenhaChange}
            className="configuracoes-input"
          />
        </div>
        <MainButton text="Salvar" />
      </form>
    </div>
  );
}

export default Configuracoes;
