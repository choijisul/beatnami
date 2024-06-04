import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import InputNicknameScreen from './components/InputNicknameScreen';
import StoryScreen from './components/StoryScreen';
import GameScreen from './components/GameScreen';
import RankingScreen from './components/RankingScreen';
import EndingStorydialog from './components/EndingStorydialog'; // 추가

function App() {
  const [currentScreenName, setCurrentScreenName] = useState("MAIN");
  const [nickname, setNickname] = useState(''); // 닉네임 상태 추가

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

  return (
    <div className="App">
      {currentScreenName === "MAIN" && <MainScreen ScreenName={goNickNameScreen} />}
      {currentScreenName === "NICKNAME" && (
        <InputNicknameScreen 
          ScreenName={goStoryScreen} 
          GoBackClick={goMainScreen} 
          setNickname={setNickname} // 닉네임 설정 함수 전달
        />
      )}
      {currentScreenName === "STORY" && (
        <StoryScreen 
          ScreenName={goGameScreen} 
          nickname={nickname} // 닉네임 전달
        />
      )}
      {currentScreenName === "GAME" && (
        <GameScreen 
          ScreenName={goRankingScreen} 
          GoBackClick={goStoryScreen}
        />
      )}
      {currentScreenName === "RANKING" && <RankingScreen ScreenName={goMainScreen}/>}
      {currentScreenName === "ENDING" && <EndingStorydialog ScreenName={goEndingScreen}/>}
    </div>
  );
}

export default App;
