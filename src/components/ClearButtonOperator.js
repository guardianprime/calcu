import { useState } from "react";

function ClearButtonOperator({ setPreview, children, setResult, onFinishedCalculating }) {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 300);
        setPreview("");
        setResult("");
        onFinishedCalculating(false);
    }


    return (
        <button onClick={handleClick} className={clicked ? `toggle-bg-color buttons` : "buttons"}>{children}</button>
    )
}

export default ClearButtonOperator;  