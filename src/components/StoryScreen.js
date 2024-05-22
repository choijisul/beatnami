import React, { useState, useEffect } from 'react';
import './css/StoryScreen.css';
import dialoguesData from '../assets/dialog.json'; // JSON 파일 경로를 맞게 설정

const StoryScreen = ({ ScreenName }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [dialogues, setDialogues] = useState([]);

  useEffect(() => {
    // JSON 데이터를 state에 설정
    setDialogues(dialoguesData);
  }, []);

  const handleDialogueClick = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      ScreenName();
    }
  };

  if (dialogues.length === 0) return null; // 데이터가 로드되기 전에는 아무것도 표시하지 않음

  const { name, dialogue } = dialogues[currentDialogueIndex];

  return (
    <div className="story-screen">
      <div className="dialogue-box">
        <div className="dialogue-text">
          <p><strong>{name}:</strong> {dialogue}</p>
        </div>
      </div>
      <button onClick={handleDialogueClick}>
        {currentDialogueIndex < dialogues.length - 1 ? '다음 대사' : '게임 화면으로 넘어감'}
      </button>
    </div>
  );
};

export default StoryScreen;
