import React, { useState } from 'react';
import './Configuracoes.css';
import logo from '../../Assets/Mascote 2.png';
import setaIcon from '../../Assets/arrow.png';
import MainButton from '../../components/Button/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Configuracoes() {
  const navigate = useNavigate();
  const initialUsername = "username_exemplo";
  const initialEmail = "email@exemplo.com";

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSenhaAntigaChange = (e) => setSenhaAntiga(e.target.value);
  const handleNovaSenhaChange = (e) => setNovaSenha(e.target.value);
  const handleConfirmSenhaChange = (e) => setConfirmSenha(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (username || email) {
        // Atualizar username e/ou email
        await axios.put(`https://back-end-retz.onrender.com/updateEmailApelido/{userId}`, {
          apelido: username || initialUsername,
          email: email || initialEmail
        });
      }
      if (novaSenha && novaSenha === confirmSenha) {
        // Atualizar senha
        await axios.put('https://back-end-retz.onrender.com/updatePassword', {
          email: email || initialEmail,
          password: novaSenha,
          oldPassword: senhaAntiga
        });
      }

      // Mostrar popup de sucesso
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000); // Oculta o popup após 3 segundos

      // Limpar campos
      setUsername('');
      setEmail('');
      setSenhaAntiga('');
      setNovaSenha('');
      setConfirmSenha('');
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
    }
  };

  const handleVoltar = () => navigate('/perfil');

  return (
    <div className="configuracoes-page">
      <button onClick={handleVoltar} className="voltar-btn">
        <img src={setaIcon} alt="Ícone de Voltar" className="seta-icon" />
      </button>
      <h1 className="configuracoes-title">Configurações</h1>
      <div className="configuracoes-avatar-container">
        <img src={logo} alt="Avatar do usuário" className="configuracoes-avatar" />
      </div>
      <form onSubmit={handleSubmit} className="configuracoes-form">
        <div className="configuracoes-dados">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="configuracoes-input"
            placeholder={initialUsername}
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
            placeholder={initialEmail}
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
            placeholder="Digite sua senha antiga"
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
            placeholder="Digite sua nova senha"
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
            placeholder="Confirme sua nova senha"
          />
        </div>
        <button className='botaoPrincipal'>Salvar</button>
      </form>

      {showPopup && <div className="popup-sucesso">Alterações salvas com sucesso!</div>}
    </div>
  );
}

export default Configuracoes;
