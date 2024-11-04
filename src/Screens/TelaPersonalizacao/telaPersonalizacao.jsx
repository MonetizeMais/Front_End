import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';

const logoPoupinho = 'https://lh3.googleusercontent.com/pw/AP1GczOvc6d0ZiIAHmbP5QMYbOlHTsxeRapLHJwzIqlNHJUEn9lFoplFYWlKTTSyGAEbkCP7YEhiDb-TDJ-cwZbmMrVyU5jTbMN-LU5eL15ySoIlvcvq0upBoRqtpyCV2OXvEocoXLdj9O3konWcio15dn0=w631-h617-s-no-gm?authuser=1';
const chapeus = [ 
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/logo%20-%20poupinho.png?alt=media&token=9f122a63-3f73-4f4f-987f-51487582c700',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20rei.png?alt=media&token=807a1cf1-9356-43d5-a262-7961deb2ba86',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20rainha.png?alt=media&token=8f943150-c72d-45c6-b747-c0d03be644c5',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20bruxo.png?alt=media&token=c0190fa8-64aa-4732-811c-72f8e9af681c',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20festa.png?alt=media&token=8eecb493-67b7-4156-b471-9683c65701fd',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20la%C3%A7o.png?alt=media&token=b78c8c56-f6ea-4690-ae36-4b4e4f3a9115',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20chef.png?alt=media&token=9cdcda72-cc1a-411d-a275-5d167e81e864',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20cowboy.png?alt=media&token=9f3eb69a-4a7e-4c6d-9259-58f6e63ae3d9',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho%20-%20bigode.png?alt=media&token=d3e2f519-db12-4a81-8965-d81b52fb8c77',
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