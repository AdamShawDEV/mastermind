import './App.css';
import TileBoard from './components/TileBoard';
import { useState } from 'react';
import { MAX_NUM_ROWS, NUM_COLORS, COLORS, GAME_STATE } from './constants';

function App() {
  const [rows, setRows] = useState(Array(MAX_NUM_ROWS).fill({
    tiles: [],
    correct: 0,
    wrong: 0,
  }));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentTile, setCurrentTile] = useState(0);
  const [answer] = useState(['red', 'green', 'blue', 'black']);
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);

  function checkRow() {
    let correct = 0;
    let wrong = 0;
    let checked = Array(NUM_COLORS).fill(false);

    for (let i = 0; i < NUM_COLORS; i++) {
      if (rows[currentRow].tiles[i].value === answer[i]) {
        checked[i] = true;
        correct++;
      }
    }

    for (let i = 0; i < NUM_COLORS; i++) {
      for (let j = 0; j < NUM_COLORS; j++) {
        if (rows[currentRow].tiles[i].value === answer[j] && i !== j && !checked[j]) {
          checked[j] = true;
          wrong++;
        }
      }
    }

    setRows(current =>
      current.map((row, idx) =>
        idx === currentRow ?
          {
            tiles: row.tiles.map(tile => { return { ...tile, status: 'checked' }; }),
            correct,
            wrong,
          }
          : row
      ));

    return correct;
  }

  function handleKeyClick(e) {
    if (gameState !== GAME_STATE.PLAYING) return;
    switch (e.target.id) {
      case 'enter':
        if (currentTile === NUM_COLORS) {
          if (checkRow() === NUM_COLORS) {
            setGameState(GAME_STATE.WON)
            return;
          } else if (currentRow === MAX_NUM_ROWS - 1) {
            setGameState(GAME_STATE.LOST);
            return;
          }
          setCurrentRow(curr => curr + 1);
          setCurrentTile(0);
        }
        break;
      case 'del':
        if (rows[currentRow].tiles.length > 0) {
          setRows(curr =>
            curr.map((row, idx) =>
              idx === currentRow ? { ...row, tiles: row.tiles.slice(0, -1) } : row
            )
          );
          setCurrentTile(curr => curr - 1);
        }
        break;
      default:
        if (currentTile < NUM_COLORS) {
          setRows(curr =>
            curr.map((row, idx) =>
              idx === currentRow ? {
                ...row, tiles: [...row.tiles, {
                  value: e.target.id,
                  status: 'unchecked',
                }]
              } : row
            )
          );

          setCurrentTile(curr => curr + 1);
        }
        break;
    }
  }

  // if (gameState === GAME_STATE.WON) return <h1>You Won!</h1>;
  // if (gameState === GAME_STATE.LOST) return <h1>You Lost!</h1>;

  return (
    <div className='gameContainer'>
      <header>Header</header>
      <main>
        <TileBoard rows={rows} />
        <div className='keypadRow'>
          <div onClick={handleKeyClick} id='enter' className='key enterKey'>
            enter
          </div>
          {Object.keys(COLORS).map(key =>
            <div key={key} id={key} style={{ backgroundColor: COLORS[key] }} onClick={handleKeyClick} className='key'>
            </div>
          )}
          <div onClick={handleKeyClick} id='del' className='key enterKey'>
            del
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
