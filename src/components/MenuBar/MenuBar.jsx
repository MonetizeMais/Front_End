import React from 'react';
  import { Link } from 'react-router-dom';
  import '../MenuBar/MenuBar.css';
  import homeIcon from '../../Assets/HomeIcon.png';
  import rankingIcon from '../../Assets/RankingIcon.png';
  import personalizacaoIcon from '../../Assets/PersonalizacaoIcon.png';
  import perfilIcon from '../../Assets/PerfilIcon.png';


  const MenuBar = ({ activePage }) => {
    return (
      <div>
        <footer className="footer">
          <ul className="nav-links">
            <li>
              <Link to="/HomePage" className={activePage === 'home' ? 'active' : ''}>
              <i className="icon">
                <img src={homeIcon} alt="Home icon" className="custom-icon" />
              </i>
              </Link>
            </li>
            <li>
              <Link to="/Ranking" className={activePage === 'medalha' ? 'active' : ''}>
              <i className="icon">
                <img src={rankingIcon} alt="Ranking icon" className="custom-icon" />
              </i>
              </Link>
            </li>
            <li>
              <Link to="/TelaPersonalizacao" className={activePage === 'pig' ? 'active' : ''}>
              <i className="icon">
                <img src={personalizacaoIcon} alt="Personalização icon" className="custom-icon" />
              </i>
              </Link>
            </li>
            <li>
              <Link to="/Perfil" className={activePage === 'perfil' ? 'active' : ''}>
              <i className="icon">
                <img src={perfilIcon} alt="Perfil icon" className="custom-icon" />
              </i>
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    );
  };

  export default MenuBar;