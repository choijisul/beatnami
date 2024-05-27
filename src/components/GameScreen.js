import React, { useEffect, useRef } from 'react';
import './css/GameScreen.css';
import gameImg1 from './img/field-flower1.png';
import gameImg2 from './img/field-flower2.png';
import iconVolum from './img/icon-volum.png';
import gameMusic from './background-music/round1.mp3';

const GameScreen = ({ ScreenName, GoBackClick }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // 화면 슬라이드
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let move_x1 = 0;      // 첫 번째 이미지의 시작 위치
    let move_x2 = width;  // 두 번째 이미지의 시작 위치

    const img1 = new Image();
    const img2 = new Image();

    img1.src = gameImg1;
    img1.onload = function () {
      img2.src = gameImg2;
      img2.onload = function () {
        todoDrawing();
      }
    }

    // 슬라이드 되는 화면 이미지가 그려지도록
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

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('자동 재생이 차단되었습니다:', error);
      });
    }
  };

  const VolumButton = () => {
    // 버튼 클릭 이벤트 처리 (임시)
  }

  return (
    <div className='game-screen'>
      {/* 음악 재생 */}
      <audio ref={audioRef} src={gameMusic} loop></audio>
      <button onClick={playMusic}>음악 재생</button>

      {/* 음량 조절 버튼 */}
      <div className='volum'>
        <button className='volum-button' onClick={VolumButton}>
          <img src={iconVolum} alt="볼륨" />
        </button>
      </div>

      {/* 이전 페이지로 이동 */}
      <button className='back-button' onClick={GoBackClick} />

      {/* 다음 페이지로 이동 */}
      <button className='next-button' onClick={ScreenName} />

      {/* 이동하는 이미지 */}
      <canvas ref={canvasRef} />
    </div>
  );
}

export default GameScreen;
