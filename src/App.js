import { useState } from "react";
import { evaluate } from "mathjs";

export default function App() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(0);
  const [finishedCalculating, setFinishedCalculating] = useState(false);


  return <div className="app-container">
    <div className="screen">
      <div className="mode-toggle">darkmode</div>
      {finishedCalculating && <Result result={result} />}
      {!finishedCalculating && <Preview preview={preview} />}
    </div>
    <div className="buttons-container">
      <ClearButtonOperator setPreview={setPreview} classes="buttons" value="clear" setResult={setResult}><span>AC</span></ClearButtonOperator>
      <DeleteButtonOperator preview={preview} classes="buttons" value="delete" setPreview={setPreview} finishedCalculating={finishedCalculating}>
        <span><i className="fa-solid fa-delete-left"></i></span>
      </DeleteButtonOperator>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="%">
        <span><i className="fa-solid fa-percent"></i></span>
      </ButtonOperators>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="/">
        <span><i className="fa-solid fa-divide"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="1"><span>1</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="2"><span>2</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="3"><span>3</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="*">
        <span><i className="fa-solid fa-xmark"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="4"><span>4</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="5"><span>5</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="6"><span>6</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="-">
        <span><i className="fa-solid fa-minus"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="7"><span>7</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="8"><span>8</span></ButtonNumber>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="9"><span>9</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="+">
        <span><i className="fa-solid fa-plus"></i></span>
      </ButtonOperators>
      <ButtonNumber onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons" value="0"><span>0</span></ButtonNumber>
      <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue=".">
        <span><i className="fa-solid fa-period"></i></span>
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
  function handleClick() {
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
    <button className={classes} onClick={handleClick}>{children}</button>
  )
}


function ClearButtonOperator({ classes, setPreview, children, setResult }) {

  function handleClick() {
    setPreview("");
    setResult(0);
  }


  return (
    <button onClick={handleClick} classNames={classes}>{children}</button>
  )
}


function DeleteButtonOperator({ children, classes, preview, setPreview, finishedCalculating }) {

  function handleTyping() {
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
    <button className={classes} onClick={handleTyping}>{children}</button>
  )
}





function ButtonNumber({ children, classes, value, setPreview, onFinishedCalculating }) {
  function handleTyping() {
    setPreview((p) => p + value);
    onFinishedCalculating(false);
  }

  return (
    <button className={classes} onClick={handleTyping}>{children}</button>
  )
}


function ButtonOperators({ children, classes, arithmetricValue, setPreview, preview, onFinishedCalculating }) {
  const [isDisabled, setIsDisabled] = useState(false);

  function handleTyping() {
    setIsDisabled(true); // Disable the button

    // Ensure preview is a string
    const previewString = String(preview).trim();
    const lastChar = previewString.charAt(previewString.length - 1);

    // Check if the last character is the same as the new value
    if (lastChar === arithmetricValue) {
      // If the value is already the last character, do nothing
      setIsDisabled(false);
      return;
    } else {
      // Otherwise, add the new value
      setIsDisabled(false);
      setPreview(p => `${p} ${arithmetricValue} `);
    }

    onFinishedCalculating(false);
  }

  return (
    <button className={classes} onClick={handleTyping} disabled={isDisabled}>
      {children}
    </button>
  );
}


function Preview({ preview }) {
  return (
    <div className="preview">{preview}</div>
  )
}

function Result({ result }) {
  return (
    <div className="result"><h1>{result}</h1></div>
  )
}