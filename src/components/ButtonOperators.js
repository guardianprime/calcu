import { useState } from "react";

function ButtonOperators({ children, classes, arithmetricValue, setPreview, preview, onFinishedCalculating }) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [clicked, setClicked] = useState(false);
    const mathValues = ['+', '-', '*', '/'];

    function handleTyping() {
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
        if (!preview) return;
        setIsDisabled(true); // Disable the button

        // Ensure preview is a string
        let previewString = String(preview).trim();
        const lastChar = previewString.charAt(previewString.length - 1);

        // Check if the last character is the same as the new value
        if (lastChar === arithmetricValue) {
            // If the value is already the last character, do nothing
            setIsDisabled(false);
            return;
        } else if (mathValues.includes(lastChar)) {
            // Replace the last character with the new arithmetic value
            let arr = previewString.split("");
            arr.splice(arr.length - 1, 1, arithmetricValue);
            let newArr = arr.join("");
            setPreview(newArr);
        } else {
            // Otherwise, add the new value
            setPreview(p => `${p}${arithmetricValue}`);
        }
        setIsDisabled(false);
        onFinishedCalculating(false);
    }

    return (
        <button className={clicked ? "toggle-bg-color " + classes : classes} onClick={handleTyping} disabled={isDisabled} >
            {children}
        </button >
    );
}

export default ButtonOperators;