import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import InputNicknameScreen from './components/InputNicknameScreen';
import StoryScreen from './components/StoryScreen';
import GameScreen from './components/GameScreen';
import RankingScreen from './components/RankingScreen';
import EndingStorydialog from './components/EndingStorydialog'; // 추가

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

  const goEndingScreen = () => {
    setCurrentScreenName("ENDING");
  };

  // 버튼 누르면 화면이름 바꿔서 다음화면으로 넘어감
  return (
    <div className="App">
      {currentScreenName === "MAIN" && <MainScreen ScreenName={goNickNameScreen} />}
      {currentScreenName === "NICKNAME" && <InputNicknameScreen ScreenName={goStoryScreen} GoBackClick={goMainScreen}/>}  {/* goBack이 뒤로 가기 */}
      {currentScreenName === "STORY" && <StoryScreen ScreenName={goGameScreen} />}
      {currentScreenName === "GAME" && <GameScreen ScreenName={goRankingScreen}/>}
      {currentScreenName === "GAME" && <GameScreen ScreenName={goRankingScreen} GoBackClick={goStoryScreen}/>}
      {currentScreenName === "RANKING" && <RankingScreen ScreenName={goMainScreen}/>}
      {currentScreenName === "ENDING" && <EndingStorydialog ScreenName={goEndingScreen}/>} {/* 수정된 부분 */}
    </div>
  );
}

export default App;
