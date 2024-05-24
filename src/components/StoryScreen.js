import React, { useState, useEffect } from 'react';
import './css/StoryScreen.css';
import dialoguesData from '../assets/dialog.json'; // JSON 파일 경로

const StoryScreen = ({ ScreenName, nickname }) => {
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
  const displayName = name === 'Person 1' ? nickname : name; // 'Person 1' 이름을 닉네임으로 변경

  return (
    <div className="story-screen">
      <div className="dialogue-box" onClick={handleDialogueClick}>
        <div className="dialogue-text">
          <p className="dialogue-name"><strong>{displayName}:</strong></p>
          <p className="dialogue-line">{dialogue}</p>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
