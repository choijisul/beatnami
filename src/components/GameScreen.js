import React from 'react';
import './css/GameScreen.css';

const GameScreen = ({ ScreenName, GoBackClick }) => {
  return (
    <div className="game-screen">
      <button className='back-button' onClick={GoBackClick} />
    </div>
  );
};

export default GameScreen;