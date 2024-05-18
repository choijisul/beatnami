import React from 'react';

const StoryScreen = ({ ScreenName }) => {
  return (
    <div>
      <h1>스토리 나오는 화면</h1>
      <button onClick={ScreenName}>게임 화면으로 넘어감</button>
    </div>
  );
};


export default StoryScreen;