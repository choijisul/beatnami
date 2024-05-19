import React, { useState } from 'react';
import './css/StoryScreen.css';

const dialogues = [
  { name: 'Person 1', dialogue: '안녕하세요. 여기는 스토리 화면입니다.' },
  { name: 'Person 2', dialogue: '안녕하세요. 반갑습니다!' },
  { name: 'Person 1', dialogue: '게임 화면으로 넘어갈 준비 되셨나요?' },
];

const StoryScreen = ({ ScreenName }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const handleDialogueClick = () => {
    if (currentDialogueIndex < dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      ScreenName();
    }
  };

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
