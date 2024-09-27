import React from 'react';
import '../MenuBar/MenuBar.css';

const MenuBar = () => {
  return (
    <div>
      <footer className="footer">
        <ul className="nav-links">
          <li><a href="#home"><i className="icon-home"></i></a></li>
          <li><a href="#search"><i className="icon-search"></i></a></li>
          <li><a href="#add"><i className="icon-add"></i></a></li>
          <li><a href="#favorites"><i className="icon-favorites"></i></a></li>
          <li><a href="#account"><i className="icon-account"></i></a></li>
        </ul>
      </footer>
    </div>
  );
};

export default MenuBar;
