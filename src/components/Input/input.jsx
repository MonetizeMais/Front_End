import React from 'react';
import '../Input/Input.css';

const MainInput = ({ name, type, text, value, onChange }) => {
  return (
    <input 
      className='MainInput' 
      type={type} 
      name={name}  
      placeholder={text} 
      value={value}  
      onChange={onChange}  
    />
  );
};

export default MainInput;
