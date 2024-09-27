import React from 'react';
import '../OptionButton/OptionButton.css';

const OptionButton = ({ text, onClick, isSelected }) => {
  return (
    <button
      className={`option-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default OptionButton;