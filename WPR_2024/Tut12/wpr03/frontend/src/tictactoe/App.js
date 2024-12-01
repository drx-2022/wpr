import Board from "./Board";
import "./App.css";
import { useState } from "react";

export default function App() {
    const [data, setData] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [history, setHistory] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const handleClick = (i) => {
        if (gameOver) {
            alert("The game is already over!");
        } else if (data[i] === null) {
            const newData = [...data]; // clone data
            newData[i] = player;
            setData(newData);
            if (checkWin(player, newData)) {
                alert(player + " wins!");
                setGameOver(true);
            } else {
                const newPlayer = player === "X" ? "O" : "X"; // switch player
                setPlayer(newPlayer);
                // update history when game is not over
                setHistory([...history, {
                    moveNo: history.length + 1,
                    player: newPlayer,
                    board: newData
                }]);
            }
        } else {
            alert("Square is already occupied!");
        }
    }
    const checkWin = (p, board) => {
        if (
            (board[0] === p && board[1] === p && board[2] === p) ||
            (board[3] === p && board[4] === p && board[5] === p) ||
            (board[6] === p && board[7] === p && board[8] === p) ||
            (board[0] === p && board[3] === p && board[6] === p) ||
            (board[1] === p && board[4] === p && board[7] === p) ||
            (board[2] === p && board[5] === p && board[8] === p) ||
            (board[0] === p && board[4] === p && board[8] === p) ||
            (board[2] === p && board[5] === p && board[6] === p)
        ) return true;
        return false;
    }
    const reset = () => {
        setData(Array(9).fill(null));
        setPlayer('X');
        setHistory([]);
        setGameOver(false);
    }
    const rollBack = (n) => {
        setData(history[n - 1].board);
        setPlayer(history[n - 1].player);
        const newHistory = history.slice(0, n);
        setHistory(newHistory);
        setGameOver(false);
    }
    return (
        <div className="game">
            <div>
                <p>
                    <button onClick={reset}>Reset</button>
                    &nbsp;Current player: {player}</p>
                <Board squares={data} squareClick={handleClick} />
            </div>
            <div>
                <h3>History</h3>
                {history.map(
                    e => <div onClick={() => rollBack(e.moveNo)}>Move #{e.moveNo}</div>
                )}
            </div>
        </div>
    );
}