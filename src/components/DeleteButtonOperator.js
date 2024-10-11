import { useState } from "react";

function DeleteButtonOperator({ children, classes, preview, setPreview, finishedCalculating }) {
    const [clicked, setClicked] = useState(false);

    function handleTyping() {
        setClicked(true);
        setTimeout(() => setClicked(false), 300)
        if (finishedCalculating) return;
        let regex = /\s(?=\S$)/;
        let secondRegex = /(?<=\s).(?=\s$)/;
        let hasSpaceBeforeLastCharacter = regex.test(preview);
        let hasSpaceBeforeAndAfterLastCharacter = secondRegex.test(preview);
        let newPreview;
        if (hasSpaceBeforeLastCharacter) {
            newPreview = preview.slice(0, -2);
        } else if (hasSpaceBeforeAndAfterLastCharacter) {
            newPreview = preview.slice(0, -3);
        } else {
            newPreview = preview.slice(0, -1);
        }
        setPreview(newPreview);
    }

    return (
        <button className={clicked ? "toggle-bg-color " + classes : classes} onClick={handleTyping}>{children}</button>
    )
}

export default DeleteButtonOperator;