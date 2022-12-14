import "./App.css";
import MindGame from "./components/MindGame";
import { COLORS, NUM_COLS } from "./constants";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import InstructionsModal from "./components/InstructionsModal";

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
  // on initial loadof the website always show the instructions
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
          <InstructionsModal close={() => setShowInstructions(false)} />
        )}
      </div>
    </>
  );
}

export default App;
