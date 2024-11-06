import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ScoreBar/ScoreBar.css';

const ScoreBar = () => {
  const [userStats, setUserStats] = useState({
    vida: 0,
    coin: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      
      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/getUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { vida, coin } = response.data;
            setUserStats({ vida, coin });
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <header className="header">
        <ul className="header-links">
          <li><span className="icon-heart"></span> <span>{userStats.vida}</span></li>
          <li><span className="icon-gem"></span> <span>{userStats.coin}</span></li>
        </ul>
      </header>
    </div>
  );
};

export default ScoreBar;
