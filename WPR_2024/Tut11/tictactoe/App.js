import './App.css';

function Square(props) {
  return <div className="square" onClick={props.onSquareClick}>{props.value}</div>;
}

function App() {
  function handleClick(index) {
    console.log("Clicked " + index);
  }
  const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="board">
      {squares.map((s, i) => <Square key={i} value={s} onSquareClick={() => handleClick(i)} />)}
    </div>
  );
}

export default App;