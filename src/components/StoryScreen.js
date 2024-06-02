import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/StoryScreen.css';
import dialoguesData from '../assets/dialog.json'; // JSON 파일 경로

const StoryScreen = ({ ScreenName, nickname }) => {
  const [currentScene, setCurrentScene] = useState('trainstation_scene');
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialogues, setDialogues] = useState([]);
  const currentInterval = useRef(null);

  useEffect(() => {
    // 현재 씬의 대사 데이터를 state에 설정
    setDialogues(dialoguesData[currentScene]);
  }, [currentScene]);

  const startAnimation = (dialogue) => {
    setIsAnimating(true);
    setCurrentText('');
    let index = 0;
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev !== undefined ? prev + dialogue.charAt(index) : dialogue.charAt(index)));
      index++;
      if (index === dialogue.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 50);
    currentInterval.current = interval;
  };

  const handleDialogueClick = useCallback(() => {
    if (isAnimating) {
      // 애니메이션 중이면 대사를 모두 출력
      clearInterval(currentInterval.current);
      setCurrentText(dialogues[currentDialogueIndex].dialogue);
      setIsAnimating(false);
    } else {
      // 애니메이션이 끝났다면 다음 대사로 이동
      const nextDialogue = dialogues[currentDialogueIndex]?.next;
      if (nextDialogue === null) {
        // 스토리가 끝난 경우
        ScreenName();
      } else if (typeof nextDialogue === 'string') {
        // 다음 씬으로 전환
        setCurrentScene(nextDialogue);
        setCurrentDialogueIndex(0);
      } else if (typeof nextDialogue === 'number') {
        // 현재 씬의 다음 대사로 이동
        setCurrentDialogueIndex(nextDialogue);
      }
    }
  }, [isAnimating, currentDialogueIndex, dialogues, ScreenName]);

  useEffect(() => {
    if (dialogues.length > 0) {
      startAnimation(dialogues[currentDialogueIndex].dialogue || '');
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
