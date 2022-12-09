import "./App.css";
import MindGame from "./components/MindGame";
import { COLORS, NUM_COLS } from "./constants";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";

function newGame() {
  let out = [];
  const keys = Object.keys(COLORS);

  for (let i = 0; i < NUM_COLS; i++) {
    const idx = Math.floor(Math.random() * keys.length);
    out.push(keys[idx]);
  }

  return out;
}

function App() {
  const [key, setKey] = useState(1);
  const [showInstructions, setShowInstructions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("mindGameIsFirstPlay")) ?? true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "mindGameIsFirstPlay",
      JSON.stringify(showInstructions)
    );
  }, [showInstructions]);

  return (
    <>
      <div className="gameContainer">
        <Header setShowInstructions={setShowInstructions} />
        <main>
          <MindGame
            key={key}
            startNewGame={() => setKey((curr) => curr + 1)}
            answer={newGame()}
          />
        </main>
        {showInstructions && (
          <Modal>
            <h1>Instructions</h1>
            <h2>Object of the Game</h2>
            <p>
              The object of the game is to guess a secret code consisting of a
              series of 4 colors. Each guess results in feedback narrowing down
              the possibilities of the secret code. To win solve the code within
              10 guesses.
            </p>
            <h2>Layout</h2>
            <img src="/images/gameBoard.png" alt="game board" />
            <ol>
              <li>Game Board</li>
              <li>Color Keypad</li>
            </ol>

            <h2>Gameplay</h2>
            <p>The game goes as follows:</p>
            <ol>
              <li>The player uses the keypad to input a series of colors.</li>
              <li>
                The game responds with 0-4 colored peds.
                <ul>
                  <li>
                    <p>
                      A yellow peg indicats the right color in the wrong
                      position
                    </p>
                    <img src="/images/yellowPeg.png" alt="yellow peg" />
                  </li>
                  <li>
                    <p>
                      A green peg indicates a color in the correct position.
                    </p>
                    <img src="/images/greenPeg.png" alt="green peg" />
                  </li>
                  <li>
                    <p>
                      No peg indicates a colour does not appear in the code.
                    </p>
                    <img src="/images/noPeg.png" alt="no peg" />
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  The player continues to place rows of colors and receive
                  feedback until either the code is broken, or the player runs
                  out of guesses.
                </p>
              </li>
            </ol>
            <h2>Examples</h2>

            <button onClick={() => setShowInstructions(false)}>close</button>
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
