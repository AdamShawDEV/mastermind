import Portal from "./Portal";
import styles from './modules/Modal.module.css';

function Modal({ children, display }) {

    if (!display) return null;

    return (
        <Portal wrapperId={'modalRoot'}>
            <div className={styles.container}>
                <div className={styles.modal}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}

export default Modal;