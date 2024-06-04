import React from 'react';
import './css/MainScreen.css';

const MainScreen = ({ ScreenName }) => {
  return (
    <div className="main-screen">
      <h1 className="title" class="container" >BEATNAMI</h1>
      <button className="start-button" onClick={ScreenName}>Start</button>
    </div>
  );
};

export default MainScreen;