  import React from 'react';
  import { Link } from 'react-router-dom'; 
  import '../MenuBar/MenuBar.css';

  const MenuBar = ({ activePage }) => {
    return (
      <div>
        <footer className="footer">
          <ul className="nav-links">
            <li>
              <Link to="/HomePage" className={activePage === 'home' ? 'active' : ''}>
              <i className="icon">🏠</i>
              </Link>
            </li>
            <li>
              <Link to="/" className={activePage === 'medalha' ? 'active' : ''}>
              <i className="icon">🏅</i>
              </Link>
            </li>
            <li>
              <Link to="/Personalizacao" className={activePage === 'pig' ? 'active' : ''}>
              <i className="icon">🖌️</i>
              </Link>
            </li>
            <li>
              <Link to="/" className={activePage === 'perfil' ? 'active' : ''}>
              <i className="icon">👤</i>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    );
  };

  export default MenuBar;
  