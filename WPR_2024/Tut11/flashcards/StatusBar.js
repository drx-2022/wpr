export default function Statusbar({ wordIndex, wordCount, back, next }) {
  return (
    <div id="status-bar">
      <button onClick={back} disabled={wordIndex === 0} id="prev">
        &larr;
      </button>
      <strong>{wordIndex + 1}</strong> / <span>{wordCount}</span>
      <button onClick={next} disabled={wordIndex === wordCount - 1} id="next">
        &rarr;
      </button>
    </div>
  );
}
