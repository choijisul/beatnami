import React, { useState, useEffect } from 'react';
import './css/InputNicknameScreen.css';

const InputNicknameScreen = ({ ScreenName, GoBackClick }) => {
  const [nickname, setNickname] = useState('');

  const handleInputChange = (e) => {
    setNickname(e.target.value);
  };

  const handleConfirmClick = () => {
    const newUser = { nickname, score: 0 };
    const prevUsers = JSON.parse(localStorage.getItem('users')) || [];  //이전 목록 가져

    const isDuplicate = prevUsers.some(user => user.nickname === nickname);  // 닉네임 중복 확인

    if (isDuplicate) {
      alert('이미 존재하는 닉네임입니다. 다른 닉네임을 입력해주세요.');
      setNickname('');  // 입력 필드 비우기
    } else if(nickname === ''){
      alert('닉네임이 입력되지 않았습니다. ');
    }else {
      const updatedUsers = [...prevUsers, newUser];  //새 사용자 목록에 추가
      localStorage.setItem('users', JSON.stringify(updatedUsers));  //사용자 목록 localstorage에 저장
      console.log('Stored Users:', updatedUsers);
      ScreenName();  // 스크린 이름 변경 함수 호출
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
            value={nickname}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className='goStory-button' onClick={handleConfirmClick}>확인</button>
    </div>
  );
};

export default InputNicknameScreen;
