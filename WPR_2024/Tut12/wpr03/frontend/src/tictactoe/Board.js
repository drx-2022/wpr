import Square from "./Square";

export default function Board({ squares, squareClick }) {
    return (
        <div className="board">
            {squares.map(
                (e, i) => <Square val={e} squareClick={() => squareClick(i)} />
            )}
        </div>
    );
}