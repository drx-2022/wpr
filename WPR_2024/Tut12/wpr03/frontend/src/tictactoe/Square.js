export default function Square({ val, squareClick }) {
    return (
        <div className="square" onClick={squareClick}>{val}</div>
    );
}