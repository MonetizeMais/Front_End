import React from 'react';
import '../InputCode/InputCode.css';

const MainInput = ({ type }) => {
  const handleInputChange = (event) => {
    const { value, maxLength } = event.target;
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
  };

  return (
    <input
      className="InputCode"
      type={type}
      maxLength="1"
      onChange={handleInputChange}
    />
  );
};

export default MainInput;
