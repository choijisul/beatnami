import React from 'react';
import './css/RankingScreen.css';

const RankingScreen = ({ ScreenName }) => {
  return (
    <div className='ranking-screen'>
      <button className='back-button' onClick={ScreenName}></button>
      <div className='ranking-bord'>
        <div className='ranking-div'>
          <div className='ranking-text-div'>
            <h3 className='no'>1</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
          <div className='ranking-text-div'>
            <h3 className='no'>2</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
          <div className='ranking-text-div'>
            <h3 className='no'>3</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
          <div className='ranking-text-div'>
            <h3 className='no'>4</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
          <div className='ranking-text-div'>
            <h3 className='no'>5</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
          <div className='ranking-text-div'>
            <h3 className='no'>6</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
          <div className='ranking-text-div'>
            <h3 className='no'>7</h3>
            <h5 className='nickname'>닉네임</h5>
            <h5 className='score'>점수</h5>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RankingScreen;