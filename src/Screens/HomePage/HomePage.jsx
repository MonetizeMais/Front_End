import React from 'react';
import './HomePage.css';
import MenuBar from '../../components/MenuBar/MenuBar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';

function HomePage() {
  return (
    <div>
      <ScoreBar/>
      <MenuBar/>
    </div>
  );
}

export default HomePage;
