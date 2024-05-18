import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import InputNicknameScreen from './components/InputNicknameScreen';
import StoryScreen from './components/StoryScreen';
import GameScreen from './components/GameScreen';
import RankingScreen from './components/RankingScreen';


function App() {
  // 현재 표시할 화면을 구분하기 위한 상태 값
  const [currentScreenName, setCurrentScreenName] = useState("MAIN");

  const goNickNameScreen = () => {
    setCurrentScreenName("NICKNAME");
  };

  const goStoryScreen = () => {
    setCurrentScreenName("STORY");
  };
  
  const goGameScreen = () => {
    setCurrentScreenName("GAME");
  };

  const goRankingScreen = () => {
    setCurrentScreenName("RANKING");
  };

  const goMainScreen = () => {
    setCurrentScreenName("MAIN");
  };

  // 버튼 누르면 화면이름 바꿔서 다음화면으로 넘어감
  return (
    <div className="App">
      {currentScreenName === "MAIN" && <MainScreen ScreenName={goNickNameScreen} />}
      {currentScreenName === "NICKNAME" && <InputNicknameScreen ScreenName={goStoryScreen} />}
      {currentScreenName === "STORY" && <StoryScreen ScreenName={goGameScreen} />}
      {currentScreenName === "GAME" && <GameScreen ScreenName={goRankingScreen}/>}
      {currentScreenName === "RANKING" && <RankingScreen ScreenName={goMainScreen}/>}
    </div>
  );
}

export default App;