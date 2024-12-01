export default function Flashcard({ type, text }) {
    return (
        <div className={"flashcard " + type}>{text}</div>
    );
}