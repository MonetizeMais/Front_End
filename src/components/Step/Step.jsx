import React from 'react';
import './Step.css';

function Step({ label, level, isSelected, onClick, progress }) {
  return (
    <div className={`step ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div
        className="progress-circle"
        style={{
          background: `conic-gradient(#FA5B77 ${progress * 3.6}deg, #EBEBEB ${progress * 3.6}deg)`
        }}
      >
        <div className="circle">
          <span className="level">{level}</span>
        </div>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default Step;
