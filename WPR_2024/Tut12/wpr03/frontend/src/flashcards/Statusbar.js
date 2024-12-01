export default function Statusbar({ index, total, next, back }) {
    return (
        <div className="status">
            <button onClick={back} disabled={index <= 0}>&larr;</button>
            <strong>{index + 1}</strong> / <span>{total}</span>
            <button onClick={next} disabled={index >= total - 1}>&rarr;</button>
        </div>
    );
}