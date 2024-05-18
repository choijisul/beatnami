import React, { useEffect, useRef } from 'react';
import './css/GameScreen.css';
import gameImg1 from './img/field-flower1.png';
import gameImg2 from './img/field-flower2.png';

const CanvasAnimation = () => {
  const canvasRef = useRef(null);

  // 화면 슬라이드
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let move_x1 = 0;
    let move_x2 = width;

    const img1 = new Image();
    const img2 = new Image();

    img1.src = gameImg1;
    img1.onload = function () {
      img2.src = gameImg2;
      img2.onload = function () {
        todoDrawing();
      }
    }

    function todoDrawing() {
      let inter = setInterval(() => {
        ctx.clearRect(0, 0, width, height);

        // 화면에 그린 이미지
        ctx.drawImage(img1, move_x1, 0, img1.width, img1.height);
        ctx.drawImage(img2, move_x2, 0, img2.width, img2.height);

        // 속도
        move_x1 -= 1; 
        move_x2 -= 1; 

        if (move_x1 <= -width) move_x1 = width;
        if (move_x2 <= -width) move_x2 = width;
      }, 5); // 간격을 5밀리초로 설정합니다.

      return () => clearInterval(inter);
    }
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

export default CanvasAnimation;