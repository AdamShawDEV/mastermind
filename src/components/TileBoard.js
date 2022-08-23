import { NUM_COLORS, COLORS } from "../constants";
import styles from './modules/TileBoard.module.css';

function Row({ row }) {
    const { tiles, correct, wrong } = row;

    const rowTiles = [...tiles];

    for (let i = 0; i < NUM_COLORS - tiles.length; i++) {
        rowTiles.push({
            value: '',
            status: 'unchecked',
        });
    }

    return (
        <div className={styles.tileRow}>
            {rowTiles.map((tile, idx) =>
                <div key={idx} className={styles.tileContainer}>
                    {tile.value ? <div className={`${styles.tile} ${tile.status === 'checked' ?  styles.tileChecked : styles.tileUnchecked}`} style={{ backgroundColor: COLORS[tile.value] }}>
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

function NumberBoard({ rows }) {

    return (
        <div className={styles.rowContainer}>
            {rows.map((row, idx) =>
                <Row key={idx} row={row} />
            )}
        </div>
    );
}

export default NumberBoard;