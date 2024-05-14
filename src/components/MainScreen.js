import React from 'react';
import './css/MainScreen.css';

const MainScreen = ({ startGame }) => {
  return (
    <div className="main-screen">
      <h1 className="title">비트나미</h1>
      <button className="start-button" onClick={startGame}>Start</button>
    </div>
  );
};

export default MainScreen;