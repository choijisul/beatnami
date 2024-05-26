import React, { useState } from 'react';
import './css/InputNicknameScreen.css';

const InputNicknameScreen = ({ ScreenName, GoBackClick }) => {
  const [nickname, setNickname] = useState('');

  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };

  const handleConfirmClick = () => {
    // 새로운 사용자 생성
    const newUser = { nickname, score: 0 };
    const prevUsers = JSON.parse(localStorage.getItem('users')) || []; // 이전 목록 가져옴
    const updatedUsers = [...prevUsers, newUser]; // 새 사용자 목록에 추가
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // 사용자 목록 localstorage에 저장

    console.log('Stored Users:', updatedUsers);
    ScreenName(nickname); // 닉네임을 전달하여 화면 전환
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
            value={nickname}
            onChange={handleInputChange} // 닉네임 변경 -> 핸들러 호출
          />
        </div>
      </div>
      <button className='goStory-button' onClick={handleConfirmClick}>확인</button>
    </div>
  );
};

export default InputNicknameScreen;
