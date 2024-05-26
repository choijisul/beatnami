import React, { useEffect } from 'react';
import './css/RankingScreen.css';

const RankingScreen = ({ ScreenName }) => {
  const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

  // 임의로 score랜덤으로 주기
  const getRandomScore = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const users = storedUsers.map(user => {
    if (!user.score || user.score === 0) {
      user.score = getRandomScore();
    }
    return user;
  });

  // 내림차순
  users.sort((a, b) => b.score - a.score);

  // 순위 출력
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const renderRankings = () => {
    return users.map((user, index) => {
      if (index < 7) { // 7위까지 출력
        return (
          <div key={index} className='ranking-text-div'>
            <div className='noNickname'>
              <h3 className='no'>{index + 1}</h3>
              <h5 className='nickname'>{user.nickname}</h5>
            </div>
            <h5 className='score'>{user.score}</h5>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  // 특정 시간에 localstorage값 지워지게.  //
  const handleClearLocalStorage = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

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
