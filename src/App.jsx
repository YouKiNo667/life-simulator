import React from 'react';
import useGameStore from './stores/gameStore';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

function App() {
  const { gameStarted } = useGameStore();

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      overflow: 'auto'
    }}>
      {!gameStarted ? <StartScreen /> : <GameScreen />}
    </div>
  );
}

export default App;
