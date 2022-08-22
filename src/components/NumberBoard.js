function Row({ row }) {

    const { numbers, correct, wrong } = row;

    const rowNumbers = [...numbers];

    for (let i = 0; i < 5 - numbers.length; i++) {
        rowNumbers.push({
            value: '',
            status: 'unchecked',
        });
    }

    return (
        <div className='numberRow'>
            {rowNumbers.map((digit, idx) =>
                <div key={idx} className='digitContainer'>
                    <div className="digit">
                        {digit.value}
                    </div>
                </div>
            )}
            <div className="rowScoreContainer">
                {Array(correct).fill("").map((_, idx) =>
                    <div key={idx} className="correct" />
                )}
                {Array(wrong).fill("").map((_, idx) =>
                    <div key={idx} className="wrong"></div>
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