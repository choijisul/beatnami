import React from 'react';
import './css/RankingScreen.css';

const RankingScreen = ({ ScreenName }) => {
  return (
    <div className="ranking">
      <h1>랭킹 나오는 화면</h1>
      <button onClick={ScreenName}>게임 화면 넘어감</button>
    </div>
  );
};


export default RankingScreen;