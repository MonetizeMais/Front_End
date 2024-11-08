import React from 'react';
import './Step.css';

function Step({ index, level, isSelected, onClick, progress }) {
  const isEven = index % 2 === 0;
  const diff = progress - level;
  const angle = diff < 0 ? 0 : diff >= 1 ? 360 : diff * 360;

  return (
    <div
      style={{
        position: "absolute",
        left: isEven ? "12%" : null,
        right: !isEven ? "12%" : null,
      }}
      className={`step ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div
        className="progress-circle"
        style={{
          background: `conic-gradient(#FA5B77 ${angle}deg, #EBEBEB ${angle}deg)`,
        }}
      >
        <div className="circle">
          <span className="level">{level}</span>
        </div>
      </div>
    </div>
  );
}

export default Step;
