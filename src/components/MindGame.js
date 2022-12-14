import { useState } from "react";
import TileBoard from "./TileBoard";
import { NUM_ROWS, NUM_COLS, GAME_STATE, COLORS } from "../constants";
import Keypad from "./Keypad";
import Toast from "./Toast";
import Modal from "./Modal";
import styles from "./modules/MindGame.module.css";
import useStats from "./hooks/useStats";
import Button from "./Button";

function MindGame({ startNewGame, answer }) {
  const [board, setBoard] = useState(() =>
    Array(NUM_ROWS).fill({
      tiles: Array(NUM_COLS).fill({
        value: "",
        status: "unchecked",
      }),
      correct: 0,
      wrong: 0,
    })
  );
  const [selectedTile, setSelectedTile] = useState({ row: 0, col: 0 });
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);
  const [toast, setToast] = useState({ display: false, message: "" });
  const { stats, statsDispatch } = useStats();

  function checkRow() {
    let correct = 0;
    let wrong = 0;
    let checkedAnswer = Array(NUM_COLS).fill(false);
    let checkedGuess = Array(NUM_COLS).fill(false);

    for (let i = 0; i < NUM_COLS; i++) {
      if (board[selectedTile.row].tiles[i].value === answer[i]) {
        checkedAnswer[i] = true;
        checkedGuess[i] = true;
        correct++;
      }
    }

    for (let i = 0; i < NUM_COLS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        if (
          board[selectedTile.row].tiles[i].value === answer[j] &&
          i !== j &&
          !checkedAnswer[j] &&
          !checkedGuess[i]
        ) {
          checkedAnswer[j] = true;
          checkedGuess[i] = true;
          wrong++;
        }
      }
    }

    setBoard((current) =>
      current.map((row, idx) =>
        idx === selectedTile.row
          ? {
              tiles: row.tiles.map((tile) => {
                return { ...tile, status: "checked" };
              }),
              correct,
              wrong,
            }
          : row
      )
    );

    return correct;
  }

  function handleKeyClick(e) {
    if (gameState !== GAME_STATE.PLAYING) return;

    switch (e.target.id) {
      case "enter":
        if (isRowFill(board, selectedTile.row)) {
          if (checkRow() === NUM_COLS) {
            setGameState(GAME_STATE.WON);
            statsDispatch({ type: "logWin" });
            return;
          } else if (selectedTile.row === NUM_ROWS - 1) {
            setGameState(GAME_STATE.LOST);
            statsDispatch({ type: "logLoss" });
            return;
          }
          setSelectedTile((curr) => {
            return { col: 0, row: curr.row + 1 };
          });
        } else {
          setToast({
            display: true,
            message: "Not enough colors.",
          });
        }
        break;
      case "del":
        if (board[selectedTile.row].tiles.length > 0) {
          setBoard((curr) =>
            curr.map((row, idx) =>
              idx === selectedTile.row
                ? {
                    ...row,
                    tiles: row.tiles.map((tile, idx) =>
                      idx === selectedTile.col
                        ? { value: "", status: "unchecked" }
                        : tile
                    ),
                  }
                : row
            )
          );
          setSelectedTile((curr) => {
            return {
              ...curr,
              col: curr.col > 0 ? curr.col - 1 : curr.col,
            };
          });
        }
        break;
      default:
        setBoard((curr) =>
          curr.map((row, idx) =>
            idx === selectedTile.row
              ? {
                  ...row,
                  tiles: row.tiles.map((tile, idx) => {
                    return idx === selectedTile.col
                      ? {
                          value: e.target.id,
                          status: "unchecked",
                        }
                      : tile;
                  }),
                }
              : row
          )
        );
        setSelectedTile((curr) => {
          return {
            ...curr,
            col: curr.col < NUM_COLS - 1 ? curr.col + 1 : curr.col,
          };
        });
        break;
    }
  }

  return (
    <>
      <TileBoard
        board={board}
        selectedTile={selectedTile}
        setSelectedTile={setSelectedTile}
      />
      <Keypad handleKeyClick={handleKeyClick} />
      {gameState !== GAME_STATE.PLAYING && (
        <Modal>
          <div className={styles.message}>
            <div>
              {gameState === GAME_STATE.WON ? "You Won! 😀" : "You Lost 😞"}
            </div>
            <div className={styles.answerContainer}>
              {answer.map((tile, idx) => (
                <div
                  key={idx}
                  className={styles.answerTile}
                  style={{ backgroundColor: COLORS[tile] }}
                ></div>
              ))}
            </div>
            <h1 className={styles.statsHeading}>Statistics</h1>
            <div className={styles.statsContainer}>
              <div className={styles.stat}>
                <h2 className={styles.statsSubHeading}>played</h2>
                <span>{stats.gamesPlayed}</span>
              </div>
              <div className={styles.stat}>
                <h2 className={styles.statsSubHeading}>won</h2>
                <span>{stats.winNum}</span>
              </div>
              <div className={styles.stat}>
                <h2 className={styles.statsSubHeading}>current streak</h2>
                <span>{stats.currStreak}</span>
              </div>
              <div className={styles.stat}>
                <h2 className={styles.statsSubHeading}>max streak</h2>
                <span>{stats.maxStreak}</span>
              </div>
            </div>
            <Button onClick={startNewGame}>New Game</Button>
          </div>
        </Modal>
      )}
      <Toast toast={toast} setToast={setToast} />
    </>
  );
}

function isRowFill(board, rowNum) {
  for (const i of board[rowNum].tiles) {
    if (!i.value) return false;
  }
  return true;
}

export default MindGame;
