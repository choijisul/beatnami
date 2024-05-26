import React from 'react';
import './css/RankingScreen.css';

const RankingScreen = ({ ScreenName }) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
  const users = [...storedUsers];

  const renderRankings = () => {
    return users.map((user, index) => {
      if (index < 7) { // 7위까지 출력
        return (
          <div key={index} className='ranking-text-div'>
            <h3 className='no'>{index + 1}</h3>
            <h5 className='nickname'>{user.nickname}</h5> 
            <h5 className='score'>{user.score}</h5> 
          </div>
        );
      } else {
        return null; 
      }
    });
  };

  const handleClearLocalStorage = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // 특정 시간에 localstorage값 지워지게.  //
    if (currentHour === 10 && currentMinute === 20) {
        localStorage.removeItem('nickname');
        localStorage.removeItem('score');
        localStorage.removeItem('users');   
    }
};

  return (
    <div className='ranking-screen'>
      <button className='back-button' onClick={ScreenName}></button>
      <div className='ranking-bord'>
        <div className='ranking-div'>
          {renderRankings()}
        </div>
      </div>
    </div>
  );
};

export default RankingScreen;
