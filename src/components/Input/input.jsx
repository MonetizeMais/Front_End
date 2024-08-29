import React from 'react';
import '../App.css';

const MainInput = ({ type ,text }) => {
  return (
    <input className='MainInput' type={type} placeholder={text} />
  );
};

export default MainInput;
