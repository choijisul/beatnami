import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/StoryScreen.css';
import dialoguesData from '../assets/dialog.json'; // JSON 파일 경로

const StoryScreen = ({ ScreenName, nickname }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialogues, setDialogues] = useState([]);
  const currentInterval = useRef(null); // useRef로 currentInterval 정의

  useEffect(() => {
    // JSON 데이터를 state에 설정
    setDialogues(dialoguesData);
  }, []);

  const startAnimation = (dialogue) => {
    setIsAnimating(true);
    setCurrentText('');
    let index = 0;
    const interval = setInterval(() => {
      setCurrentText((prev) => prev + dialogue[index]);
      index++;
      if (index === dialogue.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 50); // 글자 출력 속도 조절
    currentInterval.current = interval; // currentInterval에 interval 저장
  };

  const handleDialogueClick = useCallback(() => {
    if (isAnimating) {
      // 현재 애니메이션 중이면 대사를 모두 출력
      clearInterval(currentInterval.current);
      setCurrentText(dialogues[currentDialogueIndex].dialogue);
      setIsAnimating(false);
    } else {
      // 애니메이션이 끝났다면 다음 대사로
      if (currentDialogueIndex < dialogues.length - 1) {
        setCurrentDialogueIndex(currentDialogueIndex + 1);
      } else {
        ScreenName();
      }
    }
  }, [isAnimating, currentDialogueIndex, dialogues, ScreenName]);

  useEffect(() => {
    if (dialogues.length > 0) {
      startAnimation(dialogues[currentDialogueIndex].dialogue);
    }
  }, [currentDialogueIndex, dialogues]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleDialogueClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDialogueClick]);

  if (dialogues.length === 0) return null; // 데이터가 로드되기 전에는 아무것도 표시하지 않음

  const { name } = dialogues[currentDialogueIndex] || {}; // 안전하게 접근

  return (
    <div className="story-screen">
      <div className="dialogue-box" onClick={handleDialogueClick}>
        <div className="dialogue-text">
          <p>
            <strong>{name === 'nickname' ? nickname : name}:</strong> {currentText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
