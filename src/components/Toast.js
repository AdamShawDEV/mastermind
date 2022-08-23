import { useEffect, useState } from "react";
import Portal from "./Portal";

function Toast({ toast, setToast, displayTime = 3000 }) {

    useEffect(() => {
        const timeoutId = setTimeout(() => setToast({ display: false, message: "" }), displayTime);

        return () => clearTimeout(timeoutId);
    })

    if (!toast.display) return null;

    return (
        <Portal wrapperId={'toastId'}>
            <div className="tostContainer">
                <div className="toastMessage">
                    {toast.message}
                </div>
            </div>
        </Portal>
    )
}

export default Toast;