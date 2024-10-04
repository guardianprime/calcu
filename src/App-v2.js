import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const [state, setState] = useState({
    preview: "",
    result: 0,
    finishedCalculating: false,
  });

  const handleButtonClick = (value) => {
    if (value === "=") {
      setState((prevState) => ({
        ...prevState,
        result: evaluate(prevState.preview),
        finishedCalculating: true,
      }));
    } else if (value === "clear") {
      setState({ preview: "", result: 0, finishedCalculating: false });
    } else if (value === "delete") {
      setState((prevState) => ({
        ...prevState,
        preview: prevState.preview.slice(0, -1),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        preview: prevState.preview + value,
        finishedCalculating: false,
      }));
    }
  };

  return (
    <div className="app-container">
      <div className="screen">
        <div className="mode-toggle">darkmode</div>
        {state.finishedCalculating ? (
          <Result result={state.result} />
        ) : (
          <Preview preview={state.preview} />
        )}
      </div>
      <div className="buttons-container">
        {["clear", "delete", "%", "/", "1", "2", "3", "*", "4", "5", "6", "-", "7", "8", "9", "+", "0", ".", "="].map((value) => (
          <Button key={value} value={value} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
}

function Button({ value, onClick }) {
  return (
    <button className="buttons" onClick={() => onClick(value)}>
      {value === "delete" ? <i className="fa-solid fa-delete-left"></i> : value}
    </button>
  );
}

function Preview({ preview }) {
  return <div className="preview">{preview}</div>;
}

function Result({ result }) {
  return <div className="result"><h1>{result}</h1></div>;
}

export default App;
