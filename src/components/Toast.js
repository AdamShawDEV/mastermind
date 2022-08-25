import { useEffect } from "react";
import Portal from "./Portal";
import styles from './modules/Toast.module.css';

function Toast({ toast, setToast, displayTime = 800 }) {

    useEffect(() => {
        if (displayTime && toast.display) {
            console.log('hi');
            const timeoutId = setTimeout(() => setToast({ display: false, message: "" }), displayTime);

            return () => clearTimeout(timeoutId);
        }
        //eslint-disable-next-line
    }, [toast.display, displayTime]);

    if (!toast.display) return null;

    return (
        <Portal wrapperId={'toastId'}>
            <div className={styles.toastContainer}>
                <div className={styles.toastMessage}>
                    {toast.message}
                </div>
            </div>
        </Portal>
    )
}

export default Toast;