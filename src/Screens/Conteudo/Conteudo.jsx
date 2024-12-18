import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import LogoTeacher from '../../Assets/Mascote Teacher.png';
import LogoStudent from '../../Assets/Mascote 2.png';
import Close from '../../Assets/Close.png';
import '../Conteudo/Conteudo.css';

function Conteudo() {
  const [messages, setMessages] = useState([]);
  const [userStats, setUserStats] = useState({
    vida: 0,
    coin: 0,
    progresso: 0, 
  });
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const conteudo = location.state ? location.state.conteudo : null; 
  const level = location.state ? location.state.level : null; 

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      
      if (userEmail) {
        try {
          const response = await axios.get(`https://back-end-retz.onrender.com/getUserByEmail/${userEmail}`);
          if (response.status === 200) {
            const { vida, coin, progresso } = response.data; 
            setUserStats({ vida, coin, progresso });
            localStorage.setItem('userProgresso', progresso); 
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (conteudo) {
      const formattedMessages = conteudo.conversa.map((item, index) => ({
        id: index,
        sender: item.falante.toLowerCase() === 'professor' ? 'teacher' : 'student',
        text: item.texto,
      }));
      setMessages(formattedMessages);
    }
  }, [conteudo]);

  const handleClose = () => {
    navigate('/HomePage'); 
  };

  const handleStartQuizz = async () => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail && userStats.progresso == level) {
      try {
        const novoProgresso = userStats.progresso + 0.5;
        await axios.put(`https://back-end-retz.onrender.com/updateProgresso/${userEmail}/${novoProgresso}`);
        setUserStats((prevStats) => ({
          ...prevStats,
          progresso: novoProgresso,
        }));

        localStorage.setItem('userProgresso', novoProgresso);

        navigate('/Quizz', { state: { level } });
      } catch (error) {
        console.error('Erro ao atualizar progresso do usuário:', error);
      }
    } else {
      navigate('/Quizz', { state: { level } });
    }
  };

  return (
    <div className="ConteudoScreen">
      <div className="question-header_Quizz">
        <img src={Close} alt="Close" className="Close_Quizz" onClick={handleClose} /> 

        <ul className="header-links-Quizz">
          <li><span className="icon-heart"></span> <span>{userStats.vida}</span></li>
          <li><span className="icon-gem"></span> <span>{userStats.coin}</span></li>
        </ul>
      </div>

      <div className="question-section">
        <img className="LogoPrincipal" src={LogoTeacher} alt="Logo" />
        <div className="question-box">
          <span>{conteudo ? conteudo.conteudo : 'Carregando...'}</span>
        </div>
      </div>

      <div className='box3'>
        <div className="chat">
          {messages.map((message) => (
            <div key={message.id} className={message.sender}>
              {message.sender === 'teacher' && <img src={LogoTeacher} alt="Teacher Logo" className="logo" />}
              <p>{message.text}</p>
              {message.sender === 'student' && <img src={LogoStudent} alt="Student Logo" className="logo" />}
            </div>
          ))}
        </div>
        <button className='botaoPrincipal' onClick={handleStartQuizz}>ENTENDI</button>
      </div>
    </div>
  );
}

export default Conteudo;