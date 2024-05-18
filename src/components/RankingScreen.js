import React from 'react';
import './css/RankingScreen.css';

const RankingScreen = ({ ScreenName }) => {
  return (
    <div className="ranking-screen">
      <button className='back-button' onClick={ScreenName}></button>
      <button onClick={ScreenName}>게임 화면 넘어감</button>
    </div>
  );
};


export default RankingScreen;