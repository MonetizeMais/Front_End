import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import Lock from '../../Assets/lock.png';

const logoPoupinho = 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho9.png?alt=media&token=3f2fe64c-2967-4c08-96a7-62f55f924051';
const chapeus = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho8.png?alt=media&token=7569346f-c23b-4aed-8e2d-03c6dd3b33c2' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho7.png?alt=media&token=eb1cffbb-b698-446d-bbaa-5cbaf7b0a265' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho6.png?alt=media&token=c14b8930-0a34-414c-9d78-0108a635b1ef' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho5.png?alt=media&token=c59a6ac0-f880-4f04-bd3f-3a6dd4c5f9e4' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho4.png?alt=media&token=dbdd8281-c14d-46d6-90a1-693a647c96c2' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho3.png?alt=media&token=df2dadfe-b908-4489-a773-8dd5df6b3e0f' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho2.png?alt=media&token=49a61666-df68-42a3-989e-7a762f854f4d' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho1.png?alt=media&token=345e8c3b-9664-4179-b1f7-e74dffb9017e', price: 5 },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/poupinho9.png?alt=media&token=3f2fe64c-2967-4c08-96a7-62f55f924051', price: 10 },
];

function TelaPersonalizacao() {
  const [selectedChapeu, setSelectedChapeu] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [userStats, setUserStats] = useState({ vida: 0, coin: 0 });
  const [chapelUnlocked, setChapelUnlocked] = useState({});
  const [purchasePopupVisible, setPurchasePopupVisible] = useState(false);
  const [selectedChapeuIndex, setSelectedChapeuIndex] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    setUserEmail(storedEmail);

    const storedImage = localStorage.getItem('profilePictureUrl');
    if (storedImage) setSelectedChapeu(storedImage);

    const storedUnlockedHats = localStorage.getItem('unlockedHats');
    if (storedUnlockedHats) {
      setChapelUnlocked(JSON.parse(storedUnlockedHats));
    }

    const fetchUserData = async () => {
      if (storedEmail) {
        try {
          const response = await axios.get(`http://localhost:8080/getUserByEmail/${storedEmail}`);
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
    const preco = chapeus[index]?.price ?? 0;

    if (preco && !chapelUnlocked[index]) {
      setSelectedChapeuIndex(index);

      if (userStats.coin >= preco) {
        setPopupMessage(`Deseja comprar este chapéu por ${preco} gemas?`);
        setPurchasePopupVisible(true);
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
    const preco = chapeus[selectedChapeuIndex].price ?? 0;
    if (userStats.coin >= preco) {
      try {
        await axios.put(`http://localhost:8080/updateCoin/${userEmail}/${userStats.coin - preco}`);

        setUserStats((prevStats) => ({ ...prevStats, coin: prevStats.coin - preco }));
        setChapelUnlocked((prev) => {
          const updatedUnlocked = { ...prev, [selectedChapeuIndex]: true };
          localStorage.setItem('unlockedHats', JSON.stringify(updatedUnlocked));
          return updatedUnlocked;
        });

        setSelectedChapeu(chapeus[selectedChapeuIndex].image);
        localStorage.setItem('profilePictureUrl', chapeus[selectedChapeuIndex].image);

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
      const response = await axios.put('http://localhost:8080/updateProfilePicture', {
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
          <div key={index} className="item-personalizacao" onClick={() => handleChapeuClick(chapeu.image, index)}>
            <img src={chapeu.image} alt={`Chapéu ${index + 1}`} className='hat-image' />
            {chapeu.price && !chapelUnlocked[index] && (
              <div className='lock-blur'>
                <img src={Lock} width={35} className='lock-image' />
              </div>
            )}
          </div>
        ))}
      </div>

      {purchasePopupVisible && (
        <div className="popup-compra">
          <p>{popupMessage}</p>
          {userStats.coin >= chapeus[selectedChapeuIndex].price && (
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
