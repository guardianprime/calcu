import { useState } from "react";
import { evaluate } from "mathjs";
/* import NumberFormat from 'react-number-format'; */

export default function App() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(0);
  const [finishedCalculating, setFinishedCalculating] = useState(false);


  return <div className="app-container">
    <div className="screen">
      <div className="mode-toggle">darkmode</div>
      {finishedCalculating && <Result result={result} />}
      {(!finishedCalculating && preview) && <Preview preview={preview} />}
    </div>
    <div className="buttons-container">
      <ClearButtonOperator setPreview={setPreview} value="clear" setResult={setResult} onFinishedCalculating={setFinishedCalculating}><span>AC</span></ClearButtonOperator>
      <DeleteButtonOperator preview={preview} classes="buttons" value="delete" setPreview={setPreview} finishedCalculating={finishedCalculating}>
        <span><i className="fa-solid fa-delete-left"></i></span>
      </DeleteButtonOperator>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="%">
        <span><i className="fa-solid fa-percent"></i></span>
      </ButtonOperators>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="/">
        <span><i className="fa-solid fa-divide"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="1"><span>1</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="2"><span>2</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="3"><span>3</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="*">
        <span><i className="fa-solid fa-xmark"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="4"><span>4</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="5"><span>5</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="6"><span>6</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="-">
        <span><i className="fa-solid fa-minus"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="7"><span>7</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="8"><span>8</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="9"><span>9</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="+">
        <span><i className="fa-solid fa-plus"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="0"><span>0</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons number" arithmetricValue=".">
        <span>.</span>
      </ButtonOperators>
      <EqualSignButtonOperator
        classes="buttons equals" setResult={setResult}
        preview={preview} setPreview={setPreview}
        onFinishedCalculating={setFinishedCalculating} finishedCalculating={finishedCalculating}>
        <span><i className="fa-solid fa-equals"></i></span>
      </EqualSignButtonOperator>
    </div>
  </div>
}

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





function ButtonNumber({ children, classes, value, setPreview, onFinishedCalculating }) {
  const [clicked, setClicked] = useState(false);
  function handleTyping() {
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
    setPreview((p) => p + value);
    onFinishedCalculating(false);
  }

  return (
    <button className={clicked ? "toggle-bg-color " + classes : classes} onClick={handleTyping}>{children}</button>
  )
}


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

const Preview = ({ preview }) => {
  function replaceSymbols(inputString) {
    const replacements = {
      '*': <span className="styled-symbols" key={Date.now()}>x</span>,
      '/': <span className="styled-symbols" key={Date.now()}>x</span>,
      '+': <span className="styled-symbols" key={Date.now()}>+</span>,
      '-': <span className="styled-symbols" key={Date.now()}>-</span>
    }

    let result = [];

    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      if (replacements[char]) {
        result.push(replacements[char]);
      } else {
        result.push(char)
      }
    }
    return result;
  }

  const fakePreview = replaceSymbols(preview);

  return (
    <div className="preview">{fakePreview}</div>
  )
}


function Result({ result }) {
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const inputString = String(result);
  const formattedString = inputString.replace(/\d+/g, (match) => formatNumber(match));
  console.log(formattedString);
  return (
    <div className="result">{formattedString}</div>
  )
}

