import React from 'react';

const InputNicknameScreen = ({ ScreenName }) => {
  return (
    <div className="inputNickname">
      <h1>닉네임 입력</h1>
      <button onClick={ScreenName}>스토리 화면 넘어감</button>
    </div>
  );
};


export default InputNicknameScreen;