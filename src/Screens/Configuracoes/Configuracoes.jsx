import React, { useState } from 'react';
import './Configuracoes.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import logo from '../../Assets/Mascote 2.png';
import PerfilOption from '../../components/PerfilOption/PerfilOption';
import { useNavigate } from 'react-router-dom';
import InactiveButton from '../../components/InactiveButton/InactiveButton'; 

function Configuracoes() {
  const initialNome = "Nome do Usuário"; 
  const initialUsername = "username_exemplo"; 
  const initialEmail = "email@exemplo.com"; 

  const [nomeUsuario, setNomeUsuario] = useState(initialNome);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [isActive, setIsActive] = useState(true); 

  const handleNomeChange = (e) => {
    setNomeUsuario(e.target.value);
    checkIfActive(); 
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    checkIfActive(); 
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    checkIfActive(); 
  };

  const checkIfActive = () => {
    if (nomeUsuario && username && email) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("Dados salvos:", { nomeUsuario, username, email });
    // alert("Dados atualizados com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="configuracoes-container">
      <h1 className="configuracoes-title">Configurações</h1>
      <div className="configuracoes-code">
        <img src={logo} alt="Avatar do usuário" className="configuracoes-avatar" />
      </div>
      <div className="configuracoes-dados">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nomeUsuario}
          onChange={handleNomeChange}
          className="configuracoes-input"
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
        />
      </div>
      {isActive ? (
        <button type="submit" className='botaoPrincipal'>Salvar</button>
      ) : (
        <InactiveButton text={'Salvar'} />
      )}
    </form>
  );
}

export default Configuracoes;
