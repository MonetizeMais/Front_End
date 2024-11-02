import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css'; 
import pig from '../../Assets/Mascote 2.png'; 
import medalha from '../../Assets/award-solid 1.png';   
import MenuBar from '../../components/MenuBar/MenuBar';

function Ranking() {
  const [users, setUsers] = useState([]);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null); // Alterado para armazenar o email do usuário logado
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Altere para a chave correta que armazena o email
    if (!email) {
      setErrorMessage('Você precisa estar logado para ver o ranking.');
    } else {
      setLoggedInUserEmail(email); // Armazena o email do usuário logado
      axios.get('https://back-end-retz.onrender.com/getAllUsersByPoints')
        .then(response => {
          setUsers(response.data);
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
            } else if (user.email === loggedInUserEmail) { // Comparar com o email
              cardClass += " logged-user"; 
            }

            return (
              <div className={cardClass} key={user.email}> {/* Use email como key */}
                <div className="user-photo">
                  <img src={pig} alt="Foto do usuário" />
                  {index === 0 && (
                    <div className="medal-container">
                      <img src={medalha} alt="Medalha" className="medalha" />
                    </div>
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
