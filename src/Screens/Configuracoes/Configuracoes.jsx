import React, { useState, useEffect } from 'react';
import './Configuracoes.css';
import logo from '../../Assets/Mascote 2.png';
import setaIcon from '../../Assets/arrow.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Configuracoes() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userSenha, setUserSenha] = useState('');  
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);  
      fetchUserData(email); 
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`https://back-end-retz.onrender.com/getUserByEmail/${email}`);
      if (response.status === 200) {
        setUserSenha(response.data.senha); 
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const [novoNome, setNovoNome] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false); 

  const handleNovoNomeChange = (e) => setNovoNome(e.target.value);
  const handleSenhaAntigaChange = (e) => setSenhaAntiga(e.target.value);
  const handleNovaSenhaChange = (e) => setNovaSenha(e.target.value);
  const handleConfirmSenhaChange = (e) => setConfirmSenha(e.target.value);

  const handleVoltar = () => navigate('/perfil');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (senhaAntiga && senhaAntiga !== userSenha) {
      setErrorMessage("Senha antiga incorreta");
      setIsError(true);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      return;
    }
  
    if (novaSenha && novaSenha !== confirmSenha) {
      setErrorMessage("Novas senhas não coincidem");
      setIsError(true);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      return;
    }
  
    const senhaRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;
    if (novaSenha && !senhaRegex.test(novaSenha)) {
      setErrorMessage("A nova senha deve ter pelo menos 5 caracteres e conter letras e números.");
      setIsError(true);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
      return;
    }
  
    try {
      if (novoNome) {
        const nomeResponse = await axios.put(`https://back-end-retz.onrender.com/updateApelido/${userEmail}/${novoNome}`);
        if (nomeResponse.status === 200) {
          localStorage.setItem('userName', novoNome);
        }
      }
  
      if (novaSenha) {
        await axios.put('https://back-end-retz.onrender.com/updatePassword', {
          email: userEmail,
          password: novaSenha,
        });
      }
  
      setIsError(false);
      setErrorMessage('');
      setNovoNome('');
      setSenhaAntiga('');
      setNovaSenha('');
      setConfirmSenha('');
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
  
    } catch (error) {
      console.error("Erro ao atualizar as informações:", error);
      setErrorMessage("Erro ao atualizar as informações. Tente novamente.");
      setIsError(true);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 3000);
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
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="novoNome"
            value={novoNome}
            onChange={handleNovoNomeChange}
            className="configuracoes-input"
            placeholder="Username"
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
            backgroundColor: isError ? '#fa5b77' : 'white',
            color: isError ? 'white' : '#fa5b77'
          }}
        >
          {errorMessage || "Alterações salvas com sucesso!"}
        </div>
      )}
    </div>
  );
}

export default Configuracoes;
