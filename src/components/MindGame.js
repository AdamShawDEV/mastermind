import { useState } from 'react';
import TileBoard from './TileBoard';
import { MAX_NUM_ROWS, NUM_COLORS, GAME_STATE, COLORS } from '../constants';
import Keypad from './Keypad';
import Toast from './Toast';
import Modal from './Modal';
import styles from './modules/MindGame.module.css';
import useStats from './hooks/useStats';

function MindGame({ startNewGame, answer }) {
    const [rows, setRows] = useState(Array(MAX_NUM_ROWS).fill({
        tiles: [],
        correct: 0,
        wrong: 0,
    }));
    const [currentRow, setCurrentRow] = useState(0);
    const [currentTile, setCurrentTile] = useState(0);
    const [gameState, setGameState] = useState(GAME_STATE.PLAYING);
    const [toast, setToast] = useState({ display: false, message: '' });
    const { stats, statsDispatch } = useStats();

    function checkRow() {
        let correct = 0;
        let wrong = 0;
        let checkedAnswer = Array(NUM_COLORS).fill(false);
        let checkedGuess = Array(NUM_COLORS).fill(false);

        for (let i = 0; i < NUM_COLORS; i++) {
            if (rows[currentRow].tiles[i].value === answer[i]) {
                checkedAnswer[i] = true;
                checkedGuess[i] = true;
                correct++;
            }
        }

        for (let i = 0; i < NUM_COLORS; i++) {
            for (let j = 0; j < NUM_COLORS; j++) {
                if (rows[currentRow].tiles[i].value === answer[j] && i !== j && !checkedAnswer[j] && !checkedGuess[i]) {
                    checkedAnswer[j] = true;
                    checkedGuess[i] = true;
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
                        setGameState(GAME_STATE.WON);
                        statsDispatch({ type: 'logWin' });
                        return;
                    } else if (currentRow === MAX_NUM_ROWS - 1) {
                        setGameState(GAME_STATE.LOST);
                        statsDispatch({ type: 'logLoss' });
                        return;
                    }
                    setCurrentRow(curr => curr + 1);
                    setCurrentTile(0);
                } else {
                    setToast({
                        display: true,
                        message: 'Not enough colors.',
                    });
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
                    setRows(curr => curr.map((row, idx) =>
                        idx === currentRow ? {
                            ...row, tiles: [...row.tiles, {
                                value: e.target.id,
                                status: 'unchecked',
                            }]
                        } : row));

                    setCurrentTile(curr => curr + 1);
                }
                break;
        }
    }

    return (
        <>
            <TileBoard rows={rows} />
            <Keypad handleKeyClick={handleKeyClick} />
            <Modal display={gameState !== GAME_STATE.PLAYING} >
                <div className={styles.message} >
                    <div>
                        {gameState === GAME_STATE.WON ?
                            'You Won! 😀' :
                            'You Lost 😞'
                        }
                    </div>
                    <div className={styles.answerContainer}>
                        {answer.map((tile, idx) =>
                            <div key={idx} className={styles.answerTile} style={{ backgroundColor: COLORS[tile] }}></div>
                        )}
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
                    <button className={styles.newGameButton} onClick={startNewGame}>New Game</button>
                </div>
            </Modal>
            <Toast toast={toast} setToast={setToast} />
        </>
    );
}

export default MindGame;