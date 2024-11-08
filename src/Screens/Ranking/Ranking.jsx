import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ranking.css';
import pig from '../../Assets/Mascote 2.png';
import medalha from '../../Assets/award-solid 1.png';
import MenuBar from '../../components/MenuBar/MenuBar';

function Ranking() {
  const [users, setUsers] = useState([]);
  const [firstUser, setUser] = useState(null);
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
        })
        .catch(error => {
          setErrorMessage('Erro ao carregar os usuários.');
        });
    }
  }, []);  

  return (
    <div>
      <MenuBar />
      <header className='header-ranking'>
        <h2 className="ranking-title">Venha ver o ranking! </h2>
      </header>

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
                <div className={`${index === 0 && "first-photo"} photo`}>
                  <img src={userImage} alt="Foto do usuário" className='image-photo' />
                  {index === 0 && (
                    <img src={medalha} alt="Medalha" className="medalha" />
                  )}
                  {user.email === loggedInUserEmail && (
                    <div className="tag-eu">Eu</div>
                  )}
                </div>
                <div>
                  <p className="name">{user.apelido}</p>
                  <p>{user.pontos}</p>
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
