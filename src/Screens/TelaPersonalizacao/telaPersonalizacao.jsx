import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../TelaPersonalizacao/Telapersonalizacao.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import Lock from '../../Assets/lock.png';

const logoPoupinho = 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho%20simples.png?alt=media&token=188f26bd-7dc9-4fec-aed0-812e232db58e';
const chapeus = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho%20simples.png?alt=media&token=188f26bd-7dc9-4fec-aed0-812e232db58e' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho7.png?alt=media&token=b1b64830-58f6-4b40-8daf-abeea0a475cf' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho5.png?alt=media&token=bb44afba-693d-4e3e-880f-a5f7d32a51e9' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho4.png?alt=media&token=aa6b1f98-cbdc-46b9-b960-ac2c1fd345ca' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho8.png?alt=media&token=d534f9a7-6fc5-417c-be62-808b42a61327' }, 
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho9.png?alt=media&token=0662c18a-998c-4557-8603-a83feacc7037' }, 
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho1.png?alt=media&token=df077539-7c4e-4863-a0d7-893322c2b9bf'},
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho2.png?alt=media&token=65823cad-f998-4cb7-a477-2d0f3e1bacc1', price: 15 },
  { image: 'https://firebasestorage.googleapis.com/v0/b/monetizemais-64f46.appspot.com/o/Poupinho3.png?alt=media&token=50cd0bcd-0fad-49ac-a2e5-0f4652882466', price: 20}, 
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
        await axios.put(`https://back-end-retz.onrender.com/updateCoin/${userEmail}/${userStats.coin - preco}`);

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
