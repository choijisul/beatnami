import React, { useEffect, useRef } from 'react';
import './css/GameScreen.css';

const GameScreen = ({ ScreenName, GoBackClick }) => {
  const canvasRef = useRef(null);

  // 화면 슬라이드
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let width = canvas.width;
    let height = canvas.height;

    let move_x1 = 0;
    let move_x2 = width;

    let img1 = new Image();
    let img2 = new Image();

    img1.src = '/src/assets/img/field-flower1.png';
    img2.src = '/src/assets/img/field-flower2.png';

    img1.onload = function () {
      img2.onload = function () {
        todoDrawing();
      }
    }

    function todoDrawing() {
      let inter = setInterval(() => {
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(img1, move_x1, 0, width, height);
        ctx.drawImage(img2, move_x2, 0, width, height);

        move_x1 -= 1;
        move_x2 -= 1;

        if (move_x1 <= -width) move_x1 = width;
        if (move_x2 <= -width) move_x2 = width;
      }, 10);

      return () => clearInterval(inter);
    }
  }, []);

  return (
    <div className="game-screen">
      <button className='back-button' onClick={GoBackClick}></button>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default GameScreen;