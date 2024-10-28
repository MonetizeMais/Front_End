import React, { useState } from 'react';
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

  const handlePrivacyClick = () => {
    setShowPrivacyModal(true); 
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const closePrivacyModal = () => {
    setShowPrivacyModal(false); 
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Profile</h1>
      <div className="perfil-code">
        <img src={logo} alt="Avatar do usuário" className="perfil-avatar" />
        <div className="perfil-info">
          <p className="perfil-usuario">Robi</p>
          <p className="perfil-email">robi123@gmail.com</p>
        </div>
      </div>

      <div className="perfil-options">
        <PerfilOption icon={cadeado} label="Política de Privacidade" onClick={handlePrivacyClick} />
        <PerfilOption icon={config} label="Configurações" onClick={() => navigate('/Configuracoes')} />
        <PerfilOption icon={logout} label="Log out" onClick={handleLogout} />
      </div>

      {showPrivacyModal && <PrivacyTerms onClose={closePrivacyModal} />} 

      <MenuBar />
    </div>
  );
}

export default Perfil; 
