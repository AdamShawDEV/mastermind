import { useContext } from "react";
import { NUM_COLORS, COLORS } from "../constants";

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
        <div className='tileRow'>
            {rowTiles.map((tile, idx) =>
                <div key={idx} className='tileContainer'>
                    {tile.value ? <div className={tile.status === 'checked' ?  "tileChecked" : 'tileUnchecked'} style={{ backgroundColor: COLORS[tile.value] }}>
                    </div> : null}
                </div>
            )}
            <div className="rowScoreContainer">
                {Array(correct).fill("").map((_, idx) =>
                    <div key={idx} className="pin correct" />
                )}
                {Array(wrong).fill("").map((_, idx) =>
                    <div key={idx} className="pin wrong"></div>
                )}
            </div>
        </div >
    )
}

function NumberBoard({ rows }) {

    return (
        <div className="rowContainer">
            {rows.map((row, idx) =>
                <Row key={idx} row={row} />
            )}
        </div>
    );
}

export default NumberBoard;