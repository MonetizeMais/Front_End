import React from 'react';
import './InactiveButton.css';

const InactiveButton = ({ text, url, isActive }) => {
    const handleClick = () => {
      window.location.href = url;
    };

  return (
    <button 
      className={`inactive-button ${isActive ? 'active' : 'inactive'}`}
      onClick={handleClick}
      disabled={!isActive}
    >
      {text}
    </button>
  );
}

export default InactiveButton;
