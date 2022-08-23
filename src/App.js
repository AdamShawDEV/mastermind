import './App.css';
import MindGame from './components/MindGame';
import { COLORS, NUM_COLORS } from './constants';
import { useState } from 'react';

function newGame() {
  let out = [];
  const keys = Object.keys(COLORS);

  for (let i = 0; i < NUM_COLORS; i++) {
    const idx = Math.floor(Math.random() * keys.length);
    out.push(keys[idx]);
  }

  return out;
}

function App() {
  const [key, setKey] = useState(1);

  return (
    <>
    <div className='gameContainer'>
      <header>Mastermind</header>
      <main>
        <MindGame key={key} startNewGame={() => setKey(curr => curr + 1)}  answer={newGame()} />
      </main>
    </div>
    </>
  );
}

export default App;
