export default function App() {
  return <div className="app-container">
    <div className="screen">
      <div className="mode-toggle">darkmode</div>
      <div className="result"><h1>20</h1></div>
      <div className="preview">5 x 2 + 10</div>
    </div>
    <div className="buttons-container">
      <div className="buttons"><span>AC</span></div>
      <div className="buttons">
        <span><i className="fa-solid fa-delete-left"></i></span>
      </div>
      <div className="buttons">
        <span><i className="fa-solid fa-percent"></i></span>
      </div>
      <div className="buttons">
        <span><i className="fa-solid fa-divide"></i></span>
      </div>
      <div className="buttons"><span>1</span></div>
      <div className="buttons"><span>2</span></div>
      <div className="buttons"><span>3</span></div>
      <div className="buttons">
        <span><i className="fa-solid fa-xmark"></i></span>
      </div>
      <div className="buttons"><span>4</span></div>
      <div className="buttons"><span>5</span></div>
      <div className="buttons"><span>6</span></div>
      <div className="buttons">
        <span><i className="fa-solid fa-minus"></i></span>
      </div>
      <div className="buttons"><span>7</span></div>
      <div className="buttons"><span>8</span></div>
      <div className="buttons"><span>9</span></div>
      <div className="buttons">
        <span><i className="fa-solid fa-plus"></i></span>
      </div>
      <div className="buttons"><span>0</span></div>
      <div className="buttons">
        <span><i className="fa-solid fa-period"></i></span>
        </div>
      <div className="buttons equals">
        <span><i className="fa-solid fa-equals"></i></span>
      </div>
    </div>
  </div>
}
/* 
function ButtonOperators({ children }) {
  return (
    <div>{children}</div>
  )
}

function ButtonNumber({ children }) {
  return (
    <div>{children}</div>
  )
} */