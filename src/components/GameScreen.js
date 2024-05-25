import React, { useEffect, useRef } from 'react';
import './css/GameScreen.css';
import gameImg1 from './img/field-flower1.png';
import gameImg2 from './img/field-flower2.png';
import iconVolum from './img/icon-volum.png';

const GameScreen = ({ ScreenName, GoBackClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let move_x1 = 0; // 첫 번째 이미지의 시작 위치
    let move_x2 = width; // 두 번째 이미지의 시작 위치

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

        // 이미지가 왼쪽으로 이동하면서 화면을 채우도록 설정
        ctx.drawImage(img1, move_x1, 0, width, height);
        ctx.drawImage(img2, move_x2, 0, width, height);

        move_x1 -= 1;
        move_x2 -= 1;

        // 이미지가 계속해서 반복하여 슬라이드 될 수 있도록
        if (move_x1 <= -width) move_x1 = width;
        if (move_x2 <= 0) move_x2 = width;

      }, 5);

      return () => clearInterval(inter);
    }
  }, []);

  function VolumButton() {
    // 버튼 클릭 이벤트 처리
  }

  return (
    <div className='game-screen'>
      <button className='back-button' onClick={GoBackClick} />
      <button className='volum-button' onClick={VolumButton}>
        <img src={iconVolum} alt="볼륨" />
      </button>
      <button className='' onClick={ScreenName} />    {/* 다음으로 넘어가는 버튼 */}
      <canvas ref={canvasRef} />
    </div>
  )
}

export default GameScreen;
