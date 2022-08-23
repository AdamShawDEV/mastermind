import { COLORS } from '../constants';
import styles from './modules/Keypad.module.css';

function Keypad({ handleKeyClick }) {
    return (
        <div className={styles.keypadRow}>
            <div onClick={handleKeyClick} id='enter' className={`${styles.key} ${styles.enterKey}`}>
                enter
            </div>
            {Object.keys(COLORS).map(key =>
                <div key={key} id={key} style={{ backgroundColor: COLORS[key] }} onClick={handleKeyClick} className={styles.key}>
                </div>
            )}
            <div onClick={handleKeyClick} id='del' className={styles.key}>
                del
            </div>
        </div>
    );
}

export default Keypad;