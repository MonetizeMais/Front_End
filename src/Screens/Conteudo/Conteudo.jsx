import React, { useState } from 'react';
import LogoTeacher from '../../Assets/Mascote Teacher.png';
import LogoStudent from '../../Assets/Mascote 2.png';
import Close from '../../Assets/Close.png';
import MainButton from '../../components/Button/button.jsx'; 
import '../Conteudo/Conteudo.css';

function Conteudo() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'student', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 2, sender: 'teacher', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 3, sender: 'student', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 4, sender: 'teacher', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 5, sender: 'student', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 6, sender: 'teacher', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 7, sender: 'student', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' },
    { id: 8, sender: 'teacher', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, laborum?' }
  ]);


  return (
    <div className="ConteudoScreen">
      
      <div className="question-header_Quizz">
        <img src={Close} alt="Close" className="Close_Quizz" />

        <div className="progress-bar_Quizz">
          <div className="progress_Quizz" style={{ width: '50%' }}></div>
        </div>

        <ul className="header-links-Quizz">
          <li><span className="icon-heart"></span> <span>5</span></li>
          <li><span className="icon-gem"></span> <span>20</span></li>
        </ul>
      </div>

      <div className="question-section">
        <img className="LogoPrincipal" src={LogoTeacher} alt="Logo" />
        <div className="question-box">
          <span>Texto teste</span>
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
        <MainButton text="ENTENDI" url="/CadastreDados" />
      </div>
    </div>
  );
}

export default Conteudo;
