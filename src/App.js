import logo from './logo.svg';
import './App.css';
import NumberBoard from './components/NumberBoard';
import { useState } from 'react';

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);
const NUM_DIGITS = 5;
const MAX_NUM_ROWS = 5;

function App() {
  const [rows, setRows] = useState(Array(MAX_NUM_ROWS).fill({
    numbers: [],
    correct: 0,
    wrong: 0,
  }));
  const [currentRow, setCurrentRow] = useState(0);
  const [currentDigit, setCurrentDigit] = useState(0);
  const [answer, setAnswer] = useState(['1', '2', '3', '4', '5']);

  function checkRow() {
    let correct = 0;
    let checked = Array(NUM_DIGITS).fill(false);

    for (let i = 0; i < NUM_DIGITS; i++) {
      if (rows[currentRow].numbers[i].value === answer[i]) {
        checked[i] = true;
        correct++;
      }
    }

    let wrong = 0;
    for (let i = 0; i < NUM_DIGITS; i++) {
      for (let j = 0; j < NUM_DIGITS; j++) {
        if (rows[currentRow].numbers[i].value === answer[j] && i !== j && !checked[j]) {
          checked[j] = true;
          wrong++;
        }
      }
    }

    setRows(current =>
      current.map((row, idx) =>
        idx === currentRow ?
          {
            ...row,
            correct,
            wrong,
          }
          : row
      ));

  }

  function handleKeyClick(e) {
    switch (e.target.id) {
      case 'enter':
        if (currentDigit === NUM_DIGITS) {
          checkRow();
          setCurrentRow(curr => curr + 1);
          setCurrentDigit(0);
        }
        break;
      case 'del':
        if (rows[currentRow].numbers.length > 0) {
          setRows(curr =>
            curr.map((row, idx) =>
              idx === currentRow ? { ...row, numbers: row.numbers.slice(0, -1) } : row
            )
          );
          setCurrentDigit(curr => curr - 1);
        }
        break;
      default:
        if (currentDigit < NUM_DIGITS) {
          setRows(curr =>
            curr.map((row, idx) =>
              idx === currentRow ? {
                ...row, numbers: [...row.numbers, {
                  value: e.target.id,
                  status: 'unchecked',
                }]
              } : row
            )
          );

          setCurrentDigit(curr => curr + 1);
        }
        break;
    }
  }

  return (
    <div className='gameContainer'>
      <header>Header</header>
      <main>
        <NumberBoard rows={rows} />
        <div className='keypadRow'>
          <div onClick={handleKeyClick} id='enter' className='key enterKey'>
            enter
          </div>
          {range(0, 9).map(key =>
            <div key={key} id={key} onClick={handleKeyClick} className='key'>
              {key}
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
