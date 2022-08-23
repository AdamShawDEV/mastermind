import { COLORS } from '../constants';

function Keypad({ handleKeyClick }) {
    return (
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
    );
}

export default Keypad;