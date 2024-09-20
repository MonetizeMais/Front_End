import React from 'react';
import '../Input/Input.css';

const MainInput = ({ type ,text }) => {
  return (
    <input className='MainInput' type={type} placeholder={text} />
  );
};

export default MainInput;
