import React, { useState } from 'react';
import './PrivacyTerms.css'; 

const PrivacyTerms = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true); 

  const handleCloseModal = () => {
    setShowModal(false);
    onClose(); 
  };

  return (
    <div className='TermsPrivacy'>
      {/* <p>
        Ao entrar no Monetize+, você concorda com nossos <a href="#" onClick={handleCloseModal}>Termos</a> e <a href="#" onClick={handleCloseModal}>Política de Privacidade</a>.
      </p> */}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Termos e Política de Privacidade</h2>
            <br />
            <div className="modal-body">
              <p><strong>1. Aceitação dos termos</strong><br/>
                Ao utilizar o aplicativo Monetize+, você concorda com estes Termos e Condições. Se não concordar, não utilize o aplicativo.
              </p>
              <p><strong>2. Objetivo do aplicativo</strong><br/>
                O Monetize+ é um aplicativo interativo de educação financeira voltado para crianças do ensino fundamental, visando promover habilidades financeiras desde a infância.
              </p>
              <p><strong>3. Registro e conta</strong><br/>
                Para utilizar o aplicativo, é necessário realizar um cadastro, fornecendo informações pessoais verdadeiras e atualizadas. Você é responsável por manter a confidencialidade de suas informações de conta.
              </p>
              <p><strong>4. Uso do aplicativo</strong><br/>
                O usuário concorda em utilizar o Monetize+ apenas para fins legais e de acordo com estes Termos. O usuário é responsável por qualquer atividade realizada em sua conta.
              </p>
              <p><strong>5. Propriedade intelectual</strong><br/>
                Todo o conteúdo do aplicativo, incluindo textos, gráficos, logos e software, é de propriedade exclusiva do Monetize+ e está protegido por leis de propriedade intelectual.
              </p>
              <p><strong>6. Atualizações e alterações</strong><br/>
                Reservamo-nos o direito de modificar, suspender ou descontinuar o aplicativo a qualquer momento, sem aviso prévio. Quaisquer alterações a estes Termos serão comunicadas aos usuários e estarão disponíveis no aplicativo.
              </p>
              <p><strong>7. Limitação de responsabilidade</strong><br/>
                O Monetize+ não se responsabiliza por danos diretos, indiretos, acidentais ou consequentes resultantes do uso ou incapacidade de uso do aplicativo.
              </p>
              <p><strong>8. Lei aplicável</strong><br/>
                Estes Termos são regidos pelas leis do Brasil. Quaisquer disputas relacionadas ao uso do aplicativo estarão sujeitas à jurisdição dos tribunais competentes.
              </p>
              <p><strong>9. Aceitação dos termos</strong><br/>
                Ao clicar em "Cadastrar" ou utilizar o aplicativo, você confirma que leu, entendeu e concorda com estes Termos e Condições.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyTerms;