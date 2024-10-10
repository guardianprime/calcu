
import { useState } from "react";
import { evaluate } from "mathjs";


function EqualSignButtonOperator({ classes, setResult, children, preview, setPreview, onFinishedCalculating, finishedCalculating }) {
    const [clicked, setClicked] = useState(false);

    function handleClick() {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
        }, 300);

        if (finishedCalculating) return;
        let answer;
        try {
            answer = evaluate(preview);
        } catch (error) {
            alert("Invalid format used");
            return;
        }
        setResult(answer);
        onFinishedCalculating(true);
        setPreview(answer);
    }


    return (
        <button className={clicked ? "toggle-color " + classes : classes} onClick={handleClick}>{children}</button>
    )
}

export default EqualSignButtonOperator;