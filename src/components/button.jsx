import React from 'react';
import '../App.css';

const MainButton = ({ text, url }) => {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <button className='botaoPrincipal' onClick={handleClick}>
      {text}
    </button>
  );
};

export default MainButton;