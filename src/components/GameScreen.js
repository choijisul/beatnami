import React from 'react';

const GameScreen = ({ ScreenName }) => {
  return (
    <div>
      <h1>게임 화면, 못 박는..</h1>
      <button onClick={ScreenName}>랭킹으로 넘어감</button>
    </div>
  );
};


export default GameScreen;