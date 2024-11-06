import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css'; 
import pig from '../../Assets/Mascote 2.png'; 
import medalha from '../../Assets/award-solid 1.png';   
import MenuBar from '../../components/MenuBar/MenuBar';

function Ranking() {
  const [users, setUsers] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setErrorMessage('Você precisa estar logado para ver o ranking.');
    } else {
      setLoggedInUserEmail(email);

      // Buscar todos os usuários com suas fotos de perfil atualizadas
      axios.get('https://back-end-retz.onrender.com/getAllUsersByPoints')
        .then(response => {
          setUsers(response.data);  // Assume que response.data inclui a URL da foto de perfil e outros dados
        })
        .catch(error => {
          console.error('Erro ao buscar os usuários:', error);  
        });
    }
  }, []);

  return (
    <div>
      <MenuBar />
      <h2 className="ranking-title">Venha ver o ranking!</h2>

      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div className="ranking-container">
          {users.map((user, index) => {
            let cardClass = "ranking-card";
            
            if (index === 0) {
              cardClass += " first-place"; 
            } else if (user.email === loggedInUserEmail) {
              cardClass += " logged-user"; 
            }

            // Usar a URL da foto de perfil do banco de dados, ou uma imagem padrão se não houver
            const userImage = user.fotoPerfil || pig;

            return (
              <div className={cardClass} key={user.email}>
                <div className="user-photo">
                  <img src={userImage} alt="Foto do usuário" />
                  {index === 0 && (
                    <div className="medal-container">
                      <img src={medalha} alt="Medalha" className="medalha" />
                    </div>
                  )}
                  {user.email === loggedInUserEmail && index !== 0 && (
                    <div className="tag-eu">Eu</div>
                  )}
                </div>
                <div className="user-details">
                  <p>{user.nome}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ranking;
