import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css'; 
import pig from '../../Assets/Mascote 2.png'; 
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

      axios.get('https://back-end-retz.onrender.com/getAllUsersByPoints')
        .then(response => {
          setUsers(response.data);
          console.log(response.data);  
        })
        .catch(error => {
          console.error('Erro ao buscar os usuários:', error);  
        });
    }
  }, []);

  return (
    <div>
      <MenuBar />
      <h2 className="ranking-title">RANKING</h2>
      <br />
      {users
        .filter(user => user.email === loggedInUserEmail)
        .map(user => (
          <div className='user-container'>
            <div className='user-information'>
              <img key={user.email} src={user.fotoPerfil || pig} alt="Foto do usuário logado" className="logged-user-photo" />
              <p id='nome'>{user.nome}</p>
              <p id='nome'>{user.apelido}</p>
              </div>
            </div>
      ))}

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

            const userImage = user.fotoPerfil || pig;

            return (
              <div className={cardClass} key={user.email}>
                <div className="user-photo">
                  <img src={userImage} alt="Foto do usuário" />
                  {user.email === loggedInUserEmail && index !== 0 && (
                    <div className="tag-eu">Eu</div>
                  )}
                </div>
                <p id='nome'>{user.apelido}</p>
                <p>{user.pontos}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Ranking;
