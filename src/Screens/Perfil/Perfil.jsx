import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Perfil.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import logo from '../../Assets/Mascote 2.png';
import cadeado from '../../Assets/cadeado 1.png';
import config from '../../Assets/configuracoes (2) 1.png';
import logout from '../../Assets/sair-do-usuario (1) 1.png';
import PerfilOption from '../../components/PerfilOption/PerfilOption';
import PrivacyTerms from '../../components/PrivacyTerms/privacyTerms';
import { useNavigate } from 'react-router-dom';

function Perfil() {
  const navigate = useNavigate();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [userData, setUserData] = useState({ apelido: '', email: '', fotoPerfil: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        setError('E-mail do usuário não encontrado no localStorage.');
        setLoading(false);
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8080/getUserByEmail/${email}`);
        if (response.status === 200) {
          setUserData(response.data);
          localStorage.setItem('profilePictureUrl', response.data.fotoPerfil);
        } else {
          setError('Usuário não encontrado.');
        }
      } catch (error) {
        setError('Erro ao buscar dados do usuário. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);  

  const handlePrivacyClick = () => {
    setShowPrivacyModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('profilePictureUrl'); 
    navigate('/');
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false);
  };

  if (loading) return <p>Carregando...</p>;

  const userImage = localStorage.getItem('profilePictureUrl') || logo;

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil</h1>
      <div className="perfil-code">
        <img src={userImage} alt="Avatar do usuário" className="perfil-avatar" />
        <div className="perfil-info">
          {error ? (
            <p className="perfil-error">{error}</p>
          ) : (
            <>
              <p className="perfil-usuario">{userData.apelido || 'Nome não disponível'}</p>
              <p className="perfil-email">{userData.email || 'Email não disponível'}</p>
            </>
          )}
        </div>
      </div>
      <div className="perfil-options">
        <PerfilOption icon={cadeado} label="Política de Privacidade" onClick={handlePrivacyClick} />
        <PerfilOption icon={config} label="Configurações" onClick={() => navigate('/Configuracoes')} />
        <PerfilOption icon={logout} label="Sair" onClick={handleLogout} />
      </div>
      {showPrivacyModal && <PrivacyTerms onClose={closePrivacyModal} />}
      <MenuBar />
    </div>
  );
}

export default Perfil;
