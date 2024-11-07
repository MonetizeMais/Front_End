import React, { useState, useEffect } from 'react';
import './Configuracoes.css';
import logo from '../../Assets/Mascote 2.png';
import setaIcon from '../../Assets/arrow.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Configuracoes() {
  const navigate = useNavigate();

  // Obter o e-mail do localStorage
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email); // Seta o e-mail do usuário logado
    }
  }, []);

  const [novoNome, setNovoNome] = useState(''); // Estado para o novo nome
  const [novoEmail, setNovoEmail] = useState(''); // Estado para o novo email
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

  const handleNovoNomeChange = (e) => setNovoNome(e.target.value);
  const handleNovoEmailChange = (e) => setNovoEmail(e.target.value);
  const handleSenhaAntigaChange = (e) => setSenhaAntiga(e.target.value);
  const handleNovaSenhaChange = (e) => setNovaSenha(e.target.value);
  const handleConfirmSenhaChange = (e) => setConfirmSenha(e.target.value);

  const handleVoltar = () => navigate('/perfil');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação de senha
    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/; // Senha com pelo menos 5 caracteres, letras e números
    if (!senhaRegex.test(novaSenha)) {
      setErrorMessage("A nova senha deve ter pelo menos 5 caracteres e conter letras e números.");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Fecha o popup após 3 segundos
      return;
    }

    if (novaSenha !== confirmSenha) {
      setErrorMessage("As novas senhas não coincidem.");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Fecha o popup após 3 segundos
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (novoEmail && !emailRegex.test(novoEmail)) {
      setErrorMessage("O e-mail deve ser do tipo @gmail.com.");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Fecha o popup após 3 segundos
      return;
    }

    try {
      const response = await axios.put('https://back-end-retz.onrender.com/updatePassword', {
        email: userEmail, // Usando o e-mail do localStorage
        password: novaSenha,
      });

      if (response.status === 200) {
        setShowSuccessPopup(true);
        setNovoNome(''); // Limpa o campo de nome após o sucesso
        setNovoEmail(''); // Limpa o campo de email após o sucesso
        setSenhaAntiga('');
        setNovaSenha('');
        setConfirmSenha('');
        setErrorMessage(''); // Limpa a mensagem de erro
        setTimeout(() => setShowSuccessPopup(false), 3000); // Fecha o popup após 3 segundos
      }
    } catch (error) {
      console.error("Erro ao atualizar a senha:", error);
      setErrorMessage("Erro ao atualizar a senha. Tente novamente.");
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000); // Fecha o popup após 3 segundos
    }
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
          <label htmlFor="username">Nome:</label>
          <input
            type="text"
            id="novoNome"
            value={novoNome} // Novo nome inserido pelo usuário
            onChange={handleNovoNomeChange}
            className="configuracoes-input"
            placeholder="Novo nome"
          />
        </div>
        <div className="configuracoes-dados">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="novoEmail"
            value={novoEmail} // Novo email inserido pelo usuário
            onChange={handleNovoEmailChange}
            className="configuracoes-input"
            placeholder="Novo email"
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
        <button type="submit" className="botaoPrincipal">Salvar</button>
      </form>

      {showSuccessPopup && (
  <div 
    className="popup-sucesso" 
    style={{ 
      backgroundColor: errorMessage ? '#fa5b77' : 'white', // Ajusta a cor de fundo corretamente
      border: '2px solid #fa5b77' 
    }}
  >
    {errorMessage || "Alterações salvas com sucesso!"}
  </div>
)}

    </div>
  );
}

export default Configuracoes;
