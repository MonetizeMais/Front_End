import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';

const logoPoupinho = 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho9.png?alt=media&token=3f2fe64c-2967-4c08-96a7-62f55f924051';
const chapeus = [ 
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho8.png?alt=media&token=7569346f-c23b-4aed-8e2d-03c6dd3b33c2',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho7.png?alt=media&token=eb1cffbb-b698-446d-bbaa-5cbaf7b0a265',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho6.png?alt=media&token=c14b8930-0a34-414c-9d78-0108a635b1ef',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho5.png?alt=media&token=c59a6ac0-f880-4f04-bd3f-3a6dd4c5f9e4',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho4.png?alt=media&token=dbdd8281-c14d-46d6-90a1-693a647c96c2',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho3.png?alt=media&token=df2dadfe-b908-4489-a773-8dd5df6b3e0f',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho2.png?alt=media&token=49a61666-df68-42a3-989e-7a762f854f4d',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho1.png?alt=media&token=345e8c3b-9664-4179-b1f7-e74dffb9017e',
  'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho9.png?alt=media&token=3f2fe64c-2967-4c08-96a7-62f55f924051',
  ];

const chapeuPrecos = {
  7: 5, // Chapéu 'chef' custa 5 gemas
  8: 10, // Chapéu 'cowboy' custa 10 gemas
  9: 5  // Chapéu 'bigode' custa 5 gemas
};

function TelaPersonalizacao() {
  const [selectedChapeu, setSelectedChapeu] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [userStats, setUserStats] = useState({ vida: 0, coin: 0 });
  const [chapelUnlocked, setChapelUnlocked] = useState({});
  const [purchasePopupVisible, setPurchasePopupVisible] = useState(false);
  const [selectedChapeuIndex, setSelectedChapeuIndex] = useState(null);
  const [popupMessage, setPopupMessage] = useState(''); // Adiciona o estado para a mensagem do popup

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail);

    const storedImage = localStorage.getItem('profilePictureUrl');
    if (storedImage) setSelectedChapeu(storedImage);

    const fetchUserData = async () => {
      if (storedEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/getUserByEmail/${storedEmail}`);
          if (response.status === 200) {
            setUserStats(response.data);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChapeuClick = (chapeuUrl, index) => {
    const preco = chapeuPrecos[index];
    
    if (preco && !chapelUnlocked[index]) {
      setSelectedChapeuIndex(index);
  
      // Verifica saldo antes de exibir o popup de compra
      if (userStats.coin >= preco) {
        setPopupMessage(`Deseja comprar este chapéu por ${preco} gemas?`);
        setPurchasePopupVisible(true); // Exibe a pergunta de compra
      } else {
        setPopupMessage(`Você não tem gemas suficientes para comprar este chapéu.`);
        setPurchasePopupVisible(true);
      }
    } else {
      setSelectedChapeu(chapeuUrl);
      localStorage.setItem('profilePictureUrl', chapeuUrl);
    }
  };

  const handlePurchase = async () => {
    const preco = chapeuPrecos[selectedChapeuIndex];
    if (userStats.coin >= preco) {
      try {
        await axios.put(`https://back-end-retz.onrender.com/updateProgresso/${userEmail}/${userStats.coin - preco}`);
        setUserStats((prevStats) => ({ ...prevStats, coin: prevStats.coin - preco }));
        setChapelUnlocked((prev) => ({ ...prev, [selectedChapeuIndex]: true }));
        setSelectedChapeu(chapeus[selectedChapeuIndex]);
        localStorage.setItem('profilePictureUrl', chapeus[selectedChapeuIndex]);
        setPurchasePopupVisible(false);
      } catch (error) {
        console.error('Erro ao atualizar gemas:', error);
      }
    } else {
      setPurchasePopupVisible(false);
    }
  };

  const closePurchasePopup = () => setPurchasePopupVisible(false);

  const handleEstilizarClick = async () => {
    if (selectedChapeu) {
      const success = await updateProfilePicture(selectedChapeu);
      if (success) {
        setPopupVisible(true);
        setTimeout(() => setPopupVisible(false), 3000);
      }
    }
  };

  const updateProfilePicture = async (url) => {
    try {
      const response = await axios.put('https://back-end-retz.onrender.com/updateProfilePicture', {
        email: userEmail,
        fotoPerfil: url
      });
      console.log('Foto de perfil atualizada com sucesso:', response.data);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar a foto de perfil:', error);
      return false;
    }
  };

  return (
    <div className="personalizacao-container">
      <div className="poupinho-section">
        <img src={selectedChapeu || logoPoupinho} alt="Poupinho" className="poupinho-avatar" />
        <button className="btn-estilizar" onClick={handleEstilizarClick}>
          Estilizar o Poupinho!
        </button>
        {popupVisible && (
          <div className="popup2">
            <p>Visual atualizado!</p>
          </div>
        )}
      </div>
      <div className="itens-personalizacao">
        {chapeus.map((chapeu, index) => (
          <div key={index} className="item-personalizacao" onClick={() => handleChapeuClick(chapeu, index)}>
            <img src={chapeu} alt={`Chapéu ${index + 1}`} />
            {chapeuPrecos[index] && !chapelUnlocked[index] && (
              <span className="price-tag">{chapeuPrecos[index]} gemas</span>
            )}
          </div>
        ))}
      </div>
      {purchasePopupVisible && (
        <div className="popup-compra">
          <p>{popupMessage}</p>
          {userStats.coin >= chapeuPrecos[selectedChapeuIndex] && (
            <button onClick={handlePurchase}>Comprar</button>
          )}
          <button onClick={closePurchasePopup}>Cancelar</button>
        </div>
      )}
      <MenuBar />
    </div>
  );
}

export default TelaPersonalizacao;
