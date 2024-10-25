import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css'; 
import pig from '../../Assets/Mascote 2.png'; 
import medalha from '../../Assets/award-solid 1.png';   
import MenuBar from '../../components/MenuBar/MenuBar';

function Ranking() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null); 

  useEffect(() => {
    const userId = localStorage.getItem('ncdUsuario'); 
    if (!userId) {
      window.location.href = '/login'; 
    } else {
      setLoggedInUser(userId);

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
      <div className="ranking-container">
        {users.map((user, index) => {
          let cardClass = "ranking-card";
          
          if (index === 0) {
            cardClass += " first-place"; 
          } else if (user.ncdUsuario.toString() === loggedInUser) {
            cardClass += " logged-user"; 
          }

          return (
            <div className={cardClass} key={user.ncdUsuario}>
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
    </div>
  );
}

export default Ranking;
