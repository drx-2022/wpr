import { useState } from "react";
import "./App.css";
import Board from "./Board";

function checkWin(p, board) {
  if (
    (board[0] === p && board[1] === p && board[2] === p) ||
    (board[0] === p && board[1] === p && board[2] === p) ||
    (board[3] === p && board[4] === p && board[5] === p) ||
    (board[6] === p && board[7] === p && board[8] === p) ||
    (board[0] === p && board[3] === p && board[6] === p) ||
    (board[1] === p && board[4] === p && board[7] === p) ||
    (board[2] === p && board[5] === p && board[8] === p) ||
    (board[0] === p && board[4] === p && board[8] === p) ||
    (board[2] === p && board[5] === p && board[6] === p)
  ) {
    return true;
  } else {
    return false;
  }
}
function App() {
  const [data, setData] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const sqrClick = (i) => {
    if (gameOver) {
      alert("The game is already over!");
    } else if (data[i] !== "") {
      alert("This square is already occupied");
    } else {
      const newData = [...data]; // clone the old array
      newData[i] = player;
      setData(newData);
      if (checkWin(player, newData)) {
        alert(`Player ${player} wins!`);
        setGameOver(true);
      } else {
        const newPlayer = player === "X" ? "O" : "X"; // switch player
        setPlayer(newPlayer);
      }
    }
  };
  const reset = () => {
    setPlayer("X");
    setGameOver(false);
    setData(Array(9).fill(""));
};
  return (
    <div className="App">
      <p><button onClick={reset}>Reset</button></p>
      <div>Current player: {player}</div>
      <Board squares={data} clk={sqrClick} />
    </div>
  );
}

export default App;
