import React from 'react';
import { Link } from 'react-router-dom'; 
import home from '../../Assets/home.png';
import perfil from '../../Assets/perfil.png';
import pig from '../../Assets/pig.png';
import medalha from '../../Assets/medalha.png';
import '../MenuBar/MenuBar.css';

const MenuBar = ({ activePage }) => {
  return (
    <div>
      <footer className="footer">
        <ul className="nav-links">
          <li>
            <Link to="/HomePage" className={activePage === 'home' ? 'active' : ''}>
              <img src={home} alt="Home" className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/" className={activePage === 'medalha' ? 'active' : ''}>
              <img src={medalha} alt="Ranking" className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/Personalizacao" className={activePage === 'pig' ? 'active' : ''}>
              <img src={pig} alt="Personalização" className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/" className={activePage === 'perfil' ? 'active' : ''}>
              <img src={perfil} alt="Perfil" className="nav-icon" />
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default MenuBar;
 