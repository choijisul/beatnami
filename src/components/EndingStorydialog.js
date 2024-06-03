import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/StoryScreen.css';
import endingDialogData from '../assets/endingdialog.json'; // JSON 파일 경로

const EndingStorydialog = ({ ScreenName, nickname }) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialogues, setDialogues] = useState([]);
  const currentInterval = useRef(null);

  // 대사 데이터 설정
  useEffect(() => {
    setDialogues(endingDialogData);
  }, []);

  // 애니메이션 시작
  const startAnimation = useCallback((dialogue) => {
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
  }, []);

  // 대사 클릭 핸들러
  const handleDialogueClick = useCallback(() => {
    if (isAnimating) {
      clearInterval(currentInterval.current);
      setCurrentText(dialogues[currentDialogueIndex].dialogue);
      setIsAnimating(false);
    } else {
      const nextDialogue = dialogues[currentDialogueIndex]?.next;
      if (nextDialogue === null) {
        ScreenName(); // 스크린 이름 변경 함수 호출
      } else if (typeof nextDialogue === 'number') {
        setCurrentDialogueIndex(nextDialogue);
      }
    }
  }, [isAnimating, currentDialogueIndex, dialogues, ScreenName]);

  // 대사 애니메이션 시작
  useEffect(() => {
    if (dialogues.length > 0) {
      startAnimation(dialogues[currentDialogueIndex].dialogue || '');
    }
  }, [currentDialogueIndex, dialogues, startAnimation]);

  // 키 다운 이벤트 핸들러 등록
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

  // 대사가 없을 경우 렌더링하지 않음
  if (dialogues.length === 0) return null;

  const { name } = dialogues[currentDialogueIndex] || {};

  return (
    <div className="story-screen" style={{ backgroundImage: "url('/src/assets/img/pizzashop.png')" }}>
      <div className="dialogue-box" onClick={handleDialogueClick}>
        <div className="dialogue-text">
          <p>
            <strong id="nickname">{name === 'nickname' ? nickname : name} </strong> {currentText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EndingStorydialog;
