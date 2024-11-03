import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';

const logoPoupinho = 'https://lh3.googleusercontent.com/pw/AP1GczOvc6d0ZiIAHmbP5QMYbOlHTsxeRapLHJwzIqlNHJUEn9lFoplFYWlKTTSyGAEbkCP7YEhiDb-TDJ-cwZbmMrVyU5jTbMN-LU5eL15ySoIlvcvq0upBoRqtpyCV2OXvEocoXLdj9O3konWcio15dn0=w631-h617-s-no-gm?authuser=1';
const chapeus = [ 
  'https://lh3.googleusercontent.com/pw/AP1GczOvc6d0ZiIAHmbP5QMYbOlHTsxeRapLHJwzIqlNHJUEn9lFoplFYWlKTTSyGAEbkCP7YEhiDb-TDJ-cwZbmMrVyU5jTbMN-LU5eL15ySoIlvcvq0upBoRqtpyCV2OXvEocoXLdj9O3konWcio15dn0=w631-h617-s-no-gm?authuser=1', 
  'https://lh3.googleusercontent.com/pw/AP1GczPWV5ZupsR727NZkxJFhaCBUZtXxEocJtlqUAxfrCy1HoG61XnBIxQbm7_6fkag0IXcBGg_Ke1MzvkzN_QtwaQ279E5_DlQ5BSX2LJ3cyxE1wMHBXgYjhISWgsPR0Yx_iNewa-PLEzRShjt1qtxH5E=w631-h609-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczOunzmY6NTlIJs8-tY-eH1vznRJIFWyqYXE_mgxkvbkPuCy9pHc0QO7LQgmaG8bbI6tJjkoQ9yZQKIKYVrH9n-bUQeb431QqNeb8iKKpI2wZu-nLFmq-mCBOtARs5gGNaqU0TLm4W8tQRx8lcsvqM0=w631-h624-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczNVbQMQ6uf8WL2L3p4RQ5RDlqpiWydDG9lMItSEERJRSC3854pabaaxSH_gZgYqWI6yp10EMTBuZNFa8-xtb4ZITe-tcsPI4WeYZ-_2JKXxT5iWh61IHvxpWAzVcrU_553pV8fKTm16Hi8A64hg2dg=w631-h609-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczPJF4CB1UkzcEU16la2jnE0YYeKOo6sorO_Rx5e53ncFDhBWdNsa3oHucshCMo18ATEsNVCqft7W8wDcLEkZJklyEzPOPg4uKNWkTjnAw9SPtREIXwmWjaCxZxUNS7IEjdWQTMmEfu-_VnyG8Zggoc=w631-h609-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczMseCcmt0S_M3wAerek168oPGzxYxiq4VgZXn8ktPZWH2DoQzyu4SL-gIi1p5NpHThCDFdK5bHucFggbPFNZVTmQWRSCwr5pVfmpk_jS7OaVo-GEA4ubu-sE52mo_oJv6VlKh0ejW_gVOiCokHw928=w631-h609-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczNmN-PudjK1GZnXjs96VnZ1FN3rmMO2twNoaNirsRS7MhHyYjgzkuPs9r1hA-D7jwBgD2lzX205s3adigIyMGNKTPH3KoFCdrkY9gQz718I3zjXleYNBq6SrmrF9N4sKt_NINvIe-P2F8O97maCODA=w631-h609-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczNo0_qhjSdUbuijBgcsfYlTAHziRUfzi7aonvrfguEUBADJ7pyosD3o_-O-BKmPsp_KzoVrSJMLlHESF0M7JG9YGlQv0mLY9Ds4c7wZ7h5jVVSM87BQwaWURUE1xlZHm9xAq55IniO6HtR8Kd1axjc=w631-h639-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczMkQTLjgXkLG5Eel5nB-dqmJ4vKjRaWZA5yH5fjYyUvU5_BzDNbxWok8QdTsusKtH9qfBEHBeoYK5D_-kj9aCwgf5q1ZtnYv6hUMX3XT-s-sOfROoII0b1gMnMrjRSKNeYi8_ybAxAlsIWCXLwVByw=w631-h654-s-no-gm?authuser=1'
];

function TelaPersonalizacao() {
  const [selectedChapeu, setSelectedChapeu] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail);

    const storedImage = localStorage.getItem('profilePictureUrl');
    if (storedImage) {
      setSelectedChapeu(storedImage);
    }
  }, []);

  const handleChapeuClick = (chapeuUrl) => {
    setSelectedChapeu(chapeuUrl);
    localStorage.setItem('profilePictureUrl', chapeuUrl); 
  };

  const updateProfilePicture = async (url) => {
    const userEmail = localStorage.getItem('userEmail'); 
    try {
      const response = await axios.put('https://back-end-retz.onrender.com/updateProfilePicture', {
        email: userEmail, 
        fotoPerfil: url 
      });
      console.log('Foto de perfil atualizada com sucesso:', response.data);
      return true; 
    } catch (error) {
      if (error.response) {
        console.error('Erro ao atualizar a foto de perfil:', error.response.data);
      } else if (error.request) {
        console.error('Nenhuma resposta recebida do servidor:', error.request);
      } else {
        console.error('Erro ao configurar a requisição:', error.message);
      }
      return false; 
    }
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleEstilizarClick = async () => {
    if (selectedChapeu) {
      setErrorMessage(null); 
      const success = await updateProfilePicture(selectedChapeu);
      if (success) {
        localStorage.setItem('profilePictureUrl', selectedChapeu);
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 3000);
      } else {
        setErrorMessage("Falha ao atualizar a foto de perfil. Tente novamente.");
      }
    }
  };
  
  
  // E na renderização
  {errorMessage && <div className="error-popup">{errorMessage}</div>}
  

  return (
    <div className="personalizacao-container">
      <div className="poupinho-section">
        <img src={selectedChapeu || logoPoupinho} alt="Poupinho" className="poupinho-avatar" />
        <button className="btn-estilizar" onClick={handleEstilizarClick}>
          Estilizar o Poupinho!
        </button>
        {popupVisible && (
          <div className="popup">
            <p>Visual atualizado!</p>
          </div>
        )}
      </div>
      <div className="itens-personalizacao">
        {chapeus.map((chapeu, index) => (
          <div key={index} className="item-personalizacao" onClick={() => handleChapeuClick(chapeu)}>
            <img src={chapeu} alt={`Chapéu ${index + 1}`} />
          </div>
        ))}
      </div>
      <MenuBar />
    </div>
  );
}

export default TelaPersonalizacao;