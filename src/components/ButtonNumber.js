import { useState } from "react";

function ButtonNumber({ children, classes, value, setPreview, onFinishedCalculating, finishedCalculating }) {
    const [clicked, setClicked] = useState(false);
    function handleTyping() {
        if (finishedCalculating) return;
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
        setPreview((p) => p + value);
        onFinishedCalculating(false);
    }

    return (
        <button className={clicked ? "toggle-bg-color " + classes : classes} onClick={handleTyping}>{children}</button>
    )
}

export default ButtonNumber;