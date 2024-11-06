import React, { useEffect, useState } from 'react';
import logo from '../../Assets/LogoPorco.png'; 
import '../Começar/Começar.css'; 
import MainButton from '../../components/Button/button.jsx'; 
import Typical from 'react-typical';
import axios from 'axios';

function Comecar() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      const storedEmail = localStorage.getItem('userEmail');
      if (storedEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/getUserByEmail/${storedEmail}`);
          if (response.status === 200 && response.data) {
            setUserName(response.data.nome);
          } else {
            console.error('Usuário não encontrado ou erro ao buscar o nome');
          }
        } catch (error) {
          console.error('Erro ao buscar o nome do usuário:', error);
        }
      }
      setIsLoading(false);
    };

    fetchUserName();
  }, []);

  return (
    <div className='Comecar'>
      <div className='box2'>
        <div className='Dialog'>
          {isLoading ? (
            <p></p>
          ) : (
            <Typical
              loop={Infinity}
              steps={[`Oie, ${userName}! Sou o Poupinho!`, 400]}
            />
          )}
        </div>

        <img className='LogoPrincipal' src={logo} alt="Logo do Porco" />
        <MainButton text={'Continuar'} url={'/Perguntas'} />
      </div>
    </div>
  );
}

export default Comecar;
