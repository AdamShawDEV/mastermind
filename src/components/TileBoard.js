import { COLORS } from "../constants";
import styles from './modules/TileBoard.module.css';

function Row({ rowData, rowNum, selectedTile, setSelectedTile }) {
    const { tiles, correct, wrong } = rowData;
    const { row, col } = selectedTile;

    function handleClick(idx) {
        const targetCol = idx;
        if (row === rowNum) {
            setSelectedTile(curr => { return { ...curr, col: targetCol } });
        }
    }

    return (
        <div className={styles.tileRow}>
            {tiles.map((tile, idx) =>
                <div key={idx} className={styles.tileContainer} 
                style={row === rowNum && col === idx ? { border: '.2rem solid green' } : null }
                    onClick={() => handleClick(idx)}>
                    {tile.value ? <div
                        className={`${styles.tile} ${tile.status === 'checked' ? styles.tileChecked : styles.tileUnchecked}`}
                        style={{ backgroundColor: COLORS[tile.value] }}>
                    </div> : null}
                </div>
            )}
            <div className={styles.rowScoreContainer}>
                {Array(correct).fill("").map((_, idx) =>
                    <div key={idx} className={`${styles.pin} ${styles.correct}`} />
                )}
                {Array(wrong).fill("").map((_, idx) =>
                    <div key={idx} className={`${styles.pin} ${styles.wrong}`} ></div>
                )}
            </div>
        </div >
    )
}

function NumberBoard({ board, selectedTile, setSelectedTile }) {

    return (
        <div className={styles.rowContainer}>
            {board.map((row, idx) =>
                <Row key={idx} rowData={row} rowNum={idx} selectedTile={selectedTile} setSelectedTile={setSelectedTile} />
            )}
        </div>
    );
}

export default NumberBoard;