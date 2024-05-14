import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import GameScreen from './components/MainScreen'; // This should be another component you'll create for the actual game screen

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return (
    <div className="App">
      {isGameStarted ? <GameScreen /> : <MainScreen startGame={startGame} />}
    </div>
  );
}

export default App;