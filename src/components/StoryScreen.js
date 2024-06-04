import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/StoryScreen.css';
import dialoguesData from '../assets/dialog.json'; // JSON 파일 경로

const StoryScreen = ({ ScreenName, GoBackClick, nickname }) => {
  const [currentScene, setCurrentScene] = useState('trainstation_scene');
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [dialogues, setDialogues] = useState([]);
  const [isFading, setIsFading] = useState(false);
  const currentInterval = useRef(null);

  useEffect(() => {
    setDialogues(dialoguesData[currentScene] || []);
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
      clearInterval(currentInterval.current);
      setCurrentText(dialogues[currentDialogueIndex].dialogue);
      setIsAnimating(false);
    } else {
      const nextDialogue = dialogues[currentDialogueIndex]?.next;
      if (nextDialogue === null) {
        setIsFading(true);
        setTimeout(() => {
          ScreenName();
          setIsFading(false);
        }, 1000);
      } else if (typeof nextDialogue === 'string') {
        setCurrentScene(nextDialogue);
        setCurrentDialogueIndex(0);
      } else if (typeof nextDialogue === 'number') {
        setCurrentDialogueIndex(nextDialogue);
      }
    }
  }, [isAnimating, currentDialogueIndex, dialogues, ScreenName]);

  useEffect(() => {
    if (dialogues.length > 0) {
      startAnimation(dialogues[currentDialogueIndex]?.dialogue || '');
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

  if (dialogues.length === 0) return null;

  const { name } = dialogues[currentDialogueIndex] || {};

  return (
    <div className={`story-screen ${isFading ? 'fade-out' : 'fade-in'}`}>
      <button className="back-button" onClick={GoBackClick}></button>
      <div className="dialogue-box" onClick={handleDialogueClick}>
        <div className="dialogue-text">
          <p>
            <strong id='nickname'>{name === 'nickname' ? nickname : name} </strong> 
          </p>
          <p>
            {currentText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryScreen;
