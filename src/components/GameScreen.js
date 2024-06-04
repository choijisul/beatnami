import React, { useEffect, useRef, useState } from 'react';
import gameImg1 from '../assets/img/field-flower1.png';
import gameImg2 from '../assets/img/field-flower2.png';
import iconVolum from '../assets/img/icon-volum.png';
import gameMusic from '../assets/background-music/round1.mp3';
import pondimg from '../assets/img/pond.png';
import pong from '../assets/img/hammer.png';
import pongDrive from '../assets/img/pond-drive.png'; // Import pond-drive image
import './css/GameScreen.css';

const GameScreen = ({ ScreenName, GoBackClick }) => {
  const [images, setImages] = useState([]);
  const [moveImages, setMoveImages] = useState(true);
  const [creatingAllowed, setCreatingAllowed] = useState(true);
  const [hammerPosition, setHammerPosition] = useState({ left: 'calc(50% + 450px)', top: 'calc(50% - 300px)' });
  const [rotateHammer, setRotateHammer] = useState(false); // State to trigger hammer rotation
  const imageWidth = 40; // 이미지 너비
  const maxImages = 4; // 한 번에 생성할 최대 이미지 개수
  const stop_t = 6000; // 이미지 생성 멈춤 시간

  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [showVolumeSlide, setShowVolumeSlide] = useState(false); // 슬라이드 바 표시 상태
  const [volume, setVolume] = useState(6); // 초기 볼륨 값 (1~12 중간값)

  // 이벤트 핸들러: 스페이스 바 누를 때 호출되는 함수
  const handleKeyDown = (event) => {
    if (event.code === 'Space') {
      setRotateHammer(true); // 스페이스 바 누르면 hammer 회전 트리거
      setTimeout(() => {
        setRotateHammer(false); // 0.1초 뒤에 다시 원래 상태로 설정
      }, 100);
      checkCollisions(); // Check for collisions when spacebar is pressed
    }
  };

  // 함수: hammer와 이미지 사이의 충돌을 검사
  const checkCollisions = () => {
    const hammer = document.getElementById('pong').getBoundingClientRect();
    images.forEach(image => {
      const imgElement = document.getElementById(`image-${image.id}`);
      if (imgElement) {
        const imgRect = imgElement.getBoundingClientRect();
        if (
          hammer.left < imgRect.right &&
          hammer.right > imgRect.left &&
          hammer.top < imgRect.bottom &&
          hammer.bottom > imgRect.top
        ) {
          handleImageClick(image.id);
        }
      }
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown); // 스페이스 바 이벤트 리스너 추가

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  // 이미지를 생성하는 useEffect
  useEffect(() => {
    const createImageInterval = setInterval(() => {
      if (!creatingAllowed) return; // 이미지 생성이 허용되지 않으면 멈춤

      setImages((prevImages) => {
        if (prevImages.length >= maxImages) {
          setCreatingAllowed(false); // 최대 이미지 개수에 도달하면 이미지 생성 멈춤
          setTimeout(() => {
            setCreatingAllowed(true); // stop_t 시간 후 되돌아가기
          }, stop_t);
          return prevImages;
        }

        return [
          ...prevImages,
          { id: Date.now(), left: 0, isClicked: false, src: pondimg } // Add isClicked and src properties
        ];
      });
    }, 1000); // 이미지 생성 1초마다

    return () => clearInterval(createImageInterval); // 컴포넌트 언마운트 시 인터벌 정지
  }, [creatingAllowed]);

  // 이미지를 움직이는 useEffect
  useEffect(() => {
    if (!moveImages) return; // moveImages가 false이면 이동 멈춤

    const moveInterval = setInterval(() => {
      setImages((prevImages) =>
        prevImages.map(image => {
          const containerPixelWidth = document.querySelector('.image-container').offsetWidth;
          const newLeft = image.left + imageWidth * 2; // 이동할 새로운 위치 (속도 2배)

          if (newLeft > containerPixelWidth) {
            return null; // 컨테이너 너비를 넘으면 null 반환
          }

          return {
            ...image,
            left: newLeft // 이미지 이동
          };
        }).filter(image => image !== null) // null인 이미지 제거
      );
    }, 250); // 0.25초마다 실행

    return () => clearInterval(moveInterval); // 컴포넌트 언마운트 시 인터벌 정지
  }, [moveImages]); // moveImages 상태에 따라 재실행

  // 이벤트 핸들러: 이미지 클릭 시 호출되는 함수
  const handleImageClick = (id) => {
    setImages((prevImages) =>
      prevImages.map(image => {
        if (image.id === id) {
          const newSrc = image.isClicked ? pondimg : pongDrive;
          return {
            ...image,
            isClicked: !image.isClicked,
            src: newSrc
          };
        }
        return image;
      })
    );
  };

  // 배경을 슬라이드시키는 useEffect
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
    img2.src = gameImg2;

    // 슬라이드 되는 화면 이미지가 그려지도록
    const todoDrawing = () => {
      ctx.clearRect(0, 0, width, height);

      // 이미지가 왼쪽으로 이동하면서 화면을 채우도록 설정
      ctx.drawImage(img1, move_x1, 0, width, height);
      ctx.drawImage(img2, move_x2, 0, width, height);

      move_x1 -= 1;
      move_x2 -= 1;

      // 이미지가 계속해서 반복하여 슬라이드 될 수 있도록
      if (move_x1 <= -width) move_x1 = width;
      if (move_x2 <= -width) move_x2 = width;

      requestAnimationFrame(todoDrawing); // requestAnimationFrame을 사용하여 반복 호출
    };

    // 두 이미지가 모두 로드되었을 때 애니메이션 시작
    img1.onload = () => {
      if (img2.complete) {
        todoDrawing();
      } else {
        img2.onload = todoDrawing;
      }
    };

  }, []);

  // 볼륨을 1~12 범위에서 0~1 범위로 조정
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 12;
    }
  }, [volume]);

  // 배경음악 소리가 나오게
  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('자동 재생이 차단되었습니다:', error);
      });
    }
  };

  // 음량 조절 슬라이드바 토글 형태
  const VolumButton = () => {
    setShowVolumeSlide(!showVolumeSlide);
  }

  // 음량 조절 기능
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  }

  return (
    <div className='game-screen'>
      {/* 이전 페이지 이동 */}
      <button className='back-button' onClick={GoBackClick} />

      {/* 음악 재생 */}
      <div className='background-music'>
        <audio ref={audioRef} src={gameMusic} loop></audio>
        <button onClick={playMusic}>음악 재생</button>
      </div>

      {/* 음량 조절 버튼 */}
      <div className='volum'>
        <button className='volum-button' onClick={VolumButton}>
          <img src={iconVolum} alt="Volume" />
        </button>
      </div>

      {/* 음량 조절 슬라이드바 */}
      {showVolumeSlide && (
        <input
          type="range"
          min="1"
          max="12"
          value={volume}
          onChange={handleVolumeChange}
          className='volum-slide'
        />
      )}

      {/* 다음 페이지 이동 */}
      <button className='next-button' onClick={ScreenName} />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* 이미지와 해머 표시 */}
        <div className="image-container" style={{ width: "100%", height: "600px", border: "1px solid black", position: "relative", overflow: "hidden" }}>
          {images.map((image) => (
            <img
              key={image.id}
              id={`image-${image.id}`} // Add ID for collision detection
              src={image.src} // Use dynamic src based on state
              alt="Moving"
              onClick={() => handleImageClick(image.id)} // Add click event handler
              style={{
                position: "absolute",
                left: `${image.left}px`, // left 값을 픽셀 단위로 설정
                top: '50%', // 중앙에 위치하도록 top 값 설정
                transform: 'translateY(-50%)', // 정확한 중앙 정렬을 위해 translateY 추가
                transition: "left 0.25s linear", // 0.25초 동안 이동 (속도 2배 빠르게)
              }}
            />
          ))}
          <img
            id="pong" // "hammer"를 "pong"으로 수정
            src={pong} // "hammer"를 "pong"으로 수정
            style={{
              position: "absolute",
              left: hammerPosition.left, // Apply dynamic left position
              top: hammerPosition.top, // Apply dynamic top position
              transform: rotateHammer ? 'rotate(-90deg)' : 'none', // Apply rotation if rotateHammer is true
              transition: "transform 0.1s", // Add transition for smooth rotation
            }}
          />
        </div>
      </div>

      {/* 배경을 그림 */}
      <canvas ref={canvasRef} />
    </div>
  );
}

export default GameScreen;
