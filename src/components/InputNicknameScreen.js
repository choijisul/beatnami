import React from 'react';
import './css/InputNicknameScreen.css';

const InputNicknameScreen = ({ ScreenName, GoBackClick }) => {
  return (
    <div className='nickname-screen'>
      <button className='back-button' onClick={GoBackClick}></button>
      <div className='input-border-div'>
        <div className='input-title'>닉네임</div>
        <div className='input-div'>
          <input type='text' className='input' placeholder='닉네임을 입력해주세요' />
        </div>
      </div>
      <button className='goStory-button' onClick={ScreenName}>확인</button>
    </div>
  );
};

export default InputNicknameScreen;