import { useState, React, createContext } from "react";
import Preview from "./components/Preview.js";
import EqualSignButtonOperator from "./components/EqualSignButtonOperator.js";
import Result from "./components/Result.js";
import DeleteButtonOperator from "./components/DeleteButtonOperator.js";
import ButtonNumber from "./components/ButtonNumber.js";
import ButtonOperators from "./components/ButtonOperators.js";
import ClearButtonOperator from "./components/ClearButtonOperator.js";
import ReactSwitch from "react-switch";
import { ReactComponent as SunIcon } from './svg/sun.svg';
import { ReactComponent as MoonIcon } from './svg/moon.svg'
/* import NumberFormat from 'react-number-format'; */
export const ThemeContext = createContext(null)

export default function App() {
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(0);
  const [finishedCalculating, setFinishedCalculating] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <div className="app-container" id={theme}>
        <div className="screen">
          <div className="mode-toggle">
            <ReactSwitch
              onChange={toggleTheme}
              checked={theme === "dark"}
              uncheckedIcon={
              <div className="unchecked-icon"><SunIcon /></div>}
              checkedIcon={
              <div className="checked-icon"><MoonIcon /></div>}
              onColor="#0066cc"
              onHandleColor="#ffffff"
              offHandleColor="#0066cc"
              offColor="#ffffff"
              height={40}
              width={80}
            />
          </div>
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
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="1"><span>1</span></ButtonNumber>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="2"><span>2</span></ButtonNumber>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="3"><span>3</span></ButtonNumber>
          <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="*">
            <span><i className="fa-solid fa-xmark"></i></span>
          </ButtonOperators>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="4"><span>4</span></ButtonNumber>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="5"><span>5</span></ButtonNumber>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="6"><span>6</span></ButtonNumber>
          <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="-">
            <span><i className="fa-solid fa-minus"></i></span>
          </ButtonOperators>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="7"><span>7</span></ButtonNumber>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="8"><span>8</span></ButtonNumber>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="9"><span>9</span></ButtonNumber>
          <ButtonOperators onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} preview={preview} classes="buttons" arithmetricValue="+">
            <span><i className="fa-solid fa-plus"></i></span>
          </ButtonOperators>
          <ButtonNumber finishedCalculating={finishedCalculating} onFinishedCalculating={setFinishedCalculating} setPreview={setPreview} classes="buttons number" value="0"><span>0</span></ButtonNumber>
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
    </ ThemeContext.Provider >)
}
