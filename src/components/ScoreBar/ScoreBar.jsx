import React from 'react';
import '../ScoreBar/ScoreBar.css'

const ScoreBar = () => {
  return (
    <div>
      <header className="header">
        <ul className="header-links">
          <li><span className="icon-fire"></span> <span>3</span></li>
          <li><span className="icon-heart"></span> <span>5</span></li>
          <li><span className="icon-gem"></span> <span>20</span></li>
        </ul>
      </header>
    </div>
  );
};

export default ScoreBar;
