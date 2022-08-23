import { useEffect } from "react";
import Portal from "./Portal";
import styles from './modules/Toast.module.css';

function Toast({ children, toast, setToast, displayTime = null }) {

    useEffect(() => {
        if (displayTime) {
            const timeoutId = setTimeout(() => setToast({ display: false, message: "" }), displayTime);

            return () => clearTimeout(timeoutId);
        }
        //eslint-disable-next-line
    }, [displayTime]);

    if (!toast.display) return null;

    return (
        <Portal wrapperId={'toastId'}>
            <div className={styles.toastContainer}>
                <div className={styles.toastMessage}>
                    <div>
                        {toast.message}
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    )
}

export default Toast;