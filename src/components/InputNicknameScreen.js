import React, { useState } from 'react';
import './css/InputNicknameScreen.css';

const InputNicknameScreen = ({ ScreenName, GoBackClick, setNickname }) => {
  const [nicknameInput, setNicknameInput] = useState('');

  const handleInputChange = (e) => {
    setNicknameInput(e.target.value);
  };

  const randomNickname = () => {
    const str1 = [
      '위인100인 ', '자존감 100% ', 'MBTI I 100% ', 'MBTI E 100%',
      '행복한 ', '신비로운 ', '장화신은 ', '열정 100% ',
      '영리한 ', '운빨 100% ', '용기있는 ', '창의력 만랩 ',
      '집중력 100% ', '열정적인 ', '1등 ', '꼴등 ',
      '승률 100% ', '자유로운 영혼 ', '승률 0% ', '감성적인 ',
      '사회성 없는 ', '유리맨탈 ', '활발한 ', '방구뀌는 ',
      '자취하는 ', '탕진하는 ', '키 1cm ', '키 2m ',
      '열정적인 ', '짝사랑하는 ', '인내심 없는 ', '아재개그 좋아하는 '
    ];
    
    const str2 = [
      '핑크팬더', '쿵푸팬더', '말린귤', '무지개 유니콘',
      '햄스터', '인면조', '고양이', '레이디버그',
      '강아지', '곰', '거북이','여우', '미림인',
      '백조', '돼지', '다람쥐', '음치', '박치',
      '호랑이', '펭귄', '너구리', '고릴라', 
      '황소', '투명인간', '행운아', '유명인', '컴퓨터 중독자'
    ];
    
    const randomStr1 = str1[Math.floor(Math.random() * str1.length)];
    const randomStr2 = str2[Math.floor(Math.random() * str2.length)];
    setNicknameInput(randomStr1.concat(randomStr2));
  };

  const handleConfirmClick = () => {
    const newUser = { nickname: nicknameInput, score: 0 };
    const prevUsers = JSON.parse(localStorage.getItem('users')) || [];

    const isDuplicate = prevUsers.some(user => user.nickname === nicknameInput);

    if (isDuplicate) {
      alert('이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.');
      setNicknameInput('');
    } else if (nicknameInput === '') {
      alert('닉네임이 입력되지 않았습니다.');
    } else {
      const updatedUsers = [...prevUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setNickname(nicknameInput); // 닉네임 설정
      ScreenName(); // 화면 전환
    }
  };

  return (
    <div className='nickname-screen'>
      <button className='back-button' onClick={GoBackClick}></button>
      <div className='input-border-div'>
        <div className='input-title'>닉네임</div>
        <div className='input-div'>
          <input
            type='text'
            className='input'
            placeholder='닉네임을 입력해주세요'
            value={nicknameInput}
            onChange={handleInputChange}
          />
          <button className='random-nickname' onClick={randomNickname}>랜덤</button>
        </div>
      </div>
      <button className='goStory-button' onClick={handleConfirmClick}>확인</button>
    </div>
  );
};

export default InputNicknameScreen;
